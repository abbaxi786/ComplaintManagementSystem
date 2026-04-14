import { connectDB } from "@/app/lib/db";
import ComplaintForm from "@/app/schema/ComplaintForm.model";
import complaints from "@/app/schema/complaints.model";

export async function GET(request, { params }) {
    try{

        await connectDB();
        
        const { complaintid } = await params;
        const publicLink = complaintid;
        const complaintForm = await ComplaintForm.findOne(
            { publicLink },
            { _id: 1 },
            {role: 1 }
        );
        console.log("Fetched complaint form: ", complaintForm);
        if (!complaintForm) {
            return new Response(JSON.stringify({ error: "Form not found" }), { status: 404 });
        }

        if (complaintForm) {
            return new Response(
                JSON.stringify({ complaintForm}),
                { status: 200 }
            );
        }

    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({ error: "Failed to fetch complaint form" }),
            { status: 500 }
        );
    }

}

