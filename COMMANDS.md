# 🎯 Quick Command Reference

## Copy & Paste These Commands in Order

### 1️⃣ Initial Setup (Do Once)

```bash
# Navigate to Desktop
cd Desktop

# Create project folder
mkdir pastebin-app
cd pastebin-app

# (Copy all project files here)

# Install dependencies
npm install
```

---

### 2️⃣ Create .env.local File

Create a file named `.env.local` with:

```env
KV_REST_API_URL="your_url_from_vercel"
KV_REST_API_TOKEN="your_token_from_vercel"
```

Get these values from: Vercel Dashboard → Storage → Your KV Database → .env.local tab

---

### 3️⃣ Test Locally

```bash
# Start development server
npm run dev

# Open browser to: http://localhost:3000

# Stop server: Press Ctrl+C
```

---

### 4️⃣ Push to GitHub (First Time)

```bash
# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Pastebin application"

# Set main branch
git branch -M main

# Add GitHub repository (replace with YOUR repository URL)
git remote add origin https://github.com/YOUR_USERNAME/pastebin-lite.git

# Push to GitHub
git push -u origin main
```

---

### 5️⃣ Update Code Later (After Changes)

```bash
# Add changed files
git add .

# Commit with message
git commit -m "Description of changes"

# Push to GitHub
git push
```

Vercel will automatically redeploy when you push to GitHub!

---

## 🔧 Useful Commands

### Check if Node.js is installed:
```bash
node --version
npm --version
```

### Check if Git is installed:
```bash
git --version
```

### Clean install (if having issues):
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Build for production (test):
```bash
npm run build
npm start
```

---

## 🌐 Important URLs

**Local Development:**
- Homepage: http://localhost:3000
- Health Check: http://localhost:3000/api/healthz

**After Deployment:**
- Your Site: https://your-app.vercel.app
- Health Check: https://your-app.vercel.app/api/healthz

**Dashboards:**
- Vercel: https://vercel.com/dashboard
- GitHub: https://github.com/YOUR_USERNAME/pastebin-lite

---

## 📱 Terminal Commands Cheat Sheet

| Command | What it does |
|---------|-------------|
| `cd folder-name` | Enter a folder |
| `cd ..` | Go back one folder |
| `ls` (Mac/Linux) or `dir` (Windows) | List files in current folder |
| `pwd` (Mac/Linux) or `cd` (Windows) | Show current folder path |
| `clear` (Mac/Linux) or `cls` (Windows) | Clear terminal screen |

---

## 🚨 If You Get Errors

### "Command not found"
→ Make sure Node.js and Git are installed

### "Permission denied"
→ On Mac/Linux, try adding `sudo` before the command

### "Port 3000 already in use"
→ Stop other dev servers or use: `npm run dev -- -p 3001`

### Changes not showing on Vercel
→ Push to GitHub again, Vercel auto-deploys

### KV database errors
→ Check .env.local has correct credentials

---

## ✅ Quick Test After Deployment

```bash
# Test health endpoint (replace with your URL)
curl https://your-app.vercel.app/api/healthz

# Should return: {"ok":true}
```

---

## 🎯 What to Submit

1. **Deployed URL:** `https://your-app.vercel.app`
2. **GitHub URL:** `https://github.com/YOUR_USERNAME/pastebin-lite`
3. **Notes:** See DEPLOYMENT_GUIDE.md for template

---

That's it! Keep this file handy for quick reference. 🚀
