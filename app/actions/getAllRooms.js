'use server';

import { createAdminClient } from "@/config/appwrite";
import { redirect } from "next/navigation";

async function getAllRooms() {
    try {
        const { databases } = await createAdminClient();

        // Fetch rooms
        const { documents: rooms } = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS
        );

        return rooms || [];  // Ensure rooms is always an array
    } catch (error) {
        console.log('Failed to get rooms', error);
        return [];  // Return an empty array on failure instead of redirecting
    }
}

export default getAllRooms;
