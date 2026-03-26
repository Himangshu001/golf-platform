"use client";

import { useState } from "react";
import { signIn } from "../../services/auth";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const { error } = await signIn(email, password);

        if (error) {
            alert(error.message);
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-black text-white">
            <div className="bg-gray-900 p-8 rounded-xl w-80">
                <h2 className="text-2xl mb-4">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-3 rounded bg-gray-800"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-3 rounded bg-gray-800"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 p-2 rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
}