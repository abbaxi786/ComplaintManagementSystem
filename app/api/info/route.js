import complaints from "@/app/schema/complaints.model";
import mongoose from "mongoose";

export async function POST(request) {

    try {

        const {
            clientEmail,
            title,
            description,
            phoneNumber,
            role,
            formId
        } = await request.json();

        // VALIDATION
        if (
            !clientEmail ||
            !title ||
            !description ||
            !phoneNumber ||
            !role ||
            !formId
        ) {
            return Response.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // 🔥 VALIDATE ObjectId
        if (!mongoose.Types.ObjectId.isValid(formId)) {
            return Response.json(
                { error: "Invalid formId (must be MongoDB ObjectId)" },
                { status: 400 }
            );
        }

        // SAVE COMPLAINT
        await complaints.create({
            clientEmail,
            title,
            description,
            phoneNumber,
            role,
            formId
        });

        return Response.json(
            { message: "Complaint submitted successfully" },
            { status: 201 }
        );

    } catch (error) {

        console.error("Error:", error);

        return Response.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}