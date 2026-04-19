import { MapPin } from "lucide-react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { MapMarker } from "./map/MapMarker";
import { regions } from "./map/regions-data";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import { useTheme } from "next-themes";

function SetViewOnMount({ center, zoom }: { center: LatLngExpression; zoom: number }) {
  const map = useMap();
  useEffect(() => { map.setView(center, zoom); }, [center, map, zoom]);
  return null;
}

const LIGHT_TILES = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const DARK_TILES  = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

const LEGEND = [
  { color: "bg-emerald-400", label: "Gute Versorgung" },
  { color: "bg-amber-400",   label: "Eingeschränkt" },
  { color: "bg-red-400",     label: "Kritisch" },
];

export function SupplyChainMap() {
  const { theme, systemTheme } = useTheme();
  const isDark = (theme === "system" ? systemTheme : theme) === "dark";
  const tileUrl = isDark ? DARK_TILES : LIGHT_TILES;

  return (
    <div className="space-y-2 animate-fade-up" style={{ animationDelay: "80ms" }}>
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          <MapPin className="h-4 w-4" />
          Globale Ressourcenkarte
        </h2>
        {/* Legend */}
        <div className="flex items-center gap-3">
          {LEGEND.map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full rounded-xl overflow-hidden ring-1 ring-border/60 shadow-sm h-[300px] sm:h-[420px] lg:h-[520px]">
        <MapContainer style={{ height: "100%", width: "100%" }}>
          <SetViewOnMount center={[25, 10]} zoom={2} />
          <TileLayer
            key={tileUrl}
            url={tileUrl}
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />
          {regions.map((region) => (
            <MapMarker key={region.id} region={region} />
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
