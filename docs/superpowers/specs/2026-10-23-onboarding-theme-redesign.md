# Design Specification: Onboarding Theme Redesign (Luxury, Depth & Dashboard Cohesion)

## 1. Overview & Objective
Replace the generic, cartoonish "AI-slop" elements on the onboarding sequence (Login `#/login`, Brand Setup `#/brand-setup`, Connect Data `#/connect-data`, Analyzing `#/analyzing`) with the exact luxury, depth, typography, and component system of the BrandCare AI Dashboard (`#/today`). Ensure all brand and shop logos match the dashboard 100%.

---

## 2. Brand & Shop Logo Corrections
1. **BrandCare AI Logo (`.bc-brand`):**
   - Remove black background box (`background: var(--bc-ink)`) and blue `AI` color in `login.css` and `brand-setup.css`.
   - Adopt identical styling from `shared/components.css`:
     - Font: `var(--bc-font-number)` 25px / 600, letter-spacing `-0.8px`
     - Symbol: `.bc-brand-symbol` rotated `-9deg`, stroke-width `1.6`, color `#1d1d1f`
     - Suffix: `<span class="bc-brand-ai"> AI</span>` in `var(--bc-muted)`
2. **Shop Logo (`shopLogo()`):**
   - Replace placeholder generic leaf icons with actual `./assets/images/baansuan-logo.png` (`shopLogo()`) in `brand-setup.js` and `analysis.js`.

---

## 3. Page-by-Page Specifications

### 3.1 Login Page (`#/login`)
- **Left Form Pane (`.bc-login-welcome`):**
  - Brand header using `.bc-brand`
  - Refined segmented mode switcher (`data-action="login-mode"`) using `--bc-surface` and `--bc-border`
  - Input fields with Apple-style subtle inset shadows, `--bc-surface`, and delicate focus states
  - Primary button `.bc-button--primary` and Google SSO button with glassmorphic border
- **Right Showcase Pane (`.bc-login-art` -> `.bc-login-dashboard-preview`):**
  - Remove cartoon shop SVG, awnings, cartoon hearts, and chat bubbles.
  - Render a luxury **Live Dashboard Preview Card**:
    - Floating frosted glass card (`background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(24px); box-shadow: 0 20px 48px -12px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.04)`)
    - Header with Baan Suan shop badge, "สรุปสุขภาพแบรนด์วันนี้"
    - Mini Metric Grid:
      - คะแนนรีวิว 4.8 / 5.0 พร้อม Sparkline
      - แจ้งเตือนด่วน: กล่องบุบ ขนมแตก (+340%)
    - Recent customer feedback preview card
    - Refined ambient lighting gradient in the background (`radial-gradient(circle at 60% 40%, rgba(0, 113, 227, 0.08), transparent 70%)`)

### 3.2 Brand Setup Page (`#/brand-setup`)
- **Header (`.bc-setup-header`):**
  - Logo matches `.bc-brand`
  - Capsule Stepper with subtle glass blur, active blue step pill, checkmarks for completed steps
- **Setup Form Cards (`.bc-setup-card`):**
  - Styled with `--bc-surface`, 20px border radius, `--bc-shadow-md`, refined hairline borders
  - Number badges (`01`, `02`, `03`) styled with subtle metallic pill badges
  - Shop avatar upload features default `shopLogo()`
- **Right Aside Preview (`.bc-setup-preview`):**
  - Styled as an **Official Brand Passport Card**:
    - Crisp white card with multi-layered drop shadow
    - Official shop logo, brand name, category badge
    - Product list tags in Apple pill format
    - Interactive assistant tone preview bubble with subtle thinking pulse

### 3.3 Connect Data Page (`#/connect-data`)
- **Header (`.bc-setup-header`):**
  - Step 2 active capsule
- **Integration Cards (`.bc-connect-card`):**
  - Elevated platform cards (Facebook, Instagram, YouTube, LINE, Shopee, TikTok, Lazada)
  - Clear connection status badge ("พร้อมเชื่อมต่อ" vs "เชื่อมต่อแล้ว")
  - Platform brand accents and Apple action buttons
- **Right Aside Summary (`.bc-connect-summary`):**
  - "Data Pipeline & Stream Health" widget
  - Real-time channel counter
  - Enterprise security guarantee badge (`icon('shield')` มาตรฐานความปลอดภัยข้อมูล)

### 3.4 Analyzing Page (`#/analyzing`)
- **Layout:** Vertically centered on desktop and mobile
- **Visual Engine (`.bc-analysis-art`):**
  - Replace clip-art squircle and fake orbiting badges with **BrandCare Neural Engine**:
    - Glowing organic radial blur with pulsing ring
    - Centered authentic `shopLogo()`
    - Floating micro-metrics: "ความมั่นใจ 96%", "1,284 คอมเมนต์"
- **Stage Checklist (`.bc-analysis-stages`):**
  - Frosted glass cards with `--bc-surface`, transitioning to active state with subtle blue border glow and animated checkmark

---

## 4. Verification & Testing Plan
1. Validate syntax of all modified files (`node -c`).
2. Run local server and capture desktop & mobile screenshots of:
   - `#/login`
   - `#/brand-setup`
   - `#/connect-data`
   - `#/analyzing`
3. Verify visual coherence with `#/today`.
4. Commit to `fix/b-neutral-bg-and-analyzing-center` and push to PR #14.
