import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.messageid) {
    return NextResponse.json({ error: 'Missing messageid in request body' }, { status: 400 });
  }

  const payload = {
    messageid: body.messageid,
    topic: body.topic || `${body.messageid}progress`,
  };

  const response = await fetch('http://10.131.131.25:7000/mqtt/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const responseBody = await response.text();

  if (!response.ok) {
    return NextResponse.json({ error: responseBody || 'Progress API error' }, { status: response.status });
  }

  try {
    return NextResponse.json(JSON.parse(responseBody));
  } catch {
    return NextResponse.json({ progress: responseBody });
  }
}
