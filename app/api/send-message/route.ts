import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

const REMOTE_URL = 'http://10.131.131.25:7000/mqtt/pub';

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.query) {
    return NextResponse.json({ error: 'Missing query in request body' }, { status: 400 });
  }

  const generateMessageId = (): string => {
    const timestampPart = Date.now().toString(36).slice(-4).padStart(4, '0');
    const randomPart = randomBytes(4).toString('hex').slice(0, 4);
    return `${timestampPart}${randomPart}`;
  };

  const messageid =
    typeof body.messageid === 'string' && body.messageid.length === 8
      ? body.messageid
      : generateMessageId();
  const payload = {
    image: body.image ?? '',
    messageid,
    extension: body.extension ?? '',
    query: body.query ?? body.message,
    topic: `${messageid}pub`,
    history: body.history ?? [],
    fileType: body.fileType ?? null,
    fileName: body.fileName ?? null,
    progress: body.progress ?? null,
    state_tag: typeof body.state_tag === 'number' ? body.state_tag : 0,
  };

  const response = await fetch(REMOTE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const responseBody = await response.text();

  if (!response.ok) {
    return NextResponse.json({ error: responseBody || 'Upstream API error' }, { status: response.status });
  }

  let responseData;
  try {
    responseData = JSON.parse(responseBody);
  } catch {
    return NextResponse.json({ reply: responseBody });
  }

  if (responseData.status === 'published') {
    const secondPayload = {
      messageid,
      topic: `${messageid}progress`,
    };

    const secondResponse = await fetch('http://10.131.131.25:7000/mqtt/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(secondPayload),
    });

    const secondResponseBody = await secondResponse.text();

    if (!secondResponse.ok) {
      return NextResponse.json({ error: secondResponseBody || 'Second API error' }, { status: secondResponse.status });
    }

    try {
      return NextResponse.json(JSON.parse(secondResponseBody));
    } catch {
      return NextResponse.json({ reply: secondResponseBody });
    }
  } else {
    return NextResponse.json(responseData);
  }
}
