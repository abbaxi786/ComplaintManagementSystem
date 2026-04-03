import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    role: { type: String, required: true }
});

const role = mongoose.model.Role|| mongoose.model("Role", roleSchema);

export default role;