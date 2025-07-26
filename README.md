
# 🎬 Movie Finder App

A modern and responsive movie search app built with React, TMDb API, and Appwrite as a backend-as-a-service.

---

## 🔍 Features

- Real-time movie search with debounce optimization
- Trending movies section using Appwrite data
- Loading feedback with spinner component
- Search tracking and analytics powered by Appwrite
- Modern UI with smooth animations and responsive design

---

## 🧰 Technologies Used

- **React + Vite**
- **TMDb API** – to fetch movie data
- **Appwrite** – BaaS for storing trending and search statistics
- **Tailwind CSS** – utility-first styling
- **react-use** – used for the debounce functionality

---

## 🚀 Getting Started

```bash

# Install dependencies
npm install

# Create environment variables file
cp .env.local.example .env.local

# Run the app
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env.local` file with the following content:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_ENDPOINT=https://[your-instance].appwrite.io/v1
VITE_APPWRITE_PROJECT=your_project_id
VITE_APPWRITE_DATABASE=your_database_id
VITE_APPWRITE_COLLECTION=your_collection_id
VITE_APPWRITE_TRENDING_COLLECTION=your_trending_collection_id
```

---

## 📁 Project Structure

```
movie-finder-app/
├── public/
│   ├── hero.png
│   ├── hero-bg.png
│   ├── logo.png
│   ├── no-movie.png
│   ├── search.svg
│   ├── star.svg
│   └── vite.svg
│
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── MovieCard.jsx
│   │   ├── Search.jsx
│   │   └── Spinner.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── appwrite.js
│   ├── index.css
│   └── main.jsx
│
├── .env.local
├── .gitignore
├── README.md
├── index.html
├── vite.config.js
└── package.json
```

---

## 📦 How Appwrite is Used

- When a user searches for a movie, the search is logged in the Appwrite database.
- Most-searched movies are stored in a dedicated "trending" collection.
- The `getTrendingMovies()` function fetches and displays trending movies from Appwrite.

---

## 📸 Preview (optional)

> You can add a screenshot or GIF here to showcase the UI.

---

## 📤 Deployment

Can be deployed easily using:

- **Vercel**
- **Netlify**
- **Firebase Hosting**

To build for production:

```bash
npm run build
```

---

## 👤 Author

**Ryan Carlos Sarcinelli**  
[GitHub](https://github.com/your-username) • [LinkedIn](https://linkedin.com/in/your-profile)

---

## 📄 License

MIT © 2025
