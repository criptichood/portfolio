# Emmanuel Galadima - Portfolio

The source code for the personal portfolio website of **Emmanuel Galadima (Criptic Hood)**, an AI Full-Stack Software Engineer who designs and builds intelligent, production-ready software systems — combining full-stack engineering, AI, and security-minded architecture.

The entire application was built iteratively with the help of an AI coding partner.

## Features

- **Modern Tech Stack**: Built with Next.js (App Router), TypeScript, and Tailwind CSS for a fast, modern, and scalable web experience.
- **Multilingual Support**: The entire site is available in multiple languages (English, Hausa, French, Spanish, Chinese, Arabic) using a dictionary-based i18n setup.
- **AI-Powered Chatbot**: Features an integrated chatbot built with Google's Gemini model via the Vercel AI SDK. The chatbot is context-aware, answers questions based on the portfolio content, and supports all available languages.
- **Case Studies**: Deep-dive case-study pages for featured projects, in addition to on-page summaries.
- **GitHub Showcase**: A curated showcase of open-source repositories.
- **Responsive Design**: Fully responsive components built with ShadCN UI, ensuring a great user experience on all devices.
- **Animations**: Subtle and professional animations powered by Framer Motion to enhance user interaction.
- **Contact Form**: A contact form with Zod validation, IP-based rate limiting, and Supabase persistence.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI/Generative**: [Vercel AI SDK](https://ai-sdk.dev/) with [Google Gemini](https://ai.google.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20.9 or higher recommended, required by Next.js 16)
- [npm](https://www.npmjs.com/) (or pnpm/yarn)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/criptichood/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Copy `example.env` to `.env.local` in the root of your project and fill in your credentials (`GEMINI_API_KEY` from [Google AI Studio](https://aistudio.google.com/app/apikey), plus `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` from your Supabase project):
    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    SUPABASE_URL=your_supabase_url_here
    SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

5.  **Cloudflare Workers build & local preview:**
    ```bash
    npm run cf:build
    npm run cf:preview
    ```

## Project Structure

- `src/app/[lang]`: The main application routes, structured for internationalization.
- `src/app/[lang]/work/[slug]`: The deep-dive case-study routes for featured projects.
- `src/components`: Contains all the reusable React components, categorized into `common`, `sections`, `ui`, etc.
- `src/ai/flows`: Holds the AI flows that power the AI features like the chatbot and contact form submission.
- `src/lib`: Includes utility functions, data constants, schemas, and internationalization dictionaries.
- `src/lib/dictionaries`: JSON files for each supported language.

## Branching Workflow

All development work happens on the `dev` branch. The `main` branch is treated as the stable release branch and is not committed to directly from local development.

## Customization

- **Content**: To change the text content (like project descriptions, capabilities, case studies, etc.), edit the JSON files in `src/lib/dictionaries`.
- **Styling**: To change the theme (colors, fonts), edit the CSS variables and `@theme` configuration in `src/app/globals.css`.
- **Social Links & Navigation**: Update the `NAV_LINKS` and `SOCIAL_LINKS` arrays in `src/lib/data.ts`.
