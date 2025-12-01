import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="border-t border-slate-800/70 bg-gradient-to-tr from-indigo-600/10 via-sky-500/5 to-emerald-400/5 py-16">
      <div className="container flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">
          Pronto para automatizar seu negócio?
        </h2>
        <p className="max-w-xl text-sm text-slate-300">
          Crie agentes inteligentes conectados ao WhatsApp em poucos minutos e deixe a TheraMeet AI cuidar do resto.
        </p>
        <Button asChild size="lg" className="mt-2">
          <Link href="/pricing">Começar agora</Link>
        </Button>
      </div>
    </section>
  );
}
