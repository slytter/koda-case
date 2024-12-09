import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(28),
})


const validateEmailForm = (formData: FormData) => {
  // Validate form data with createUserSchema
  const result = createUserSchema.safeParse(formData)
  if (!result.success) {
    // Handle errors
    console.error(result.error)
  }
}


const SignUp = () => {

  async function create(formData: FormData) {
    'use server'
    // Mutate data
    validateEmailForm(formData)
    console.log(formData)
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-center text-4xl font-bold">Opret</h1>
        <p className="text-center text-sm">Opret dig med din email og navn</p> 
        <form className="flex flex-col gap-4 w-full" action={create}>
          <input type="text" name="name" placeholder="Navn" className="p-2 outline-1 border-solid border-black/[.08] dark:border-white/[.145] rounded-lg" />
          <input type="email" name="email" placeholder="Email" className="p-2 outline-1 border-solid border-black/[.08] dark:border-white/[.145] rounded-lg" />
          <input type="password" name="password" placeholder="Password" className="p-2 outline-1 border-solid border-black/[.08] dark:border-white/[.145] rounded-lg" />
          <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            Opret
          </button>
        </form>
      </main>
    </div>
  )
}

export default SignUp
