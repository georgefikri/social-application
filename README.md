# Social Support Application

A responsive 3-step form wizard for government social support applications with AI assistance.

## Tech Stack

- **React.js 19** + **Vite**
- **Material-UI** + **Tailwind CSS**
- **React Hook Form** + **Redux Toolkit**
- **OpenAI GPT-3.5-turbo**
- **React-i18next** (English + Arabic RTL)

## Installation

1. **Clone and install:**

   ```bash
   git clone <repository-url>
   cd xdigit-app
   npm install
   ```

2. **Set up environment:**
   Create `.env` file:

   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run project:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173`

## OpenAI API Setup

1. Create account at [platform.openai.com](https://platform.openai.com)
2. Generate API key from API section
3. Add key to `.env` file as `VITE_OPENAI_API_KEY`
4. Ensure account has credits for API usage

## Project Structure

```
src/
├── components/          # UI components
│   ├── AIAssistModal.jsx
│   ├── FormNavigation.jsx
│   ├── LanguageSwitch.jsx
│   └── ProgressBar.jsx
├── pages/               # Form steps
│   ├── FormWizard.jsx
│   ├── PersonalInfo.jsx
│   ├── FinancialInfo.jsx
│   └── SituationDescription.jsx
├── hooks/               # Custom hooks
│   ├── useFormWizard.js
│   ├── usePersonalInfo.js
│   ├── useFinancialInfo.js
│   └── useSituationDescription.js
├── store/               # Redux state
│   ├── index.js
│   └── formSlice.js
├── services/            # API services
│   └── openai.js
├── constants/           # App constants
│   └── formSteps.js
├── utils/               # Utilities
│   └── storage.js
├── i18n/                # Translations
│   ├── index.js
│   ├── en.json
│   └── ar.json
└── App.jsx
```

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview build
- `npm run lint` - Run linter

## Features

- **3-Step Form**: Personal → Financial → Situation.
- **AI Writing Assistance**: GPT-powered content suggestions.
- **Bilingual Support**: English/Arabic with RTL.
- **Form Validation**: Real-time validation with React Hook Form.
- **Progress Persistence**: Local storage saves progress.
- **Responsive Design**: Mobile-first approach.
