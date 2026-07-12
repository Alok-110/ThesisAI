import type { ReactNode } from "react";

export function AuthShell({
  heading,
  subheading,
  children,
}: {
  heading: string;
  subheading: string;
  children: ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center px-6 py-5 md:px-8">
        <span className="select-none font-mono text-sm font-medium tracking-tight text-foreground">
          Thesis
        </span>
      </header>
      <div className="flex flex-1 items-start justify-center px-6 pt-[14vh] pb-16">
        <div className="w-full max-w-[380px]">
          <h1 className="text-lg font-medium tracking-tight text-foreground">{heading}</h1>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{subheading}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </main>
  );
}