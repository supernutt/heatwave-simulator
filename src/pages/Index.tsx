
import { useState } from "react";
import { SimulationControls, type SimulationParams } from "@/components/SimulationControls";
import { SimulationResults } from "@/components/SimulationResults";
import { runSimulation } from "@/lib/simulation";

const Index = () => {
  const [params, setParams] = useState<SimulationParams>({
    temperature: 25,
    humidity: 50,
    windSpeed: 5,
    dispersalMethod: "tower",
    climate: "arid",
  });
  const [results, setResults] = useState(runSimulation(params));

  const handleParamsChange = (newParams: SimulationParams) => {
    setParams(newParams);
  };

  const handleSimulate = () => {
    const simulationData = runSimulation(params);
    setResults(simulationData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container py-12">
        <div className="text-center mb-12 space-y-4">
          <div className="text-sm font-medium text-primary mb-2">
            By Sunscreen for Earth
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Tropospheric Aerosol Injection
          </h1>
          <h2 className="text-2xl text-gray-600">
            Localized Solar Radiation Management (L-SRM)
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the effects of calcite aerosol plumes on urban temperatures through interactive simulations
          </p>
        </div>

        <div className="mb-8">
          <div className="relative w-full h-[300px] rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
              alt="World Map Placeholder" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <p className="text-white text-lg font-medium">
                Region selection coming soon
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <SimulationControls
              onParamsChange={handleParamsChange}
              onSimulate={handleSimulate}
            />
          </div>
          <div className="lg:col-span-8">
            <SimulationResults data={results} params={params} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
