## Welcome to MarkIt

### Steps to setup the project

1. Specify MONGODB URI in the .env ( if using local docker mongodb steps to follow :-
   docker run --name markit-mongo -p 27017:27017 -d mongo --replSet rs0
   docker exec -it markit-mongo bash
   mongosh
   rs.initiate()
   exit
   exit
   use this uri type because most probably the replica will give you error (mongodb://localhost:27017/dba?replicaSet=rs0&directConnection=true)
)

2. Specify NEXTAUTH_SECRET in .env 

3. pnpm install (don't have pnpm remove the pnpm-lock.yaml file and remove the package manager from package.json) then do with whatever package manager you have like npm install or yarn install or bun install or whatever

4. pnpm exec prisma generate

5. pnpm run dev