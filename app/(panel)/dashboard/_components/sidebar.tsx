"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  CreditCard,
  LayoutDashboard,
  List,
  PanelLeftClose,
  PanelLeftOpen,
  Stethoscope,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/service", label: "Serviços", icon: Stethoscope },
  { href: "/dashboard/plans", label: "Planos", icon: CreditCard },
  { href: "/dashboard/profile", label: "Perfil", icon: UserRound },
];

export function Sidebar({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  function renderMenu(collapsed = false, mobile = false) {
    return menuItems.map(({ href, label, icon: Icon }) => {
      const isActive =
        pathname === href ||
        (href !== "/dashboard" && pathname.startsWith(`${href}/`));
      const link = (
        <Link
          key={href}
          href={href}
          aria-current={isActive ? "page" : undefined}
          aria-label={collapsed ? label : undefined}
          title={collapsed ? label : undefined}
          className={cn(
            "flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            collapsed && "justify-center",
            isActive
              ? "bg-emerald-500 text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-emerald-400",
          )}
        >
          <Icon className="size-5 shrink-0" aria-hidden="true" />
          {!collapsed && <span>{label}</span>}
        </Link>
      );

      return mobile ? (
        <SheetClose key={href} render={link} nativeButton={false} />
      ) : (
        link
      );
    });
  }

  return (
    <div className="flex min-h-screen w-full">
      <aside
        aria-label="Menu principal"
        className={cn(
          "fixed inset-y-0 left-0 hidden flex-col border-r bg-background transition-[width] duration-300 motion-reduce:transition-none md:flex",
          isCollapsed ? "w-20" : "w-64",
        )}
      >
        <div
          className={cn(
            "flex h-16 shrink-0 items-center border-b px-4",
            isCollapsed ? "justify-center" : "justify-between",
          )}
        >
          {!isCollapsed && <span className="font-semibold">OdontoPRO</span>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed((collapsed) => !collapsed)}
            aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
            aria-expanded={!isCollapsed}
            aria-controls="sidebar-navigation"
          >
            {isCollapsed ? (
              <PanelLeftOpen aria-hidden="true" />
            ) : (
              <PanelLeftClose aria-hidden="true" />
            )}
          </Button>
        </div>
        <nav
          id="sidebar-navigation"
          aria-label="Navegação principal"
          className="flex-1 space-y-2 overflow-y-auto p-3"
        >
          {renderMenu(isCollapsed)}
        </nav>
      </aside>

      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col transition-[margin] duration-300 motion-reduce:transition-none",
          isCollapsed ? "md:ml-20" : "md:ml-64",
        )}
      >
        <header className="flex h-16 items-center gap-4 border-b px-4 md:hidden">
          <Sheet>
            <SheetTrigger
              render={<Button variant="outline" size="icon" aria-label="Abrir menu" />}
            >
              <List className="size-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>OdontoPRO</SheetTitle>
                <SheetDescription>Navegue pelo painel da sua clínica.</SheetDescription>
              </SheetHeader>
              <nav
                aria-label="Navegação principal"
                className="flex-1 space-y-2 overflow-y-auto px-4 pb-4"
              >
                {renderMenu(false, true)}
              </nav>
            </SheetContent>
          </Sheet>
          <span className="font-semibold">Menu OdontoPRO</span>
        </header>

        <main className="flex-1 px-2 py-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
