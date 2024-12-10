import { neon } from "@neondatabase/serverless";
import { Member, createUserSchema } from "../utils/validators";


const sql = neon(process.env.DATABASE_URL);

export async function getData() {
    const data = await sql`SELECT * FROM members;`;
    return data;
}


const setMembers = (members: Member[]) => {
    try {
        // Validate each member against the schema
        members.forEach(member => {
            createUserSchema.parse(member);
        });

        // If valid, you can proceed to do something with the members
        // e.g., save to a database or process further
    } catch (error) {
        console.error("Validation failed:", error.errors);
        throw new Error("One or more members failed validation.");
    }
};