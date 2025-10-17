# Build SEO-Optimized Page

**Task**: Generate a complete SEO-optimized page using Design System Section Components based on: #$ARGUMENTS

Expected format: `[Thema/Keyword] [Ziel-URL]` (e.g., `Functional Training Hannover /functional-training`)

---

## 🎯 Overview

This command creates a **complete, SEO-optimized landing page** by:
1. Performing keyword research and SEO analysis
2. Selecting appropriate Section Components from the Design System
3. Generating SEO-optimized content for each section
4. Providing Builder.io-ready configuration
5. Creating comprehensive meta tags and structured data

**Only uses existing components from**: `components/design-system-section-components/`

---

## 📦 Available Section Components

The command can ONLY use these existing Section Components:

### Hero Sections
- **Hero.vue** - Main hero with headline, CTA, stats, trust indicators
- **HeroImage.vue** - Hero with prominent image placement

### Feature & USP Sections
- **USPGrid.vue** - Grid of USP cards (2-4 columns)
- **FeatureGrid.vue** - Feature grid with icons
- **FeatureShowcase.vue** - Highlighted feature presentation
- **AlternatingFeatures.vue** - Features with alternating image/text layout

### Statistics & Proof
- **StatisticGrid.vue** - Grid of statistics/numbers
- **Statistic.vue** - Single statistic display
- **StatsFeatureCards.vue** - Combined stats and features

### Content Sections
- **ContentSection48.vue** - Flexible content section (48 variations)
- **ContentBentoGrid.vue** - Bento-style content grid
- **ContentImageGrid.vue** - Content with image grid
- **ContentStatsGallery.vue** - Content combined with stats and gallery

### Social Proof & Comparison
- **Timeline.vue** - Timeline/process visualization
- **ComparisonTable.vue** - Feature comparison table
- **BentoGrid.vue** - Modern bento-box layout

### Visual Sections
- **GalleryGrid.vue** - Image gallery grid
- **GallerySection.vue** - Gallery section with header
- **ScheduleSection.vue** - Schedule/timetable display

### Conversion Sections
- **FAQ.vue** - Frequently Asked Questions
- **CTA.vue** - Call-to-Action section

---

## 🔍 SEO Strategy

### Keyword Research Process

1. **Main Keyword Analysis**
   - Extract primary keyword from topic
   - Identify search volume and competition
   - Determine search intent (informational, transactional, navigational)

2. **Semantic Keywords (LSI)**
   - Related terms and synonyms
   - Long-tail variations
   - Question-based keywords
   - Location-based keywords (if applicable: Hannover, Linden, etc.)

3. **Content Structure**
   - H1: Main keyword + compelling benefit
   - H2: Semantic keywords + features/benefits
   - H3: Long-tail keywords + detailed information
   - Keyword density: 1-2% (natural, no stuffing)

### Meta Tags Best Practices

**Title Tag** (50-60 characters):
- Format: `[Main Keyword] [Location] | [Brand] | [Unique Value]`
- Include primary keyword
- Add location if local SEO
- Include brand name
- Add unique selling point

**Meta Description** (150-160 characters):
- Include main keyword in first 120 chars
- Add call-to-action
- Mention key benefits (use ✓ or | separators)
- Create urgency or curiosity

**URL Structure**:
- Short and descriptive
- Include main keyword
- Use hyphens (-) not underscores (_)
- Lowercase only
- Example: `/functional-training-hannover`

### Structured Data (Schema.org)

Depending on page type, include:
- Organization schema
- LocalBusiness schema (for location-based)
- FAQPage schema
- Product/Service schema

---

## 📋 Step-by-Step Implementation

### Step 1: Parse Arguments

Extract topic and target URL from `#$ARGUMENTS`:
```
Input: Functional Training Hannover /functional-training
→ Topic: "Functional Training Hannover"
→ URL: /functional-training
→ Primary Keyword: functional training
→ Location: Hannover
```

### Step 2: Perform SEO Analysis

