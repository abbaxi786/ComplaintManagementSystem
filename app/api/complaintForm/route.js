import ComplaintForm from "@/app/schema/ComplaintForm.model";
import complaints from "@/app/schema/complaints.model";
import { connectDB } from "@/app/lib/db";

export async function POST(request) {
    try {
        await connectDB();

        const { title, description, userId, role } = await request.json();

        if (!title || !userId || !role || role.length === 0) {
            return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
        }

        const publicLink = `complaint-form-${Date.now()}`;

        const complaintForm = new ComplaintForm({
            title,
            description,
            publicLink,
            role,
            user: userId
        });

        await complaintForm.save();

        return new Response(JSON.stringify(complaintForm), { status: 201 });

    } catch (error) {
        console.error("Error creating complaint form:", error);
        return new Response(JSON.stringify({ error: "Failed to create complaint form" }), { status: 500 });
    }
}


// export async function GetSchemaField(){
//     const fields = Object.keys(complaints.schema.objectPaths).filter(field => !["_id", "__v"].includes(field));
//     return fields;
// }

export function GetSchemaField() {
    const paths = complaints.schema.paths;
    const fieldsWithTypes = {};

    for (const field in paths) {
        if (!["_id", "__v"].includes(field)) {
            fieldsWithTypes[field] = paths[field].instance;
        }
    }

    return fieldsWithTypes;
}

