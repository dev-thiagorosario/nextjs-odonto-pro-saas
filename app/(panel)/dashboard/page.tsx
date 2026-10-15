import Header from "@/app/(public)/_components/header";
import { Hero } from "@/app/(public)/_components/hero";
import { ProfessionalsCard } from "@/app/(public)/_components/professionals-card";
import type { ComponentProps } from "react";

type Professional = ComponentProps<typeof ProfessionalsCard> & {
  id: string;
};

// Substitua esta lista pelos dados retornados pela fonte de profissionais.
const professionals: Professional[] = [];

export default function Dashboard() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />

        <section
          aria-labelledby="professionals-title"
          className="mx-auto max-w-7xl space-y-6 px-6 py-10 lg:px-8"
        >
          <h2 id="professionals-title" className="text-2xl font-semibold">
            Profissionais
          </h2>
          {professionals.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {professionals.map(({ id, ...cardProps }) => (
                <ProfessionalsCard key={id} {...cardProps} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Nenhum profissional disponível no momento.
            </p>
          )}
        </section>
      </main>
    </>
  );
}
