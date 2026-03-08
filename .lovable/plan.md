

# SnapWeaz Website - Modern UI Overhaul

This is a big ask, so I recommend we tackle it in phases. Here's the plan to elevate SnapWeaz into a premium, award-worthy creative studio website.

---

## Phase 1: Hero & First Impression (Highest Impact)

**Redesign HeroSection** with:
- Animated text reveal (word-by-word stagger using framer-motion)
- A subtle animated grid/dot pattern background instead of the plain gradient orb
- Larger, bolder typography with a text-splitting animation
- A horizontal marquee/ticker strip below the hero showing client names & keywords (replacing the static badge)
- Magnetic cursor effect on the CTA button

**Upgrade Header** with:
- Smooth background blur transition on scroll (already exists but refine timing)
- Active link indicator with a sliding pill animation

---

## Phase 2: Section-by-Section Polish

**ClientsSection** - Replace static logos with an infinite horizontal scroll marquee (auto-scrolling logo ticker, common on premium sites)

**ServicesSection** - Add hover card expansion effect: cards slightly expand with a subtle parallax icon shift on hover. Add a numbered index (01, 02...) for editorial feel.

**AboutSection** - Add an animated counter for stats (numbers count up when scrolled into view using framer-motion). Add a subtle gradient mesh background.

**ProcessSection** - Convert to a horizontal scroll timeline on desktop with connected line animation that draws as you scroll. Keep vertical on mobile.

**TestimonialsSection** - Convert to a carousel/slider using embla-carousel (already installed). Add auto-play with pause on hover. Larger quote typography.

**CTASection** - Add a gradient animated border effect and floating particles/shapes for visual interest.

---

## Phase 3: Inner Pages Enhancement

- **Work page**: Add filter tabs (All, Design, Development, Strategy). Replace text placeholders with gradient mesh cards. Add hover zoom effect on project thumbnails.
- **Services page**: Add sticky section navigation sidebar on desktop.
- **Contact page**: Add floating label inputs and a subtle success confetti animation.
- **About page**: Improve timeline with animated connecting line that draws on scroll.

---

## Phase 4: Global Improvements

- **Smooth page transitions** using framer-motion `AnimatePresence` with a fade/slide between routes
- **Custom cursor** (optional, a subtle dot follower for desktop)
- **Scroll-triggered animations** refined across all sections (staggered reveals)
- **Loading state**: Add a minimal loading screen with logo animation on first visit
- **Footer**: Add a large typographic footer CTA with animated arrow
- **Dark mode toggle** in the header (theme system already exists via CSS vars)

---

## Technical Approach

- All animations via **framer-motion** (already installed)
- Carousel via **embla-carousel-react** (already installed)
- Counter animations via framer-motion's `useMotionValue` + `useTransform`
- Marquee built as a CSS animation (no extra deps)
- Page transitions via `AnimatePresence` wrapping Routes
- No new dependencies needed - everything uses what's already installed

---

## Recommended Order

Since this is extensive, I suggest implementing in **3-4 messages**:
1. **Hero + Header + Page transitions + Marquee clients** (biggest visual impact first)
2. **Services + About + Process sections** overhaul
3. **Testimonials + CTA + Footer** upgrades
4. **Inner pages** (Work, Services, Contact, About)

Shall I proceed with the first batch?

