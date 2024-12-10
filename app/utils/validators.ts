import { z } from "zod";

const createUserSchema = z.object({
	name: z.string().min(2).includes(' '),
  email: z.string().email().includes('@'),
  password: z.string().min(8),
})

// Fejl bliver meget tekniske med zod (feks: String must contain at least 2 character(s))
// Evt kunne vi bruge https://www.npmjs.com/package/zod-validation-error 
// For at få mere brugervenlige fejlmeddelelse
// Alternativt skrive vores ejet danske errorMap og bruge det (med z.setErrorMap)
export const parseUserForm = (formData: FormData) => {
  // Validate form data with createUserSchema
  const formDataAsObject = Object.fromEntries(formData)
	const result = createUserSchema.parse(formDataAsObject)
	return result
}


export const emailExists = async (email: string) => {
	return false
}