1. **Keyword Research** (use WebSearch if needed):
   - Primary: functional training
   - Secondary: functional fitness, functional workout, krafttraining
   - Location: hannover, linden, niedersachsen
   - Long-tail: functional training hannover linden, functional fitness morgens
   - Questions: was ist functional training, warum functional training

2. **Competitive Analysis**:
   - What do competitors cover?
   - What's missing in the market?
   - Unique angles for this topic

3. **Search Intent**:
   - Informational: Learn about topic
   - Commercial: Compare options
   - Transactional: Book/buy now
   - → Choose sections accordingly

### Step 3: Select Section Components

Based on topic and intent, choose appropriate sections:

**Typical Landing Page Structure:**
```
1. Hero (always first)
2. USPGrid or FeatureGrid (why us)
3. ContentSection48 or AlternatingFeatures (detailed info)
4. StatisticGrid (social proof with numbers)
5. Timeline (process/journey) [optional]
6. ComparisonTable (vs. competitors) [optional]
7. FAQ (answer questions, boost SEO)
8. CTA (conversion, always last)
```

**Selection Criteria:**
- **Service/Product**: Hero → USPGrid → Features → Stats → FAQ → CTA
- **Info/Educational**: Hero → ContentSection → Timeline → FAQ → CTA
- **Location-based**: Hero → USPGrid → Gallery → Schedule → FAQ → CTA
- **Comparison/Choice**: Hero → ComparisonTable → Features → FAQ → CTA

### Step 4: Generate SEO-Optimized Content

For each selected section, create content that:

1. **Includes Keywords Naturally**
   - Don't force keywords
   - Use semantic variations
   - Natural language flow
   - Focus on user value

2. **Follows Content Guidelines**
   - Clear, benefit-focused headlines
   - Short paragraphs (2-3 sentences)
   - Bullet points for scannability
   - Action-oriented CTAs

3. **Optimizes for Conversion**
   - Address user pain points
   - Provide clear solutions
   - Build trust with social proof
   - Strong, specific CTAs

### Step 5: Create Meta Tags

Generate complete meta tags:

```html
<!-- Primary Meta Tags -->
<title>[Optimized Title 50-60 chars]</title>
<meta name="title" content="[Same as title]">
<meta name="description" content="[Optimized Description 150-160 chars]">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://gym.exopek.de[url]">
<meta property="og:title" content="[Title]">
<meta property="og:description" content="[Description]">
<meta property="og:image" content="[Image URL]">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://gym.exopek.de[url]">
<meta property="twitter:title" content="[Title]">
<meta property="twitter:description" content="[Description]">
<meta property="twitter:image" content="[Image URL]">

<!-- Additional SEO -->
<link rel="canonical" href="https://gym.exopek.de[url]">
<meta name="robots" content="index, follow">
<meta name="language" content="German">
<meta name="geo.region" content="DE-NI">
<meta name="geo.placename" content="Hannover">
```

### Step 6: Generate Structured Data

Create Schema.org JSON-LD:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "EXOPEK Gym Linden",
  "image": "[Image URL]",
  "@id": "https://gym.exopek.de",
  "url": "https://gym.exopek.de",
  "telephone": "[Phone]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street]",
    "addressLocality": "Hannover",
    "postalCode": "[ZIP]",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 52.3759,
    "longitude": 9.7320
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "06:30",
      "closes": "21:00"
    }
  ],
  "priceRange": "$$"
}
```

**For FAQ sections, add FAQPage schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer]"
      }
    }
  ]
}
```

---

## 📤 Output Format

### Part 1: SEO Metadata

