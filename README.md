# ClassManager Microsite

Welcome to the **ClassManager Microsite**!  
This project is part of the [ClassManager-PEI](https://github.com/ClassManager-PEI/) organization and serves as the informational and landing page for the ClassManager platform.

## Microsite Purpose

This microsite provides:
- An overview of the ClassManager platform and its features
- Updates and news related to ClassManager
- Documentation and links to other resources

## Features

- Responsive landing page
- News and update feed
- Documentation links
- Simple, modern UI (built with [Vite](https://vitejs.dev/))

## Getting Started

To run the microsite locally:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

The production build will be located in the `dist/` folder.

## Deployment

This microsite is deployed using [GitHub Pages](https://pages.github.com/).  
Deployment steps:
1. Build the site: `npm run build`
2. Copy the contents of `dist/` to the `docs/` folder
3. Push to the repository
4. GitHub Pages is configured to serve from `/docs`

## Folder Structure

```
/
├── public/         # Static assets
├── src/            # Source files
├── updates.json    # JSON feed for site updates
├── docs/           # Built site for GitHub Pages
├── vite.config.js  # Vite configuration
├── package.json    # Project metadata and scripts
└── README.md       # This file
```

---

&copy; 2025 [ClassManager-PEI](https://github.com/ClassManager-PEI/)