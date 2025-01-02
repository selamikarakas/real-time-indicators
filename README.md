# Cryptocurrency Market Data Display

> **Note**: This project was built using [Cursor](https://cursor.sh/), an AI-powered code editor, as an experimental exploration of its capabilities in assisting with Next.js and TypeScript development. While Cursor provided helpful suggestions and code completions, all core functionality and architecture decisions were carefully reviewed and implemented by myself (at least at the time of writing this).


A Next.js application that displays cryptocurrency market data in a paginated table format, built with TypeScript and Tailwind CSS.

![Cryptocurrency Market Data Table](./public/screenshot.png)

## Features

- Display cryptocurrency market data in a responsive table
- Pagination with 10 items per page
- Real-time number formatting for:
  - Currency values
  - Large numbers in compact format
  - Percentage changes with color indicators
- Fully typed with TypeScript
- Responsive design using Tailwind CSS
- Accessible UI components using shadcn/ui
- Comprehensive test coverage

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/react) - Testing

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/okazkayasi/real-time-indicators
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

Run the test suite:

```bash
pnpm test
```

Run tests in watch mode:

```bash
pnpm test:watch
```

## Project Structure

```
src/
├── app/                   # Next.js app router
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   └── __tests__/       # Component tests
├── data/                # Mock cryptocurrency data
└── types/               # TypeScript types
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
