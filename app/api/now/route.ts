export async function GET() {
  const ts = Date.now();
  return new Response(
    JSON.stringify({
      ts,
      iso: new Date(ts).toISOString(),
    }),
    {
      headers: {
        "content-type": "application/json",
        "cache-control": "no-store",
      },
    },
  );
}
