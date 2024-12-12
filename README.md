# Koda Case by Nikolaj Schlüter Nielsen


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started



Run the development server:


```bash
npm install
npm run dev
```

create .env file:
`
touch .env
` 

and add DATABASE_URL
`DATABASE_URL=postgres://neondb_owner:XmGtweI8a9qR@ep-frosty-base-a2zgpkfp-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
`

### To initialize the database 
- navigate to the localhost:3000/api/setup route
- It will create the 'members' table in the database (if it doesn't exist)

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
