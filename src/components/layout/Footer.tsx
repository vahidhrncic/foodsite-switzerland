import { Link } from "react-router-dom";

const DATA_SOURCES = ["FAO FAOSTAT", "World Bank", "BLW", "BFS", "Open-Meteo", "WFP"];

export function Footer() {
  return (
    <footer className="hidden md:block border-t bg-muted/40">
      <div className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs">
                FS
              </div>
              <span className="font-bold text-sm">FoodSite Schweiz</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Echtzeit-Monitoring der globalen Lebensmittelversorgungskette mit Fokus Schweiz.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link to="/analytics" className="text-muted-foreground hover:text-foreground transition-colors">Analytik</Link></li>
              <li><Link to="/alerts" className="text-muted-foreground hover:text-foreground transition-colors">Warnungen</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">Datenquellen</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Rechtliches</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Datenschutz</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Impressum</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Open Data</h4>
            <div className="flex flex-wrap gap-1.5">
              {DATA_SOURCES.map((s) => (
                <span key={s} className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground border border-border">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} FoodSite Schweiz. Alle Rechte vorbehalten.</span>
          <span>Daten aus öffentlichen Quellen — keine Gewähr für Vollständigkeit.</span>
        </div>
      </div>
    </footer>
  );
}