```markdown
# SEO-Optimized Page Configuration

## Topic Analysis
- **Main Keyword**: [keyword]
- **Target URL**: [url]
- **Search Intent**: [informational/commercial/transactional]
- **Competition Level**: [low/medium/high]
- **Local SEO**: [yes/no] ([location])

## Meta Tags

### Title Tag (X chars)
[Optimized title 50-60 characters]

### Meta Description (X chars)
[Optimized description 150-160 characters]

### Open Graph Tags
- og:title: [Title]
- og:description: [Description]
- og:image: [Suggested image URL]
- og:url: https://gym.exopek.de[url]

### Additional Meta
- Canonical: https://gym.exopek.de[url]
- Language: de
- Geo Region: DE-NI (Hannover)
- Robots: index, follow

## Keywords
- **Primary**: [main keyword] (target: 5-8x)
- **Secondary**: [keyword 2] (3-5x), [keyword 3] (3-5x)
- **Long-tail**: [long-tail 1], [long-tail 2], [long-tail 3]
- **LSI/Semantic**: [related 1], [related 2], [related 3]
- **Location**: [city], [district], [region] (if applicable)

## Structured Data (JSON-LD)
```json
[Schema.org structured data]
```
```

### Part 2: Section Configuration

```markdown
## Page Structure (X Sections)

### Section 1: Hero
**Component**: Hero.vue
**Purpose**: First impression, main value proposition, primary CTA
**SEO Focus**: H1 with main keyword, compelling subheadline

**Props Configuration:**
```json
{
  "headline": "[H1 with main keyword - HTML allowed for <span> highlights]",
  "subheadline": "[Compelling description with secondary keywords]",
  "primaryCtaText": "[Action-oriented CTA]",
  "primaryCtaUrl": "[URL or anchor]",
  "secondaryCtaText": "[Secondary action]",
  "secondaryCtaUrl": "[URL]",
  "heroImage": "https://images.unsplash.com/[suggested-image]",
  "heroImageAlt": "[SEO-optimized alt text with keyword]",
  "showStats": true,
  "statistics": [
    {
      "value": [number],
      "label": "[Metric name]",
      "suffix": "[+/%/etc]",
      "variant": "minimal"
    }
  ],
  "showTrustIndicators": true,
  "trustIndicators": [
    "[Trust badge 1]",
    "[Trust badge 2]",
    "[Trust badge 3]"
  ],
  "backgroundColor": "#0f0f0f"
}
```

**Content Notes:**
- H1 includes main keyword naturally
- Subheadline addresses user pain point
- Stats provide social proof
- Trust indicators build credibility

---

### Section 2: USPGrid
**Component**: USPGrid.vue
**Purpose**: Highlight key benefits and differentiators
**SEO Focus**: H2 with secondary keyword, benefit-focused descriptions

**Props Configuration:**
```json
{
  "tagline": "[Eyebrow text]",
  "headline": "[H2 with secondary keyword]",
  "description": "[Supporting text with LSI keywords]",
  "columns": "3",
  "backgroundColor": "white",
  "showCta": false
}
```

**Child Components (USPCard slots):**
[Provide 3-6 USP cards with icons, titles, descriptions]

---

[Continue for all selected sections...]

---

### Section N: CTA
**Component**: CTA.vue
**Purpose**: Final conversion push
**SEO Focus**: Reinforce main benefit, strong action

**Props Configuration:**
```json
{
  "headline": "[Urgent, benefit-focused headline]",
  "description": "[Final persuasive message]",
  "primaryCtaText": "[Strong action verb]",
  "primaryCtaUrl": "[Contact/booking URL]",
  "showSecondaryButton": true,
  "secondaryCtaText": "[Low-commitment option]",
  "secondaryCtaUrl": "[Info URL]",
  "backgroundColor": "#f97316"
}
```
```

### Part 3: Implementation Guide

