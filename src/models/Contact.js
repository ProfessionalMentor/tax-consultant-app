import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    service: {
      type: String,
      required: [true, "Please select a service"],
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "CONVERTED", "CLOSED"],
      default: "NEW",
    }
  },
  { timestamps: true, collection: "Contact" }
);

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
