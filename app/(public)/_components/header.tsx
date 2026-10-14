"use client"
import { useState } from 'react'
import { Link, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Header() {

const [isOpen, setIsOpen] = useState(false);

const navItems = [
  { name: "Sobre", href: "/about" },
  { name: "Serviços", href: "/services" },
  { name: "Contato", href: "/contact" },
];

const navLinks = () => (
  <>
    {navItems.map((item) => (
      <Button
        key={item.name}
        asChild
        className="bg-transparent hover:bg-transparent text-black shadow-none hover:shadow-none"
      >
        <Link
          href={item.href}
          className="text-sm font-medium text-muted-foreground hover:text-primary"
        >
          {item.name}
        </Link>
      </Button>
    ))}
  </>
);
  return (
    <header className="
    fixed top-0 right-0 left-0 z-[999] py-4 px-6 bg-white
    ">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="container flex items-center justify-between">
          <Link href="/" className="text-3xl font-bold text-zinc-900"
          >odonto<span className="font-bold text-emerald-500">PRO</span></Link>
        </div>

        <div className="">
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks()}
          </nav>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button onClick={() => setIsOpen(true)}
              className="text-black hover:bg-transparent"
              variant="ghost"
              size="icon"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] z-[9999]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Bem vindo ao odonto
                  <span className="font-bold text-emerald-500">PRO</span>!
                  Aqui você pode encontrar informações sobre nossos serviços e entrar em contato conosco.
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-6">
                {navLinks()}
              </nav>
              <SheetFooter className="mt-auto">
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <Link className="w-6 h-6" />
                  </Button>
                </SheetClose>
              </SheetFooter>

            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
