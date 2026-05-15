import { connectDB } from "@/app/lib/db";
import ComplaintForm from "@/app/schema/ComplaintForm.model";

export async function GET(request, { params }) {
    try {
        await connectDB();

        const { complaintid } = await params;
        
        const complaintForm = await ComplaintForm.findOne(
            { publicLink: complaintid },
            "_id role title description" // Space-separated string for projection
        ).lean(); // .lean() makes the query faster by returning a plain JS object

        console.log("Fetched complaint form: ", complaintForm);

        if (!complaintForm) {
            return new Response(
                JSON.stringify({ error: "Form not found" }), 
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ data: complaintForm }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error("Database Error:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

