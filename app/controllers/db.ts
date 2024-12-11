import { neon } from "@neondatabase/serverless";

if(!process.env.DATABASE_URL) {
    throw new Error("Database URL er ikke sat")
}

export const sql = neon(process.env.DATABASE_URL);

