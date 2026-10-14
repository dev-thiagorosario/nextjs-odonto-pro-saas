"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { name: "Sobre", href: "/about" },
  { name: "Serviços", href: "/services" },
  { name: "Contato", href: "/contact" },
];

type HeaderProps = {
  session?: {
    user: {
      name?: string | null;
    };
  } | null;
};

export default function Header({ session = null }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = (closeOnClick = false) => (
  <>
    {navItems.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        onClick={closeOnClick ? () => setIsOpen(false) : undefined}
        className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:text-emerald-600"
      >
        {item.name}
      </Link>
    ))}

    {session ? (
      <Link
        href="/dashboard"
        onClick={closeOnClick ? () => setIsOpen(false) : undefined}
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:text-emerald-600"
      >
      <span className="ml-2 rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800">
        {session.user.name || "Meu painel"}
      </span>
      </Link>

    ) : (
      <Button
        render={<Link href="/login" />}
        nativeButton={false}
        onClick={closeOnClick ? () => setIsOpen(false) : undefined}
        className="gap-2 bg-emerald-600 px-4 text-white shadow-sm hover:bg-emerald-700 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/50"
      >
        <LogIn className="size-4" aria-hidden="true" />
        Fazer login
      </Button>
    )}
  </>
);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <Link
          href="/"
          aria-label="odontoPRO — Página inicial"
          className="rounded-md text-3xl font-bold text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
        >
          odonto<span className="text-emerald-500">PRO</span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-4 md:flex">
          {navLinks()}
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger
            render={<Button variant="ghost" size="icon" />}
            aria-label="Abrir menu de navegação"
            className="text-zinc-900 md:hidden"
          >
            <Menu className="size-6" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton={false}
            className="w-[300px] max-w-full overflow-y-auto sm:w-[400px] sm:max-w-[400px]"
          >
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Bem-vindo ao odonto
                <span className="font-bold text-emerald-500">PRO</span>! Aqui você
                pode encontrar informações sobre nossos serviços e entrar em
                contato conosco.
              </SheetDescription>
            </SheetHeader>
            <nav aria-label="Navegação móvel" className="flex flex-col gap-2 px-4">
              {navLinks(true)}
            </nav>
            <SheetFooter>
              <SheetClose render={<Button variant="outline" />}>
                Fechar menu
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
