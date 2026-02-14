# Seesaw Simulation

Interactive physics-based seesaw simulation built using **pure JavaScript, HTML, and CSS**.

This project was developed as part of a technical case study to demonstrate:

* Logical reasoning
* Physics simulation
* Animation and interaction design
* Clean, structured JavaScript architecture
* Incremental Git commit history

---

## 🚀 Live Demo

> GitHub Pages link: **[Seesaw Challenge Site](https://chemieai.github.io/seesaw-challenge/)**

---

## 🧠 Core Concept

Users can drop random-weight objects onto a playground seesaw.
Each object contributes **torque** based on the formula:

```
torque = weight × distance_from_pivot
```

The seesaw tilt angle is calculated as:

```
angle = clamp((rightTorque − leftTorque) / 10, −30°, +30°)
```

The plank rotates **smoothly and proportionally** to the torque difference.

---

## ✨ Features

### Physics & Interaction

* Torque-based balance calculation
* Smooth CSS rotation animation
* Maximum tilt constraint (±30°)
* Objects dropped from height with falling animation
* Hover preview showing next drop position and weight

### State Management

* Persistent simulation using **localStorage**
* Automatic restoration after page refresh
* Reset functionality

### UI / UX

* Real-time info cards displaying:

  * Next weight
  * Left / right total weight
  * Left / right torque
  * Current tilt angle
* Action history log
* Clean and responsive layout
* **No external libraries or frameworks**

---

## 🏗 Technical Decisions

### Why DOM instead of Canvas?

The requirements explicitly forbid canvas usage.
Using **positioned DOM elements + CSS transforms** provides:

* Smooth animation
* Easier debugging
* Straightforward persistence with localStorage

### State Structure

```
{
  weight: number,
  distance: number
}
```

This minimal structure keeps physics calculations deterministic and serializable.

---

## 📦 Project Structure

```
index.html
style.css
script.js
README.md
```

No build tools, no dependencies, fully static.

---

## 🧪 Development Steps

1. Layout and plank rendering
2. Click position → distance calculation
3. Object rendering on the plank
4. Torque physics and tilt animation
5. localStorage persistence
6. UI indicators (weights and torque)
7. Reset functionality
8. Falling animation and hover preview
9. Final UI polish and logging system

Each step was committed separately to preserve **incremental reasoning**.

---

## 🤖 AI Usage

AI tools were used **only for guidance, debugging, and review**.

All architecture decisions, physics implementation, and interaction logic
were designed and implemented manually.

---

## 📹 Demo Video

> YouTube link: **(----not active----)**

The video explains:

* Physics calculation
* State management
* Animation approach
* Design trade-offs

---

## 🧑‍💻 Author

**Your Name**

GitHub: [Chemieai](https://github.com/ChemieAi)
LinkedIn: [Burak KIZILAY](https://www.linkedin.com/in/burak-kızılay/)
