import { FaComment } from "react-icons/fa";

interface JobCardProps {
    name: string;
    status: string;
    desc: string;
}

const JobCard: React.FC<JobCardProps> = ({ name, status, desc }) => {
    return(
        <div className="flex flex-col bg-[#ffffffbf] max-w-72 rounded-2xl p-4 my-2">
            <div className="mb-2 border-b-2 border-[#b978ff9d] flex justify-between items-center pb-1">
                <h1 className="text-lg">{name}</h1>
                <h2 className="px-2 text-sm text-center text-green-700 bg-green-300 rounded-3xl">{status}</h2>
            </div>
            <div className="mb-2">
                <p>{desc}</p>
            </div>
            <div className="flex">
                <p>02/11</p>
                <p className="flex items-center ml-4">2 <span className="ml-1 text-[#313131]"><FaComment></FaComment></span></p>
            </div>
        </div>
    )
}

export default JobCard;