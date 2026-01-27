import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function AuthShell({ title, subtitle, children, footer }: Props) {
  return (
    <main className="min-h-[100dvh] w-full flex items-center justify-center px-4 py-10">
      <div className="w-[min(92vw,28rem)] bg-[#121212] rounded-2xl p-8 shadow-xl border border-white/10">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {subtitle ? (
            <p className="text-sm text-zinc-400 mt-2">{subtitle}</p>
          ) : null}
        </div>

        {children}

        {footer ? <div className="mt-6 text-center">{footer}</div> : null}
      </div>
    </main>
  );
}
