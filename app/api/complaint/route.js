import Complaints from "../../schema/complaints.model";
import { connectDB } from "@/app/lib/db";

export async function POST(request) {
    try {
        const {
            title,
            description,
            issueImg,
            priority,
            role,
            phoneNumber,
            clientEmail,
            formId
        } = await request.json();

        await connectDB();

        const complaint = new Complaints({
            title,
            description,
            issueImg,
            priority,
            role,
            phoneNumber,
            clientEmail,
            formId
        });

        await complaint.save(); // ✅ FIXED

        return new Response(JSON.stringify(complaint), { status: 201 });

    } catch (error) {
        console.error("Error creating complaint:", error);
        return new Response(
            JSON.stringify({ error: "Failed to create complaint" }),
            { status: 500 }
        );
    }
}