# Pastebin Lite

A modern, fast, and secure pastebin application for sharing text snippets with automatic expiry and view limits.

## Features

- 🚀 **Instant Sharing** - Create and share pastes in seconds
- ⏰ **Time-based Expiry** - Set automatic deletion after a specified duration
- 👁️ **View Limits** - Limit how many times a paste can be viewed
- 🎨 **Beautiful UI** - Modern, professional interface with smooth animations
- 🔒 **Secure** - XSS protection and safe content rendering
- 📱 **Responsive** - Works perfectly on all devices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Vercel KV (Redis)
- **Deployment**: Vercel
- **Fonts**: Space Mono, DM Sans

## Persistence Layer

This application uses **Vercel KV** (Redis) as its persistence layer. Vercel KV is a durable, serverless Redis database that:

- Survives across serverless function invocations
- Provides fast read/write operations
- Scales automatically
- Offers a generous free tier

Each paste is stored as a JSON object with the following structure:
```json
{
  "id": "abc123",
  "content": "paste content",
  "createdAt": 1234567890,
  "ttlSeconds": 3600,
  "maxViews": 5,
  "viewCount": 0
}
```

## Local Development Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Vercel account (free)

### Step-by-Step Installation

**1. Clone or download this repository**

```bash
# If you have the code in a folder, navigate to it
cd pastebin-app
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up Vercel KV Database**

a. Go to [Vercel Dashboard](https://vercel.com/dashboard)
b. Click "Storage" in the top menu
c. Click "Create Database"
d. Select "KV" (Redis)
e. Name it (e.g., "pastebin-kv")
f. Click "Create"
g. Go to the ".env.local" tab
h. Copy the environment variables shown

**4. Create environment file**

Create a file named `.env.local` in the project root:

```bash
# Copy the example file
cp .env.local.example .env.local
```

Then edit `.env.local` and paste your Vercel KV credentials:

```env
KV_REST_API_URL=your_kv_rest_api_url_here
KV_REST_API_TOKEN=your_kv_rest_api_token_here
```

**5. Run the development server**

```bash
npm run dev
```

**6. Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

You should see the Pastebin application running!

## Deployment to Vercel

### Step-by-Step Deployment

**1. Install Vercel CLI (optional but recommended)**

```bash
npm install -g vercel
```

**2. Push code to GitHub**

a. Create a new repository on GitHub
b. Initialize git in your project:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

**3. Deploy on Vercel**

**Option A: Using Vercel Dashboard (Easiest)**

a. Go to [Vercel Dashboard](https://vercel.com/dashboard)
b. Click "Add New" → "Project"
c. Import your GitHub repository
d. Vercel will auto-detect Next.js settings
e. Go to "Storage" and connect your KV database
f. Click "Deploy"

**Option B: Using Vercel CLI**

```bash
vercel
```

Follow the prompts:
- Link to existing project or create new? → Create new
- Project name? → pastebin-lite (or your choice)
- Directory? → ./ (press Enter)
- Deploy? → Yes

**4. Connect KV Database to Project**

a. In Vercel Dashboard, go to your project
b. Click "Storage" tab
c. Click "Connect Store"
d. Select your KV database
e. Click "Connect"
f. Redeploy if needed

**5. Get your deployed URL**

After deployment completes, Vercel will provide a URL like:
`https://your-project.vercel.app`

## API Endpoints

### Health Check
```
GET /api/healthz
```

### Create Paste
```
POST /api/pastes
Content-Type: application/json

{
  "content": "your text here",
  "ttl_seconds": 3600,    // optional
  "max_views": 5          // optional
}
```

### Get Paste (API)
```
GET /api/pastes/:id
```

### View Paste (HTML)
```
GET /p/:id
```

## Testing

The application supports deterministic testing via the `TEST_MODE` environment variable and `x-test-now-ms` header as specified in the requirements.

## Design Decisions

### Architecture
- **Next.js App Router**: Modern React framework with server components for optimal performance
- **TypeScript**: Type safety and better developer experience
- **Serverless Functions**: Each API route is a serverless function for scalability

### UI/UX
- **Cyberpunk-inspired design**: Dark theme with emerald/teal accents
- **Monospace font (Space Mono)**: Technical, developer-friendly aesthetic
- **Smooth animations**: Subtle transitions and micro-interactions
- **Mobile-first responsive**: Works seamlessly on all screen sizes

### Security
- Content is rendered as plain text in `<pre>` tags to prevent XSS
- No HTML parsing or execution of user content
- Input validation on all API endpoints

### Performance
- Server-side rendering for paste view pages
- Efficient KV lookups with single-key operations
- Minimal client-side JavaScript

## Project Structure

```
pastebin-app/
├── app/
│   ├── api/
│   │   ├── healthz/
│   │   │   └── route.ts          # Health check endpoint
│   │   └── pastes/
│   │       ├── route.ts           # POST /api/pastes
│   │       └── [id]/
│   │           └── route.ts       # GET /api/pastes/:id
│   ├── p/
│   │   └── [id]/
│   │       ├── page.tsx           # HTML paste view
│   │       └── not-found.tsx      # 404 page
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   └── globals.css                # Global styles
├── lib/
│   └── db.ts                      # Database utilities
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## Troubleshooting

**Issue: "KV is not defined" error**
- Solution: Make sure you've set up `.env.local` with valid KV credentials

**Issue: 404 on deployed site**
- Solution: Ensure KV database is connected in Vercel project settings

**Issue: Pastes not persisting**
- Solution: Check that KV_REST_API_URL and KV_REST_API_TOKEN are set correctly

## Support

For issues or questions about this implementation, please refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel KV Documentation](https://vercel.com/docs/storage/vercel-kv)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

MIT
