import { FaComment } from "react-icons/fa";
import { Job } from "../types/Job";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import axios from "axios";

const JobCard: React.FC<Job> = ({ name, status, desc, id }) => {
        const [open, setOpen] = useState(false);

        const handleDelete = async(e: React.FormEvent) => {
            e.preventDefault();
            const token = localStorage.getItem("token");
            console.log(id)
            try{
                const response = await axios.delete(`http://localhost:8000/api/jobs/${id}`, 
                   {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                   }
                );
                console.log("Respuesta del servidor:", response.data);
                //setUpdateTrigger(true)
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
                <div className="flex justify-between w-full items-center">
                    <div className="flex">
                        <p>02/11</p>
                        <p className="flex items-center ml-4">2 <span className="ml-1 text-[#313131]"><FaComment></FaComment></span></p>
                    </div>

                    <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-destructive hover:bg-destructive/70"><FaTrash /></Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg" aria-describedby={undefined}>
                        <DialogHeader>
                            <DialogTitle>¿Realmente desea eliminar el siguiente trabajo?</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="sm:justify-start w-full px-8">
                            <DialogClose asChild>
                                <Button type="button"  className="w-1/2 bg-destructive hover:bg-destructive/70" onClick={handleDelete}>
                                    Eliminar
                                </Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button type="button" className="w-1/2">
                                    Cancelar
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                </div>
            </CardFooter>
        </Card>
    )
}

export default JobCard;