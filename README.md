# Youssef Imlilss - Portfolio

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## Features

- 🎨 Modern UI with gradient animations
- 📱 Fully responsive design
- ✨ Smooth scroll animations
- 🎭 Professional styling with glassmorphism effects
- ⚡ Fast and optimized with Vite

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Express (for production server)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to Railway

### Prerequisites

1. A Railway account (sign up at [railway.app](https://railway.app))
2. Git repository (GitHub, GitLab, or Bitbucket)

### Steps

1. **Push your code to GitHub/GitLab**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Railway**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Railway will automatically:**
   - Detect the Node.js project
   - Install dependencies
   - Build the project (`npm run build`)
   - Start the server (`npm start`)

4. **Configure Environment Variables (if needed)**
   - Railway will automatically set the `PORT` environment variable
   - No additional configuration needed

5. **Deploy**
   - Railway will automatically deploy on every push to your main branch
   - Your site will be live at a `railway.app` domain
   - You can add a custom domain in Railway settings

### Configuration Files

- `railway.json` - Railway deployment configuration
- `nixpacks.toml` - Nixpacks build configuration
- `server.js` - Express server for serving the built files

The deployment is fully automated - just push your code and Railway handles the rest!