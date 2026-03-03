import { NextRequest, NextResponse } from 'next/server';

const HUB_URL = process.env.NEXT_PUBLIC_LOGICHIVE_HUB_URL || 'http://127.0.0.1:8000';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const orgKey = request.headers.get('X-Org-Key');
        const authorization = request.headers.get('Authorization');

        if (!orgKey) {
            return NextResponse.json({ detail: 'Missing X-Org-Key header' }, { status: 401 });
        }

        console.log(`[Proxy] Forwarding checkout to Hub: ${HUB_URL}/api/v1/billing/checkout`);

        const hubResponse = await fetch(`${HUB_URL}/api/v1/billing/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Org-Key': orgKey,
                ...(authorization ? { 'Authorization': authorization } : {}),
            },
            body: JSON.stringify(body),
        });

        const data = await hubResponse.json().catch(() => ({}));

        if (!hubResponse.ok) {
            console.error(`[Proxy] Hub returned ${hubResponse.status}:`, data);
            return NextResponse.json(
                { detail: data.detail || `Hub error: ${hubResponse.status}` },
                { status: hubResponse.status }
            );
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('[Proxy] Checkout proxy error:', error);
        return NextResponse.json(
            { detail: error.message || 'Internal proxy error' },
            { status: 502 }
        );
    }
}
