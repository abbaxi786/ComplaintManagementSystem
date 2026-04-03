import Complaints from "../../schema/complaints";

export async function POST(request) {
    try {
        const { title, description, issueImg, priority,role, category, formId } = await request.json();

        const complaint = new Complaints({
            title,
            description,
            issueImg,
            priority,
            role,
            category,
            formId
        });

        await complaint.save();
        return new Response(JSON.stringify(complaint), { status: 201 });
    } catch (error) {
        console.error("Error creating complaint:", error);
        return new Response(JSON.stringify({ error: "Failed to create complaint" }), { status: 500 });
    }
}
