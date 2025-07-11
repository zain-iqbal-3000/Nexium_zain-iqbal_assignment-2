"""
Blog Summarizer Application
A simple web application that scrapes blog content from URLs and provides AI-powered summaries.
"""

from flask import Flask, render_template, request, jsonify
import requests
from bs4 import BeautifulSoup
import re
from urllib.parse import urlparse
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)

class BlogScraper:
    """Handles web scraping functionality for blog content."""
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
    
    def scrape_blog_content(self, url):
        """
        Scrape text content from a blog URL.
        
        Args:
            url (str): The blog URL to scrape
            
        Returns:
            dict: Contains title, content, and metadata
        """
        try:
            # Validate URL
            if not self._is_valid_url(url):
                raise ValueError("Invalid URL format")
            
            # Fetch the webpage
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            
            # Parse HTML content
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract title
            title = self._extract_title(soup)
            
            # Extract main content
            content = self._extract_content(soup)
            
            # Clean and process text
            cleaned_content = self._clean_text(content)
            
            return {
                'success': True,
                'url': url,
                'title': title,
                'content': cleaned_content,
                'word_count': len(cleaned_content.split()),
                'char_count': len(cleaned_content)
            }
            
        except requests.RequestException as e:
            logging.error(f"Request error for URL {url}: {str(e)}")
            return {'success': False, 'error': f"Failed to fetch URL: {str(e)}"}
        except Exception as e:
            logging.error(f"Scraping error for URL {url}: {str(e)}")
            return {'success': False, 'error': f"Scraping failed: {str(e)}"}
    
    def _is_valid_url(self, url):
        """Validate if the URL is properly formatted."""
        try:
            result = urlparse(url)
            return all([result.scheme, result.netloc])
        except:
            return False
    
    def _extract_title(self, soup):
        """Extract page title from HTML."""
        title_tag = soup.find('title')
        if title_tag:
            return title_tag.get_text().strip()
        
        # Try alternative title sources
        h1_tag = soup.find('h1')
        if h1_tag:
            return h1_tag.get_text().strip()
        
        return "No title found"
    
    def _extract_content(self, soup):
        """Extract main content from HTML."""
        # Remove unwanted elements
        for element in soup(['script', 'style', 'nav', 'header', 'footer', 'aside']):
            element.decompose()
        
        # Try to find main content containers
        content_selectors = [
            'article',
            '.post-content',
            '.entry-content',
            '.content',
            'main',
            '.post-body',
            '.article-content'
        ]
        
        for selector in content_selectors:
            content_element = soup.select_one(selector)
            if content_element:
                return content_element.get_text()
        
        # Fallback: extract from body
        body = soup.find('body')
        if body:
            return body.get_text()
        
        return soup.get_text()
    
    def _clean_text(self, text):
        """Clean and normalize extracted text."""
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text)
        
        # Remove special characters that might interfere
        text = re.sub(r'[^\w\s\.\,\!\?\;\:\-\(\)]', '', text)
        
        return text.strip()


