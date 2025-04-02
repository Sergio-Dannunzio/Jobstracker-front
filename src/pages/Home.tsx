import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import axios from "axios";
import { Post } from "../types/Post";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function Home() {

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const getPosts = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:8000/api/jobs", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPosts(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        getPosts();
    }, []);

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
            <Dialog>
            <DialogTrigger className="bg-blue-500 text-white px-4 py-2 rounded">Abrir Modal</DialogTrigger>
            <DialogContent>
                <DialogTitle>Ejemplo de Modal</DialogTitle>
                <DialogDescription>Este es un modal utilizando shadcn/ui.</DialogDescription>
            </DialogContent>
            </Dialog>
            <div className="p-4 px-10">
                {posts.map((post) =>(
                    <div key={post._id.$oid}>
                        <JobCard name={post.name} status={post.status} desc={post.desc}></JobCard>
                    </div>
                ))}
            </div>
        </div>
    )
}