# RESOURCE**RIA** — Project Blueprint
> *For all your Academic Needs*

**Document Type:** Developer Handoff & Project Blueprint  
**Purpose:** Complete reference guide for building ResourceRIA from scratch

---

## What is ResourceRIA?

ResourceRIA is a college academic resource hub — a one-stop website where students can access and share study materials organized by year and branch. The platform is student-driven, meaning students themselves can contribute notes and resources for fellow learners.

**Core capabilities for students:**
- Find study materials, notes, and PYQs filtered by Year and Branch
- Learn programming languages through structured week-by-week guides
- Follow tech roadmaps to master skills like Web Dev, AI/ML, App Dev, etc.
- Check their class timetable
- Calculate their SGPA / CGPA
- Contribute resources to help fellow students

---

## Tech Stack

> ✅ No backend needed. All data is hardcoded/static JSON inside the React app.

| What | Technology | Notes |
|------|------------|-------|
| Frontend Framework | React.js (v18) | Core UI framework |
| Build Tool | Vite | Fast dev & build |
| Routing | React Router DOM v6 | Client-side navigation |
| Styling | Plain CSS (custom) | No UI library needed |
| Analytics | Vercel Analytics | Free, zero-config |
| Code Quality | ESLint | Linting & formatting |
| Deployment | Vercel (free tier) | Automatic CI/CD |
| Language | JavaScript (ES6+) | No TypeScript needed |

---

## Folder Structure

```
resourceRIA/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ComingSoon.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Resources.jsx
│   │   ├── YearResources.jsx
│   │   ├── Languages.jsx
│   │   ├── Roadmaps.jsx
│   │   ├── TimeTable.jsx
│   │   ├── GPACalculator.jsx
│   │   └── AboutUs.jsx
│   ├── data/
│   │   ├── resources.js      ← subject data per year/branch
│   │   ├── languages.js      ← language course data
│   │   └── roadmaps.js       ← roadmap data
│   ├── App.jsx               ← Route definitions
│   ├── main.jsx              ← Entry point
│   └── index.css             ← Global styles + CSS variables
├── index.html
├── package.json
├── vite.config.js
└── vercel.json               ← SPA redirect rules
```

> **Key rule:** All subject/resource data lives in the `data/` folder as plain JS objects, not hardcoded in components. This makes updating content very easy.

---

## Routing Structure

| URL Path | Page / Component |
|----------|-----------------|
| `/` | Home Page |
| `/resources` | Resources — Year selector |
| `/resources/year1` | Year 1 resources (with branch dropdown) |
| `/resources/year2` | Year 2 resources |
| `/resources/year3` | Year 3 resources |
| `/resources/year4` | Year 4 resources |
| `/languages` | Programming Language courses |
| `/roadmaps` | Tech roadmaps |
| `/timetable` | Timetable (Coming Soon) |
| `/gpa-calculator` | GPA Calculator |
| `/about-us` | About Us / Team |

> **Tip:** Add a `vercel.json` with a rewrite rule so direct URL access works:
> ```json
> { "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
> ```

---

## Pages — Detailed Breakdown

### 1. Home Page ( `/` )

The landing page has 5 distinct sections:

