import { NextResponse } from 'next/server';
import { subscribeToNewsletter } from '@/lib/feedback-service'; // Use the existing function

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email;

    // Basic validation
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Invalid email address provided.' }, { status: 400 });
    }

    // Use the existing subscribeToNewsletter function
    // Add a source field to distinguish signups from this popup
    const result = await subscribeToNewsletter(email); // Assuming subscribeToNewsletter accepts just email

    // Optionally, you might want to modify subscribeToNewsletter to accept a source parameter:
    // const result = await subscribeToNewsletter(email, 'early_access_popup');

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Successfully subscribed.' });
    } else {
      // Log the specific error on the server but return a generic message
      console.error('Newsletter Popup API Error:', result.error);
      return NextResponse.json({ success: false, error: 'Failed to subscribe email.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in /api/newsletter-popup:', error);
    // Handle JSON parsing errors or other unexpected errors
    if (error instanceof SyntaxError) {
      return NextResponse.json({ success: false, error: 'Invalid request format.' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'An unexpected server error occurred.' }, { status: 500 });
  }
}