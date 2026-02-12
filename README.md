# Recursive Grid 

## Overview
It is an interactive 3x3 grid game built with React and Tailwind CSS that demonstrates complex state management and conditional logic.

## Features
- **Interactive State:** Clicking boxes updates numbers dynamically.
- **Ripple Logic:**
  - If a number is **divisible by 3**, the box to the **RIGHT** is decremented by 1.
  - If a number is **divisible by 5**, the box **BELOW** is incremented by 2.
- **Safety Constraints:** Logic prevents interaction with edges (e.g., last column or bottom row) to avoid crashes.
- **Locked State:** Any box reaching **15** turns Red and becomes unclickable.
- **Styling:** Custom Neo-brutalism design with hard shadows and specific color coding for odd/even numbers.

## Tech Stack
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Language:** JavaScript (ES6+)

Demo Link (Vercel): https://recursive-grid.vercel.app 
