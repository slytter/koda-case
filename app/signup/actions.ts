"use server"
import { parseUserForm } from "../utils/validators"
import { z } from "zod"
import { addMemberToDb } from "../controllers/member.controller"

// eslint-disable-next-line 
export async function createMember(previousState: any, formData: FormData) {
    try {
        const parsedUser = parseUserForm(formData)
        await addMemberToDb(parsedUser)

        return { user: parsedUser, message: `Medlemskab oprettet for ${parsedUser.email}`, error: false }
    } catch(error) {
        if(error instanceof Error) {
            if(error instanceof z.ZodError) {
                return { user: null, message: 'Udfyld venligst felterne korrekt', validationErrors: error.formErrors.fieldErrors, error: true }
            }
            return { user: null, message: error.message, error: true }
        } else {
            return { user: null, message: "Ukendt fejl", error: true }
        }
    }
}