```markdown
## Builder.io Implementation Steps

### Step 1: Create New Page in Builder.io
1. Go to Builder.io dashboard
2. Click "New" → "Page"
3. Set URL path: `[target-url]`
4. Set page title: `[meta title]`

### Step 2: Add Meta Data
In Page Settings:
1. Title: `[meta title]`
2. Description: `[meta description]`
3. Custom Code → Add to `<head>`:
```html
[All meta tags and structured data]
```

### Step 3: Add Sections (Drag & Drop)

**Section 1: Hero**
1. Drag "Hero" component to canvas
2. Configure props (see Section 1 config above)
3. Copy-paste headline, subheadline, etc.
4. Upload hero image or use suggested URL
5. Configure CTAs

**Section 2: USPGrid**
1. Drag "USPGrid" component
2. Configure header (tagline, headline, description)
3. For each USP card:
   - Add USPCard child component
   - Set title, description, variant
   - Add icon (provide SVG path or use icon library)

[Continue for all sections...]

### Step 4: SEO Checklist
- [ ] Meta title set (50-60 chars)
- [ ] Meta description set (150-160 chars)
- [ ] Canonical URL configured
- [ ] Open Graph tags added
- [ ] Structured data (JSON-LD) added to <head>
- [ ] H1 contains main keyword
- [ ] H2s contain secondary keywords
- [ ] Images have alt text with keywords
- [ ] Internal links added where relevant
- [ ] Primary CTA above the fold
- [ ] Mobile-responsive (test in preview)
- [ ] Page speed optimized (compress images)

### Step 5: Publish & Monitor
1. Click "Publish"
2. Test live URL: `https://gym.exopek.de[url]`
3. Submit to Google Search Console
4. Monitor rankings for target keywords
5. Track conversions (CTAs, form submissions)

---

## SEO Content Guidelines

### Keyword Usage Best Practices

**Main Keyword Usage** (5-8x on page):
- H1 (required)
- H2 (1-2x)
- First paragraph
- Image alt text
- Meta description
- URL slug
- Natural mentions in content

**Avoid Keyword Stuffing**:
- ❌ "Functional Training in Hannover. Functional Training Hannover Linden. Best Functional Training."
- ✅ "Functional Training in Hannover Linden – Starte dein effektives Workout in unserem modernen Gym."

**Use Variations**:
- Functional Training → Functional Fitness, Funktionelles Training, Functional Workout
- Hannover → Hannover Linden, Region Hannover, Niedersachsen
- Gym → Fitnessstudio, Studio, Trainingscenter

### Headline Formulas (SEO-Optimized)

**H1 Templates**:
- `[Keyword] in [Location] – [Unique Benefit]`
- `[Keyword] – [Number] [Benefits/Reasons] für [Target Audience]`
- `[Keyword]: [Solution] für [Problem]`
- `Dein [Keyword] in [Location] | [Unique Feature]`

**Examples**:
- "Functional Training in Hannover Linden – Starte kraftvoll in den Tag"
- "7-Wochen Transformation – Erreiche deine Fitnessziele garantiert"
- "HIIT Morgentraining: Die perfekte Lösung für Berufstätige"

**H2 Templates**:
- `Warum [Secondary Keyword] die beste Wahl ist`
- `[Number] Vorteile von [Topic]`
- `So funktioniert [Topic] bei uns`
- `Was macht [Topic] so effektiv?`

**Examples**:
- "Warum EXOPEK Functional Training so effektiv ist"
- "5 Gründe für Morgentraining vor der Arbeit"
- "So läuft dein erstes Training ab"

### Content Structure

**First Paragraph** (critical for SEO):
- Include main keyword in first 100 words
- Address user's search intent immediately
- Provide clear value proposition
- Keep under 3 sentences
- Example: "Functional Training in Hannover Linden bei EXOPEK kombiniert hochintensives HIIT mit funktionellen Bewegungen. Unser innovatives Konzept ermöglicht dir effektive Workouts ab 6:30 Uhr – perfekt vor der Arbeit. Erreiche mehr in kürzerer Zeit."

**Paragraph Length**:
- 2-3 sentences max
- Use bullet points for lists
- Break up long text blocks
- Add visual breaks with images/icons

**CTA Best Practices**:
- Action verbs: "Starten", "Buchen", "Entdecken", "Sichern"
- Create urgency: "Jetzt", "Heute noch", "Limitiert"
- Benefit-focused: "Gratis Probetraining", "Kostenlose Beratung"
- Specific: "Probetraining buchen" > "Mehr erfahren"

### Local SEO Optimization

**For Location-Based Pages** (e.g., Hannover, Linden):

