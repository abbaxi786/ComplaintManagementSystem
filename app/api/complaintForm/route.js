import ComplaintForm from "@/app/schema/ComplaintForm";
import complaints from "@/app/schema/complaints";

export async function POST(request) { 

    try{
        const { title, description, userId } = await request.json();

        // Generate a unique public link (you can use a library like uuid for this)
        const publicLink = `complaint-form-${Date.now()}`;

        const complaintForm = new ComplaintForm({
            title,
            description,
            publicLink,
            user: userId
        });

        await complaintForm.save();
        return new Response(JSON.stringify(complaintForm), { status: 201 });
    } catch (error) {
        console.error("Error creating complaint form:", error);
        return new Response(JSON.stringify({ error: "Failed to create complaint form" }), { status: 500 });
    }
}

async function GetSchemaField(){
    const fields = Object.keys(complaints.schema.obj);
    return fields;
}

export async function Get(request,{ params }) {
    try {
        const { publicLink } = params;

        const complaintForm = await ComplaintForm.findOne({ publicLink }).populate("user", "userName email");

        if (!complaintForm) {
            return new Response(JSON.stringify({ error: "Complaint form not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(complaintForm), { status: 200 });
    } catch (error) {
        console.error("Error fetching complaint form:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch complaint form" }), { status: 500 });
    }
}