'use client'
export default function Error(){
    return(
        <main className="mt-[5rem] justify-center">
            <h1 className="text-[2rem] text-green-700 text-center p-1 rounded-sm font-bold font-sans-montserrat tracking-wide bg-transparent uppercase ">An error occurred! Error 404!</h1>
            <p className="text-[#ddd6cb] tracking-wide bg-transparent uppercase font-bold text-center text-[1.2rem]">Failed to find your page. Please try again!</p>
        </main>
    )
}