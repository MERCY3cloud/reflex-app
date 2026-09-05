import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
      maxlength: [100, "Customer name cannot be more than 100 characters"],
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      maxlength: [200, "Address cannot be more than 200 characters"],
    },

    items: {
      type: String,
      required: [true, "Items are required"],
      trim: true,
      maxlength: [500, "Items description cannot be more than 500 characters"],
    },

    status: {
      type: String,
      enum: [
        "CREATED",
        "ASSIGNED",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "CREATED",
    },

    depositPaid: {
      type: Boolean,
      default: true,
    },

    assignedRider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    assignedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
