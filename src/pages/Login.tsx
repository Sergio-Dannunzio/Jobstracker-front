import { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function Login() {
    const userRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLParagraphElement | null>(null);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        axios.post("http://localhost:8000/api/login", 
            { email: "sergio@example.com", password: "123456" }, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true // Importante si usas sesiones o autenticación
        })
        .then(response => console.log(response.data))
        .catch(error => console.error("Error:", error));
    };

    return (
        <section className="flex flex-col items-center">
            {errMsg && <p ref={errRef} className="text-red-500">{errMsg}</p>}
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
            </form>
        </section>
    );
}