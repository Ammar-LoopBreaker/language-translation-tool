# Language Translation Tool

A clean, fast, and fully functional **Language Translation Tool** built with pure HTML, CSS, and JavaScript. It translates text between 50+ languages instantly using the free **MyMemory Translation API** — no API key, no sign-up, no backend required.


## Table of Contents

- [About the Project](#about-the-project)
- [Live Demo](#live-demo)
- [Features](#features)
- [Project Structure](#project-structure)
- [File Descriptions](#file-descriptions)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Supported Languages](#supported-languages)
- [Tech Stack](#tech-stack)


## About the Project

This **Language Translation Tool** allows users to translate text between more than 50 languages directly in the browser. It is built entirely with front-end technologies — no server, no framework, no database needed.

The tool uses the **MyMemory Translation API**, which is completely free, requires no API key, and supports CORS — meaning it works directly from any browser without any backend setup.

Key highlights:
- Works by simply opening `index.html` — no installation needed
- Detects source language automatically
- Includes copy to clipboard and text-to-speech features
- Fully responsive for desktop and mobile


## Live Demo

> Open `index.html` directly in your browser — it works instantly without any setup.


## Features

| Feature | Description |
|---|---|
|  **50+ Languages** | Translate between English, Spanish, French, Hindi, Arabic, Japanese, and many more |
|  **Auto Language Detection** | Automatically detects the language of the source text |
|  **Copy to Clipboard** | Copy the translated text with one click |
|  **Text-to-Speech** | Listen to the translated text read aloud in the target language |
|  **Swap Languages** | Instantly swap source and target languages |
|  **Keyboard Shortcut** | Press `Ctrl + Enter` to translate quickly |
|  **Character Counter** | Live character count with a 2000 character limit |
|  **Status Feedback** | Loading, success, and error states shown clearly |
|  **Clear Button** | Reset all fields with one click |
|  **Responsive Design** | Works perfectly on desktop, tablet, and mobile |
|  **Dual-mode Loading** | Works both via double-click AND via a local server |


## Project Structure

```
language-translation-tool/
│
├── index.html          # Main HTML file — structure, inline CSS & JS fallback
│
├── css/
│   └── style.css       # All styles — layout, colours, animations, responsive
│
├── js/
│   └── app.js          # All JavaScript — API call, DOM logic, copy, TTS, swap
│
└── README.md           # Project documentation (this file)
```


## File Descriptions

### `index.html`
The main entry point of the application. It contains:
- Complete HTML structure — header, language selectors, text panels, action buttons
- A `<link>` tag pointing to `css/style.css` for external styling
- A `<script src>` tag pointing to `js/app.js` for external logic
- **Inline CSS and JS fallback** — ensures the tool works perfectly even when opened by double-clicking, without a local server


### `css/style.css`
Contains all the visual styling:
- Soft blue-purple gradient background
- White card layout with rounded corners and shadow
- Styled language dropdowns with custom arrow icon
- Side-by-side translation panels (stacked on mobile)
- Animated spinner for loading state
- Hover and focus effects on all interactive elements
- Fully responsive using CSS Grid and media queries


### `js/app.js`
Contains all the JavaScript logic wrapped inside `DOMContentLoaded`:

| Function / Section | Purpose |
|---|---|
| **Element refs** | Gets all DOM elements by ID on load |
| `getLangName()` | Returns display name for a language code |
| `setStatus()` | Updates the status bar with message and style |
| `resetOutput()` | Clears the output panel and resets buttons |
| `translate()` | Calls MyMemory API and displays the result |
| **Swap listener** | Swaps source/target languages and moves text |
| **Copy listener** | Copies translated text to clipboard |
| **TTS listener** | Reads translation aloud using Web Speech API |
| **Clear listener** | Resets all fields and state |
| **Keyboard shortcut** | Detects `Ctrl+Enter` to trigger translation |


## How It Works

```
User types text + selects languages
             │
             ▼
     Clicks Translate button
     or presses Ctrl + Enter
             │
             ▼
   translate() in app.js is called
             │
             ▼
  Builds API URL with text + language pair
  e.g. https://api.mymemory.translated.net/get
       ?q=Hello&langpair=en|fr
             │
             ▼
     fetch() sends GET request
     to MyMemory Translation API
             │
             ▼
      API returns JSON response
             │
       ┌─────┴──────┐
       │ Success    │ Error
       ▼            ▼
  Show translated  Show error
  text in output   message in
  panel            status bar
       │
       ▼
  Enable Copy + TTS buttons
```


## Getting Started

### Option 1 — Double Click (Quickest)

1. Download or clone the repository
2. Extract the ZIP if downloaded
3. **Double-click `index.html`** — opens in your browser and works immediately

> No setup required. Works in Chrome, Firefox, Edge, and Safari.


### Option 2 — VS Code Live Server (Recommended for Development)

1. Install [VS Code](https://code.visualstudio.com/)
2. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
3. Open the project folder in VS Code
4. Right-click `index.html` → **Open with Live Server**
5. The tool opens at `http://127.0.0.1:5500`


### Option 3 — Python Local Server

```bash
# Clone the repository
git clone https://github.com/your-username/language-translation-tool.git

# Navigate into the project folder
cd language-translation-tool

# Start a local server with Python 3
python -m http.server 8000

# Open in browser
# http://localhost:8000
```


### Option 4 — Node.js Local Server

```bash
# Clone the repository
git clone https://github.com/your-username/language-translation-tool.git

# Navigate into the project folder
cd language-translation-tool

# Run with npx serve
npx serve .

# Open the URL shown in the terminal
```


### Option 5 — Clone with Git

```bash
# Clone
git clone https://github.com/your-username/language-translation-tool.git

# Move into folder
cd language-translation-tool

# Open index.html in your browser
```


## Usage Guide

1. **Open** `index.html` in any browser
2. **Select Source Language** — choose a language or leave it on "Detect Automatically"
3. **Select Target Language** — choose the language you want to translate into
4. **Type or paste** your text in the left panel (up to 2000 characters)
5. **Click Translate** or press `Ctrl + Enter`
6. The translated text appears in the right panel
7. Use the buttons to:
   -  **Copy** the translation to your clipboard
   -  **Listen** to the translation read aloud
   -  **Clear** all fields and start over
   -  **Swap** source and target languages


## Supported Languages

The tool supports 50+ languages including:

| | | | |
|---|---|---|---|
| English | Spanish | French | German |
| Italian | Portuguese | Dutch | Russian |
| Japanese | Chinese (Simplified) | Chinese (Traditional) | Korean |
| Arabic | Hindi | Bengali | Turkish |
| Polish | Vietnamese | Thai | Indonesian |
| Malay | Tamil | Telugu | Urdu |
| Swahili | Greek | Hebrew | Swedish |
| Norwegian | Danish | Finnish | Czech |
| Romanian | Hungarian | Ukrainian | Slovak |
| Bulgarian | Croatian | Serbian | Catalan |
| Lithuanian | Latvian | Estonian | Slovenian |
| Persian | Afrikaans | Albanian | Armenian |
| Azerbaijani | Basque | Belarusian | |

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **HTML** | Page structure and semantic markup |
| **CSS** | Styling, animations, responsive layout (Grid, Flexbox) |
| **JavaScript** | API calls, DOM manipulation, event handling |
| **MyMemory Translation API** | Free translation engine (no key needed, CORS enabled) |
| **Web Speech API** | Built-in browser API for text-to-speech |
| **Clipboard API** | Built-in browser API for copy to clipboard |
| **Git** | Version control and source code management |
| **GitHub** | Remote repository hosting and collaboration |

> **Zero dependencies** — no npm, no frameworks, no build tools required.


## API Details

**MyMemory Translation API**
- **Endpoint:** `https://api.mymemory.translated.net/get`
- **Method:** GET
- **Parameters:** `q` (text), `langpair` (e.g. `en|fr`)
- **Free limit:** 5,000 words per day
- **API key:** Not required
- **CORS:** Supported — works directly from the browser
- **Docs:** [mymemory.translated.net](https://mymemory.translated.net/doc/spec.php)

Example request:
```
https://api.mymemory.translated.net/get?q=Hello%20World&langpair=en|fr
```

Example response:
```json
{
  "responseStatus": 200,
  "responseData": {
    "translatedText": "Bonjour le monde",
    "detectedLanguage": "en"
  }
}
```


> **Tip:** Press `Ctrl + Enter` anywhere in the text box to translate without reaching for the mouse.
