'use server';

import { createAdminClient } from "@/config/appwrite";
import { redirect } from "next/navigation";

async function getSingleRoom(id) {
    try {
        const { databases } = await createAdminClient();

        // Fetch rooms
        const room = await databases.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS,
            id
        );

        return room || [];  // Ensure rooms is always an array
    } catch (error) {
        console.log('Failed to get room', error);
        return [];  // Return an empty array on failure instead of redirecting
    }
}

export default getSingleRoom;