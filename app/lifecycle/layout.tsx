import Link from "next/link";
import { Stepper } from "./_components/Stepper";

export default function LifecycleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <Link
          href="/"
          className="text-xs font-medium tracking-wider text-muted-foreground uppercase hover:text-foreground"
        >
          ← Module 1 · Browser rendering lifecycle
        </Link>
      </div>
      <Stepper />
      <div className="mt-8">{children}</div>
    </div>
  );
}
