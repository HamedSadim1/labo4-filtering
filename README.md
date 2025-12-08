# 🎓 Student Management System

A modern, responsive student management application built with React 19, TypeScript, and Tailwind CSS. Features a beautiful glassmorphism design with dark mode support, providing an elegant and intuitive interface for managing student data.

![Student Management System](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.6-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.17-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 Modern UI/UX

- **Glassmorphism Design**: Beautiful backdrop blur effects and transparent elements
- **Dark Mode**: Seamless dark/light theme switching with smooth transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern Animations**: Smooth hover effects and micro-interactions

### 📊 Student Management

- **CRUD Operations**: Create, Read, Update, and Delete student records
- **Advanced Search**: Real-time search across name, age, and year
- **Smart Sorting**: Sort by name, age, or year with ascending/descending order
- **Data Validation**: Form validation with user-friendly error handling

### 🛠 Technical Excellence

- **TypeScript**: Full type safety throughout the application
- **Component Architecture**: Modular, reusable components
- **Performance Optimized**: Fast builds with Vite and optimized bundles
- **PWA Ready**: Progressive Web App capabilities with service worker support

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/HamedSadim1/labo4-filtering.git
   cd labo4-filtering
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173) to view the application.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## 📁 Project Structure

```text
src/
├── components/           # Reusable UI components
│   ├── Background.tsx    # Animated background elements
│   ├── Header.tsx        # App header with title and theme toggle
│   ├── AddStudentButton.tsx # Add student action button
│   ├── SearchBar.tsx     # Search input component
│   ├── SortButtons.tsx   # Sorting controls
│   ├── StudentCard.tsx   # Individual student display card
│   ├── StudentGrid.tsx   # Student cards grid container
│   ├── EmptyState.tsx    # No results state
│   ├── StudentForm.tsx   # Add/Edit student modal form
│   ├── FormField.tsx     # Reusable form input field
│   └── FormActions.tsx   # Form submit/cancel buttons
├── types/               # TypeScript type definitions
│   ├── Student.ts       # Student and form data interfaces
│   └── index.ts         # Type exports
├── utils/               # Utility functions
│   ├── studentUtils.ts  # Student data manipulation
│   ├── sortUtils.ts     # Sorting algorithms
│   ├── filterUtils.ts   # Filtering logic
│   └── index.ts         # Utility exports
├── Student.ts           # Mock student data
└── App.tsx             # Main application component
```

## 🛠 Tech Stack

### Core Technologies

- **[React 19](https://react.dev/)** - Modern React with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Fast build tool and development server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### UI & Styling

- **Glassmorphism Effects** - Backdrop blur and transparency
- **Custom Animations** - CSS transitions and transforms
- **Responsive Grid** - CSS Grid and Flexbox layouts
- **Dark Mode** - CSS custom properties and React state

### Development Tools

- **ESLint** - Code linting and formatting
- **TypeScript Compiler** - Type checking
- **Vite Dev Server** - Hot module replacement
- **npm scripts** - Build and development automation

## 🎯 Usage

### Adding a Student

1. Click the **"Add Student"** button
2. Fill in the student's name, age, and year
3. Click **"Add Student"** to save

### Editing a Student

1. Click the **Edit** button on any student card
2. Modify the student information
3. Click **"Update Student"** to save changes

### Searching Students

- Use the search bar to filter students by name, age, or year
- Search is performed in real-time as you type

### Sorting Students

- Click the **Name**, **Age**, or **Year** buttons to sort
- Click again to toggle between ascending and descending order

### Dark Mode Toggle

- Click the sun/moon icon in the header to switch themes
- Your preference is maintained across sessions

## 🔧 Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Build the app for production         |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint for code quality checks   |

## 🌟 Key Features Explained

### Glassmorphism Design

The application uses modern glassmorphism effects with:

- `backdrop-blur-xl` for frosted glass appearance
- Semi-transparent backgrounds with subtle borders
- Smooth animations and hover effects

### Type Safety

Full TypeScript implementation ensures:

- Compile-time error checking
- IntelliSense support in your IDE
- Self-documenting code with interfaces

### Performance

Optimized for speed with:

- Vite's fast HMR (Hot Module Replacement)
- Tree-shaking for smaller bundle sizes
- Lazy loading and code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vite Team** for the lightning-fast build tool
- **FontAwesome** for the beautiful icons

---

Built with ❤️ using modern web technologies

_Experience the future of student management with this cutting-edge application!_ 🚀
