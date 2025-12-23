# Ungine UI

**Information-First components for operational interfaces.**

Ungine UI is a specialized shadcn/ui registry built for dashboards, admin panels, and monitoring tools. While traditional libraries focus on Marketing UI (spacious, soft, and aesthetic), Ungine UI is built for Operational UI (dense, precise, and functional).

> "The Grafana philosophy brought into the shadcn workflow."

## Philosophy

Most component libraries are designed for landing pages and marketing sites. Ungine UI is designed for the interfaces you use every day: monitoring dashboards, admin panels, data tables, and operational tools.

We believe operational interfaces should be:
- **Dense but not cluttered** - Maximum information without overwhelming
- **Functional but not ugly** - Precision design with clear hierarchy
- **Powerful but not complex** - Optimized for scanning speed and efficiency

## Features

- 🎯 **Information-Dense** - Optimized for displaying maximum data
- 🔧 **Operational Focus** - Built for dashboards and admin panels
- 📋 **Copy & Paste** - No package to install, you own the code
- 🎨 **Radix UI + Tailwind** - Accessible primitives with utility-first styling
- 🌙 **Dark Mode First** - Designed for long monitoring sessions
- 🤖 **MCP Integration** - AI-assisted component installation
- 📦 **TypeScript** - Full type safety with excellent DX

## Quick Start

Visit [ungine.vercel.app](https://ungine.vercel.app) for full documentation.

### Installation

```bash
# Create a new Next.js project
npx create-next-app@latest my-app --typescript --tailwind --app

# Install dependencies
npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react

# Copy components from the documentation
# Visit https://ungine.vercel.app/docs/components
```

## Project Structure

- `apps/www` - Documentation website
- `packages/cli` - CLI tool for component installation
- `packages/core` - Core utilities and helpers
- `templates/*` - Project templates

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build all packages
pnpm build
```

## License

MIT - You own the code. No attribution required.
