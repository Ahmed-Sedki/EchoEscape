# 🏃‍♂️ Echo Escape 🏃‍♀️

Welcome to **Echo Escape**! In this thrilling game, you must navigate through maze and collect power-ups!

## 🎮 Game Overview

Echo Escape is a maze game where you control a player who must find the exit while collecting power-ups while only depending on pulses.

## 🕹️ How to Play

1. **Navigate the Maze**: Use the arrow keys to move your player through the maze.
2. **Collect Power-Ups**: Look out for shields, reveals, and invincibility power-ups to aid your escape.
3. **Reach the Exit**: Find the exit block to complete the maze and move on to the next challenge.

## 🧩 Power-Ups

- **🛡️ Shield**: Protects you from one hit against walls or the monster.
- **🔍 Reveal**: Reveals the entire maze for a short period.
- **⭐ Invincibility**: Makes you invincible for a limited time, allowing you to touch walls without losing. 

## 📦 Project Structure

```
assets
├── css
│   └── styles.css
├── images
│   ├── alphabet-150785_640.png
│   ├── player.png
│   ├── reveal.svg
│   ├── shield.png
│   ├── shield.svg
│   └── invincibility.png
└── sounds
    └── pulse.wav
scenes
├── BootScene.js
├── GameScene.js
└── UIScene.js
utils
├── gameUtils.js
├── maze.js
├── mazeUtils.js
├── powerups.js
├── UIOverlay.js
├── wallUtils.js
├── playerUtils.js
└── eventListeners.js
index.html
main.js
README.md
```

## 🚀 Getting Started

### Prerequisites

- Visual Studio Code installed on your machine.
- Live Server extension installed in Visual Studio Code.
- A web browser.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ahmed-Sedki/EchoEscape.git
   cd EchoEscape
   ```

2. **Open the project in Visual Studio Code**:
   ```bash
   code .
   ```

3. **Run the game**using the Live Server extension:
- Open the `index.html` file in Visual Studio Code.
- Right-click on the `index.html` file and select "Open with Live Server".

Your browser will automatically open and navigate to `http://127.0.0.1:5500` (or a similar local address) to start playing Echo Escape!

## 🛠️ Development

### Adding New Features

1. **Power-Ups**: You can add new power-ups by updating `powerups.js` and their corresponding effects in `GameScene.js`.

### Contribution

Feel free to fork this project, make improvements, and submit pull requests. Contributions are welcome!


## 📞 Contact

Got any questions or feedback? Hit me up on Instagram: [ahmed.sedkii](https://www.instagram.com/ahmed.sedkii/)

---

Enjoy playing Echo Escape! 🎉
