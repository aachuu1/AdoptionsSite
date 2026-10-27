# Adoption Site

A Node.js web application for displaying and managing animal adoption listings, featuring multiple image galleries (static, dynamic and animated), a dark mode toggle, an About page, and a database-backed search.

## Features

- **Static gallery** - gallery of animals available for adoption, built with HTML and CSS
- **Dynamic gallery** - gallery generated at runtime with JavaScript (`galerie-dinamica.js`)
- **Animated gallery** - gallery with CSS/JS animations (`galerie-animata.js`)
- **Dark mode** - switch between light and dark themes
- **About page** - dedicated page with information about the project
- **Database + search** - adoption listings stored in a database and searchable from the UI
- **Organized styling** - CSS split into separate files by page/component

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime / Server | Node.js (`index.js`) |
| Frontend | HTML, CSS, Vanilla JavaScript |
| Views | Server-side templates (`views/`) |
| Database | PostgreSQL |

## Project Structure

```
.
├── Resurse/                # Static resources (images, CSS, fonts, etc.)
├── json/                   # JSON data files (gallery content, etc.)
├── views/                  # Page templates
├── galerie-animata.js      # Animated gallery logic
├── galerie-dinamica.js     # Dynamic gallery logic
├── index.html              # Main page
├── index.js                # Server entry point
├── package.json
└── package-lock.json
```

## Getting Started

### Requirements
- Node.js (LTS version recommended)
- npm
- PostgreSQL
