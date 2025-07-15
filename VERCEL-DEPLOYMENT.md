# Vercel Deployment Guide

## ✅ Quick Setup for Vercel Deployment

### 1. **Environment Variables Setup**
Go to your Vercel project → Settings → Environment Variables and add:

```bash
# Required for MongoDB integration
MONGODB_URI = mongodb+srv://zainiqbal35201:yYKTVsmhrvU7MwAS@cluster0.z5tiocc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# Required for Supabase (your provided URL)
NEXT_PUBLIC_SUPABASE_URL = https://fflwghejparxxievezcf.supabase.co

# Optional - Add if you get a Supabase API key
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_actual_supabase_anon_key

# Production settings
NODE_ENV = production
NEXT_PUBLIC_APP_URL = https://your-vercel-app-url.vercel.app
```

### 2. **Build Configuration**
The project includes:
- ✅ `vercel.json` with proper configuration
- ✅ `tsconfig.json` with path aliases
- ✅ `.gitignore` excluding sensitive files
- ✅ Next.js 14 optimized build

### 3. **Deployment Steps**
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables (step 1)
4. Deploy

### 4. **Troubleshooting**
If build fails:
- Check environment variables are set
- Verify MongoDB URI is correct
- Ensure all dependencies are in package.json

### 5. **Features**
- ✅ Blog content scraping and summarization
- ✅ English & Urdu translation support
- ✅ MongoDB data storage
- ✅ Supabase integration (optional)
- ✅ Dark theme UI with 3-color palette
- ✅ Responsive design
