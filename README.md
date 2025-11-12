# Prompt Game Tournament Results - Interactive Leaderboard

A responsive, interactive web application for displaying tournament results from a prompt-based game competition. Built with React, Vite, TailwindCSS, and Recharts.

## Features

### Core Requirements ✅
- **Interactive Leaderboard** - Display all players with sorting by Rank, Win Rate, or Rating (μ)
- **Statistical Visualizations** - Multiple charts showing:
  - Win rate distribution
  - Rating distribution (top 10)
  - Overall game results (wins/draws/losses pie chart)
  - Rating μ vs σ comparison
- **Player Details Modal** - Click any player card to view:
  - Complete statistics
  - Model information (provider, name, parameters)
  - System and step-wise prompts from YAML config
- **Responsive Design** - Fully responsive layout for desktop, tablet, and mobile devices

### Extra Features ✨
- **Pin Players** - Pin your favorite player to the top of the leaderboard
- **Visual Highlighting**:
  - 🥇 Top 3 players with special gold styling
  - 🔥 Players with Win Rate > 80% highlighted in orange
- **Search & Filter** - Real-time search by player name
- **Dark/Light Mode** - Toggle between themes with persistent preference
- **Toggle Charts** - Show/hide statistics charts section

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Recharts** - Charting library for React
- **PapaParse** - CSV parsing
- **js-yaml** - YAML parsing

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory. You can preview the production build with:

```bash
npm run preview
```

## Project Structure

```
├── public/
│   └── data/
│       ├── final_standings.csv
│       └── prompt_collection/
│           └── *.yml (player config files)
├── src/
│   ├── components/
│   │   ├── Leaderboard.jsx
│   │   ├── PlayerCard.jsx
│   │   ├── PlayerModal.jsx
│   │   └── StatsCharts.jsx
│   ├── utils/
│   │   └── dataLoader.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Data Structure

The `public/data/` folder contains:
- **`final_standings.csv`**: Tournament standings with columns:
  - `Rank`, `Player`, `Rating_Mu`, `Rating_Sigma`, `Wins`, `Draws`, `Losses`, `Games`, `Win_Rate`
- **`prompt_collection/`**: Individual player YAML configuration files containing:
  - Model information (provider, name, parameters)
  - System prompts
  - Step-wise prompts

## Usage

1. **View Leaderboard**: The main page displays all players in a responsive grid
2. **Sort Players**: Use the dropdown to sort by Rank, Win Rate, or Rating
3. **Search**: Type in the search bar to filter players by name
4. **Pin Players**: Click the pin icon on any player card to pin them to the top
5. **View Details**: Click any player card to open a modal with full details
6. **Toggle Theme**: Use the sun/moon icon in the header to switch between light and dark modes
7. **View Charts**: Toggle the charts section to see statistical visualizations

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Customization

- **Colors**: Modify `tailwind.config.js` to customize the color scheme
- **Charts**: Edit `src/components/StatsCharts.jsx` to add or modify visualizations
- **Styling**: All components use TailwindCSS classes for easy customization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License

