# Adapted Cinematic-Clinical Welcome Portal Prompt

This file contains the custom adapted prompt for your app idea, blending the **"Cinematic Hero Section with Looping Video Background"** with the **"Clinically Resilient Rural Diagnostic Workspace for ASHA workers in Rural India"**.

---

## The Adapted Prompt (Copy-Paste Ready)

```markdown
Cinematic-Clinical Welcome Gateway with Resilient Offline Laboratory Workspace

Create a premium, high-contrast, double-layered single-page healthcare portal for rural clinical workers (ASHA Swasthya Companion) using React + Vite + Tailwind CSS + TypeScript with the following structural specifications:

Fonts:
- Display/Headings: 'Instrument Serif' (for a quiet, professional, diagnostic gravity look)
- Body/Tactile UI elements: high-legibility clear Sans-serif (like 'Inter')
- Import fonts via: Google Fonts in /src/index.css or /src/styles/fonts.css

Medical Video Background:
- URL: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4
- Position: top: '300px' with inset: 'auto 0 0 0'
- Implement custom fade-in/fade-out loop transitions using React requestAnimationFrame:
  * Continuously audit video current time against total duration
  * Fade in duration: 0.5 seconds at the video starting frame (opacity 0 to 1)
  * Fade out duration: 0.5 seconds before the video ended frame (opacity 1 to 0)
  * OnEnded transaction: immediately set opacity to 0, wait 100ms, reset currentTime = 0, and replay
- Layer a soft, medical-grade gradient overlay (absolute inset-0 bg-gradient-to-b from-white via-transparent to-white) to blend the video container with the high-contrast sterile background.

Clinical Navigation Bar:
- Logo: "Aethera Swasthya®" (with Registered Symbol) Styled in text-3xl, tracking-tight, Instrument Serif, black (#000000)
- Menu items: 
  * "Home" (Active: color #000000)
  * "Patient Flow" (color #6F6F6F)
  * "WHO Protocols" (color #6F6F6F)
  * "IMCI Guidelines" (color #6F6F6F)
  * "Emergency Dispatch" (color #6F6F6F)
- Nav CTA: "Begin Journey" - rounded-full, px-6 py-2.5, text-sm, black background, white text, hover scale 1.03.

Cinematic-Clinical Hero Content:
- Positioning: paddingTop: 'calc(8rem - 75px)', pb-40, centered layout structure
- Display Headline (Instrument Serif, text-5xl sm:text-7xl md:text-8xl, leading 0.95, letterSpacing -2.46px):
  * Main text: "Beyond distance, we build the eternal."
  * Accent/Emphasis: "distance," and "the eternal." rendered in elegant italic dark-charcoal gray (#6F6F6F)
- Supporting Subtitle (Inter, text-base sm:text-lg, max-w-2xl, color #6F6F6F, leading-relaxed):
  * Content: "Clinical decision support at the grass-roots. Crafting tactile digital companions for ASHA healthcare workers to deliver diagnostics, secure lives, and guide resilient clinical flows under direct sunlight."
- CTA Button: "Begin Journey" - rounded-full, px-14 py-5, text-base, black background, white text, hover scale 1.03. Clicking this transitions into the Clinical Registry Dashboard.

Aesthetic Alignment:
- Background: Off-white/sterilized cream background (#FAF9F5) to reduce glare under high ambient outdoor solar exposure.
- Theme: Minimalist medical-grade stark layout. High absolute contrast (4.5:1 ratio), bold letter-spacing for offline readability, and tactile rounded thumb targets.
```

---

*This adapted prompt preserves the cinematic elegance of the landing module while aligning its identity, messaging, and action buttons entirely with the rural India clinical workspace requirement.*
