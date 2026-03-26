"use client";

import { useState } from "react";
import { signUp } from "../../services/auth";
import { useRouter } from "next/navigation";

export default function Signup() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    async function handleSignup() {
        if (!email || !password || !username) {
            return alert("All fields required");
        }

        const { error } = await signUp(email, password, username);

        if (error) {
            alert(error.message);
        } else {
            alert("Signup successful! Check email.");
            router.push("/login");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="bg-gray-900 p-8 rounded-xl w-96">
                <h1 className="text-2xl mb-4">Signup</h1>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 mb-3 bg-gray-800 rounded"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mb-3 bg-gray-800 rounded"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-3 bg-gray-800 rounded"
                />

                <button
                    onClick={handleSignup}
                    className="w-full bg-green-500 py-2 rounded"
                >
                    Signup
                </button>
            </div>
        </div>
    );
}