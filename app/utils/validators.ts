import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
})


export const validateEmailForm = (formData: FormData) => {
  // Validate form data with createUserSchema
  const formDataAsObject = Object.fromEntries(formData)
  console.log({formDataAsObject})
  try {
    const result = createUserSchema.parse(formData)
    return result
  } catch (error) {
    console.error(error)
  }

}


export const emailExists = async (email: string) => {
  return false
}
