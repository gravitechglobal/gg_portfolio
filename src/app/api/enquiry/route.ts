import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, profession, course } = body;

        // 1. Get the Web App URL from environment variables or default fallback
        const scriptUrl = process.env.GOOGLE_SHEET_WEB_APP_URL || "https://script.google.com/macros/s/AKfycbwtFggnC6RGCYCluMtWfjk1fPMIfEZS-c6HdEFlgpVzQce7F0BdJgiNFIPLAHn2TYJ7/exec";

        // Prefix with single quote so Google Sheets treats it as text instead of formula
        const formattedPhone = phone && typeof phone === 'string' && phone.startsWith('+') && !phone.startsWith("'") 
            ? `'${phone}` 
            : phone;

        // 3. Send the formatted payload to Google Sheets Apps Script
        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                phone: formattedPhone,
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
