# Pokémon Explorer App

![Pokémon Explorer Screenshot](screenshot.png)

A responsive web application for exploring Pokémon with a clean, user-friendly interface. Browse through Pokémon, search by name, and view detailed information about each creature.

## Features

- 🎨 Responsive design that works on mobile and desktop
- 🔍 Search functionality to find Pokémon by name
- 📖 Detailed view for each Pokémon including:
  - High-quality artwork
  - Basic stats (height, weight)
  - Type information
  - Move list
  - Visual stat representation
- 📄 Pagination for easy browsing
- ⚡ Fast loading with placeholder states

## Technologies Used

- Next.js
- Tailwind CSS
- Pokémon API (pokeapi.co)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/pokemon-explorer.git
   cd pokemon-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in your browser**
   ```
   http://localhost:3000
   ```

## Project Structure

```
pokemon-explorer/
├── components/
│   ├── PokemonCard.js      # Card component for list view
│   ├── PokemonList.js      # Main list with search and pagination
│   └── search-bar.js    
├── app/
│   ├── page.js           # Home page with Pokémon list
│   └── pokemon/[id]/page.jsx     # Dynamic route for Pokémon details
├── public/                # Static files
└── styles/                # CSS files
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm start` - Runs the built app in production mode
- `npm run lint` - Runs ESLint

## Deployment

The easiest way to deploy this Next.js app is to use [Vercel](https://vercel.com):

1. Push your code to a GitHub repository
2. Connect your Vercel account to the repository
3. Vercel will automatically detect it's a Next.js app and deploy it

Alternatively, you can build and run locally for production:
```bash
npm run build
npm start
```


