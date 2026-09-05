import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import User from '@/models/User';

export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find({}).sort({ createdAt: -1 }).limit(10);
    
    return NextResponse.json({
      status: 'success',
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'Failed to fetch users',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    const user = await User.create(body);
    
    return NextResponse.json({
      status: 'success',
      data: user
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'Failed to create user',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}