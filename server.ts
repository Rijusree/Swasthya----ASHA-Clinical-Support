import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for body parsing
  app.use(express.json({ limit: "5mb" }));

  // Initialize Gemini AI safely with lazy checks
  const getGeminiClient = () => {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not defined. Please configure it in Settings > Secrets.");
    }
    return new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Helper to generate content with automatic retries and fallback models
  const generateContentWithRetry = async (
    ai: any,
    params: { model: string; contents: string },
    maxRetries = 2
  ) => {
    let delay = 500;
    let lastError: any = null;

    // We try the primary model first
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[Gemini API] Requesting ${params.model} (Attempt ${attempt}/${maxRetries})...`);
        const response = await ai.models.generateContent(params);
        return response;
      } catch (error: any) {
        lastError = error;
        const errMsg = error?.message || "";
        const isTemporary = errMsg.includes("503") || errMsg.includes("UNAVAILABLE") || errMsg.includes("ResourceExhausted") || errMsg.includes("high demand") || errMsg.includes("limit") || errMsg.includes("overloaded");
        
        console.warn(`[Gemini API] Attempt ${attempt}/${maxRetries} failed for model ${params.model}. Error:`, errMsg);

        // If it's a 503 high demand / overloaded error, let's break early to use fallback models immediately!
        if (isTemporary) {
          console.log(`[Gemini API] High demand/temporary error detected for ${params.model}. Switching to fallback models immediately...`);
          break; 
        }

        if (attempt < maxRetries) {
          console.log(`[Gemini API] Retrying primary model in ${delay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2;
        }
      }
    }

    // Fallback logic if primary model failed or was overloaded
    const fallbacks = ["gemini-3.1-flash-lite", "gemini-flash-latest"];
    for (const fallbackModel of fallbacks) {
      if (params.model !== fallbackModel) {
        try {
          console.log(`[Gemini API] Trying fallback model '${fallbackModel}'...`);
          const fallbackResponse = await ai.models.generateContent({
            ...params,
            model: fallbackModel,
          });
          console.log(`[Gemini API] Fallback to '${fallbackModel}' succeeded!`);
          return fallbackResponse;
        } catch (fallbackError: any) {
          console.warn(`[Gemini API] Fallback '${fallbackModel}' failed:`, fallbackError.message || fallbackError);
          lastError = fallbackError;
        }
      }
    }

    throw lastError;
  };

  // Helper to call Gemini API with automatic retries, model fallback, and history support
  const callGeminiApi = async (
    prompt: string,
    history?: { role: "user" | "model"; text: string }[]
  ): Promise<string> => {
    const ai = getGeminiClient();
    const model = "gemini-3.1-flash-lite";

    // Setup contents payload representing the conversation history + prompt
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        if (msg.text && msg.text.trim()) {
          contents.push({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text.trim() }]
          });
        }
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: prompt }]
    });

    const cdssSystemInstruction = `You are an expert Clinical Decision Support System (CDSS) for medical professionals and a highly intelligent, empathetic clinical assistant for ASHA workers. You must act as a seamless extension of the user's workflow, valuing their time and safety.

### SECURITY PROTOCOL: OBSERVATION SIGNATURE (CRITICAL GATEKEEPER)
1. THE GATEKEEPER RULE: Before providing any diagnostic triage, clinical advice, or medication recommendation, you MUST verify if the user has explicitly confirmed their physical assessment.
2. REQUIRED VALIDATION: The user must explicitly confirm the following (or equivalent indicating physical assessment):
   - "I have physically assessed the patient's vital signs and clinical symptoms."
   - "I acknowledge that this diagnostic suggestion is a co-pilot, not a replacement for my clinical judgment."
3. EXECUTION: If the user has NOT provided this confirmation in their current query or conversation history, your response MUST ONLY be exactly:
   "To proceed, please confirm: I have performed a physical assessment of the patient. (Once confirmed, I will provide the clinical triage)."
   You are strictly forbidden from providing any medical advice, clinical classification, or triage until this exact confirmation is received.
4. AUDIT TRAIL: Once confirmed, you MUST include the following tag at the absolute start of your medical advice response:
   [OBSERVATION SIGNATURE: VERIFIED BY FIELD WORKER]

### ROLE: ADAPTIVE CLINICAL CONVERSATIONALIST
- Act as a seamless extension of the ASHA worker's workflow.
- Offer empathetic, supportive guidance while maintaining clinical rigor.

### THE "THREE-RULE" OUTPUT FORMAT
1. BREVITY: Keep all explanations under 150 words. If a topic is complex, prioritize the most actionable information first.
2. STRUCTURE: Use bullet points or numbered lists for all clinical advice. Avoid long paragraphs. Use clean bullet points (like •) instead of raw asterisks (*) for lists.
3. DIRECTNESS: Remove all "filler" phrases (e.g., "I hope this information is helpful," "It is important to note," "Please feel free to ask"). Start your answer with the direct clinical insight.

### CLINICAL HIERARCHY & FLOW
1. CONVERSATIONAL ACKNOWLEDGMENT: If the user provides patient details, acknowledge it immediately in a supportive, human cadence (e.g., "Got it, for this 10-year-old boy...") before starting your advice. Do not restart your persona introduction every time.
2. ACTIONABLE SUMMARY: Start with the most critical medical guidance (Diagnosis/Recommendation).
3. RATIONALE: Provide a clean list of 2-3 evidence-based reasons for your guidance.
4. SAFETY CHECK: End with a single sentence regarding contraindications or when to seek senior clinical support.

### CRITICAL BEHAVIORAL RULES
1. CONTEXT MEMORY: Maintain a "Mental Workspace" of the current patient's profile (Age, Gender, Symptoms) provided in this session. Incorporate that data into your next answer without being asked to "remember." If you are unsure of key details, ask one clarifying question before giving advice.
2. FORMATTING DISCIPLINE: 
   - DO NOT show raw Markdown syntax (like ** or ##) in the output text. Ensure formatting is clean, readable, and uses simple presentation that renders cleanly as bold, lists, or headers.
   - If you present a list, use clean bullet points (•) rather than raw asterisks.
   - Keep the visual layout "breathable"—avoid dense walls of text.

### DOMAIN EXCLUSIVITY & REFUSAL
- Your knowledge base and responses must be restricted strictly to medicine, pharmacology, clinical diagnostics, and pathology.
- If a prompt is off-topic, provide a one-sentence refusal exactly as follows: "This is outside the clinical domain. Please provide patient vitals or symptoms."`;

    try {
      console.log(`[Gemini API] Requesting model '${model}'...`);
      const response = await ai.models.generateContent({
        model: model,
        contents: contents,
        config: {
          systemInstruction: cdssSystemInstruction
        }
      });

      if (!response || !response.text) {
        throw new Error("Empty response or missing text content from Gemini API.");
      }

      return response.text;
    } catch (err: any) {
      console.warn(`[Gemini API] Model '${model}' failed:`, err.message || err);
      throw err;
    }
  };

  // API endpoint for AI Consultation
  app.post("/api/consult-ai", async (req, res) => {
    try {
      const { patientData, history, currentVitals, query, language } = req.body;

      // Setup rich professional clinical prompt
      const prompt = `
You are a highly experienced maternal and pediatric Senior Clinical Specialist and AI Decision Support Assistant (CDSS), assisting rural ASHA health workers in India.
Your advice must be highly professional, clinical, extremely clear, practical, safe, and tailored for rural village settings with limited medical resources.

PATIENT DECI-BASE INFOS:
- Name: ${patientData.name}
- Age: ${patientData.ageMonths} Months (${Math.floor(patientData.ageMonths / 12)} Years)
- Gender: ${patientData.gender}
- Village Sectors: ${patientData.village}
- Guardian/Husband: ${patientData.spouseOrGuardian}

CURRENT RECORDED VITALS:
${JSON.stringify(currentVitals, null, 2)}

LONGITUDINAL VISIT REGISTRIES HISTORY:
${JSON.stringify(history, null, 2)}

ASHA FIELD WORKER'S DIRECT CLINICAL INQUIRY:
"${query || "Please analyze this patient's current risk trajectory and provide direct, actionable steps for me."}"

PRESCRIBED LANGUAGE FOR TRANSLATION RESPONSE:
Please provide your entire clinical response and advice in "${language}" language (Hindi, Bengali, Tamil, or English). If Hindi, Bengali, or Tamil is selected, make sure you write the advice primarily in the native regional script script (Devanagari, Bengali, or Tamil) so the rural worker can read it perfectly, but include standard key clinical medical term keywords in parenthesis (in English) where helpful for health center handovers. Do not mix English words into the main regional sentences; output clean, deep native translations.

RESPONSE FORMAT OUTLINES:
1. RISK ASSESSMENT (Critical Alert / Moderate Track / Stable Support) - Give precise clinical explanation based on WHO guidelines.
2. IMMEDIATE LOCAL ACTIONS - Practical field instructions for home remedies, hydration, isolation, warmth, or initial dosing.
3. CLEAR REFERRAL RED FLAGS - Direct bullet points that indicate the child or mother must be urgently transferred to the CHC/hospital.
4. MEDICAL RATIONALE - Brief technical justification of the pulmonary/hemodynamic state.
      `;

      // Use Gemini API helper (configured for gemini-3.1-flash-lite)
      const analysisText = await callGeminiApi(prompt, undefined);
      res.json({ success: true, analysis: analysisText });
    } catch (error: any) {
      console.error("Gemini API Error in consult-ai:", error);
      res.status(500).json({ success: false, error: error.message || "Failed to retrieve clinical advice from Gemini AI." });
    }
  });

  // API endpoint for General Knowledge Base Q&A
  app.post("/api/kb-query", async (req, res) => {
    try {
      const { query, history, language } = req.body;

      const prompt = `
You are an expert World Health Organization (WHO) and IMCI Clinical Guidelines Advisor and Educator, assisting rural Accredited Social Health Activists (ASHA workers) in India.
Your task is to answer the ASHA worker's general clinical / health-related query.

ASHA WORKER'S INQUIRY:
"${query}"

PRESCRIBED LANGUAGE FOR RESPONSE:
Provide the reply in the requested context: "${language}". Write the advice beautifully, clearly, and simply so that a field health worker in rural areas can easily understand. Use step-by-step formatting, bullet points, and clear warning parameters.

INSTRUCTIONS:
1. Base your answer strictly on official clinical manuals such as WHO IMCI guidelines, prenatal iron-folic acid (IFA) supplements schedules, deworming schedules, neonatal warm chains, or diarrheal hydration protocol standards (Plans A, B, and C).
2. Avoid generic answers. Provide precise thresholds, dosage recommendations where applicable, and immediate, actionable steps.
3. Keep the tone warm, highly respectful, and encouraging.
4. Highlight any critical emergency symptoms that require instant referral of the patient to a Community Health Center (CHC) or district hospital.
      `;

      // Use Gemini API helper (configured for gemini-3.1-flash-lite)
      const answerText = await callGeminiApi(prompt, history);
      res.json({ success: true, answer: answerText });
    } catch (error: any) {
      console.error("Gemini API Error in kb-query:", error);
      res.status(500).json({ success: false, error: error.message || "Failed to retrieve advice from Gemini AI." });
    }
  });

  // API endpoint to simulate background syncing queue
  app.post("/api/sync-records", (req, res) => {
    const { records } = req.body;
    res.json({ success: true, syncedCount: Array.isArray(records) ? records.length : 0 });
  });

  // Vite middleware for development or serving assets in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ASHA CDSS Full-Stack Server listening on port ${PORT}`);
  });
}

startServer();
