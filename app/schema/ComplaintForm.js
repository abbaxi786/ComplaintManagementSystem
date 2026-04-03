import mongoose from "mongoose";

const complaintFormSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    publicLink: { type: String, unique: true },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

export default mongoose.model("ComplaintForm", complaintFormSchema);