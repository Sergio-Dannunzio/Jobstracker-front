import { FaComment } from "react-icons/fa";
import { Job } from "../types/Job";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

const JobCard: React.FC<Job> = ({ name, status, desc }) => {
    return(
        <Card className="my-1">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    {name}
                    {status === "enviado" &&
                        <h2 className="px-2 text-sm text-center text-green-700 bg-green-300 rounded-3xl h-fit">{status}</h2>
                    }
                    {status === "respondido" &&
                        <h2 className="px-2 text-sm text-center text-yellow-700 bg-yellow-300 rounded-3xl h-fit">{status}</h2>
                    }
                    {status === "rechazado" &&
                        <h2 className="px-2 text-sm text-center text-red-700 bg-red-300 rounded-3xl h-fit">{status}</h2>
                    }
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>{desc}</p>
            </CardContent>
            <CardFooter>
                <div className="flex">
                    <p>02/11</p>
                    <p className="flex items-center ml-4">2 <span className="ml-1 text-[#313131]"><FaComment></FaComment></span></p>
                </div>
            </CardFooter>
        </Card>
    )
}

export default JobCard;