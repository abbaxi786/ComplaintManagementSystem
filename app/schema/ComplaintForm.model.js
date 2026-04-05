import mongoose from "mongoose";

const complaintFormSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    publicLink: { type: String, unique: true },
    role: [{ type: String, required: true }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  {
    timestamps: true
  }
);

const ComplaintForm =
  mongoose.models.ComplaintForm ||
  mongoose.model("ComplaintForm", complaintFormSchema);

export default ComplaintForm;