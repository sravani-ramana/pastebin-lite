# 🚀 Complete Deployment Guide - Step by Step

This guide will walk you through deploying your Pastebin application from scratch. Follow each step carefully.

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- [ ] A computer with internet connection
- [ ] A GitHub account (create free at github.com)
- [ ] A Vercel account (create free at vercel.com)
- [ ] Git installed on your computer
- [ ] Node.js installed (download from nodejs.org)

---

## Part 1: Setting Up Your Local Environment

### Step 1: Install Node.js (if not already installed)

1. Go to https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Run the installer
4. Verify installation by opening terminal/command prompt and typing:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers appear.

### Step 2: Install Git (if not already installed)

1. Go to https://git-scm.com/downloads
2. Download for your operating system
3. Run the installer
4. Verify by typing in terminal:
   ```bash
   git --version
   ```

### Step 3: Set Up Project Folder

**On Windows:**
1. Open Command Prompt or PowerShell
2. Type these commands:
   ```bash
   cd Desktop
   mkdir pastebin-app
   cd pastebin-app
   ```

**On Mac/Linux:**
1. Open Terminal
2. Type these commands:
   ```bash
   cd Desktop
   mkdir pastebin-app
   cd pastebin-app
   ```

### Step 4: Copy Project Files

Copy all the files I've created for you into this `pastebin-app` folder on your Desktop.

### Step 5: Install Dependencies

