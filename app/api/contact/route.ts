// app/api/contact/route.ts

import { NextResponse } from 'next/server';

// This API route handles GET requests to /api/contact
// It is used for testing the contact API endpoint and can be expanded for actual contact form submissions.

export async function GET(request: Request) {
  try {
    // Here you could process a contact form submission or send a test message.
    // For now, it's a simple GET handler that returns a success message.

    return NextResponse.json({ 
      status: 'success',
      message: 'Contact API is working perfectly.' 
    }, { status: 200 });

  } catch (error) {
    // Handling potential errors
    console.error('Error occurred while processing the contact API request:', error);

    return NextResponse.json({
      status: 'error',
      message: 'An error occurred while processing the request.'
    }, { status: 500 });
  }
}

