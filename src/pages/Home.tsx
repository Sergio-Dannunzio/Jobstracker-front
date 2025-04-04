import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import axios from "axios";
import { Post } from "../types/Post";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useNavigate } from "react-router-dom";


export default function Home() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [posts, setPosts] = useState<Post[]>([]);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [open, setOpen] = useState(false);

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [status, setStatus] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
      }, [theme]);

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
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        getPosts();
    }, [updateTrigger]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try{
            const response = await axios.post("http://localhost:8000/api/jobs", 
                { name: name, status: status, desc: desc}, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
               }
            );
            console.log("Respuesta del servidor:", response.data);
            setUpdateTrigger(true)
            setOpen(false)
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error en el login:", error.message);
            } else {
                console.error("Error desconocido:", error);
            }
        }
    }

    return(    
        <div>
            <div className="p-6 mb-2 flex justify-between">
                <h1 className="text-3xl">Trabajos</h1>
                <div>
                    <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="mx-4">
                        {theme === "dark" ? "☀️" : "🌙"}
                    </Button>
                    <Button onClick={() => handleLogout()}>
                        Logout
                    </Button>
                </div>
            </div>
            <div className="flex justify-end p-4 px-6">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Crear nuevo</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
                        <DialogHeader>
                            <DialogTitle>Titulo del trabajo</DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">
                                Titulo
                                </Label>
                                <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}      
                                />
                            </div>
                        </div>
                        <DialogHeader>
                            <DialogTitle>Descripcion</DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">
                                Descripcion
                                </Label>
                                <Input
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}        
                                />
                            </div>
                        </div>
                        <Label htmlFor="framework">Estado</Label>
                        <Select onValueChange={setStatus}>
                            <SelectTrigger id="framework" className="w-full">
                            <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                            <SelectItem value="enviado">Enviado</SelectItem>
                            <SelectItem value="respondido">Respondido</SelectItem>
                            <SelectItem value="rechazado">Rechazado</SelectItem>
                            </SelectContent>
                        </Select>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" onClick={handleSubmit} className="bg-green-400 hover:bg-green-400/70">
                                Crear
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex justify-between px-8 lg:flex-row flex-col">
                <div className="p-4 flex flex-col items-center lg:w-1/3">
                    <h2 className="text-xl mb-2">Sin respuesta</h2>
                    {posts.map((post) =>(
                        <div key={post._id.$oid} className="w-full">
                            {post.status === "enviado" &&
                                <JobCard name={post.name} status={post.status} desc={post.desc}></JobCard>
                            }
                        </div>
                    ))}
                </div>
                <div className="p-4 flex flex-col items-center lg:w-1/3">
                    <h2 className="text-xl mb-2">Con respuesta</h2>
                    {posts.map((post) =>(
                        <div key={post._id.$oid} className="w-full">
                            {post.status === "respondido" &&
                                <JobCard name={post.name} status={post.status} desc={post.desc}></JobCard>
                            }
                        </div>
                    ))}
                </div>
                <div className="p-4 flex flex-col items-center lg:w-1/3">
                    <h2 className="text-xl mb-2">Rechazados</h2>
                    {posts.map((post) =>(
                        <div key={post._id.$oid} className="w-full">
                            {post.status === "rechazado" &&
                                <JobCard name={post.name} status={post.status} desc={post.desc}></JobCard>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}