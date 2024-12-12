import { RealtimeMetrics } from "@/components/dashboard/RealtimeMetrics";
import { SupplyChainMap } from "@/components/dashboard/SupplyChainMap";
import { NewsFeed } from "@/components/dashboard/NewsFeed";

const Index = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Supply Chain Intelligence
        </h1>
        <p className="text-gray-600">
          Real-time monitoring and analysis of global food supply chains
        </p>
      </div>

      <div className="space-y-6">
        <RealtimeMetrics />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SupplyChainMap />
          <NewsFeed />
        </div>
      </div>
    </div>
  );
};

export default Index;