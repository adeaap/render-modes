export default function LifecycleTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="animate-[fade-in_0.4s_ease-out]">{children}</div>;
}
