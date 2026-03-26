import { supabase } from "../lib/supabase";

// Get all charities
export async function getCharities() {
    return await supabase.from("charities").select("*");
}

// Save user charity
export async function setUserCharity(
    userId: string,
    charityId: string,
    percentage: number
) {
    return await supabase.from("user_charity").upsert({
        user_id: userId,
        charity_id: charityId,
        percentage: percentage,
    });
}

// Get user charity
export async function getUserCharity(userId: string) {
    return await supabase
        .from("user_charity")
        .select("*, charities(*)")
        .eq("user_id", userId)
        .single();
}