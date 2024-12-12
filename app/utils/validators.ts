import { z } from "zod";

export const memberSchema = z.object({
	name: z.string().min(3).includes(' '),
  email: z.string().email().includes('@'),
  password: z.string().min(8),
})

export type Member = z.infer<typeof memberSchema>

// Fejl bliver meget tekniske med zod (feks: String must contain at least 2 character(s))
// Evt kunne vi bruge https://www.npmjs.com/package/zod-validation-error 
// For at få mere brugervenlige fejlmeddelelse
// Alternativt skrive vores ejet danske errorMap og bruge det (med z.setErrorMap)
export const parseUserForm = (formData: FormData) => {
  // Validate form data with createUserSchema
  const formDataAsObject = Object.fromEntries(formData)
	const result = memberSchema.parse(formDataAsObject)
	return result
}


