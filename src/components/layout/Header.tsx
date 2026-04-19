import { Sun, Moon, AlertTriangle, LayoutDashboard, Map, BarChart3 } from "lucide-react";
import { Button } from "../ui/button";
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
        .eq("resolved", false)
        .eq("severity", "high");
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
      className="h-9 w-9 rounded-lg"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Design wechseln"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

const NAV_LINKS = [
  { href: "/",          label: "Dashboard",  icon: LayoutDashboard },
  { href: "/resources", label: "Ressourcen", icon: Map },
  { href: "/analytics", label: "Analytik",   icon: BarChart3 },
  { href: "/alerts",    label: "Warnungen",  icon: AlertTriangle },
];

export function Header() {
  const location = useLocation();
  const { data: alertCount = 0 } = useActiveAlertCount();

  return (
    <>
      {/* ── Desktop top bar (hidden on mobile) ───────────────────── */}
      <header className="sticky top-0 z-40 hidden md:block w-full border-b bg-card/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              FS
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight">FoodSite</span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">Schweiz</span>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const active = location.pathname === href;
              return (
                <Link
                  key={href}
                  to={href}
                  className={`relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  {href === "/alerts" && alertCount > 0 && (
                    <Badge className="h-4 min-w-4 px-1 text-[10px] bg-swiss-600 text-white border-0">
                      {alertCount}
                    </Badge>
                  )}
                  {active && (
                    <span className="absolute inset-x-2 -bottom-[1px] h-px bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ── Mobile top strip (logo + theme, shown on mobile) ─────── */}
      <header className="sticky top-0 z-40 flex md:hidden h-14 w-full items-center justify-between border-b bg-card/90 backdrop-blur-md px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs">
            FS
          </div>
          <span className="text-sm font-bold">FoodSite Schweiz</span>
        </Link>
        <div className="flex items-center gap-1">
          {alertCount > 0 && (
            <Link to="/alerts">
              <Badge className="h-6 px-2 bg-swiss-600 text-white border-0 text-xs">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {alertCount}
              </Badge>
            </Link>
          )}
          <ThemeToggle />
        </div>
      </header>

      {/* ── Mobile bottom tab bar ─────────────────────────────────── */}
      <nav
        className="fixed bottom-0 inset-x-0 z-50 flex md:hidden border-t bg-card/95 backdrop-blur-md"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const active = location.pathname === href;
          return (
            <Link
              key={href}
              to={href}
              className={`relative flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold tracking-wide transition-colors ${
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active && (
                <span className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-primary" />
              )}
              <div className="relative">
                <Icon className={`h-5 w-5 transition-transform ${active ? "scale-110" : ""}`} />
                {href === "/alerts" && alertCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-swiss-600 text-[8px] text-white font-bold">
                    {alertCount > 9 ? "9+" : alertCount}
                  </span>
                )}
              </div>
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
