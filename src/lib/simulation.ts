
import type { SimulationParams } from "@/components/SimulationControls";

// Simplified numerical fit model based on the papers
export const runSimulation = (params: SimulationParams) => {
  const data = [];
  const hours = 24;
  const baseTemp = params.temperature;
  const maxRadiation = 1000; // W/m²

  for (let hour = 0; hour < hours; hour++) {
    // Simplified temperature calculation
    const timeEffect = Math.sin((hour - 6) * Math.PI / 12);
    let tempChange = 0;
    let radiation = maxRadiation * Math.max(0, Math.sin((hour - 6) * Math.PI / 12));

    if (hour >= 6 && hour <= 18) {
      // Cooling effect calculation
      const humidityFactor = params.climate === "humid" ? 0.7 : 1;
      const dispersalFactor = params.dispersalMethod === "aircraft" ? 1.2 : 1;
      const windFactor = Math.max(0.5, Math.min(1.5, params.windSpeed / 10));
      
      tempChange = -2 * humidityFactor * dispersalFactor * windFactor;
      radiation *= 0.85; // 15% reduction in solar radiation due to calcite
    }

    const temperature = baseTemp + 5 * timeEffect + tempChange;

    data.push({
      time: hour,
      temperature: parseFloat(temperature.toFixed(1)),
      radiation: parseFloat(radiation.toFixed(0)),
    });
  }

  return data;
};
