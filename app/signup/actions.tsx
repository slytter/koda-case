"use server"

import { validateEmailForm } from "../utils/validators"

export async function createMember(prevState: any, formData: FormData) {
    validateEmailForm(formData)
    console.log(formData)
}
