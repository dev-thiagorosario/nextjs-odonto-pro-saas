import Image from "next/image";

import { Button } from "@/components/ui/button";
import medicImg from "../_assets/medic.png";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-green-50">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pt-10 md:grid-cols-2 md:gap-12 md:pt-16 lg:px-8">
        <div className="space-y-6 pb-2 md:pb-16">
          <h1
            id="hero-title"
            className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl"
          >
            Bem-vindo ao Odonto<span className="text-emerald-600 uppercase">Pro</span>
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-gray-700">
            Encontre profissionais de saúde confiáveis e agende consultas de
            forma rápida e prática. Nossa plataforma conecta você a especialistas
            qualificados, garantindo um atendimento de qualidade.
          </p>
          <Button
            size="lg"
            className="bg-emerald-600 px-6 text-white hover:bg-emerald-700 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/50 cursor-pointer"
          >
            Encontrar serviços
          </Button>
        </div>

        <div className="flex self-end justify-center md:justify-end">
          <Image
            src={medicImg}
            alt="Profissional de saúde com jaleco e estetoscópio"
            preload
            sizes="(min-width: 1280px) 560px, (min-width: 768px) 50vw, 100vw"
            className="h-auto w-full max-w-[360px] object-contain md:max-w-[560px]"
          />
        </div>
      </div>
    </section>
  );
}
