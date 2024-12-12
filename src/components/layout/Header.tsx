import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { NavigationMenu } from "../ui/navigation-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">FoodSite</span>
          </a>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <a href="/" className="text-lg font-medium">Home</a>
              <a href="/resources" className="text-lg font-medium">Resources</a>
              <a href="/alerts" className="text-lg font-medium">Alerts</a>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="/" className="text-sm font-medium">Home</a>
          <a href="/resources" className="text-sm font-medium">Resources</a>
          <a href="/alerts" className="text-sm font-medium">Alerts</a>
        </nav>
      </div>
    </header>
  );
}