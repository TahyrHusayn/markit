## Welcome to MarkIt

### Steps to setup the project

1. Specify postgres DATABASE_URL in .env

2. Specify NEXTAUTH_SECRET in .env 

3. pnpm install (don't have pnpm remove the pnpm-lock.yaml file and remove the package manager from package.json) then do with whatever package manager you have like npm install or yarn install or bun install or whatever

4. pnpm exec prisma generate

5. pnpm run dev