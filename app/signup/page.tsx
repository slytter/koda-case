"use client"
import { useActionState } from "react";
import { createMember } from "./actions";
import Form from 'next/form'

const ErrorField = ({ name, messages }: { name: string, messages?: string[] }) => {
  
  if (!messages) return null;
  return (
    <ul>
     { messages?.map((message, index) => (
       <li key={index} className="text-sm text-red-500 ">
          • {message.replaceAll('String', name.toString())}
        </li>
      ))}
    </ul>
  )
}

const inputFieldClass = "bg-gray-100 p-2 outline-1 border-solid border-black/[.08] dark:border-white/[.145] rounded-lg"


// Pt forsvinder fields når der action bliver udført. 
// Enten kan man "preventDefault" for form submition, eller holde inputfelter i noget state.
const SignUp = () => {
  const [result, createMemberAction, isPending] = useActionState(createMember, null);
  const isError = !!result?.error; // Assuming `message` includes an `error` field
  const validationErrors = result?.validationErrors;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <h1 className="text-center text-4xl font-bold">Opret dit medlemskab</h1>
        <p className="text-center text-sm">Opret dig med din email og navn</p> 
        <Form className="flex flex-col gap-4 w-full" action={createMemberAction}>
          <div className="flex flex-col gap-2">
            <input type="text" name="name" placeholder="Navn" className={inputFieldClass} />
            <ErrorField name="Name" messages={validationErrors?.name} />
          </div>
          <div className="flex flex-col gap-2">
            <input type="text" name="email" placeholder="Email" className={inputFieldClass} />
            <ErrorField name="Email" messages={validationErrors?.email} />
          </div>
          <div className="flex flex-col gap-2">
            <input type="password" name="password" placeholder="Password" className={inputFieldClass} />
            <ErrorField name="Password" messages={validationErrors?.password} />
          </div>
          <button disabled={isPending} type="submit" className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            Opret medlemskab
          </button>
        </Form>
        {result && (
          <p
            className={`text-center text-sm ${
              isError ? "text-red-500" : "text-green-500"
            }`}
          >
            {result.message.toString()}
          </p>
        )}
      </main>
    </div>
  )
}

export default SignUp
