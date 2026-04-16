1

Project Purpose & Audience
I built this single-page portfolio to introduce myself, show what I’m good at, and give people an easy way to contact me. It’s meant for recruiters, potential clients, fellow students and anyone interested in my work.




2

File Structure & Asset Management

/ (root)
├─ index.html          ← all markup
├─ style.css           ← optional external copy of the CSS
├─ script.js           ← interactive code
├─ assets/
│   ├─ images/        ← photos, certificates, project screenshots
│   └─ icons/         ← Font Awesome & Devicon 
└─ README.md          ← this document

All external fonts and icons are pulled from CDNs, so the page stays lightweight and benefits from browser caching.




3

Human-Computer Interaction Principles Applied

Principle	How I used it

Consistency	Same button styles, same colours everywhere.
Feedback	Hover sweeps, cursor ring expansion, cards lift on hover.
Affordance	Clickable items have a minimum 44 × 44 dp hit area and show a pointer on desktop.
Visibility	Sticky top bar stays visible; mobile bar appears at the bottom on small screens.
Error Prevention	External links open in a new tab (target="_blank").
Flexibility	Works with mouse, keyboard, screen readers, and respects prefers-reduced-motion.





4

Theme Engine – CSS Variables

:root {
  --bg:            #0A0A0A;
  --surface:       #141414;
  --text-primary:  #ECECEC;
  --text-secondary:#9CA3AF;
  --accent:        #3B82F6;
  --accent-glow:   rgba(59,130,246,.12);
  --border:        #2A2A2A;
  --transition:    all .3s cubic-bezier(0.16,1,0.3,1);
}

Changing a value here updates the whole site, and a future light-mode toggle could simply overwrite these variables at runtime.




5

Typography System

Body – Inter, 1rem, 400 weight, normal line-height

Headings, buttons, tags – Space Mono, sizes vary, 400–700 weight

Hero name – font-size: clamp(3rem,10vw,5rem);

Tagline – Inter, 1.2rem, secondary colour


All text meets WCAG AA contrast.




6

Global Reset & Base Styles

* {margin:0;padding:0;box-sizing:border-box;}
html {scroll-behavior:smooth;}
body {
  background:var(--bg);
  color:var(--text-primary);
  font-family:'Inter',sans-serif;
  line-height:1.6;
  -webkit-font-smoothing:antialiased;
  overflow-x:hidden;
}




7

Custom Cursor

Two empty <div> elements (.cursor-dot and .cursor-ring) sit at the top of the body. CSS draws a small blue dot and a larger ring that expands when hovering. JavaScript tracks mouse movement and animates it smoothly. On touch devices the cursor is hidden.




8

Hero Section Layout & Content

The hero uses a CSS Grid:

Left column – image with gradient overlay

Right column – greeting, name animation, typewriter roles, tagline, bio, and CTA buttons


Below 1024px it stacks into one column.




9

Typewriter Animation

CSS creates a blinking caret, while JavaScript cycles through roles like:

BSc Computer Science Student

Java & C++ Tutor

Tech Consultant

Problem Solver





10

Falling Name Animation

Each letter of the name is wrapped in a <span> and animated with a staggered delay to create a falling effect.




11

Sticky Navigation Bar

The navbar stays at the top with a blurred background. Links highlight on hover and when active.




12

Central Container

All sections are wrapped in a container with max-width 1200px and centered alignment.




13

About Section

Two-column layout with text and image. Collapses into one column on smaller screens.




14

Timeline Cards

Styled cards show education and experience with accent-colored dates and arrow-style list items.




15

Skills Grid & Tags

Skills are displayed as pill tags with icons. Hover adds glow and slight lift.




16

Services Grid

Three cards with image, title, price, and description. Responsive layout adjusts across devices.




17

Projects Grid & Data Injection

Projects are stored in a JavaScript array and dynamically rendered into the page.




18

Certificates & CV Section

Clickable cards open images in a modal. CV includes view and download options.




19

Contact Grid

Cards for WhatsApp, email, LinkedIn, and GitHub. Each opens in a new tab.




20

Modal Viewer

Displays images in a fullscreen overlay. Can be closed via button, outside click, or Esc key.




21

Mobile Navigation

Bottom navigation bar appears on smaller screens with icons.




22

Scroll Reveal & Animations

Elements fade and slide into view using IntersectionObserver and stagger effects.




23

Performance Optimisations

Lazy loading images

GPU-friendly animations

Minified CSS

CDN usage

Reduced motion support planned





24

Extending & Maintaining the Codebase

GitHub for version control

Linting with stylelint and eslint

AI tools for assistance

Easy updates via reusable components





25

Deployment Checklist

1. Minify CSS and JS


2. Deploy via GitHub Pages / Netlify / Vercel


3. Use HTTPS


4. Add security headers


5. Cache busting






26

Future Enhancements

Theme toggle

Progressive Web App

AI-generated descriptions

JSON-based skill loader





27

Testing, Accessibility & Compatibility

WCAG AA contrast

Keyboard navigation

Screen reader support

Reduced motion planning

Cross-browser testing





28

References & Resources

HTML, CSS, JavaScript source files

Google Fonts (Inter, Space Mono)

Font Awesome, Devicon

HCI lecture slides

DeepSeek AI (linting configs)

ChatGPT & Gemini AI

YouTube “Bro Code”