In your terminal (make sure you're in the pastebin-app folder):

```bash
npm install
```

This will take 1-2 minutes. You'll see a lot of text scroll by - this is normal!

---

## Part 2: Setting Up Vercel KV Database

### Step 1: Create Vercel Account

1. Go to https://vercel.com/signup
2. Click "Continue with GitHub" (recommended)
3. Authorize Vercel to access your GitHub account
4. Complete the signup process

### Step 2: Create KV Database

1. Once logged in, click on your profile icon (top right)
2. Select "Dashboard"
3. In the top menu, click "Storage"
4. Click the "Create Database" button
5. Select "KV" (it has a Redis icon)
6. Enter a name: `pastebin-kv`
7. Select a region close to you
8. Click "Create"

### Step 3: Get Database Credentials

1. After creation, you'll see your database dashboard
2. Click on the ".env.local" tab
3. You'll see something like:
   ```
   KV_REST_API_URL="https://example.kv.vercel-storage.com"
   KV_REST_API_TOKEN="AbCdEf1234567890..."
   ```
4. Keep this tab open - you'll need these values!

### Step 4: Create .env.local File

**On Windows:**
1. Open Notepad
2. Copy and paste your KV credentials from Vercel
3. Save As → File name: `.env.local` (include the dot!)
4. Save type: "All Files"
5. Save location: Your pastebin-app folder

**On Mac:**
1. Open TextEdit
2. Format → Make Plain Text
3. Copy and paste your KV credentials from Vercel
4. Save as `.env.local` in your pastebin-app folder

Your `.env.local` should look like:
```env
KV_REST_API_URL="https://your-actual-url.kv.vercel-storage.com"
KV_REST_API_TOKEN="your_actual_token_here"
```

### Step 5: Test Locally

In your terminal, type:

```bash
npm run dev
```

You should see:
```
▲ Next.js 14.2.18
- Local:        http://localhost:3000
```

Open your browser and go to: **http://localhost:3000**

You should see your beautiful Pastebin app! 🎉

Try creating a paste to test it works.

Press `Ctrl+C` in terminal to stop the server when you're done testing.

---

## Part 3: Deploying to Vercel

### Step 1: Create GitHub Repository

1. Go to https://github.com
2. Log in to your account
3. Click the "+" icon (top right)
4. Select "New repository"
5. Repository name: `pastebin-lite`
6. Description: "A modern pastebin application"
7. Keep it "Public"
8. Do NOT initialize with README
9. Click "Create repository"

### Step 2: Push Code to GitHub

In your terminal (in the pastebin-app folder), run these commands ONE BY ONE:

```bash
git init
```
(Initializes git repository)

```bash
git add .
```
(Stages all files)

```bash
git commit -m "Initial commit: Pastebin application"
```
(Creates first commit)

```bash
git branch -M main
```
(Renames branch to main)

Now, copy the URL from your GitHub repository page. It looks like:
`https://github.com/YOUR_USERNAME/pastebin-lite.git`

```bash
git remote add origin https://github.com/YOUR_USERNAME/pastebin-lite.git
```
(Replace with your actual repository URL)

```bash
git push -u origin main
```
(Pushes code to GitHub - may ask for GitHub login)

Refresh your GitHub repository page - you should see all your files there!

### Step 3: Deploy on Vercel

**Option A: Using Vercel Dashboard (Recommended for beginners)**

1. Go to https://vercel.com/dashboard
2. Click "Add New..." button
3. Select "Project"
4. You'll see "Import Git Repository"
5. Find your `pastebin-lite` repository
6. Click "Import"
7. **Project Configuration:**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: (leave default)
   - Output Directory: (leave default)
8. Click "Deploy"

### Step 4: Connect KV Database to Vercel Project

1. While deployment is running, go to your project settings
2. Click on "Storage" tab
3. Click "Connect Store"
4. Select your `pastebin-kv` database
5. Click "Connect"
6. If deployment already finished, click "Redeploy" in the Deployments tab

### Step 5: Get Your Live URL

1. Once deployment succeeds (you'll see confetti! 🎉)
2. Click "Visit" or look for the URL
3. It will look like: `https://pastebin-lite-abc123.vercel.app`
4. **SAVE THIS URL** - this is what you'll submit!

---

## Part 4: Testing Your Deployment

### Test Checklist:

1. **Health Check:**
   - Visit: `https://your-url.vercel.app/api/healthz`
   - Should see: `{"ok":true}`

2. **Create a Paste:**
   - Go to your homepage
   - Enter some text
   - Click "CREATE PASTE"
   - You should get a shareable URL

3. **View the Paste:**
   - Click on the URL
   - You should see your text displayed

4. **Test Expiry (optional):**
   - Create a paste with "60" seconds expiry
   - It should expire after 1 minute

5. **Test View Limit (optional):**
   - Create a paste with "2" max views
   - View it twice
   - Third view should show 404

---

## Part 5: Submission

You need to submit:

### 1. Deployed URL
Your Vercel URL: `https://your-app.vercel.app`

### 2. GitHub Repository URL
Your GitHub repo: `https://github.com/YOUR_USERNAME/pastebin-lite`

### 3. Short Notes

Example notes to submit:

```
# Implementation Notes

**Persistence Layer:**
I used Vercel KV (Redis) for data persistence. This choice was made because:
- It survives serverless function invocations
- Provides fast read/write operations
- Has a generous free tier
- Integrates seamlessly with Vercel deployment

**Design Decisions:**
- Next.js 14 App Router for modern React patterns and server components
- TypeScript for type safety
- Tailwind CSS for responsive, professional UI
- Monospace fonts for a developer-focused aesthetic
- All pastes stored as JSON with view counting and TTL logic

**Architecture:**
- Each API endpoint is a serverless function
- Content is safely rendered to prevent XSS attacks
- Supports TEST_MODE for deterministic testing
- Mobile-responsive design

**Testing:**
All automated tests should pass including:
- Health check endpoint
- Paste creation with constraints
- View limits
- TTL expiry
- Combined constraints
```

---

## 🆘 Troubleshooting

### Problem: "npm install" fails
**Solution:** Make sure Node.js is installed. Try:
```bash
npm cache clean --force
npm install
```

### Problem: "KV is not defined" error locally
**Solution:** Make sure `.env.local` file exists with correct credentials

### Problem: Deployment fails on Vercel
**Solution:** 
1. Check the deployment logs on Vercel
2. Make sure KV database is connected
3. Try redeploying

### Problem: GitHub push asks for password
**Solution:** 
1. Go to GitHub Settings → Developer Settings → Personal Access Tokens
2. Generate new token (classic)
3. Use token as password when pushing

### Problem: 404 on deployed app
**Solution:**
1. Go to Vercel project → Storage tab
2. Make sure KV database is connected
3. Redeploy

---

## 📞 Need Help?

If you get stuck:

1. **Check the logs:**
   - Vercel: Project → Deployments → Click on deployment → Check logs
   - Local: Look at terminal output

2. **Verify environment variables:**
   - Vercel: Project → Settings → Environment Variables
   - Make sure KV credentials are set

3. **Common issues:**
   - Clear browser cache
   - Try incognito mode
   - Check if KV database is in the same region

---

## ✅ Final Checklist Before Submitting

- [ ] App runs locally with `npm run dev`
- [ ] Code is pushed to GitHub
- [ ] App is deployed on Vercel
- [ ] KV database is connected
- [ ] `/api/healthz` returns `{"ok":true}`
- [ ] Can create and view pastes
- [ ] View limits work
- [ ] TTL expiry works
- [ ] Mobile responsive
- [ ] README.md is complete

---

## 🎉 You're Done!

Congratulations! You've built and deployed a production-ready Pastebin application.

**What you've accomplished:**
✅ Set up a modern Next.js application
✅ Integrated a serverless database
✅ Created a beautiful, professional UI
✅ Deployed to production
✅ Implemented complex features (TTL, view limits)

This is interview-ready work. Good luck! 🚀
