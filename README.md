# Goal-Based Savings Planner

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/build-passing-green.svg)
![Version](https://img.shields.io/badge/version-1.0.0-orange.svg)

A production-grade, client-side financial planning application built to help users manage multiple savings goals with real-time currency interoperability. Designed with **Next.js 15**, **TypeScript**, and **Tailwind CSS**, this project emphasizes performance, type safety, and a premium user experience.

[Live Demo](https://syfe-assignment-frontend-intern.vercel.app/) · [Report Bug](https://github.com/Arnavsao/Syfe-Assignment-Frontend-Intern/issues) · [Request Feature](https://github.com/Arnavsao/Syfe-Assignment-Frontend-Intern/issues)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Ecosystem](#-technology-ecosystem)
- [Getting Started](#-getting-started)
- [Architecture & Design](#-architecture--design)
- [Project Structure](#-project-structure)
- [Performance & Optimization](#-performance--optimization)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🚀 Overview

The **Goal-Based Savings Planner** solves the problem of tracking financial targets across different currencies. Users can set specific savings goals (e.g., "New Macbook", "Emergency Fund"), log contributions over time, and visualize their progress toward completion.

The application integrates a live Forex engine to seamlessly convert between INR and USD, ensuring that users always have an accurate view of their standing regardless of the transaction currency.

---

## ✨ Key Features

### 🎯 Comprehensive Goal Management
- **Create Custom Goals**: Define unlimited goals with specific target amounts and preferred currencies (INR/USD).
- **Inline Editing**: Quickly update goal names or targets directly from the dashboard using the inline edit interface.
- **Smart Progress Tracking**: Visual progress bars and percentage indicators update in real-time as contributions are added.
- **Goal Deletion**: Secure deletion workflows with confirmation dialogs to prevent accidental data loss.

### 💰 Intelligent Contribution Tracking
- **Granular History**: View a detailed, scrollable history of all contributions for every goal.
- **Smart Adjustments**: The system automatically recalculates total progress when past contributions are modified.
- **Dual-Mode Modals**: A unified modal system handles both creation and editing of contributions, pre-filling data for seamless updates.
- **Currency Agnostic**: Add contributions in any supported currency; the system handles the math.

### 💱 Real-Time Forex Engine
- **Live Exchange Rates**: Integrates with `exchangerate-api` to fetch real-time USD ↔ INR rates.
- **Smart Caching**: Implements a client-side caching layer (1-hour TTL) to minimize API calls and prevent rate limiting.
- **Manual Refresh**: Users can force a rate refresh if they need up-to-the-second precision.
- **Timestamping**: clearly displays when the exchange rate was last updated.

### 🎨 Premium User Experience
- **Responsive Design**: precise layouts for Mobile, Tablet, and Desktop.
- **Micro-interactions**: Smooth transitions, hover effects, and spring-physics animations for modals.
- **Validation Feedback**: Instant, field-level validation for all forms (dates, amounts, titles).
- **Accessible**: Built with semantic HTML and appropriate ARIA attributes.

---

## 🛠 Technology Ecosystem

This project leverages a modern, robust stack chosen for scalability and developer experience.

| Category | Technology | Reasoning |
|----------|------------|-----------|
| **Core** | [Next.js 15](https://nextjs.org/) | App Router architecture for optimal routing and layout management. |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict static typing for bug prevention and better tooling. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS for rapid, consistent, and responsive UI design. |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent, lightweight SVG icons. |
| **Font** | [Inter](https://fonts.google.com/specimen/Inter) | Clean, highly legible typeface for UI. |
| **State** | React Hooks | `useState`, `useMemo`, `useCallback` for performant local state management. |

---

## ⚡ Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- **Node.js**: v18.17.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/Arnavsao/Syfe-Assignment-Frontend-Intern.git
    cd Syfe-Assignment-Frontend-Intern
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Navigate to `http://localhost:3000` to see the application running.

---

## 🏗 Architecture & Design

The application follows a modular, component-driven architecture designed for maintainability.

### 1. State Management Strategy
Instead of reaching for heavy global state libraries like Redux, this application utilizes **Custom React Hooks** (`useGoals`, `useExchangeRate`, `useDashboardStats`). This approach keeps business logic decoupled from UI components, making the codebase easier to test and refactor.

- **`useGoals`**: Encapsulates CRUD operations and persistence logic.
- **`useExchangeRate`**: Manages API fetching, caching, and error states.

### 2. Component Composition
Components are split into two categories:
- **UI Primitives** (`/components/ui`): Stateless, purely presentational based components (Buttons, Cards, Inputs). These are highly reusable.
- **Feature Components** (`/components/goals`): tied to specific business logic and smart containers.

### 3. Data Persistence
To ensure a persistent user experience without a backend, the app utilizes `localStorage` with a robust wrapper.
- **Safety**: Includes try-catch blocks to handle storage quota errors or disabled cookies.
- **Serialization**: diverse data types (Dates, Numbers) are properly serialized and deserialized.

### 4. Performance Optimizations
- **Memoization**: Expensive calculations (like total savings across 50+ contributions) are memoized using `useMemo`.
- **Lazy Loading**: Modals are conditionally rendered, keeping the initial DOM size small.
- **Font Optimization**: Uses `next/font` to eliminate layout shift (CLS).

---

## 📂 Project Structure

A high-level overview of the codebase organization:

```
syfe-assignment/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root wrapper
│   ├── page.tsx                # Main Dashboard
│   └── globals.css             # Tailwind imports
│
├── components/
│   ├── ui/                     # Reusable Primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   ├── goals/                  # Feature Components
│   │   ├── GoalCard.tsx
│   │   ├── AddGoalModal.tsx
│   │   └── ...
│   └── dashboard/              # Dashboard Widgets
│
├── hooks/                      # Logic Layer
│   ├── useGoals.ts             # CRUD Ops
│   ├── useExchangeRate.ts      # API handling
│   └── useDashboardStats.ts    # Aggregations
│
├── lib/                        # Utilities
│   ├── api/                    # API definitions
│   ├── utils/                  # Formats & Validators
│   └── constants.ts            # Config
│
└── types/                      # TypeScript Definitions
    └── index.ts                # Shared Interfaces
```

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📧 Contact

**Priiyanshu Yadav**  
Frontend Developer & Engineering Intern  
Email: [priyanshs.ece@gmail.com](mailto:priyanshs.ece@gmail.com)

Project Link: [https://github.com/Arnavsao/Syfe-Assignment-Frontend-Intern](https://github.com/Arnavsao/Syfe-Assignment-Frontend-Intern)
#   - G o a l - B a s e d - S a v i n g s - P l a n n e r  
 