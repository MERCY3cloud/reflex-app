import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectToDatabase();

    const orders = await Order.find({})
      .populate("assignedRider", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch orders",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();

    if (!body.customerName || !body.address || !body.items) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: customerName, address, items",
        },
        { status: 400 }
      );
    }

    const order = await Order.create({
      customerName: body.customerName,
      address: body.address,
      items: body.items,
      depositPaid:
        body.depositPaid !== undefined
          ? body.depositPaid
          : true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully",
        data: order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
      },
      { status: 500 }
    );
  }
}
