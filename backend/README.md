# Prisma Starter Template

## First time setup
```
npm install
cp .env.example .env
# Paste your NeonDB URLs in .env
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

## Every new project
1. Clone this repo
2. `npm install`
3. Paste new NeonDB URLs in `.env`
4. Write your models in `prisma/schema.prisma`
5. `npx prisma migrate dev --name init`
6. `npx prisma generate`
7. `npm run dev`

## Folder structure
```
src/
├── config/
│   └── db.ts         ← prisma singleton, never touch
├── generated/        ← auto generated, never touch
└── index.ts          ← entry point
prisma/
└── schema.prisma     ← write your models here
prisma.config.ts      ← never touch
```

## Key commands
- `npx prisma migrate dev --name <migration_name>` — after changing schema
- `npx prisma generate` — after migrate
- `npx prisma studio` — visual DB browser
