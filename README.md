# URL Shortener

A modern URL shortening application built with React and Node.js/Express with MySQL backend.

## Features

- Shorten long URLs with a single click
- Copy shortened URLs to clipboard
- Clean and modern UI with dark theme
- Fast and responsive interface
- Database persistence using MySQL

## Tech Stack

### Frontend
- React 18
- Axios for API calls
- CSS3 with modern styling

### Backend
- Node.js with Express
- MySQL2 for database connection
- CORS for cross-origin requests
- dotenv for environment configuration

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySQL database running locally
- Git

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/JEO-JUSTIN/URL-Shortener.git
cd URL-Shortener
```

2. **Install dependencies**
```bash
npm run install-all
```

3. **Configure database**

Create a MySQL database and table:
```sql
CREATE DATABASE url;
USE url;
CREATE TABLE urls (
  id INT AUTO_INCREMENT PRIMARY KEY,
  url LONGTEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. **Set environment variables**

Create a `.env` file in the root directory:
```
DB_HOST=localhost
DB_USER=jeo
DB_PASSWORD=1234
DB_NAME=url
PORT=5000
```

## Running the Application

### Development Mode (both frontend and backend)
```bash
npm run dev
```

### Run backend only
```bash
npm run server
```

### Run frontend only
```bash
npm run client
```

### Build for production
```bash
npm run build
```

## Usage

1. Open http://localhost:3000 in your browser
2. Enter a long URL in the input field
3. Click "Shorten Link"
4. Copy the shortened URL using the Copy button
5. Share or use the shortened URL

## API Endpoints

### POST /api/shorten
Shortens a URL

**Request:**
```json
{
  "url": "https://example.com/very/long/url"
}
```

**Response:**
```json
{
  "success": true,
  "originalUrl": "https://example.com/very/long/url",
  "shortCode": "MQ==",
  "shortUrl": "http://localhost:5000/MQ=="
}
```

### GET /:code
Redirects to the original URL

**Example:**
```
GET http://localhost:5000/MQ==
```

Redirects to the original URL

## Project Structure

```
URL-Shortener/
├── server/
│   └── server.js          # Express server and API routes
├── client/
│   ├── public/
│   │   └── index.html     # React HTML template
│   └── src/
│       ├── App.js         # Main React component
│       ├── App.css        # Styling
│       ├── index.js       # React entry point
│       └── index.css      # Global styles
├── .env                   # Environment variables (create this)
├── .gitignore             # Git ignore file
├── package.json           # Root package configuration
└── README.md              # This file
```

## Author

JEO-JUSTIN

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
