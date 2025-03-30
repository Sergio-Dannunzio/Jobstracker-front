import { useRef, useState, useEffect } from "react";
import axios from "axios";
import bck from "../assets/pexels-quang-nguyen-vinh-222549-2649403.jpg"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const userRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLParagraphElement | null>(null);
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        if (userRef.current) {
            userRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("http://localhost:8000/api/login", 
                { email: user, password: pwd }, 
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true // Importante si usa cookies/sesiones
                }
            );

            console.log("Respuesta del servidor:", response.data);

            // Guarda el token en localStorage
            localStorage.setItem("token", response.data.token);
            navigate("/home");

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Error en el login:", error.message);
            } else {
                console.error("Error desconocido:", error);
            }
        }
    };

    return (
        <section className="flex flex-col items-center justify-center h-lvh bg-cover"
                style={{ backgroundImage: `url(${bck})`}}
        >
            <div className="w-fit border-2 p-12 backdrop-blur-sm rounded-2xl items-center flex flex-col">
                {errMsg && <p ref={errRef} className="text-red-500">{errMsg}</p>}
                <h1 className="text-2xl mb-6">Login</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-fit sm:w-80">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        ref={userRef}
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        className="border p-2 rounded mb-4 backdrop-blur-md"
                        required
                        />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        className="border p-2 rounded mb-4 backdrop-blur-md"
                        required
                        />

                    <button type="submit" className="bg-white text-black py-3 rounded-xl hover:bg-white/80 cursor-pointer">Login</button>
                </form>
            </div>
        </section>
    );
}