class AISummarizer:
    """Simulates AI summarization with static logic."""
    
    def __init__(self):
        self.summary_templates = [
            "This article discusses {topic} and provides insights into {key_points}.",
            "The blog post explores {topic}, highlighting {key_points}.",
            "In this piece, the author examines {topic} with focus on {key_points}.",
            "This content covers {topic}, emphasizing {key_points}."
        ]
    
    def generate_summary(self, title, content, target_length=150):
        """
        Generate a summary using static logic to simulate AI.
        
        Args:
            title (str): Article title
            content (str): Article content
            target_length (int): Target summary length in words
            
        Returns:
            dict: Contains summary and analysis
        """
        try:
            # Extract key information
            sentences = self._split_into_sentences(content)
            keywords = self._extract_keywords(content)
            key_points = self._identify_key_points(sentences)
            
            # Generate summary based on static rules
            summary = self._create_summary(title, sentences, keywords, key_points, target_length)
            
            return {
                'success': True,
                'summary': summary,
                'keywords': keywords[:10],  # Top 10 keywords
                'key_points': key_points[:3],  # Top 3 key points
                'original_length': len(content.split()),
                'summary_length': len(summary.split()),
                'compression_ratio': round(len(summary.split()) / len(content.split()) * 100, 2)
            }
            
        except Exception as e:
            logging.error(f"Summarization error: {str(e)}")
            return {'success': False, 'error': f"Summarization failed: {str(e)}"}
    
    def _split_into_sentences(self, text):
        """Split text into sentences."""
        sentences = re.split(r'[.!?]+', text)
        return [s.strip() for s in sentences if len(s.strip()) > 10]
    
    def _extract_keywords(self, text):
        """Extract keywords using simple frequency analysis."""
        # Common stop words to exclude
        stop_words = {
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 
            'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 
            'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
            'this', 'that', 'these', 'those', 'it', 'they', 'them', 'their'
        }
        
        # Extract words and count frequency
        words = re.findall(r'\b[a-zA-Z]{3,}\b', text.lower())
        word_freq = {}
        
        for word in words:
            if word not in stop_words:
                word_freq[word] = word_freq.get(word, 0) + 1
        
        # Sort by frequency
        sorted_words = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)
        return [word for word, freq in sorted_words]
    
    def _identify_key_points(self, sentences):
        """Identify key points from sentences."""
        # Simple scoring based on sentence length and position
        scored_sentences = []
        
        for i, sentence in enumerate(sentences):
            score = 0
            
            # Position score (earlier sentences are more important)
            if i < len(sentences) * 0.3:
                score += 2
            
            # Length score (medium length sentences are preferred)
            word_count = len(sentence.split())
            if 10 <= word_count <= 30:
                score += 1
            
            scored_sentences.append((sentence, score))
        
        # Sort by score and return top sentences
        scored_sentences.sort(key=lambda x: x[1], reverse=True)
        return [sentence for sentence, score in scored_sentences[:5]]
    
    def _create_summary(self, title, sentences, keywords, key_points, target_length):
        """Create a summary using static rules."""
        summary_parts = []
        
        # Start with title context if available
        if title and title != "No title found":
            summary_parts.append(f"This article titled '{title}' discusses")
        else:
            summary_parts.append("This content covers")
        
        # Add main topics based on keywords
        if keywords:
            main_topics = ", ".join(keywords[:3])
            summary_parts.append(f" {main_topics}")
        
        # Add key insights
        if key_points:
            # Select the most relevant key point
            best_point = key_points[0]
            if len(best_point.split()) > 15:
                best_point = " ".join(best_point.split()[:15]) + "..."
            summary_parts.append(f". The main insight is: {best_point}")
        
        # Combine and ensure target length
        summary = "".join(summary_parts)
        
        # Trim if too long
        words = summary.split()
        if len(words) > target_length:
            summary = " ".join(words[:target_length]) + "..."
        
        return summary


# Initialize components
scraper = BlogScraper()
summarizer = AISummarizer()

@app.route('/')
def index():
    """Main page route."""
    return render_template('index.html')

@app.route('/api/summarize', methods=['POST'])
def summarize_blog():
    """API endpoint to summarize a blog URL."""
    try:
        data = request.get_json()
        url = data.get('url', '').strip()
        
        if not url:
            return jsonify({'success': False, 'error': 'URL is required'})
        
        # Scrape blog content
        scrape_result = scraper.scrape_blog_content(url)
        
        if not scrape_result['success']:
            return jsonify(scrape_result)
        
        # Generate summary
        summary_result = summarizer.generate_summary(
            scrape_result['title'], 
            scrape_result['content']
        )
        
        if not summary_result['success']:
            return jsonify(summary_result)
        
        # Combine results
        response = {
            'success': True,
            'url': scrape_result['url'],
            'title': scrape_result['title'],
            'content_stats': {
                'word_count': scrape_result['word_count'],
                'char_count': scrape_result['char_count']
            },
            'summary': summary_result['summary'],
            'keywords': summary_result['keywords'],
            'key_points': summary_result['key_points'],
            'analysis': {
                'original_length': summary_result['original_length'],
                'summary_length': summary_result['summary_length'],
                'compression_ratio': summary_result['compression_ratio']
            }
        }
        
        return jsonify(response)
        
    except Exception as e:
        logging.error(f"API error: {str(e)}")
        return jsonify({'success': False, 'error': 'Internal server error'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
