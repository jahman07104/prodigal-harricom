import { qualifyLead } from "../../actions/qualify-lead";

const corsHeaders = {
  "Access-Control-Allow-Origin":
    process.env.ALLOWED_ORIGIN ?? "http://localhost:3000",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch (error) {
    console.error("Invalid lead qualification request body", error);
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = await qualifyLead(payload);
  const responseHeaders = new Headers(corsHeaders);
  if (result.status === 429) {
    responseHeaders.set("Retry-After", result.retryAfterSeconds.toString());
  }

  return Response.json(result.body, {
    status: result.status,
    headers: responseHeaders,
  });
}
