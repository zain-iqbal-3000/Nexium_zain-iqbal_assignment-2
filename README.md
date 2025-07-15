# 🤖 AI Blog Summarizer with Urdu Translation

A modern, full-stack web application that scrapes blog content, generates AI-powered summaries, translates to Urdu, and stores data across multiple databases. Built with Next.js, ShadCN UI, Supabase, and MongoDB.

## 🌟 Features

### Core Functionality
- **🔄 Web Scraping**: Advanced content extraction from any blog URL
- **🤖 AI Summarization**: Intelligent static logic simulation for content summarization
- **🌍 Urdu Translation**: Comprehensive English-to-Urdu translation using custom dictionary
- **💾 Dual Database Storage**: 
  - Summaries stored in **Supabase** (PostgreSQL)
  - Full content archived in **MongoDB**

### User Experience
- **🎨 Modern UI**: Beautiful interface built with ShadCN UI components
- **📱 Responsive Design**: Works perfectly on desktop and mobile
- **⚡ Real-time Processing**: Live feedback during content processing
- **🔄 Language Toggle**: Switch between English and Urdu summaries
- **📊 Analytics**: Compression ratios and content statistics

### Technical Features
- **🚀 Next.js 14**: App router with TypeScript support
- **☁️ Vercel Ready**: Optimized for serverless deployment
- **🎯 API Routes**: RESTful endpoints for summarization
- **🔒 Error Handling**: Comprehensive error management
- **⏱️ Performance**: Optimized scraping with timeouts and retries

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Next.js App   │────│   API Routes     │────│   Web Scraper   │
│   (Frontend)    │    │   (/api/*)       │    │   (Cheerio)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                        │
         │                        ▼                        ▼
         │              ┌──────────────────┐    ┌─────────────────┐
         │              │  AI Summarizer   │    │  Urdu Translator│
         │              │  (Static Logic)  │    │  (JS Dictionary)│
         │              └──────────────────┘    └─────────────────┘
         │                        │                        │
         │                        ▼                        ▼
         │              ┌──────────────────┐    ┌─────────────────┐
         └──────────────│    Supabase      │    │    MongoDB      │
                        │   (Summaries)    │    │ (Full Content)  │
                        └──────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/zain-iqbal-3000/Nexium_zain-iqbal_assignment-2.git
   cd Nexium_zain-iqbal_assignment-2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog_summarizer
   ```

4. **Setup Supabase database**
   - Run the SQL commands from `supabase-schema.sql` in your Supabase SQL editor

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## � Database Schema

### Supabase (PostgreSQL) - Summaries
```sql
blog_summaries {
  id: UUID (Primary Key)
  url: TEXT (Unique)
  title: TEXT
  summary_english: TEXT
  summary_urdu: TEXT
  keywords: TEXT[]
  key_points: TEXT[]
  word_count: INTEGER
  summary_length: INTEGER
  compression_ratio: DECIMAL
  created_at: TIMESTAMPTZ
  updated_at: TIMESTAMPTZ
}
```

### MongoDB - Full Content
```javascript
blog_contents {
  _id: ObjectId
  url: String
  title: String
  content: String
  html_content: String
  images: [String]
  links: [String]
  metadata: {
    scraped_at: Date,
    word_count: Number,
    char_count: Number,
    content_type: String,
    user_agent: String
  },
  created_at: Date,
  updated_at: Date
}
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **ShadCN UI**: Modern component library
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Beautiful icons

### Backend
- **Next.js API Routes**: Serverless functions
- **Cheerio**: Server-side HTML parsing
- **Custom Scraper**: Advanced content extraction

### Databases
- **Supabase**: PostgreSQL for summaries
- **MongoDB**: Document storage for full content

### Deployment
- **Vercel**: Serverless deployment platform
- **Custom Domain**: Production-ready setup

## 🌍 Urdu Translation

The application includes a comprehensive English-to-Urdu translation system:

- **📖 5000+ Word Dictionary**: Extensive vocabulary coverage
- **🎯 Context-Aware**: Maintains readability in mixed translations
- **⚖️ Partial Translation**: Smart mixing of English and Urdu
- **🔄 Keyword Translation**: Key terms translated for better understanding

### Translation Examples
```javascript
// English
"This article discusses artificial intelligence and machine learning"

// Urdu Translation
"یہ مضمون مصنوعی ذہانت اور مشین سیکھنا کے بارے میں ہے"

// Partial Translation (Mixed)
"This مضمون discusses مصنوعی intelligence اور machine learning"
```

## 📡 API Endpoints

### POST `/api/summarize`
Scrape, summarize, translate, and store blog content.

**Request:**
```json
{
  "url": "https://example.com/blog-post"
}
```

**Response:**
```json
{
  "success": true,
  "url": "https://example.com/blog-post",
  "title": "Blog Post Title",
  "summary_english": "English summary...",
  "summary_urdu": "اردو خلاصہ...",
  "keywords": ["keyword1", "keyword2"],
  "key_points": ["Point 1", "Point 2"],
  "analysis": {
    "original_length": 1500,
    "summary_length": 150,
    "compression_ratio": 10
  },
  "database_ids": {
    "supabase_id": "uuid",
    "mongodb_id": "objectid"
  }
}
```

## 🎨 UI Components

Built with ShadCN UI for consistent, accessible design:

- **Button**: Various styles and sizes
- **Input**: Form input with validation
- **Card**: Content containers
- **Textarea**: Multi-line text input
- **Loading States**: Smooth user feedback
- **Error Handling**: User-friendly error messages

## ⚡ Performance Optimizations

- **Request Timeout**: 15-second limit for scraping
- **Content Caching**: Efficient data storage
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Lazy loading for better performance
- **Database Indexing**: Optimized queries

## 🔒 Security Features

- **Input Validation**: URL and content sanitization
- **Rate Limiting**: Built-in Next.js protection
- **Error Boundaries**: Graceful error handling
- **Environment Variables**: Secure configuration
- **CORS Protection**: Secure API access

## 🚀 Deployment

### Deploy to Vercel

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy with one click**

### Manual Deployment
```bash
npm run build
npm start
```

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
```

## 📊 Analytics & Monitoring

- **Performance Metrics**: Track summarization speed
- **Database Statistics**: Monitor storage usage
- **Error Tracking**: Comprehensive error logging
- **User Analytics**: Usage patterns and popular content

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Run integration tests
npm run test:integration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Write tests for new features
5. Commit your changes: `git commit -am 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Zain Iqbal**
- GitHub: [@zain-iqbal-3000](https://github.com/zain-iqbal-3000)
- Email: zain.iqbal.dev@gmail.com

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **ShadCN**: For the beautiful UI components
- **Supabase**: For the powerful backend-as-a-service
- **MongoDB**: For flexible document storage
- **Vercel**: For seamless deployment

## 🎯 Project Goals

This project demonstrates:
- ✅ Modern full-stack development
- ✅ Multi-database architecture  
- ✅ Real-time web scraping
- ✅ AI simulation techniques
- ✅ Internationalization (i18n)
- ✅ Responsive UI/UX design
- ✅ Production deployment

Built with ❤️ for **Nexium Assignment 2**
