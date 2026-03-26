import { supabase } from "../lib/supabase";

export async function addScore(userId: string, score: number) {
    // Get existing scores
    const { data: scores } = await supabase
        .from("scores")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: true });

    // If already 5 scores → delete oldest
    if (scores && scores.length >= 5) {
        await supabase
            .from("scores")
            .delete()
            .eq("id", scores[0].id);
    }

    // Insert new score
    return await supabase.from("scores").insert({
        user_id: userId,
        score,
        date: new Date().toISOString(),
    });
}

export async function getScores(userId: string) {
    return await supabase
        .from("scores")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: false });
}