![Coverage](https://raw.githubusercontent.com/mylenasayumi/projet-weeb/main/coverage.svg)

# Weeb Frontend

A React single-page application for Weeb - a blog platform for technology and web culture enthusiasts, with multilingual support, dark mode, GitHub OAuth authentication and article management.

## 🛠 Tech Stack

- **Framework**: React 19 with Vite 6
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Animations**: Framer Motion
- **HTTP Client**: Axios (with JWT refresh interceptor)
- **Icons**: React Icons
- **i18n**: Custom context-based system (EN / FR)
- **Testing**: Vitest + Testing Library
- **Linting / Formatting**: ESLint + Prettier
- **Pre-commit Hooks**: Husky + lint-staged
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (24+)
- [npm](https://www.npmjs.com/) (10+)
- [Git](https://git-scm.com/downloads)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mylenasayumi/projet-weeb.git projet-weeb
   cd projet-weeb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your settings:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - App: `http://localhost:5173`
   - The backend must be running at the URL defined in `VITE_API_URL`

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000` |

> All variables prefixed with `VITE_` are embedded at build time by Vite and accessible via `import.meta.env`.

## 🗺 Pages & Routes

| Route | Page | Access |
|---|---|---|
| `/` | About Us (Home) | Public |
| `/login` | Login | Public |
| `/sign-up` | Sign Up | Public |
| `/forgot-password` | Forgot Password | Public |
| `/reset-password` | Reset Password | Public |
| `/auth/callback` | GitHub OAuth Callback | Public |
| `/articles` | Article List | Public |
| `/articles/:id` | Article Detail | Public |
| `/newsletter-subscription` | Newsletter | Public |
| `/articles/create` | Create Article | 🔒 Auth required |
| `/articles/update/:id` | Edit Article | 🔒 Auth required |
| `/profile` | User Profile | 🔒 Auth required |
| `/contact` | Satisfaction Form | 🔒 Auth required |

## 🎯 Features

- **Authentication** - email/password login and registration, GitHub OAuth, JWT with automatic token refresh
- **Password reset** - forgot password flow via email link
- **Articles** - list with search, ordering and pagination; quick preview modal; full detail page; create, edit and delete (owner only)
- **Likes** - toggle like with optimistic UI update and floating heart animation
- **User profile page** - view user information; view, create, update and delete article
- **Satisfaction form** - pre-filled with authenticated user data
- **Newsletter** - subscription page
- **Dark mode** - persistent toggle (localStorage)
- **Multilingual** - EN / FR language switcher

## 📁 Project Structure

```
projet-weeb/
├── .github/
│   └── workflows/
│       └── frontend_ci.yml    # CI pipeline
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── __tests__/         # Component tests
│   │   ├── articles/          # ArticleCard, ArticleModal, ArticleFilters, Pagination
│   │   ├── about-us/          # About Us sections
│   │   ├── contact/           # SatisfactionSection
│   │   ├── layout/            # Navbar, Footer
│   │   ├── ui/                # Reusable UI primitives
│   │   └── users/             # Login, SignUp, Profile components
│   ├── constants/
│   │   └── api.js             # API base URL from env
│   ├── contexts/
│   │   └── AuthContext.jsx    # Global auth state
│   ├── languages/
│   │   ├── __tests__/         # Translation tests
│   │   ├── en/                # English strings
│   │   ├── fr/                # French strings
│   │   └── LanguageContext.jsx
│   ├── pages/                 # Route-level page components
│   ├── services/
│   │   ├── __tests__/         # Service tests
│   │   ├── ApiClient.jsx      # Axios instance with interceptors
│   │   ├── ApiService.jsx     # Generic CRUD helpers
│   │   ├── ArticlesService.jsx
│   │   ├── AuthCallbackService.jsx
│   │   ├── AuthService.jsx
│   │   ├── AuthTokenService.jsx
│   │   ├── LikesService.jsx
│   │   ├── PasswordResetService.jsx
│   │   └── SatisfactionService.jsx
│   ├── test/
│   │   └── setupTests.js      # Vitest global setup
│   ├── utils/                 # Shared utility functions
│   ├── App.jsx
│   ├── main.jsx
│   └── router.jsx
├── .env                       # Local environment variables (git-ignored)
├── .env.example
├── .eslintrc / eslint.config.js
├── .prettierrc
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## 🧪 Testing

### Run Tests (watch mode)
```bash
npm test
```

### Run Tests (single pass)
```bash
npm run test:run
```

### Run with interactive UI
```bash
npm run test:ui
```

### Generate Coverage Report
```bash
npm run coverage
```

The HTML report will be generated in the `coverage/` directory.

## 👨‍💻 Development Workflow

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format all files with Prettier |
| `npm test` | Run tests in watch mode |
| `npm run coverage` | Run tests and generate coverage report |

### Pre-commit Hooks

Husky runs automatically on every commit and executes ESLint and Prettier on staged `.js` / `.jsx` files.

To install hooks after cloning:
```bash
npm run prepare
```

### Git Workflow

1. **Create an Issue**
   - Add a clear description
   - Include images or links if necessary
   - Use appropriate labels

2. **Branch Naming Convention**
   ```
   <type>/<scope>/<description>
   ```

   **Examples:**
   - `feat/articles/article_modal`
   - `fix/auth/token_refresh`
   - `refactor/services/api_client`

   **Types:**
   - `fix`: Bug fixes
   - `feat`: New features
   - `delete`: Removing code/features
   - `refactor`: Code refactoring
   - `docs`: Documentation updates

3. **Pull Request Guidelines**
   - Link the related issue
   - Provide a clear description of changes
   - Include or update tests for new features
   - Ensure all CI checks pass
   - Require at least one approval before merging

## 🔄 CI/CD

The GitHub Actions pipeline runs on every push and pull request to `main` and performs:

1. **Lint** - ESLint check
2. **Test** - Vitest with coverage report
3. **Badge** - Auto-commits an updated `coverage.svg` to the repository
4. **Build** - Verifies the production build succeeds

The app is deployed automatically to **Vercel** on merge to `main`.

## 🤝 Contributing

Contributions are welcome! Please follow the development workflow outlined above.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Note**: Remember to keep your `.env` file secure and never commit it to version control.
