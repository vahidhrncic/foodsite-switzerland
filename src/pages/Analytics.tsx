import { Helmet } from "react-helmet-async";
import { PriceTrendChart } from "@/components/charts/PriceTrendChart";
import { TradeBalanceChart } from "@/components/charts/TradeBalanceChart";

export default function Analytics() {
  return (
    <>
      <Helmet>
        <title>Analytik – FoodSite Schweiz</title>
        <meta name="description" content="Rohstoffpreise, Handelsbilanzen und Produktionstrends für den Schweizer Lebensmittelmarkt" />
      </Helmet>

      <div className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Markt-Analytik</h1>
          <p className="text-muted-foreground mt-1">
            Rohstoffpreise, Handelsbilanzen und Produktionsdaten in Echtzeit
          </p>
        </div>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Globale Rohstoffpreise</h2>
          <PriceTrendChart />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Schweizer Handelsbalance & Produktion</h2>
          <TradeBalanceChart />
        </section>
      </div>
    </>
  );
}
