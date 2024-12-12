import { NeonDbError } from "@neondatabase/serverless";
import { Member, memberSchema } from "../utils/validators";
import { ZodError } from "zod";
import bcrypt from 'bcrypt';
import { sql } from "./db";
import { z } from "zod";

export const addMemberToDb = async (member: Member) => {
    try {
        // Validater lige igen, bare for business logikkens skyld 
        memberSchema.parse(member);
        
        // Encrypt password
        const encryptedPassword = await bcrypt.hash(member.password, 10);

        // Insert the validated member into the database
        const res = await sql`
            INSERT INTO members (name, email, password)
            VALUES (${member.name}, ${member.email}, ${encryptedPassword})
            RETURNING id, name, email;
        `;

        return res[0]; // Return the inserted member data
    } catch (error) {
        console.error("DB error:", error);
        if (error instanceof ZodError) {
            throw new Error("Member failed validation.");
        } else {
            if(error instanceof NeonDbError) {
                console.error("DB error:", error);
                if(error.routine === '_bt_check_unique') {
                    // "routine._bt_check_unique" er fejlkoden for validering af duplikerede keys i databasen
                    throw new Error("Medlem email er allerede oprettet i databasen");
                }
                throw new Error("Fejl opstod under tilføjelse af medlem til databasen");
            }
            throw new Error("Ukendt fejl opstod under tilføjelse af medlem til databasen");
        }
    }
};


export const getMembers = async () => {
    try {
        const res = await sql`
            SELECT id, name, email, password
            FROM members;
        `;

        // Vi tilføjer lige id til schema for at den bliver parset og typed.
        const validatedMembers = z.array(memberSchema.extend({ id: z.number() })).parse(res);

        return validatedMembers 
    } catch (error) {
        console.error("DB error:", error);
        if(error instanceof NeonDbError) {
            console.error("DB error:", error);
            throw new Error("Fejl opstod ved fetching af medlemmer");
        }
        if(error instanceof ZodError) {
            console.error("Zod error:", error);
            throw new Error("Fejl opstod ved parsing af medlemmer");
        }
    }
}