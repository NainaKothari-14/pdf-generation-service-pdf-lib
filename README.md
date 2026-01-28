# PDF Generation Service: Markdown-Based Document Creation Platform

> A stateless Node.js microservice for generating professional PDFs from markdown-style content.

A professional, stateless PDF generation microservice built with Node.js, Express, and pdf-lib. Generate multi-page PDFs with markdown formatting, real-time preview, and instant downloads—no browser dependencies required.

[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub](https://img.shields.io/badge/Star-on%20GitHub-yellow?style=for-the-badge&logo=github)](https://github.com/NainaKothari-14)

## TL;DR Quick Start

```bash
# Clone and install
git clone <your-repository-url>
cd pdf-generation-service

# Backend
cd backend
npm install
npm start  # Runs on http://localhost:5002

# Frontend (in new terminal)
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

Open `http://localhost:5173`, enter title and markdown content, preview your pages, and download your PDF.

**Quick Test Example:**
```
Title: My First PDF
Content: # Welcome\n- This is item 1\n- This is item 2\n\n## Summary\nPDF generated successfully!
```

## Table of Contents
- [Why PDF Generation Service](#why-pdf-generation-service)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Reference](#api-reference)
- [Content Formatting](#content-formatting)
  - [Headings](#headings)
  - [Lists](#lists)
  - [Paragraphs](#paragraphs)
  - [Complete Example](#complete-formatting-example)
- [Configuration](#configuration)
- [Screenshots](#screenshots)
  - [PDF Generator Interface](#pdf-generator-interface)
  - [Live Preview](#live-preview)
  - [Downloaded PDF](#downloaded-pdf)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [License](#license)

## Why PDF Generation Service

PDF Generation Service simplifies professional document creation through a clean, stateless microservice architecture. It eliminates the need for complex PDF libraries in client applications and provides a unified interface for generating markdown-formatted documents.

**Key Benefits:**
- **Decouples PDF logic** from your main application
- **Lightweight solution** using pdf-lib (no browser dependencies like Puppeteer)
- **Stateless architecture** - No database or file storage needed
- **Easy to use** - Simple REST API that works with any tech stack
- **Horizontal scaling** - Each request is independent
- **Production-ready** - Clean MVC architecture for maintainability

**Perfect For:**
- Reports and documentation
- Business letters and memos
- Meeting notes and summaries
- Project documentation
- Any markdown-formatted content that needs PDF output

## Features

- **Markdown-Style Formatting**: Support for headings (`#`, `##`), bullet lists (`-`), and paragraphs
- **Multi-Page Support**: Automatic page breaks with intelligent content flow
- **Headers & Footers**: Professional layout with dates and page numbers
- **Real-time Preview**: See your document layout before generation
- **RESTful API**: Simple POST endpoint for PDF generation
- **Stateless Design**: No session management - perfect for microservices
- **Cross-platform**: Works on Windows, macOS, and Linux
- **Clean Architecture**: MVC pattern for easy maintenance and testing
- **Instant Download**: One-click PDF generation and download

## Architecture

**Core Design Principles:**
- **Stateless Service**: No server-side sessions, each request is self-contained
- **Separation of Concerns**: Frontend preview separate from backend generation
- **MVC Pattern**: Controllers, Services, and Utils clearly separated
- **Microservice Ready**: Designed for containerization and orchestration

**How It Works:**
```
Request → Routes → Controllers → Services → Utils → Response
```

1. User enters title and markdown content in React frontend
2. Frontend shows real-time page-by-page preview
3. User clicks "Download PDF"
4. POST request sent to backend with title and content
5. Backend parses markdown-style content
6. pdf-lib generates multi-page PDF with headers/footers
7. PDF returned as downloadable file
8. Server cleans up resources (stateless - no file storage)

**Stateless Design Benefits:**
```
Request → Process → Response
```

- No database needed
- No file storage required
- Each request is independent
- Easy to scale horizontally
- Simple deployment and maintenance

## Tech Stack

**Backend:**
- **Node.js & Express** - Lightweight HTTP server
- **pdf-lib** - Pure JavaScript PDF generation (no Chrome/Puppeteer needed)
- **CORS middleware** - Cross-origin request handling
- **MVC Architecture** - Clean separation of concerns

**Frontend:**
- **React 18** - Interactive UI with hooks
- **Vite** - Fast development and builds
- **Fetch API** - Binary download handling
- **Responsive CSS** - Clean, professional interface

**Why pdf-lib Over Puppeteer?**
- Smaller footprint (no headless browser)
- Faster startup and generation
- Lower memory usage
- Easier deployment (no Chrome dependencies)
- Better for microservices

## Installation

**Prerequisites:**
- Node.js 16.x or higher
- npm 7+
- 500MB free disk space (no Chrome required!)

**Setup Steps:**

**1. Clone the repository**

```bash
git clone <your-repository-url>
cd pdf-generation-service
```

**2. Backend Setup**

```bash
cd backend
npm install
npm start
```

Backend runs at `http://localhost:5002`

**3. Frontend Setup**

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

**4. Verify Installation**

1. Navigate to `http://localhost:5173`
2. Enter sample title: "Test Document"
3. Enter sample content: `# Hello\n- Item 1\n- Item 2`
4. Click "Preview" to see page layout
5. Click "Download PDF"
6. Verify PDF downloads and opens correctly

## API Reference

### POST /pdf/generate

Generate a multi-page PDF document from markdown-formatted content.

**Endpoint:** `http://localhost:5002/pdf/generate`

**Request Body:**
```json
{
  "title": "Monthly Report",
  "content": "# Executive Summary\n- Q1 Revenue: ₹2.5M\n- Growth Rate: 25%\n\n## Key Achievements\nSuccessfully launched new product line."
}
```

**Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Document title (appears in header, max 200 chars) |
| `content` | string | Yes | Markdown-formatted content (max 50,000 chars) |

**Response:**
- **Status**: 200 OK
- **Content-Type**: `application/pdf`
- **Content-Disposition**: `attachment; filename="document.pdf"`
- **Body**: Binary PDF data with headers, footers, and page numbers

**Success Response Example:**
```
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="document.pdf"
Content-Length: 45678

[Binary PDF Data]
```

**Error Responses:**

| Status | Description |
|--------|-------------|
| `400` | Missing required fields (title or content) |
| `400` | Content exceeds maximum length |
| `500` | PDF generation failed |

**Example with cURL:**

```bash
curl -X POST http://localhost:5002/pdf/generate \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Project Report",
    "content": "# Project Overview\n- Status: Complete\n- Budget: On track\n\n## Summary\nAll milestones achieved."
  }' \
  --output report.pdf
```

**Example with JavaScript (Browser):**

```javascript
const response = await fetch('http://localhost:5002/pdf/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Monthly Report',
    content: '# Summary\n- Revenue increased\n- Costs decreased'
  })
});

const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'report.pdf';
a.click();
window.URL.revokeObjectURL(url);
```

**Example with Node.js:**

```javascript
const fs = require('fs');
const fetch = require('node-fetch');

const response = await fetch('http://localhost:5002/pdf/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Report',
    content: '# Data\n- Item 1\n- Item 2'
  })
});

const buffer = await response.buffer();
fs.writeFileSync('output.pdf', buffer);
```

## Content Formatting

The service supports markdown-inspired syntax for professional document formatting.

### Headings

Create visual hierarchy with heading levels:

```markdown
# Primary Heading (H1)
Large, bold heading for main sections

## Secondary Heading (H2)
Medium heading for subsections
```

**In PDF Output:**
- H1: 24pt font, bold, extra spacing
- H2: 18pt font, bold, moderate spacing

### Lists

Create bullet-point lists for clarity:

```markdown
- First item
- Second item
- Third item
```

**Features:**
- Automatic bullet rendering
- Proper indentation
- Consistent spacing
- Works across page breaks

### Paragraphs

Regular text with automatic line wrapping:

```markdown
Regular paragraph text with automatic line wrapping
and proper spacing.

Multiple paragraphs are separated by blank lines
for clear readability.
```

**Features:**
- Automatic word wrapping
- Proper line spacing
- Page break handling
- Professional margins

### Complete Formatting Example

```json
{
  "title": "Q4 Business Review",
  "content": "# Executive Summary\n\nThis report provides a comprehensive overview of Q4 performance.\n\n## Financial Highlights\n\n- Revenue: ₹5.2M (up 15% YoY)\n- Profit Margin: 22%\n- Customer Growth: 1,250 new customers\n\n## Key Achievements\n\n- Launched mobile app\n- Expanded to 3 new markets\n- Improved customer satisfaction by 18%\n\n# Strategic Initiatives\n\n## Product Development\n\nCompleted development of next-generation platform with enhanced features and improved user experience.\n\n## Market Expansion\n\nSuccessfully entered Asian market with strong initial reception.\n\n# Conclusion\n\nStrong performance across all metrics positions us well for continued growth in the coming year."
}
```

**Best Practices:**
- Use H1 for major sections
- Use H2 for subsections
- Keep lists concise and focused
- Separate paragraphs with blank lines
- Test long content to verify page breaks

## Configuration

### Backend Environment Variables

Create `.env` file in backend directory:

```env
PORT=5002
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Environment Variables Explained:**

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 5002 | Backend server port |
| `NODE_ENV` | development | Environment mode |
| `CORS_ORIGIN` | http://localhost:5173 | Allowed frontend origin |

### Frontend Configuration

Update API endpoint in `frontend/src/App.jsx` if deploying to different URL:

```javascript
const API_URL = process.env.VITE_API_URL || 'http://localhost:5002';
```

### Optional Production Enhancements

#### Input Validation

For production use, add robust validation:

```bash
npm install express-validator
```

```javascript
const { body, validationResult } = require('express-validator');

app.post('/pdf/generate', [
  body('title')
    .isString()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be 1-200 characters'),
  body('content')
    .isString()
    .isLength({ min: 1, max: 50000 })
    .withMessage('Content must be 1-50,000 characters')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process request
});
```

#### Payload Limits

Prevent large payload attacks:

```javascript
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
```

#### Rate Limiting

Protect against abuse:

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: 'Too many requests, please try again later.'
});

app.use('/pdf/', limiter);
```

#### Request Logging

Track API usage:

```bash
npm install morgan
```

```javascript
const morgan = require('morgan');

app.use(morgan('combined'));
```

## Screenshots

### PDF Generator Interface
<img src="screenshots/PDFGenerator.png" alt="PDF Generator Interface" width="600"/>

*Clean, intuitive interface for creating PDFs with title and markdown content input*

### Live Preview
<img src="screenshots/Preview.png" alt="Live Preview" width="600"/>

*Real-time page-by-page preview showing how your content will flow in the final PDF with headers and footers*

### Downloaded PDF
<img src="screenshots/Downloaded%20pdf.png" alt="Downloaded PDF" width="600"/>

*Professional, multi-page PDF output with headers, footers, page numbers, and formatted markdown content*

## Deployment

### Development Environment

- Local setup with hot reloading
- Debug logging enabled
- CORS for localhost
- No authentication required

### Production Deployment Options

#### Traditional Hosting (VPS)

Deploy to DigitalOcean, AWS EC2, Linode, or similar:

```bash
# Install PM2 for process management
npm install -g pm2

# Start backend
cd backend
pm2 start index.js --name pdf-backend

# Build frontend
cd frontend
npm run build

# Serve frontend with nginx or serve
npm install -g serve
serve -s dist -l 80
```

**Nginx Configuration:**

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location /api {
        proxy_pass http://localhost:5002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        root /var/www/pdf-frontend/dist;
        try_files $uri /index.html;
    }
}
```

#### Platform-as-a-Service

**Heroku:**

```bash
# Create Heroku apps
heroku create pdf-service-backend
heroku create pdf-service-frontend

# Deploy backend
cd backend
git push heroku main

# Deploy frontend
cd frontend
git push heroku main
```

**Railway / Render:**
- Connect GitHub repository
- Set build commands
- Configure environment variables
- Deploy with one click

#### Containerized Deployment (Docker)

**Backend Dockerfile:**

```dockerfile
FROM node:16-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application
COPY . .

EXPOSE 5002

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:5002/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "index.js"]
```

**Frontend Dockerfile:**

```dockerfile
FROM node:16-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5002:5002"
    environment:
      - NODE_ENV=production
      - CORS_ORIGIN=http://localhost
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5002/health"]
      interval: 30s
      timeout: 3s
      retries: 3

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped
```

**Deploy with Docker Compose:**

```bash
docker-compose up -d
```

### Deployment Checklist

- [ ] Set production environment variables
- [ ] Create production build of frontend
- [ ] Configure HTTPS/SSL certificates
- [ ] Set CORS for production domain
- [ ] Enable error logging and monitoring
- [ ] Set up health check endpoints
- [ ] Configure rate limiting
- [ ] Add input validation
- [ ] Test PDF generation under load
- [ ] Set up automated backups (if storing data)
- [ ] Configure CDN for frontend (optional)
- [ ] Set up monitoring (e.g., Sentry, LogRocket)

## Security

### Essential Security Measures

#### Input Validation & Sanitization

**Prevent XSS and Injection:**

```javascript
const validator = require('validator');

function sanitizeInput(input) {
  return validator.escape(input.trim());
}

app.post('/pdf/generate', (req, res) => {
  const title = sanitizeInput(req.body.title);
  const content = sanitizeInput(req.body.content);
  
  // Validate length
  if (title.length > 200 || content.length > 50000) {
    return res.status(400).json({ error: 'Input exceeds maximum length' });
  }
  
  // Process request
});
```

#### Rate Limiting

Protect against DoS attacks:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many PDF generation requests, please try again later.'
});

app.use('/pdf/', limiter);
```

#### API Security

**Authentication (Production):**

```javascript
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

app.post('/pdf/generate', authenticateToken, generatePDF);
```

#### HTTPS/SSL

Always use HTTPS in production:

```javascript
// Force HTTPS redirect
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});
```

#### CORS Configuration

Restrict to trusted origins:

```javascript
const cors = require('cors');

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(cors(corsOptions));
```

#### Dependency Security

```bash
# Regular security audits
npm audit

# Automatic fixes
npm audit fix

# Update dependencies
npm update

# Use npm-check for updates
npx npm-check -u
```

#### Data Privacy

- **Don't log sensitive content** in production
- **Implement data retention policies** if storing PDFs
- **Consider GDPR compliance** for EU users
- **Sanitize error messages** (don't expose internal details)

## Contributing

We welcome contributions from the community!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Write clear, commented code
   - Follow existing code style
   - Add tests if applicable
4. **Commit your changes**
   ```bash
   git commit -m 'Add: Brief description of your feature'
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Include screenshots if UI changes

### Code Standards

- **Formatting**: Follow existing code style
- **Naming**: Use meaningful, descriptive names
- **Comments**: Add comments for complex logic
- **Functions**: Keep functions focused and small
- **ES6+**: Use modern JavaScript features
- **Error Handling**: Always handle errors appropriately

### Areas for Contribution

- Bug fixes and issue resolution
- Documentation improvements
- New markdown formatting features
- Performance optimizations
- Test coverage expansion
- UI/UX enhancements
- Additional export formats

## Troubleshooting

### Common Issues and Solutions

#### PDF Won't Open After Download

**Problem:** Downloaded PDF is corrupted or won't open

**Solution:** Verify backend sets proper headers:

```javascript
res.setHeader('Content-Type', 'application/pdf');
res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
```

Frontend must handle binary data correctly:

```javascript
const blob = await response.blob();  // NOT .json()
const url = window.URL.createObjectURL(blob);
```

#### CORS Errors

**Problem:** Browser console shows CORS policy errors

**Solution:** Configure CORS properly in backend:

```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
```

Verify frontend is requesting from allowed origin.

#### Multi-Page Issues

**Problem:** Content gets cut off or page breaks are incorrect

**Solution:** Check page break logic in `pdfService.js`:
- Verify bottom margin calculation
- Reserve footer space before page breaks
- Confirm new page creation when content exceeds threshold
- Test with various content lengths

#### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5002`

**Solution:** Change port or stop conflicting process:

```bash
# Find process on port 5002
lsof -i :5002  # macOS/Linux
netstat -ano | findstr :5002  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

Or change port in `.env`:

```env
PORT=5003
```

#### Large Content Not Rendering

**Problem:** PDFs with very long content fail to generate

**Solution:** Implement content chunking and pagination:

```javascript
// In pdfService.js
const MAX_LINES_PER_PAGE = 50;

function paginateContent(content) {
  // Split content into manageable chunks
  // Ensure page breaks at logical points
}
```

#### Frontend Build Fails

**Problem:** `npm run build` fails in frontend

**Solution:**

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Update Vite
npm install vite@latest
```

#### Backend Crashes on Startup

**Problem:** Backend server crashes immediately

**Solution:** Check for:
- Missing dependencies: `npm install`
- Port conflicts: Change PORT in `.env`
- Syntax errors: Check recent changes
- Node version: Ensure Node 16+

```bash
# Verify Node version
node --version

# Should be v16.x.x or higher
```

### Getting Help

If you encounter issues not covered here:

1. **Check existing GitHub issues**
2. **Search documentation**
3. **Enable debug logging:**
   ```javascript
   // In backend
   console.log('Debug info:', { title, content });
   ```
4. **Create detailed bug report** with:
   - Error messages
   - Steps to reproduce
   - Environment details
   - Expected vs actual behavior

## Roadmap

### Short-term Goals (Next 3 Months)

**Formatting & Styling:**
- [ ] Bold, italic, and underline text support (`**bold**`, `*italic*`, `__underline__`)
- [ ] Code blocks with syntax highlighting
- [ ] Blockquotes for emphasis
- [ ] Horizontal rules/dividers
- [ ] Custom fonts support
- [ ] Color customization options

**Features:**
- [ ] Table generation for structured data
- [ ] Batch PDF generation from CSV/JSON
- [ ] Page numbering customization
- [ ] Custom header/footer templates
- [ ] Watermark support

**Developer Experience:**
- [ ] Enhanced error messages
- [ ] API documentation with Swagger
- [ ] SDK for popular languages (Python, Ruby, PHP)
- [ ] CLI tool for command-line usage

### Long-term Goals (6-12 Months)

**Media & Content:**
- [ ] Image embedding (logos, photos, diagrams)
- [ ] Chart and graph generation
- [ ] QR code generation
- [ ] Barcode support
- [ ] SVG image support

**Templates & Customization:**
- [ ] Pre-built PDF templates (invoice, report, certificate)
- [ ] Template builder UI
- [ ] Dynamic template variables
- [ ] Custom CSS styling support

**Integration & Storage:**
- [ ] Cloud storage integration (AWS S3, Google Drive, Dropbox)
- [ ] Webhook notifications
- [ ] Async generation with queue system (BullMQ/Redis)
- [ ] Database support for template storage

**Advanced Features:**
- [ ] Digital signatures
- [ ] PDF encryption and password protection
- [ ] PDF merging and splitting
- [ ] PDF editing (rotate, crop pages)
- [ ] OCR for scanned documents
- [ ] Form field support

**Platform Expansion:**
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)
- [ ] WordPress plugin
- [ ] Zapier integration

### Community Wishlist

Vote on features or suggest new ones in GitHub Discussions!

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What This Means

- ✅ Use in private and commercial projects
- ✅ Modify and distribute
- ✅ Sublicense
- ❌ Hold author liable
- ⚠️ Include original copyright notice

## Acknowledgments

**Technologies:**
- **[pdf-lib](https://pdf-lib.js.org/)** - Pure JavaScript PDF generation
- **[Express.js](https://expressjs.com/)** - Fast, minimalist web framework
- **[React](https://reactjs.org/)** - UI library and ecosystem
- **[Vite](https://vitejs.dev/)** - Next-generation build tool

**Inspiration:**
- Modern microservice architecture
- Markdown-first content creation
- Developer-friendly APIs
- Open source community

**Special Thanks:**
- Contributors who report bugs and suggest features
- Open source community for continuous inspiration
- Everyone who stars and shares this project

## Author

**Naina Kothari**  
GitHub: [@NainaKothari-14](https://github.com/NainaKothari-14)

---

## Get Involved

If you found this project helpful, please consider:

- ⭐ **Starring the repository** on GitHub
- 🐛 **Reporting bugs** you encounter
- 💡 **Suggesting features** you'd like to see
- 🔧 **Contributing code** improvements
- 📖 **Improving documentation** for other users
- 📢 **Sharing** with others who might benefit

[![Star on GitHub](https://img.shields.io/badge/Star-on%20GitHub-yellow?style=for-the-badge&logo=github)](https://github.com/NainaKothari-14)

---

**Thank you for using PDF Generation Service!** This project represents a commitment to making PDF generation accessible, flexible, and developer-friendly. Whether you're building a documentation system, report generator, or custom document workflow, we hope this lightweight, stateless service makes your development easier.

Built with ❤️ using **pdf-lib** | Inspired by modern microservice architecture
