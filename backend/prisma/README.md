# prisma-starter

A clean Node.js + Express + TypeScript + Prisma starter template. Clone, swap the DB URL, start building.

## Stack
- Node.js + Express
- TypeScript (ESM)
- Prisma ORM + PostgreSQL (NeonDB)

## Usage

1. Clone and remove old git history
```bash
git clone https://github.com/yourusername/prisma-starter.git my-project
cd my-project
rm -rf .git && git init
```

2. Install dependencies
```bash
npm install
```

3. Setup environment
```bash
cp .env.example .env
# paste your NeonDB connection string in .env
```

4. Add models to `prisma/schema.prisma`, then run
```bash
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

Hit `localhost:3000/health` to confirm it's running.
