import JobCard from "../components/JobCard";

export default function Home() {
    return(    
        <div>
            <div className="p-6 mb-2">
                <h1 className="text-3xl">Trabajos</h1>
            </div>
            <div className="flex justify-between px-8">
                <h2 className="text-xl">Sin respuesta</h2>
                <h2 className="text-xl">Con respuesta</h2>
                <h2 className="text-xl">Rechazados</h2>
            </div>
            <div className="p-4 px-10">
                <JobCard></JobCard>
                <JobCard></JobCard>
                <JobCard></JobCard>
                <JobCard></JobCard>
            </div>
        </div>
    )
}