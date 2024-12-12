import { RealtimeMetrics } from "@/components/dashboard/RealtimeMetrics";
import { SupplyChainMap } from "@/components/dashboard/SupplyChainMap";

const Index = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Supply Chain Dashboard
        </h1>
        <p className="text-gray-600">
          Monitor and optimize your supply chain operations in real-time
        </p>
      </div>

      <div className="space-y-6">
        <RealtimeMetrics />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SupplyChainMap />
        </div>
      </div>
    </div>
  );
};

export default Index;