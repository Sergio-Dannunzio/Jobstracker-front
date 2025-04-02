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

export default function Home() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [posts, setPosts] = useState<Post[]>([]);

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
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };

        getPosts();
    }, []);

    return(    
        <div>
            <div className="p-6 mb-2 flex justify-between">
                <h1 className="text-3xl">Trabajos</h1>
                <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    {theme === "dark" ? "☀️" : "🌙"}
                </Button>
            </div>
            <div className="flex justify-end p-4 px-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Crear nuevo</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Titulo del trabajo</DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">
                                Titulo
                                </Label>
                                <Input
                                id="link"
                                defaultValue="Titulo"        
                                />
                            </div>
                        </div>
                        <DialogHeader>
                            <DialogTitle>Descripcion</DialogTitle>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">
                                Titulo
                                </Label>
                                <Input
                                id="link"
                                defaultValue="Titulo"        
                                />
                            </div>
                        </div>
                        <Label htmlFor="framework">Estado</Label>
                        <Select>
                            <SelectTrigger id="framework">
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
                                <Button type="button" variant="create">
                                Crear
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex justify-between px-8">
                <h2 className="text-xl">Sin respuesta</h2>
                <h2 className="text-xl">Con respuesta</h2>
                <h2 className="text-xl">Rechazados</h2>
            </div>
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