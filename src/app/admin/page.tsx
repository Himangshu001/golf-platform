"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import { getUser } from "../../services/auth";

export default function Admin() {
    const router = useRouter();

    const [user, setUser] = useState<any>(null);
    const [scores, setScores] = useState<any[]>([]);
    const [charities, setCharities] = useState<any[]>([]);
    const [newCharity, setNewCharity] = useState("");

    useEffect(() => {
        async function init() {
            const currentUser = await getUser();

            if (!currentUser) {
                router.push("/login");
                return;
            }

            // 👉 Simple admin check (you can hardcode your email)
            if (currentUser.email !== "himangshupramanik03@gmail.com") {
                alert("Not authorized");
                router.push("/dashboard");
                return;
            }

            setUser(currentUser);

            loadData();
        }

        init();
    }, []);

    async function loadData() {
        const { data: scoreData } = await supabase
            .from("scores")
            .select("*");

        const { data: charityData } = await supabase
            .from("charities")
            .select("*");

        if (scoreData) setScores(scoreData);
        if (charityData) setCharities(charityData);
    }

    async function addCharity() {
        if (!newCharity) return;

        await supabase.from("charities").insert({
            name: newCharity,
            description: "Added by admin",
        });

        setNewCharity("");
        loadData();
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

            {/* USERS / SCORES */}
            <div className="mb-8">
                <h2 className="text-xl mb-3">All Scores</h2>

                {scores.map((s, i) => (
                    <div key={i} className="bg-gray-900 p-2 mb-2 rounded">
                        User: {s.user_id} | Score: {s.score}
                    </div>
                ))}
            </div>

            {/* CHARITY MANAGEMENT */}
            <div className="mb-8">
                <h2 className="text-xl mb-3">Manage Charities</h2>

                <input
                    value={newCharity}
                    onChange={(e) => setNewCharity(e.target.value)}
                    placeholder="New charity name"
                    className="p-2 bg-gray-800 rounded mr-2"
                />

                <button
                    onClick={addCharity}
                    className="bg-green-500 px-4 py-2 rounded"
                >
                    Add Charity
                </button>

                <div className="mt-4">
                    {charities.map((c, i) => (
                        <div key={i} className="bg-gray-900 p-2 mb-2 rounded">
                            {c.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}