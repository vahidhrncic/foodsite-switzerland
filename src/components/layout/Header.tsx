import { MenuIcon, Sun, Moon, AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useTheme } from "next-themes";
import { Badge } from "../ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link, useLocation } from "react-router-dom";

function useActiveAlertCount() {
  return useQuery({
    queryKey: ["active-alert-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("alerts")
        .select("id", { count: "exact", head: true })
        .eq("resolved", false);
      return count ?? 0;
    },
    refetchInterval: 60_000,
    staleTime: 30_000,
  });
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Design wechseln"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

const NAV_LINKS = [
  { href: "/",          label: "Startseite" },
  { href: "/resources", label: "Ressourcen" },
  { href: "/analytics", label: "Analytik" },
  { href: "/alerts",    label: "Warnungen" },
];

export function Header() {
  const location = useLocation();
  const { data: alertCount = 0 } = useActiveAlertCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">FoodSite</span>
          <span className="hidden text-xs text-muted-foreground sm:block">Schweiz</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menü öffnen">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 pt-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`flex items-center gap-2 text-lg font-medium transition-colors hover:text-primary ${
                      location.pathname === link.href ? "text-primary" : ""
                    }`}
                  >
                    {link.label}
                    {link.href === "/alerts" && alertCount > 0 && (
                      <Badge variant="destructive" className="h-5 min-w-5 px-1 text-xs">
                        {alertCount}
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                  location.pathname === link.href ? "bg-accent text-accent-foreground" : ""
                }`}
              >
                {link.label}
                {link.href === "/alerts" && alertCount > 0 && (
                  <Badge variant="destructive" className="h-5 min-w-5 px-1 text-xs">
                    {alertCount}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
