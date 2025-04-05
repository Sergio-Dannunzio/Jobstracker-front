import { FaComment } from "react-icons/fa";
import { Job } from "../types/Job";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { deleteJob } from "@/services/JobService";
import { MdModeEdit } from "react-icons/md";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface JobCardProps extends Job {
    onDeleted: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ name, status, desc, id, onDeleted }) => {
        const [open, setOpen] = useState(false);
        const [openEdit, setOpenEdit] = useState(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [newName, setName] = useState('');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [newDesc, setDesc] = useState('');
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [bewStatus, setStatus] = useState('');

        const handleDelete = async(e: React.FormEvent) => {
            e.preventDefault();
            const token = localStorage.getItem("token") || "";
            try {
                await deleteJob(id, token);
                onDeleted(); // Recargar la lista (ej: llamar getJobs de nuevo desde el padre)
            } catch (err) {
                console.error("Error deleting job", err);
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
                    <div className="">
                        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                            <DialogTrigger asChild className="m-2">
                                <Button className=" hover:bg-accent-foreground/70 dark:hover:bg-accent/50 dark:bg-accent dark:text-accent-foreground "><MdModeEdit /></Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg" aria-describedby={undefined}>
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
                                <DialogFooter className="sm:justify-start w-full px-8">
                                    <DialogClose asChild>
                                        <Button type="button"  className="w-1/2 bg-green-400 hover:bg-green-400/70" onClick={handleDelete}>
                                            Editar
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
                </div>
            </CardFooter>
        </Card>
    )
}

export default JobCard;

