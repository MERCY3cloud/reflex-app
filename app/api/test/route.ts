import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';

export async function GET() {
  try {
    await connectToDatabase();
    
    return NextResponse.json({
      status: 'success',
      message: 'Mongoose connected successfully!',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Mongoose connection error:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'Failed to connect to MongoDB',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}