#### A — Hero Section
- Full-width centered section on white background
- Heading: `RESOURCE` in dark navy + `RIA` in blue (#2196F3)
- Subheading: *"For all your Academic Needs"* in grey, italic

#### B — Browse by Year
- Light blue (`#E1F5FE`) background section
- 4 large clickable buttons in a row: Year 1, Year 2, Year 3, Year 4
- Each button shows the number of branches available
- Clicking a button navigates to the `/resources` page

#### C — Feature Cards (2 side-by-side)
- **GPA Calculator Card** — title, short description, button linking to `/gpa-calculator`
- **Time Table Card** — title, short description, button linking to `/timetable`

#### D — Footer
- Club/team name + tagline
- Social icons: Instagram, LinkedIn, GitHub
- Text: *"Made with 💙 By [Club Name] Team"*

#### E — Sticky Bottom Banner
- Yellow/cream background (`#FFF9C4`) — always visible at the bottom
- Text: *"Resources are still being added! Want to contribute?"*
- "Contribute Here" link → Google Form URL

---

### 2. Resources Page ( `/resources` )

- Heading: "Select Year"
- 2×2 grid of 4 cards — one per year
- Each card shows: Year number, branch count in blue, list of available branches
- Clicking a card navigates to `/resources/yearX`

**Recommended branch counts:**
- Year 1 → 5 branches (common pool groups)
- Year 2, 3, 4 → All branches your college offers (typically 10–20)

---

### 3. Year Resources Page ( `/resources/year2` )

- Heading: "Resources Year 2"
- Branch Dropdown in top-right — switches between branches
- URL updates like: `/resources/year2?branch=Computer+Engineering`
- Shows all subjects + their resources for the selected branch and year
- Resource link types: PDF links, YouTube links, Google Drive links

> **Data tip:** Store all subject and resource data in `resources.js` as a nested JS object structured as:
> `year → branch → subjects → links`
> Components just read from this object.

---

### 4. Languages Page ( `/languages` )

- Heading: "Let's Start"
- Grid of 5 language cards (2 rows)

| Language | Duration | Topics Covered |
|----------|----------|----------------|
| C Programming | 8 Weeks | Variables, Data Types, Pointers, Arrays, Functions, Structures, File I/O |
| C++ Programming | 8 Weeks | OOP, Classes & Objects, STL, Templates, Pointers, File Handling |
| Python | 8 Weeks | Syntax, OOP, Libraries, Data Structures, Web Dev, ML Basics |
| JavaScript | 8 Weeks | DOM, ES6, Functions, Async, Events, Fetch, Frameworks |
| Java | 8 Weeks | OOP, JVM, Collections, Exception Handling, Streams, Multithreading |

Each card has: Language name, duration label (grey), topics in blue, "Start Now" link.

---

### 5. Roadmaps Page ( `/roadmaps` )

- Heading: "Road Maps"
- Grid of 7 roadmap cards, each with a "Start Now" link

| Roadmap | Duration | Key Topics |
|---------|----------|------------|
| Web Development | 8 Weeks | HTML, CSS, JS, React, Node.js, Express.js |
| DSA | 17 Weeks | Arrays, Trees, Graphs, DP, Greedy, Sorting |
| AI & Machine Learning | 6 Weeks | Python, NumPy, Pandas, Scikit-learn, Neural Networks |
| Game Development | 6 Weeks | Unity, C#, Unreal Engine, Game Design, Physics |
| UI/UX Design | 6 Weeks | Figma, Prototyping, User Flow, Accessibility, Design Systems |
| App Development | 6 Weeks | Flutter, Dart, Android Studio, Firebase, Native APIs |
| Blockchain | 6 Weeks | Solidity, Smart Contracts, Ethereum, Web3.js, Metamask |

---

### 6. Timetable Page ( `/timetable` )

Two options — pick one:
- **Option A:** Build a full interactive timetable as a mini-project
- **Option B *(recommended to launch first)*:** Show a reusable Coming Soon page

**Coming Soon page design:**
- Centered illustration (delivery-man SVG or similar free asset)
- Heading: *"We're running a little late — but we'll be there soon"*
- Subtext: *"Got what we're missing? Share it and help us deliver to everyone."*
- CTA button: "Contribute here" → Google Form link

---

### 7. GPA Calculator Page ( `/gpa-calculator` )

Planned feature *(can be Coming Soon initially, then added)*:
- Input rows: Subject name, Credits, Grade per subject
- Dynamic "Add Subject" button for multiple rows
- SGPA calculation for current semester
- Previous SGPA inputs to calculate cumulative CGPA
- Clear, styled result display

---

### 8. About Us Page ( `/about-us` )

- Club/team name and description
- Team member cards with photos and roles
- Social links for each member
- Can also launch as Coming Soon initially

---

## UI / Design Guide

### Color Palette

| Element | Hex Code | Usage |
|---------|----------|-------|
| Primary Blue (accent) | `#2196F3` / `#29B6F6` | Buttons, highlights, links |
| Light Blue Background | `#E1F5FE` / `#B3E5FC` | Section backgrounds |
| Dark Navy Text | `#1A237E` / `#0D1B2A` | Headings, main text |
| White | `#FFFFFF` | Card backgrounds, body |
| Yellow Banner | `#FFF9C4` | Sticky contribute banner |

### Typography
- **Font:** Inter or Poppins (Google Fonts) — or system sans-serif
- **Two-tone headings:** First word in dark navy, second word in blue
  - Example: `Select` (dark) + `Year` (blue)
- Bold and large for section headings, regular weight for body

### Component Style Rules
- **Cards:** white background, light border, `border-radius: 12px`, subtle `box-shadow`
- **Buttons:** blue background, white text, rounded corners, hover effect (darken)
- **Navbar:** light blue background, bold active link state
- **Grid layout:** 4 columns desktop → 2 columns tablet → 1 column mobile (CSS Grid)

### Dark Mode
- Toggle button in navbar (moon/sun icon)
- Use React `useState` + CSS variables (or add/remove a `.dark` class on `<body>`)
- Define CSS variables like `--bg-color`, `--text-color` that switch values under `.dark`
- All components read from CSS variables — toggling `.dark` switches the entire site

---

## Developer Checklist

### Core Setup
- [ ] Initialize project: `npm create vite@latest resourceria -- --template react`
- [ ] Install dependencies: `react-router-dom`, `eslint`
- [ ] Set up Vercel project and connect to GitHub repo
- [ ] Add `vercel.json` with SPA rewrite rule
- [ ] Add Vercel Analytics

### Pages to Build
- [ ] Navbar with all page links + dark mode toggle + logo
- [ ] Footer with social links (Instagram, LinkedIn, GitHub)
- [ ] Home: hero section + Browse by Year buttons
- [ ] Home: GPA Calculator card + Time Table card
- [ ] Sticky bottom banner with Contribute Google Form link
- [ ] Resources page: Year cards with branch lists
- [ ] Year-wise resource pages with Branch dropdown
- [ ] 5 Language course cards with topics + Start Now links
- [ ] 7 Roadmap cards with topics + Start Now links
- [ ] Reusable `<ComingSoon />` component for unfinished pages
- [ ] Timetable page (Coming Soon initially)
- [ ] GPA Calculator (Coming Soon → then build it)
- [ ] About Us page

### Quality & Polish
- [ ] Dark mode toggle working across all pages
- [ ] Mobile responsive (test on 375px, 768px, 1280px)
- [ ] All links working — no broken routes
- [ ] Data in `data/` folder, not hardcoded in components
- [ ] ESLint passing with no errors
- [ ] Deployed on Vercel — live URL working

---

## Future Features (Post-Launch)

- Donate option for supporting the platform
- Advanced search across all resources
- Full interactive timetable builder
- GPA Calculator with semester history
- AI Helper (Ask RIA) — helps users find notes quickly
- Firebase integration for user uploads & admin approval workflow
- Admin panel to approve/reject student-contributed resources

---

## One-Line Summary

> *"A clean, student-driven platform to access and share academic resources efficiently."*

**Build it. Ship it. Help your college.** 🚀