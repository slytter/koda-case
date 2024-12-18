"use client"
import { useActionState, useState } from "react";
import { createMember } from "./actions";
import Form from 'next/form'

const ValidationErrors = ({ name, messages }: { name: string, messages?: string[] }) => {
  if (!messages) return null;

  return (
    <ul>
     { messages?.map((message, index) => (
       <li key={index} className="text-sm text-red-500 ">
          {/* Vi erstatter "String" med navnet på feltet for at fejlen bliver tydeligere */}
          • {message.replaceAll('String', name)} 
        </li>
      ))}
    </ul>
  )
}

const inputFieldClass = "bg-gray-100 p-2 outline-1 border-solid border-black/[.08] dark:border-white/[.145] rounded-lg dark:bg-gray-800 dark:text-white"
const buttonClass = "rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"

// Pt forsvinder fields når der action bliver udført (altså også selvom values er forkerte hvilket er ret irriterende)
// Enten kan man "preventDefault" for form submition, eller holde inputfelter i noget state.
const SignUp = () => {
  const [result, createMemberAction, isPending] = useActionState(createMember, null);
  const isError = !!result?.error;
  const validationErrors = result?.validationErrors;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <h1 className="text-center text-4xl font-bold">Opret dit medlemskab</h1>
        <p className="text-center text-sm">Opret dig med din email og fuldt navn</p> 
        <Form className="flex flex-col gap-4 w-full" action={createMemberAction}>
          <div className="flex flex-col gap-2">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Fulde navn (skal indeholde mellemrum)" className={inputFieldClass} />
            <ValidationErrors name="Name" messages={validationErrors?.name} />
          </div>
          <div className="flex flex-col gap-2">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="Email" className={inputFieldClass} />
            <ValidationErrors name="Email" messages={validationErrors?.email} />
          </div>
          <div className="flex flex-col gap-2">
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" className={inputFieldClass} />
            <ValidationErrors name="Password" messages={validationErrors?.password} />
          </div>
          <button disabled={isPending} type="submit" className={buttonClass}>
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
        {!!(result?.message && !isError) && <a href="/members" className={buttonClass + " w-full bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"}>
          Se alle medlemmer i db
        </a>}

      </main>
    </div>
  )
}

export default SignUp
