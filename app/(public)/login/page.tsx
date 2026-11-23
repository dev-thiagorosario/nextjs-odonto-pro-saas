import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import medicImg from "../_assets/medic.png";
import { loginWithGitHub } from "./_actions/login";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Entrar | odontoPRO",
  description: "Acesse seu painel do odontoPRO com a sua conta do GitHub.",
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const [session, { callbackUrl, error }] = await Promise.all([
    auth(),
    searchParams,
  ]);

  const destination =
    typeof callbackUrl === "string" &&
    URL.canParse(callbackUrl, "http://localhost") &&
    new URL(callbackUrl, "http://localhost").pathname === "/dashboard/service"
      ? "/dashboard/service"
      : "/dashboard/profile";

  if (session?.user?.id) {
    redirect(destination);
  }

  return (
    <main className="grid flex-1 bg-white text-zinc-900 lg:grid-cols-2">
      <div className="hidden items-end justify-center overflow-hidden bg-emerald-100 px-10 pt-16 lg:flex">
        <Image
          src={medicImg}
          alt=""
          sizes="(min-width: 1024px) 50vw, 0px"
          className="h-auto max-h-[85svh] w-full max-w-[640px] object-contain object-bottom"
        />
      </div>

      <div className="flex min-h-svh flex-col px-6 sm:px-12 lg:px-16">
        <header className="flex flex-wrap items-center justify-between gap-x-4 pt-6 sm:pt-10">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-md text-2xl font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            odonto<span className="text-emerald-700">PRO</span>
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium text-zinc-600 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar ao início
          </Link>
        </header>

        <section
          aria-labelledby="login-title"
          className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-8 py-16"
        >
          <div className="space-y-3">
            <h1 id="login-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Acesse seu painel
            </h1>
            <p className="leading-relaxed text-zinc-600">
              Entre com sua conta do GitHub para acessar seu perfil e gerenciar seus serviços.
            </p>
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
              {error === "OAuthAccountNotLinked"
                ? "Use a mesma conta que você utilizou para entrar anteriormente."
                : "Não foi possível entrar com o GitHub. Tente novamente."}
            </p>
          )}

          <LoginForm action={loginWithGitHub.bind(null, destination)} />
        </section>
      </div>
    </main>
  );
}
