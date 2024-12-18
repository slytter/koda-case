import { getMembers } from "../controllers/member.controller"
const buttonClass = "rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 my-4"

const Members = async () => {

    try {
        const members = await getMembers()

        if (!members) {
            throw new Error('No members')
        }
    
        return (
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <main className="flex flex-col row-start-2 items-center sm:items-start">
                    <h1 className="text-center text-4xl font-bold mb-4">
                        All medlemmer
                    </h1>
                    <table className="w-full border-separate border-spacing-2 border border-black/[.08] rounded-lg">
                        <thead>
                            <tr>
                                <th className="text-left border-b border-black/[.08]">Id</th>
                                <th className="text-left border-b border-black/[.08]">Navn</th>
                                <th className="text-left border-b border-black/[.08]">Email</th>
                                <th className="text-left border-b border-black/[.08]">Encrypted password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(member => (
                                <tr key={member.id}>
                                    <td>{member.id}</td>
                                    <td>{member.name}</td>
                                    <td>{member.email}</td>
                                    <td className="text-xs font-mono">{member.password}</td>
                                </tr>
                            ))}
                        </tbody>                    
                    </table>
                    <a href="signup" className={buttonClass}>
                        Opret medlemskab
                    </a>
                </main>
            </div>
        )

    } catch (error) {
        if(error instanceof Error) {
            return <div>Fejl opstod: {error.message}</div>
        } else {
            return <div>Ukendt fejl opstod</div>
        }
    }
}

export default Members

export const dynamic = 'force-dynamic'