**Include in Content**:
- City name: Hannover (3-5x)
- District: Linden (2-3x)
- Region: Niedersachsen, Region Hannover (1-2x)
- Landmarks: "Nähe Lindener Markt", "Zentral in Linden-Mitte"
- Public transport: "2 Min vom Küchengarten", "U-Bahn Linie 9"

**Local Schema Markup**:
- LocalBusiness type
- Full address
- Geo coordinates
- Opening hours
- Phone number
- Price range

**Local Keywords**:
- "[Service] Hannover"
- "[Service] Linden"
- "[Service] Hannover Linden"
- "Fitnessstudio Linden"
- "Gym Hannover"

---

## 🎨 Content Examples by Section Type

### Hero Section Example (Functional Training Hannover)

```json
{
  "headline": "Functional Training in <span class=\"text-gradient-warm\">Hannover Linden</span> – Starte kraftvoll in den Tag",
  "subheadline": "EXOPEK Functional Training ab 6:30 Uhr: Hochintensiv, effektiv, perfekt für Berufstätige. Kombiniere HIIT mit funktionellen Bewegungen für maximale Ergebnisse in kürzester Zeit.",
  "primaryCtaText": "Kostenloses Probetraining",
  "primaryCtaUrl": "#probetraining",
  "secondaryCtaText": "EXOPEK kennenlernen",
  "secondaryCtaUrl": "#konzept",
  "heroImage": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
  "heroImageAlt": "Functional Training im EXOPEK Gym Hannover Linden mit HIIT Workout",
  "showStats": true,
  "statistics": [
    { "value": 6, "label": "Uhr Kursbeginn", "suffix": ":30", "variant": "minimal" },
    { "value": 45, "label": "Minuten Training", "suffix": "min", "variant": "minimal" },
    { "value": 100, "label": "Teilnehmer Zufriedenheit", "suffix": "%", "variant": "minimal" }
  ],
  "showTrustIndicators": true,
  "trustIndicators": [
    "EXOPEK zertifiziert",
    "Zentral in Linden",
    "Kleine Gruppen (max. 12)"
  ],
  "backgroundColor": "#0f0f0f"
}
```

**SEO Notes**:
- Main keyword "Functional Training" in H1
- Location "Hannover Linden" prominent
- Secondary keywords: HIIT, funktionelle Bewegungen, Berufstätige
- Stats build credibility
- Trust indicators address concerns (location, quality, group size)

### USPGrid Example (3 columns)

```json
{
  "tagline": "Deine Vorteile",
  "headline": "Warum Functional Training bei EXOPEK?",
  "description": "Entdecke die einzigartigen Vorteile von EXOPEK Functional Training in Hannover Linden – effektiv, zeitsparend, nachhaltig.",
  "columns": "3",
  "backgroundColor": "white",
  "showCta": false
}
```

**USP Cards** (3):
```json
[
  {
    "title": "Morgentraining ab 6:30 Uhr",
    "description": "Starte energiegeladen in den Tag mit unserem Functional Training vor der Arbeit. Perfekt für Berufstätige in Hannover.",
    "variant": "primary",
    "iconPath": "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4..."
  },
  {
    "title": "EXOPEK Konzept – Maximal effizient",
    "description": "Nur 45 Minuten pro Session. HIIT kombiniert mit funktionellem Krafttraining für schnelle, nachhaltige Resultate.",
    "variant": "gradient",
    "badge": "Exklusiv"
  },
  {
    "title": "Kleine Gruppen, große Erfolge",
    "description": "Maximal 12 Teilnehmer pro Kurs. Persönliche Betreuung durch zertifizierte Trainer garantiert Technik und Sicherheit.",
    "variant": "primary"
  }
]
```

### FAQ Example (SEO-optimized questions)

