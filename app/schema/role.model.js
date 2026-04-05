import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    role: { type: String, required: true}
});

// Check if model already exists to prevent OverwriteModelError
const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);

export default Role;