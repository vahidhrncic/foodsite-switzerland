import { Helmet } from "react-helmet-async";
import { PriceTrendChart } from "@/components/charts/PriceTrendChart";
import { TradeBalanceChart } from "@/components/charts/TradeBalanceChart";
import { BarChart3 } from "lucide-react";

export default function Analytics() {
  return (
    <>
      <Helmet>
        <title>Analytik – FoodSite Schweiz</title>
        <meta name="description" content="Rohstoffpreise, Handelsbilanzen und Produktionstrends" />
      </Helmet>

      {/* Hero */}
      <div className="page-hero border-b">
        <div className="container py-8">
          <div className="flex items-start gap-4 animate-fade-up">
            <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Markt-Analytik</h1>
              <p className="text-muted-foreground mt-1 text-sm">
                Globale Rohstoffpreise, Handelsbilanzen und Produktionsdaten
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6 space-y-8">
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Globale Rohstoffpreise
          </h2>
          <PriceTrendChart />
        </section>

        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Schweizer Handelsbalance & Produktion
          </h2>
          <TradeBalanceChart />
        </section>
      </div>
    </>
  );
}