```json
{
  "headline": "Häufig gestellte Fragen zu Functional Training",
  "description": "Alles was du über EXOPEK Functional Training in Hannover Linden wissen musst.",
  "backgroundColor": "#ffffff",
  "faqs": [
    {
      "question": "Was ist Functional Training?",
      "answer": "Functional Training ist ein ganzheitliches Trainingskonzept, das alltagsnahe Bewegungen trainiert. Bei EXOPEK kombinieren wir funktionelle Übungen mit HIIT für maximale Effizienz. Statt isolierter Muskeln trainierst du Bewegungsmuster – für Kraft, Ausdauer und Beweglichkeit."
    },
    {
      "question": "Warum Morgentraining vor der Arbeit?",
      "answer": "Morgentraining ab 6:30 Uhr steigert deine Energie und Konzentration für den ganzen Tag. Du startest produktiv, hast dein Workout erledigt und fühlst dich mental und körperlich fit. Perfekt für Berufstätige in Hannover Linden."
    },
    {
      "question": "Ist Functional Training für Anfänger geeignet?",
      "answer": "Ja! Unsere Trainer passen jede Übung an dein Level an. In kleinen Gruppen (max. 12 Teilnehmer) bekommst du individuelle Betreuung. Wir zeigen dir die richtige Technik von Grund auf."
    },
    {
      "question": "Was macht EXOPEK Functional Training besonders?",
      "answer": "EXOPEK ist ein innovatives Trainingssystem aus der Schweiz, exklusiv in Hannover bei uns verfügbar. Es kombiniert einen speziellen Trainingsrucksack mit funktionellen HIIT-Workouts für maximale Intensität in nur 45 Minuten."
    },
    {
      "question": "Wo liegt euer Gym in Hannover?",
      "answer": "Wir sind zentral in Hannover Linden gelegen, nur 2 Minuten vom Küchengarten entfernt. Perfekt erreichbar vor oder nach der Arbeit mit U-Bahn Linie 9 oder dem Auto (Parkplätze vorhanden)."
    }
  ]
}
```

**SEO Benefits**:
- Each Q&A targets a long-tail keyword
- Natural keyword variations (Functional Training, HIIT, Morgentraining)
- Location mentioned (Hannover Linden)
- Addresses search intent (what, why, who, where)
- Perfect for FAQPage schema markup

### CTA Example (Final conversion)

```json
{
  "headline": "Bereit für dein erstes Functional Training?",
  "description": "Sichere dir jetzt dein kostenloses Probetraining und erlebe EXOPEK Functional Training in Hannover Linden. Starte noch heute!",
  "primaryCtaText": "Jetzt Probetraining buchen",
  "primaryCtaUrl": "/probetraining",
  "showSecondaryButton": true,
  "secondaryCtaText": "Fragen? Ruf uns an",
  "secondaryCtaUrl": "tel:+49123456789",
  "backgroundColor": "#f97316",
  "variant": "centered"
}
```

---

## ✅ SEO Quality Checklist

Before delivering the page configuration, verify:

**Content Quality**:
- [ ] Main keyword appears 5-8x naturally
- [ ] Secondary keywords distributed throughout
- [ ] No keyword stuffing (reads naturally)
- [ ] Headlines follow logical hierarchy (H1 → H2 → H3)
- [ ] First paragraph includes main keyword
- [ ] Content length: 800+ words (combined sections)
- [ ] Benefits clearly communicated
- [ ] Pain points addressed
- [ ] CTAs are specific and action-oriented

**Technical SEO**:
- [ ] Meta title: 50-60 characters
- [ ] Meta description: 150-160 characters
- [ ] URL is clean and includes keyword
- [ ] Image alt texts include keywords
- [ ] Structured data (JSON-LD) provided
- [ ] Internal linking suggestions made
- [ ] Mobile-friendly (all components responsive)
- [ ] Page speed considerations (image URLs optimized)

**Local SEO** (if applicable):
- [ ] Location in title tag
- [ ] Location in H1 or prominent H2
- [ ] City/district mentioned 3-5x
- [ ] LocalBusiness schema included
- [ ] Address information provided
- [ ] Opening hours mentioned
- [ ] Directions/transport info included

**Conversion Optimization**:
- [ ] Primary CTA above the fold (Hero)
- [ ] Multiple CTAs throughout page
- [ ] Social proof included (stats, testimonials)
- [ ] Trust indicators present
- [ ] FAQ addresses objections
- [ ] Final CTA with urgency
- [ ] Low-commitment option offered (secondary CTA)

