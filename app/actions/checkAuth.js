'use server'

import { createSessionClient } from "@/config/appwrite"
import { cookies } from "next/headers"

async function checkAuth() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('appwrite-session');


    if (!sessionCookie) {
        return { isAuthenticated: false };
    }

    try {
        const { account } = await createSessionClient(sessionCookie.value);
        const user = await account.get();

        console.log('Authenticated User:', user); // Debugging step

        return {
            isAuthenticated: true,
            user: {
                id: user.$id,
                name: user.name,
                email: user.email
            }
        };
    } catch (error) {
        console.error('Auth Error:', error); // Debugging step
        return { isAuthenticated: false };
    }
}


export default checkAuth;