# 🎓 Student Management System

A modern, responsive student management application built with **React 19**, **TypeScript**, and **Tailwind CSS 4**. Features a beautiful glassmorphism design with dark mode support, keyboard shortcuts, and persistent local storage — providing an elegant and accessible interface for managing student data.

![React 19](https://img.shields.io/badge/React-19.2.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## ✨ Features

### 🎨 Modern UI/UX

- **Glassmorphism Design** — Frosted-glass card surfaces with backdrop blur and subtle borders
- **Dark Mode** — Seamless dark/light theme toggle with smooth cross-fade transitions (sun/moon icon)
- **Responsive Layout** — Optimized for desktop, tablet, and mobile viewports
- **Per-Student Accent Hues** — Each student card gets a deterministic HSL colour derived from their name
- **Staggered Animations** — Cards animate in with a cascading delay for a polished entrance
- **Animated Background** — Pulsing gradient orbs with a subtle dot-grid pattern overlay

### 📊 Student Management

- **CRUD Operations** — Create, read, update, and delete student records
- **Real-Time Search** — Instantly filter students by name as you type (press `/` to focus the search bar)
- **Smart Sorting** — Sort by name, age, or year with ascending/descending toggle in a segmented-control UI
- **Reset Filters** — One-click reset of all active search/sort state
- **Data Validation** — Form validation with user-friendly inline error messages

### ⌨️ Keyboard Shortcuts

| Key        | Action                |
| ---------- | --------------------- |
| `/`        | Focus the search bar  |
| `C`        | Open add-student form |
| `Escape`   | Close any modal       |
| `Enter`    | Edit a student card   |
| `Space`    | Edit a student card   |

### ♿ Accessibility

- **Focus Traps** — All modals trap keyboard focus to prevent tab leakage
- **Focus Restoration** — Focus returns to the trigger element after closing a modal
- **`inert` Attribute** — Main page content is pulled out of the focus order when a modal is open
- **`aria-*` Attributes** — Proper roles, labels, and states throughout
- **`motion-reduce`** — Respects the user's reduced-motion preference

### 🛠 Technical Highlights

- **Custom Hooks Architecture** — Logic extracted into reusable hooks (`useAppState`, `useFilterState`, `useFocusTrap`, `useRestoreFocus`, `useGlobalKeydown`, `useLocalStorage`, `useBodyScrollLock`)
- **Local Storage Persistence** — Student data survives page reloads via `useLocalStorage`
- **TypeScript Throughout** — Full type safety with strict mode
- **Component Composition** — Small, single-responsibility components composited into larger ones
- **Modular Utility Functions** — Separated filter, sort, validation, and student-creation logic
- **Commit Hooks** — Husky + commitlint + lint-staged for code quality enforcement

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/HamedSadim1/labo4-filtering.git
cd labo4-filtering

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview   # Preview the production build locally
```

The built files will be in the `dist/` directory.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── buttons/
│   │   ├── ActionButton.tsx      # Primary/danger action button
│   │   ├── CancelButton.tsx      # Secondary cancel button
│   │   └── IconButton.tsx        # Reusable icon button
│   ├── controls/
│   │   ├── AddStudentButton.tsx  # "Add Student" primary CTA
│   │   ├── ControlBar.tsx        # Search + sort + add toolbar
│   │   ├── SearchBar.tsx         # Real-time search input with / shortcut
│   │   └── SortButtons.tsx       # Segmented sort pill control
│   ├── dialogs/
│   │   └── ConfirmDialog.tsx     # Delete confirmation dialog
│   ├── Filtering.tsx             # Orchestrator: filter + sort + display pipeline
│   ├── form/
│   │   ├── FormActions.tsx       # Form submit/cancel buttons
│   │   ├── FormField.tsx         # Reusable form input with validation
│   │   └── StudentForm.tsx       # Add/Edit student modal form
│   ├── layout/
│   │   ├── Background.tsx        # Animated gradient orbs + pattern overlay
│   │   ├── CardSurface.tsx       # Shared glassmorphism container
│   │   ├── Header.tsx            # App header with brand + dark-mode toggle
│   │   └── Modal.tsx             # Modal wrapper with backdrop + accessibility
│   └── students/
│       ├── AccentStripe.tsx       # Top accent colour stripe
│       ├── EmptyState.tsx         # "No students" illustration
│       ├── HoverOverlay.tsx       # Card-hover colour wash
│       ├── MetaTile.tsx           # Age/year stat tile with icon
│       ├── StudentActionButtons.tsx # Edit/Delete icon buttons
│       ├── StudentAvatar.tsx      # Coloured initial avatar
│       ├── StudentCard.tsx        # Individual student display card
│       ├── StudentGrid.tsx        # Responsive card grid
│       └── StudentNameId.tsx      # Name + ID display
├── constants/
│   ├── animations.ts             # Stagger timing constants
│   ├── colors.ts                 # Theme colour tokens
│   └── students.ts               # Form field configuration
├── hooks/
│   ├── useAppState.ts            # Top-level CRUD + modal state
│   ├── useBodyScrollLock.ts      # Lock body scroll when modal is open
│   ├── useFilterState.ts         # Search + sort UI state
│   ├── useFocusTrap.ts           # Trap Tab focus inside a container
│   ├── useGlobalKeydown.ts       # Global keyboard shortcut listener
│   ├── useLocalStorage.ts        # Persist state to localStorage
│   └── useRestoreFocus.ts        # Restore focus on unmount
├── types/
│   ├── Student.ts                # Student & StudentFormData interfaces
│   └── index.ts                  # Type exports
├── utils/
│   ├── filterUtils.ts            # Search/filter logic
│   ├── sortUtils.ts              # Sorting algorithms + constants
│   ├── studentUtils.ts           # Student creation + hue derivation
│   ├── validation.ts             # Form field validation rules
│   └── index.ts                  # Re-exports
├── Student.ts                    # Mock student seed data
├── App.tsx                       # Main application component
├── main.tsx                      # Application entry point
└── index.css                     # Global styles + Tailwind directives
```

---

## 🛠 Tech Stack

### Core

| Technology | Version | Purpose |
|-----------|---------|---------|
| [React](https://react.dev/) | 19.2.1 | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | 5.9.3 | Type safety |
| [Vite](https://vitejs.dev/) | 8.1 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 4.1 | Utility-first CSS |

### UI & Icons

- [react-icons](https://react-icons.github.io/react-icons/) — Icon component library (Font Awesome, etc.)
- [@fortawesome/*](https://fontawesome.com/) — Font Awesome 7 SVG icon set
- **CSS Glassmorphism** — `backdrop-blur`, semi-transparent backgrounds, subtle borders
- **Custom CSS** — Global styles with CSS custom properties, dark-mode class toggling

### Development Tools

| Tool | Purpose |
|------|---------|
| ESLint | Code linting & formatting |
| TypeScript Compiler | Type checking (`tsc --noEmit`) |
| Husky | Git hooks manager |
| commitlint | Conventional commit enforcement |
| lint-staged | Pre-commit linting & type-checking |

---

## 🎯 Usage

### Adding a Student

- Click **Add Student** (or press `C`)
- Fill in the student's name, age, and year
- Click **Add Student** to save

### Editing a Student

- Click on any student card, or press **Enter**/**Space** when focused
- Modify the student information
- Click **Update Student** to save changes

### Deleting a Student

- Click the **trash icon** on any student card
- Confirm the deletion in the confirmation dialog

### Searching Students

- Type in the search bar to filter students in real-time
- Press `/` to quickly focus the search bar

### Sorting Students

- Click **Name**, **Age**, or **Year** in the segmented sort control
- Click the same field again to toggle ascending/descending order
- A **Reset** button appears when any filter/sort is active

### Dark Mode

- Click the **sun/moon icon** in the header to toggle themes
- Preference is applied immediately to the `<html>` element

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server (HMR) |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run typecheck` | Run TypeScript type-checking (`tsc --noEmit`) |
| `npm run prepare` | Set up Husky git hooks |

---

## 🌟 Architecture Highlights

### Custom Hooks

The application follows a **hooks-driven architecture** where all stateful logic is extracted from components into custom hooks:

- **`useAppState`** — Owns the entire top-level state: student list (via `useLocalStorage`), modal visibility (form + confirm dialog), and dark mode. Returns memoised CRUD handlers.
- **`useFilterState`** — Encapsulates search/sort UI state with derived computed values (`filteredStudents`, `sortedStudents`, `filtersActive`).
- **`useFocusTrap`** / **`useRestoreFocus`** — Modal accessibility: traps Tab cycling and restores focus on close.
- **`useGlobalKeydown`** — Declarative global keyboard shortcuts with intelligent modifier/editable-element guards.
- **`useLocalStorage`** — Generic hook for persisting React state to `localStorage`.
- **`useBodyScrollLock`** — Prevents background scrolling when a modal is open.

### Accessibility

- Every modal (`StudentForm`, `ConfirmDialog`) uses a **focus trap** + **focus restoration**
- The main page content receives `inert` + `aria-hidden` when a modal is open
- Cards are `role="button"` with keyboard support (Enter/Space)
- All interactive elements have `aria-label`, `aria-pressed`, or `aria-describedby` as appropriate

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit with conventional commit messages (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **React Team** for the React 19 framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vite Team** for the lightning-fast build tool
- **FontAwesome** & **react-icons** for the icon sets

---

Built with ❤️ using modern web technologies

_Experience the future of student management with this cutting-edge application!_ 🚀