---

## 🚀 Implementation Instructions

### For the AI Assistant:

When executing this command:

1. **Parse Input**:
   - Extract topic/keyword from arguments
   - Extract target URL
   - Identify if local SEO applies (Hannover, Linden, etc.)

2. **Perform SEO Analysis**:
   - Use WebSearch to research keywords
   - Identify main + secondary + long-tail keywords
   - Determine search intent
   - Find semantic keywords (LSI)

3. **Select Components**:
   - Choose 5-8 sections from available Design System components
   - Follow typical structure: Hero → Features/USP → Proof → FAQ → CTA
   - Adapt based on topic and intent

4. **Generate Content**:
   - Create SEO-optimized text for each section
   - Include keywords naturally
   - Focus on benefits and user value
   - Write compelling headlines and CTAs

5. **Create Meta Tags**:
   - Title: 50-60 chars, includes main keyword + location + brand
   - Description: 150-160 chars, includes keyword + benefits + CTA
   - All OG and Twitter tags
   - Structured data (JSON-LD)

6. **Format Output**:
   - Part 1: SEO Metadata
   - Part 2: Section-by-section configuration with full JSON
   - Part 3: Builder.io implementation guide
   - Include SEO checklist

7. **Quality Check**:
   - Verify keyword density (1-2%)
   - Check character counts (title, description)
   - Ensure natural language
   - Confirm all sections have complete props

---

## 💡 Examples by Topic Type

### Example 1: Service Page (Functional Training)
**Input**: `Functional Training Hannover /functional-training`

**Sections**:
1. Hero - Main value prop, morning training USP
2. USPGrid - 3 key benefits (time, location, effectiveness)
3. AlternatingFeatures - How it works (EXOPEK concept)
4. StatisticGrid - Social proof numbers
5. ScheduleSection - Class times
6. FAQ - Answer common questions
7. CTA - Book trial training

**Keywords**: functional training (7x), hannover (5x), linden (3x), hiit (4x), morgentraining (3x)

---

### Example 2: Program Page (7-Wochen Transformation)
**Input**: `7 Wochen Transformation Abnehmen /transformation-programm`

**Sections**:
1. Hero - Program promise, results guarantee
2. Timeline - 7-week breakdown
3. FeatureGrid - Program components (training, nutrition, support)
4. StatisticGrid - Success metrics (94% success rate, 8kg avg loss)
5. ComparisonTable - With vs. without program
6. FAQ - Program details
7. CTA - Start now, limited spots

**Keywords**: 7 wochen transformation (6x), abnehmen (5x), fitnessprogramm (4x), transformation programm (4x)

---

### Example 3: Location Page (Gym Linden)
**Input**: `Fitnessstudio Hannover Linden /gym-linden`

**Sections**:
1. HeroImage - Gym exterior/interior, location highlight
2. USPGrid - Location benefits, equipment, atmosphere
3. GalleryGrid - Gym photos
4. ScheduleSection - Opening hours, class schedule
5. ContentSection48 - About the gym, trainer team
6. FAQ - Membership, parking, trial
7. CTA - Visit us, book tour

**Keywords**: fitnessstudio hannover (6x), gym linden (5x), hannover linden (4x), exopek (4x)

---

## 🎯 Final Notes

**Remember**:
- Quality over quantity (natural content > keyword stuffing)
- User value first, SEO second (but achieve both)
- Mobile-first (all sections must be responsive)
- Conversion-focused (every section should lead somewhere)
- Brand voice consistent (energetic, professional, local)

**Builder.io Specific**:
- All content is editable in Builder.io after creation
- Images should use Unsplash URLs or be uploaded
- Test in preview mode before publishing
- Monitor and iterate based on performance

**SEO Timeline**:
- Indexing: 1-3 days (submit to Search Console)
- Initial ranking: 2-4 weeks
- Mature ranking: 3-6 months
- Track keywords monthly, adjust content as needed

---

Now generate a complete SEO-optimized page based on the provided topic and URL! 🚀
