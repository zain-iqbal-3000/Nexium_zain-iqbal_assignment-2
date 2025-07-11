# 🤖 AI Blog Summarizer

A simple yet powerful web application that scrapes blog content from URLs and provides AI-powered summaries using static logic simulation.

## 🌟 Features

- **Web Scraping**: Extracts clean text content from blog URLs
- **AI Summary Generation**: Simulates AI summarization using intelligent static logic
- **Keyword Extraction**: Identifies key topics and themes
- **Key Points Analysis**: Highlights the most important sentences
- **Modern Web Interface**: Beautiful, responsive design
- **CLI Support**: Command-line interface for batch processing
- **Compression Analytics**: Shows summary efficiency metrics

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- pip (Python package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/zain-iqbal-3000/Nexium_zain-iqbal_assignment-2.git
   cd Nexium_zain-iqbal_assignment-2
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the web application**
   
   **Option A: Using the batch file (Windows)**
   ```cmd
   start.bat
   ```
   
   **Option B: Using Python directly**
   ```bash
   python app.py
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

## 💻 Usage

### Web Interface

1. **Enter a blog URL** in the input field
2. **Click "Summarize"** or press Enter
3. **View the results** including:
   - Article title and statistics
   - AI-generated summary
   - Key topics/keywords
   - Important points
   - Compression analytics

### Command Line Interface

```bash
python cli_summarizer.py <blog_url>
```

**Example:**
```bash
python cli_summarizer.py https://blog.openai.com/gpt-4
```

### Testing the Application

Run the test suite to verify functionality:

```bash
python test_summarizer.py
```

Or run the interactive demo:

```bash
python demo.py
```

## 🏗️ Architecture

### Core Components

1. **BlogScraper Class**
   - URL validation and content fetching
   - HTML parsing and content extraction
   - Text cleaning and normalization

2. **AISummarizer Class**
   - Keyword extraction using frequency analysis
   - Sentence scoring and ranking
   - Static logic summary generation
   - Compression ratio calculation

3. **Flask Web Application**
   - RESTful API endpoints
   - Modern responsive frontend
   - Real-time processing feedback

### How the AI Simulation Works

The summarizer uses sophisticated static logic to simulate AI behavior:

- **Keyword Extraction**: Frequency analysis with stop-word filtering
- **Sentence Scoring**: Position and length-based importance scoring
- **Summary Generation**: Template-based approach with dynamic content insertion
- **Compression Analysis**: Statistical analysis of content reduction

## 📁 Project Structure

```
Nexium_zain-iqbal_assignment-2/
├── app.py                 # Main Flask application
├── cli_summarizer.py      # Command-line interface
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html        # Web interface
├── README.md             # This file
└── LICENSE               # License information
```

## 🛠️ Technical Details

### Dependencies

- **Flask**: Web framework for the application
- **Requests**: HTTP library for web scraping
- **BeautifulSoup4**: HTML parsing and content extraction
- **lxml**: Fast XML and HTML parser

### Supported Content Types

- Blog posts and articles
- News articles
- Medium articles
- Technical documentation
- Any HTML content with text

### Content Extraction Strategy

1. **Primary selectors**: `article`, `.post-content`, `.entry-content`
2. **Fallback selectors**: `main`, `.content`, `.post-body`
3. **Final fallback**: Extract from `body` tag
4. **Cleanup**: Remove scripts, styles, navigation elements

## 🎯 Example URLs to Try

- OpenAI Blog: `https://blog.openai.com/gpt-4`
- Medium Articles: `https://medium.com/@username/article-title`
- TechCrunch: `https://techcrunch.com/article-title`
- Personal Blogs: Any blog with standard HTML structure

## 🔧 Configuration

### Customizing Summary Length

Edit the `target_length` parameter in the `generate_summary` method:

```python
summary_result = summarizer.generate_summary(
    title, content, target_length=200  # Adjust as needed
)
```

### Adding Custom Content Selectors

Modify the `content_selectors` list in `BlogScraper._extract_content()`:

```python
content_selectors = [
    'article',
    '.post-content',
    '.your-custom-selector',  # Add your selectors here
    # ... existing selectors
]
```

## 🚨 Error Handling

The application handles various error scenarios:

- Invalid URLs
- Network timeouts
- Content extraction failures
- Parsing errors
- Empty content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -am 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Zain Iqbal**
- GitHub: [@zain-iqbal-3000](https://github.com/zain-iqbal-3000)

## 🙏 Acknowledgments

- Built for Nexium Assignment 2
- Inspired by modern AI summarization tools
- Uses static logic to simulate AI behavior effectively
