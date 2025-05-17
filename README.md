# 🏥 Pharmacie Garde - Duty Pharmacy Management Web App

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Dev-blueviolet?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38b2ac?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

**Pharmacie Garde** is a modern React web application designed to help users find and manage pharmacies on duty (pharmacies de garde) with a clean UI, real-time map integration, and intuitive navigation.

---

## 🧠 Overview

This app enables users to:
- 🌍 View duty pharmacies on Google Maps
- 🔍 Use autocomplete to search places
- 📊 Display pharmacy info in data tables with pagination
- 📱 Use it across all screen sizes with responsive UI
- 💡 Navigate easily thanks to modern UI components

---

## 🛠️ Tech Stack

### ⚛️ Frontend
- **React 18**
- **Vite** (fast build tool)
- **React Router DOM** (for routing)
- **TypeScript** support

### 🎨 UI & Styling
- **Tailwind CSS** (utility-first styling)
- **Material Tailwind** (modern UI components)
- **Headless UI** (accessible primitives)
- **Heroicons** & **React Icons** (icons)

### 🗺️ Maps & Search
- **@react-google-maps/api** (Google Maps & Places Autocomplete)

### 📊 Data Display
- **react-data-table-component** (data tables)
- **react-paginate** (pagination)

---

## 📁 Project Structure

pharmacie-garde/
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page-level components
│ ├── hooks/ # Custom hooks
│ ├── utils/ # Utility functions
│ ├── App.tsx # Main application wrapper
│ ├── main.tsx # App entry point
│ └── ... # Additional modules
├── package.json # Project metadata & scripts
├── tailwind.config.js # Tailwind configuration
├── postcss.config.js # PostCSS configuration
└── vite.config.ts # Vite configuration
