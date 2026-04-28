export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-2/3 animate-pulse rounded-md bg-muted" />
      <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
      <div className="h-4 w-5/6 animate-pulse rounded-md bg-muted" />
      <div className="h-72 animate-pulse rounded-xl border border-border bg-muted" />
      <div className="h-4 w-4/6 animate-pulse rounded-md bg-muted" />
      <div className="h-4 w-3/6 animate-pulse rounded-md bg-muted" />
    </div>
  );
}
