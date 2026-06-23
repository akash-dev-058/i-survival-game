# SurvivalCore3D

A browser‑based 3D survival game built with **Vite**, **React**, **Three.js**, **Cannon‑es**, and **Zustand**. The game runs entirely client‑side, persisting progress in IndexedDB.

## Quick Start

bash
# Clone the repo
git clone https://github.com/yourorg/survivalcore3d.git
cd survivalcore3d

# Install dependencies
npm ci

# Start development server
npm run dev


Open `http://localhost:3000` in a modern browser.

## Scripts

- `npm run dev` – Development server with hot‑module replacement.
- `npm run build` – Production build.
- `npm run preview` – Preview the production build locally.
- `npm run test` – Run Vitest unit tests.
- `npm run lint` – Lint source files.

## Environment Variables

See `.env.example` for required variables. All variables are prefixed with `VITE_` to be exposed to the client.

## Architecture Overview

- **Three.js** – Rendering engine.
- **Cannon‑es** – Physics simulation.
- **Zustand** – Global state store shared between the game loop and React UI.
- **Dexie** – IndexedDB wrapper for save/load.
- **GSAP** – UI animations.
- **Leva** – Debug UI (enabled with `VITE_ENABLE_DEBUG_PHYSICS=true`).

## Folder Structure


src/
  assets/          # Runtime assets (loaded via AssetManager)
  audio/           # Audio manager & pools
  components/      # React UI components
  game/core/       # Scene, renderer, game loop
  physics/         # Cannon‑es world & sync utilities
  entities/        # Player, resources, enemies, structures
  systems/         # Gameplay systems (inventory, crafting, etc.)
  storage/        # IndexedDB persistence
  utils/           # Helpers, constants, serializers
  tests/           # Vitest unit tests
public/            # Static assets (models, textures, audio)


## License

MIT © 2026 SurvivalCore3D Team
