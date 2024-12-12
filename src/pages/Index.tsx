import { RealtimeMetrics } from "@/components/dashboard/RealtimeMetrics";
import { SupplyChainMap } from "@/components/dashboard/SupplyChainMap";
import { SwissDetails } from "@/components/dashboard/SwissDetails";
import { NewsFeed } from "@/components/dashboard/NewsFeed";

const Index = () => {
  return (
    <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Lebensmittelversorgung Übersicht
        </h1>
        <p className="text-gray-600">
          Echtzeit-Monitoring und Analyse globaler Lebensmittelversorgungsketten
        </p>
      </div>

      <div className="space-y-6">
        <RealtimeMetrics />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <SupplyChainMap />
          <NewsFeed />
        </div>
        <SwissDetails />
      </div>
    </div>
  );
};

export default Index;