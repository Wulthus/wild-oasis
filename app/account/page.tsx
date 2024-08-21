export const metadata = {
    title: "Account |"
}

const user: string = "User";

export default function Page(){
    return(
        <div>
            <h2 className="font-semibold text-2xl text-accent-400 mb-7">
                Welcome, {user}
            </h2>
        </div>

    )
}