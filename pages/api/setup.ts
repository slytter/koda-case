import { neon } from "@neondatabase/serverless";
import { NextApiRequest, NextApiResponse } from "next";

const sql = neon(process.env.DATABASE_URL);


// Route som opretter members tabel
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Only GET requests are allowed" });
    }

    try {
        await sql`
            CREATE TABLE IF NOT EXISTS members (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            );
        `;

        res.status(200).json({ message: "Members table created successfully." });
    } catch (error) {
        console.error("Error creating members table:", error);
        res.status(500).json({ error: "Failed to create members table." });
    }
}


