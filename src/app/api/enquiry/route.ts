import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, profession, course } = body;

        // 1. Get the Web App URL from environment variables
        const scriptUrl = process.env.GOOGLE_SHEET_WEB_APP_URL;

        // 2. If it is not set (during dev/testing), simulate a successful submission
        if (!scriptUrl) {
            console.warn("⚠️ GOOGLE_SHEET_WEB_APP_URL is not set in .env.");
            console.warn("Received Enquiry Payload:", { name, email, phone, profession, course });
            
            // Simulate network delay for UI testing
            await new Promise(resolve => setTimeout(resolve, 1000));
            return NextResponse.json({ success: true, simulated: true });
        }

        // 3. Send the formatted payload to Google Sheets Apps Script
        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                profession,
                course,
                timestamp: new Date().toISOString()
            }),
        });

        if (!response.ok) {
            throw new Error(`Google Apps Script responded with status: ${response.status}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Enquiry Submission Error:', error);
        return NextResponse.json(
            { error: 'Failed to submit enquiry to server' },
            { status: 500 }
        );
    }
}
