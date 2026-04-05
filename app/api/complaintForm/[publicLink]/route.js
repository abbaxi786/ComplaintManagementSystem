import { connectDB } from "@/app/lib/db";
import Complaints from "@/app/schema/complaints.model";
import ComplaintForm from "@/app/schema/ComplaintForm.model";
import { GetSchemaField } from "../route.js";

export async function GET(request, { params }) {
    try {
        await connectDB();

        const { publicLink } = await params;
        const complaintForm = await ComplaintForm.findOne(
            { publicLink },
            { _id: 1 }
        );

        if (!complaintForm) {
            return new Response(JSON.stringify({ error: "Form not found" }), { status: 404 });
        }

        const complaints = await Complaints.find({
            formId: complaintForm._id
        });

        // let fields = GetSchemaField();

        return new Response(
            JSON.stringify({ complaints}),
            { status: 200 }
        );

    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch complaint form" }),
            { status: 500 }
        );
    }
}