# Tiktok Comments Scraper

## Overview

This project is built using Python and React

## Features

- Get comments from any Tiktok Url.
- Python Flask for backend API.
- Axios, React-toast, tailwind css for frontend

## Installation and Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/kavindu-udara/tiktok-comment-scraper.git
   ```

2. Navigate to the project directory:

   ```bash
   cd tiktok-comment-scraper
   ```

3. Setup Backend:

   ```bash
   cd backend
   pyhton -m venv .venv
   source .venv/bin/activate # On Windows use `.venv\Scripts\activate`
   pip install -r requirements.txt
   copy .env.example .env
   python app.py 
   ```

4. Setup Frontend:

   ```bash
   cd frontend
   npm install
   copy .env.example .env
   npm run dev
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements, bug fixes, or feature requests.