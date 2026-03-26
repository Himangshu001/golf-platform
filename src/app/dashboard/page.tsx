"use client";

import { useEffect, useState } from "react";
import { getUser, signOut } from "../../services/auth";
import { addScore, getScores } from "../../services/scores";
import { useRouter } from "next/navigation";
import {
    generateWeightedDraw,
    checkMatches,
    getMatchType,
} from "../../services/draw";
import {
    getCharities,
    setUserCharity,
    getUserCharity,
} from "../../services/charity";

export default function Dashboard() {
    const router = useRouter();

    const [user, setUser] = useState<any>(null);
    const [score, setScore] = useState("");
    const [scores, setScores] = useState<any[]>([]);
    const [draw, setDraw] = useState<number[]>([]);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const [charities, setCharities] = useState<any[]>([]);
    const [selectedCharity, setSelectedCharity] = useState("");
    const [percentage, setPercentage] = useState(10);

    useEffect(() => {
        async function init() {
            const currentUser = await getUser();

            if (!currentUser) {
                router.push("/login");
                return;
            }

            setUser(currentUser);
            loadScores(currentUser.id);

            const { data } = await getCharities();
            if (data) setCharities(data);

            const { data: uc } = await getUserCharity(currentUser.id);
            if (uc) {
                setSelectedCharity(uc.charity_id);
                setPercentage(uc.percentage);
            }
        }

        init();
    }, []);

    async function loadScores(userId: string) {
        const { data } = await getScores(userId);
        if (data) setScores(data);
    }

    async function handleAddScore() {
        if (!user) return;

        const num = Number(score);
        if (!num || num < 1 || num > 45) {
            return alert("Score must be 1–45");
        }

        setLoading(true);
        await addScore(user.id, num);
        setScore("");
        loadScores(user.id);
        setLoading(false);
    }

    function runDraw() {
        if (scores.length < 5) return alert("Add 5 scores first");

        const userScores = scores.map((s) => s.score);
        const generated = generateWeightedDraw(userScores);

        const match = checkMatches(userScores, generated);
        const resultText = getMatchType(match);

        setDraw(generated);
        setResult(resultText);
    }

    async function handleSubscribe() {
        try {
            const res = await fetch("/api/checkout", { method: "POST" });

            if (!res.ok) {
                const text = await res.text();
                console.error("Server Error:", text);
                alert("Payment failed");
                return;
            }

            const data = await res.json();

            if (!data.url) {
                alert("No checkout URL returned");
                return;
            }

            window.location.href = data.url;
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    }

    async function saveCharity() {
        if (!user || !selectedCharity) return alert("Select charity");

        await setUserCharity(user.id, selectedCharity, percentage);
        alert("Saved!");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
            <div className="mb-6 bg-white/5 p-4 rounded-xl border border-white/10">
                <h1 className="text-2xl font-bold">
                    Welcome back, {user?.user_metadata?.username || "User"} 👋
                </h1>

                <p className="text-gray-400 text-sm">
                    {user?.email}
                </p>
            </div>

            {/* ADD SCORE */}
            <div className="flex gap-2">
                <input
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    className="p-2 bg-gray-800 rounded"
                />
                <button
                    onClick={handleAddScore}
                    className="bg-green-500 px-4 py-2 rounded"
                >
                    {loading ? "..." : "Add"}
                </button>
            </div>

            {/* SCORES */}
            <div className="mt-8 bg-white/5 p-6 rounded-2xl">
                <h2 className="mb-3">Your Scores</h2>
                {scores.map((s, i) => (
                    <div key={i} className="flex justify-between mb-2">
                        <span>{s.score}</span>
                        <span>{new Date(s.date).toLocaleDateString()}</span>
                    </div>
                ))}
            </div>

            {/* DRAW */}
            <div className="mt-8">
                <button
                    onClick={runDraw}
                    className="bg-purple-500 px-5 py-2 rounded"
                >
                    Run Draw
                </button>

                {draw.length > 0 && (
                    <div className="mt-4">
                        <p>{draw.join(", ")}</p>
                        <p className="text-green-400">{result}</p>
                    </div>
                )}
            </div>

            {/* CHARITY */}
            <div className="mt-8 bg-white/5 p-6 rounded-2xl">
                <h2 className="mb-3">Support Charity ❤️</h2>

                <select
                    value={selectedCharity}
                    onChange={(e) => setSelectedCharity(e.target.value)}
                    className="p-2 bg-gray-800 w-full mb-3"
                >
                    <option value="">Select</option>
                    {charities.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <input
                    value={percentage}
                    onChange={(e) => setPercentage(Number(e.target.value))}
                    className="p-2 bg-gray-800 w-full mb-3"
                />

                <button
                    onClick={saveCharity}
                    className="bg-pink-500 px-4 py-2 rounded"
                >
                    Save
                </button>
            </div>

            {/* STRIPE */}
            <button
                onClick={handleSubscribe}
                className="mt-6 bg-yellow-500 px-4 py-2 rounded"
            >
                Subscribe ($5)
            </button>

            {/* LOGOUT */}
            <button
                onClick={async () => {
                    await signOut();
                    router.push("/login");
                }}
                className="mt-6 bg-red-500 px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    );
}