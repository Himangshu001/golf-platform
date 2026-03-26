import { supabase } from "../lib/supabase";

// SIGN UP WITH USERNAME
export async function signUp(
    email: string,
    password: string,
    username: string
) {
    return await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username: username,
            },
        },
    });
}

// SIGN IN
export async function signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
        email,
        password,
    });
}

// GET USER
export async function getUser() {
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return user;
}

// SIGN OUT
export async function signOut() {
    return await supabase.auth.signOut();
}