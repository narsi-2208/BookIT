'use server';

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

async function destorySession() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('appwrite-session');

    if (!sessionCookie) {
        return {
            error: 'No session cookie found'
        };
    }

    try {
        const { account } = await createSessionClient(sessionCookie.value);

        // Delete current session
        await account.deleteSession('current');

        // Correctly delete the cookie with same options used when setting it
        cookies().delete('appwrite-session', { path: '/' }); 

        return { success: true };
    } catch (error) {
        return { error: 'Error in deleting session' };
    }
}

export default destorySession;
