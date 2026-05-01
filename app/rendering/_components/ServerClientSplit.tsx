import { ModeBadge } from "@/app/_components/ModeBadge";

export function ServerClientSplit({
  serverNode,
  clientNode,
  serverCaption,
  clientCaption,
}: {
  serverNode: React.ReactNode;
  clientNode: React.ReactNode;
  serverCaption?: string;
  clientCaption?: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-server/40 bg-card p-5">
        <div className="mb-3 flex items-center gap-2">
          <ModeBadge variant="server">Server</ModeBadge>
          <span className="text-xs text-muted-foreground">
            Rendered on server · no JS shipped
          </span>
        </div>
        <div>{serverNode}</div>
        {serverCaption && (
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            {serverCaption}
          </p>
        )}
      </div>
      <div className="rounded-xl border border-client/40 bg-card p-5">
        <div className="mb-3 flex items-center gap-2">
          <ModeBadge variant="client">Client</ModeBadge>
          <span className="text-xs text-muted-foreground">
            Hydrated in the browser · JS in the bundle
          </span>
        </div>
        <div>{clientNode}</div>
        {clientCaption && (
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            {clientCaption}
          </p>
        )}
      </div>
    </div>
  );
}
