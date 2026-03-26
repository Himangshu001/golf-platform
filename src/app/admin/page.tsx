"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Admin() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        async function load() {
            const { data } = await supabase.from("scores").select("*");
            if (data) setUsers(data);
        }

        load();
    }, []);

    return (
        <div className="p-10 text-white bg-black min-h-screen">
            <h1 className="text-2xl mb-4">Admin Panel</h1>

            {users.map((u, i) => (
                <div key={i} className="bg-gray-900 p-2 mb-2 rounded">
                    User Score: {u.score}
                </div>
            ))}
        </div>
    );
}