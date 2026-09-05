import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();

    const riders = await User.find(
      { role: "RIDER" },
      {
        _id: 1,
        name: 1,
        email: 1,
      }
    ).sort({ name: 1 });

    return NextResponse.json({
      success: true,
      count: riders.length,
      data: riders,
    });
  } catch (error) {
    console.error("Error fetching riders:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch riders",
      },
      { status: 500 }
    );
  }
}
