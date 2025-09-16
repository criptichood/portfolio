# Criptic Digital - AI & Web Development Portfolio

This is the source code for the personal portfolio website of Emmanuel Galadima (Criptic Digital), a Blockchain Researcher and AI Web Developer. The site is designed to showcase services, projects, and technical expertise.

The entire application was built iteratively with the help of an AI coding partner.

## Features

- **Modern Tech Stack**: Built with Next.js (App Router), TypeScript, and Tailwind CSS for a fast, modern, and scalable web experience.
- **Multilingual Support**: The entire site is available in multiple languages (English, Hausa, French, Spanish, Chinese, Arabic) using a dictionary-based i18n setup.
- **AI-Powered Chatbot**: Features an integrated chatbot built with Google's Gemini model via Genkit. The chatbot is context-aware, answers questions based on the portfolio content, and supports all available languages.
- **Responsive Design**: Fully responsive components built with ShadCN UI, ensuring a great user experience on all devices.
- **Animations**: Subtle and professional animations powered by Framer Motion to enhance user interaction.
- **Contact Form**: A functional contact form that saves submissions to a database (requires Firebase setup).

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI/Generative**: [Genkit (Google)](https://firebase.google.com/docs/genkit)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [pnpm](https://pnpm.io/installation) (or npm/yarn)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repository.git
    cd your-repository
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add your Google AI (Gemini) API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).
    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/[lang]`: The main application routes, structured for internationalization.
- `src/components`: Contains all the reusable React components, categorized into `common`, `sections`, `ui`, etc.
- `src/ai/flows`: Holds the Genkit flows that power the AI features like the chatbot and contact form submission.
- `src/lib`: Includes utility functions, data constants, schemas, and internationalization dictionaries.
- `src/lib/dictionaries`: JSON files for each supported language.

## Customization

- **Content**: To change the text content (like project descriptions, services, etc.), edit the JSON files in `src/lib/dictionaries`.
- **Styling**: To change the theme (colors, fonts), edit the CSS variables in `src/app/globals.css` and the theme configuration in `tailwind.config.ts`.
- **Social Links & Navigation**: Update the `NAV_LINKS` and `SOCIAL_LINKS` arrays in `src/lib/data.ts`.
