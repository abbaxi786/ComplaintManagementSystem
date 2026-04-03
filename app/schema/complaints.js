import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    issueImg: { type: String },

    status: { 
        type: String, 
        enum: ["open", "in-progress", "resolved"], 
        default: "open" 
    },

    priority: { 
        type: String, 
        enum: ["low", "medium", "high"], 
        default: "medium" 
    },
    phoneNumber: { type: String,required: true }
    ,
    clientEmail: { type: String, required: true }
    ,
    // Changed from single role → multiple roles
    role: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Role" 
    }],

    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ComplaintForm",
        required: true
    }
    ,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    resolvedAt: { type: Date },
});

const complaints = mongoose.models.Complaints || mongoose.model("Complaints", complaintSchema);
export default complaints;