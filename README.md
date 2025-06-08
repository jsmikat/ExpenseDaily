# Expense Tracker

A modern, full-stack expense tracking application built with Next.js 14, featuring real-time expense management, secure authentication, and comprehensive financial insights.

## Features

### Core Functionality

- **Expense Management**: Create, read, update, and delete expenses with ease
- **Real-time Updates**: Instant reflection of changes across the application
- **Monthly Analytics**: Track and analyze spending patterns by month and year
- **Payment Method Tracking**: Categorize expenses by different payment methods
- **Date-based Filtering**: View expenses for specific time periods

### User Experience

- **Secure Authentication**: Powered by Clerk for robust user management
- **Responsive Design**: Seamless experience across desktop and mobile devices
- **Dark/Light Mode**: Toggle between themes for comfortable usage
- **Interactive Calendar**: Intuitive date selection for expense entries
- **Data Validation**: Comprehensive form validation using Zod schemas

### Technical Features

- **Server-Side Rendering**: Optimized performance with Next.js App Router
- **Real-time Database**: MongoDB integration with Mongoose ODM
- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Built with shadcn/ui and Tailwind CSS
- **Form Management**: React Hook Form for efficient form handling

## Tech Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Date Utilities**: date-fns
- **Icons**: Lucide React

### Backend

- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: Clerk
- **API**: Next.js API Routes

### Development Tools

- **Package Manager**: pnpm
- **Linting**: ESLint
- **Code Formatting**: Prettier (implied)

## Project Structure

```
expense-tracker/
├── app/
│   ├── api/
│   ├── dashboard/
│   └── globals.css
├── components/
│   ├── ui/
│   ├── ExpensesTable.tsx
│   ├── NewExpense.tsx
│   └── OnThisMonth.tsx
├── lib/
│   ├── models/
│   ├── utils.ts
│   └── dbConnect.ts
└── types/
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- MongoDB database
- Clerk account for authentication

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/jsmikat/Expense-tracker.git
   cd Expense-tracker
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the incredible React framework
- [Clerk](https://clerk.com/) for seamless authentication
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [MongoDB](https://www.mongodb.com/) for flexible database solutions
