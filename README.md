# PDF Generation Service

> A stateless PDF generation microservice with live preview capabilities

[![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Overview

A lightweight PDF generation microservice built with Node.js, Express, and pdf-lib. Generate PDFs from markdown-style content through a simple REST API, with a React-based preview interface.

### Why This Service?

- **Decouples PDF logic** from your main application
- **Lightweight solution** using pdf-lib (no browser dependencies like Puppeteer)
- **Stateless architecture** - no database or file storage needed
- **Easy to use** - simple REST API that works with any tech stack

## Features

- RESTful API for PDF generation
- Multi-page support with automatic page breaks
- Headers and footers with dates and page numbers
- Markdown-style formatting (headings, lists, paragraphs)
- Live preview interface
- Clean MVC architecture

## Technology Stack

**Backend:**
- Node.js + Express.js
- pdf-lib for PDF generation
- CORS middleware

**Frontend:**
- React 18 + Vite
- Fetch API for downloads
- Responsive CSS

## Project Structure

```
pdf-service/
│
├── backend/
│   ├── controllers/          # Request handlers
│   ├── routes/              # API endpoints
│   ├── services/            # PDF generation logic
│   ├── utils/               # Helper functions
│   ├── config/              # Configuration
│   └── index.js             # Entry point
│
└── frontend/
    ├── src/
    │   ├── App.jsx          # Main component
    │   └── main.jsx         # Entry point
    └── vite.config.js
```

## Quick Start

### Prerequisites

- Node.js 16.x or higher
- npm 7+

### Installation

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

## API Documentation

### Generate PDF

**Endpoint**

```http
POST http://localhost:5002/pdf/generate
```

**Request Body**

```json
{
  "title": "Monthly Report",
  "content": "# Executive Summary\n- Q1 Revenue: ₹2.5M\n- Growth Rate: 25%\n\n## Key Achievements\nSuccessfully launched new product line."
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Document title (appears in header) |
| `content` | string | Yes | Markdown-formatted content |

**Response**

Returns PDF file with proper headers for download.

**Example using cURL**

```bash
curl -X POST http://localhost:5002/pdf/generate \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Report",
    "content": "# Report Details\n- Category: Sales\n- Amount: ₹2500"
  }' \
  --output report.pdf
```

**Example using JavaScript**

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
```

## Content Formatting

The service supports markdown-inspired syntax:

### Headings

```markdown
# Primary Heading (H1)
## Secondary Heading (H2)
```

### Lists

```markdown
- First item
- Second item
- Third item
```

### Paragraphs

```markdown
Regular paragraph text with automatic line wrapping.

Multiple paragraphs are separated by blank lines.
```

### Complete Example

```json
{
  "title": "Project Status Report",
  "content": "# Project Overview\n\n- Project: PDF Microservice\n- Status: Completed\n- Timeline: 2 weeks\n\n## Deliverables\n\n- REST API for PDF generation\n- React-based preview interface\n- Complete documentation\n\n## Next Steps\n\nDeploy and monitor performance."
}
```

## Architecture

### Stateless Design

```
Request → Process → Response
```

- No database needed
- No file storage
- Each request is independent
- Easy to scale horizontally

### Clean Code Structure

```
Routes → Controllers → Services → Utils
```

Each layer has a clear responsibility, making the code easy to test and maintain.

## Basic Setup Notes

### Environment Variables

Create `.env` in backend directory:

```env
PORT=5002
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Optional: Input Validation

For production use, consider adding validation:

```bash
npm install express-validator
```

```javascript
const { body, validationResult } = require('express-validator');

app.post('/pdf/generate', [
  body('title').isString().isLength({ min: 1, max: 200 }),
  body('content').isString().isLength({ min: 1, max: 50000 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process request
});
```

### Optional: Payload Limits

```javascript
app.use(express.json({ limit: '1mb' }));
```

## Troubleshooting

### PDF Won't Open After Download

Make sure backend sets proper headers:

```javascript
res.setHeader('Content-Type', 'application/pdf');
res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
```

Frontend must handle binary data correctly:

```javascript
const blob = await response.blob();  // Not .json()
```

## Future Enhancements

- Bold, italic, underline support
- Table generation
- Image embedding
- Custom fonts and colors
- PDF templates

## License
MIT License - see LICENSE file for details.

## Author

Naina Kothari  
GitHub: [@NainaKothari-14](https://github.com/NainaKothari-14)

---

Built with [pdf-lib](https://pdf-lib.js.org/)
