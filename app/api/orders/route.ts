import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const body = await request.json();

    const { riderId, status } = body;

    await connectToDatabase();

    /*
     * CASE 1:
     * Dispatcher is assigning a rider.
     */
    if (riderId) {
      const rider = await User.findOne({
        _id: riderId,
        role: "RIDER",
      });

      if (!rider) {
        return NextResponse.json(
          {
            success: false,
            error: "Selected rider does not exist",
          },
          { status: 404 }
        );
      }

      const order = await Order.findByIdAndUpdate(
        id,
        {
          assignedRider: rider._id,
          assignedAt: new Date(),
          status: "ASSIGNED",
        },
        {
          new: true,
          runValidators: true,
        }
      ).populate(
        "assignedRider",
        "name email"
      );

      if (!order) {
        return NextResponse.json(
          {
            success: false,
            error: "Order not found",
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Rider assigned successfully",
        data: order,
      });
    }

    /*
     * CASE 2:
     * Update the order status.
     */
    if (status) {
      const allowedStatuses = [
        "CREATED",
        "ASSIGNED",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
      ];

      if (!allowedStatuses.includes(status)) {
        return NextResponse.json(
          {
            success: false,
            error: "Invalid order status",
          },
          { status: 400 }
        );
      }

      const order = await Order.findByIdAndUpdate(
        id,
        { status },
        {
          new: true,
          runValidators: true,
        }
      ).populate(
        "assignedRider",
        "name email"
      );

      if (!order) {
        return NextResponse.json(
          {
            success: false,
            error: "Order not found",
          },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Order status updated successfully",
        data: order,
      });
    }

    /*
     * Neither riderId nor status was supplied.
     */
    return NextResponse.json(
      {
        success: false,
        error: "Provide a riderId or status",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error updating order:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update order",
      },
      { status: 500 }
    );
  }
}
