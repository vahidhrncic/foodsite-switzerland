export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">FoodSite</h3>
            <p className="text-sm text-muted-foreground">
              Globale Plattform für Lebensmittelversorgung
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Ressourcen</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/map" className="text-muted-foreground hover:text-foreground">Versorgungskarte</a></li>
              <li><a href="/alerts" className="text-muted-foreground hover:text-foreground">Warnungen</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Unternehmen</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-muted-foreground hover:text-foreground">Über uns</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-foreground">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="text-muted-foreground hover:text-foreground">Datenschutz</a></li>
              <li><a href="/terms" className="text-muted-foreground hover:text-foreground">AGB</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} FoodSite. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}