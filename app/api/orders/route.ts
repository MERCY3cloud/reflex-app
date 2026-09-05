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
