# HeritageCare — Traditional Healthcare CSP

A React + Vite + Node.js/Express e-commerce-style Community Service Project website.

## Features
- E-commerce-style home page, search and categories
- Product cards for ingredients documented in the CSP report
- Learn panels explaining what the CSP documents and what it does not specify
- Shopping cart with quantity controls
- Demo checkout
- Express backend API for products and demo orders
- CSP journey and project information
- Responsive mobile/desktop design

## Run
1. Open this folder in VS Code.
2. Open Terminal.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open `http://localhost:5173/`.

The frontend runs on port 5173 and the backend API on port 5000.

## Important
The product content is based on the Traditional Healthcare CSP report. The website intentionally does not invent medical dosages or guarantee cures. It presents traditional/community uses as educational information and includes safety notes.


## Ask AI feature
Select any product to open its details. Use **Ask AI** to ask product-specific questions such as what it is, traditional uses, how the CSP describes it, and precautions.

#
## Groq Ask AI setup

The Ask AI feature uses the Groq API from the Node.js backend. The API key is never sent to the browser.

1. Create a Groq API key from the Groq Console.
2. Open `.env`.
3. Set `GROQ_API_KEY=your_key_here`.
4. Keep `GROQ_MODEL=openai/gpt-oss-20b`.
5. Run `npm install`, then `npm run dev`.
6. Open the Vite URL shown in the terminal.

The project uses Groq's OpenAI-compatible Chat Completions endpoint. If no key is configured, the Ask AI request will show a backend configuration error rather than exposing a key in the frontend.
