
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { SimulationParams } from "./SimulationControls";

interface SimulationData {
  time: number;
  temperature: number;
  radiation: number;
}

interface SimulationResultsProps {
  data: SimulationData[];
  params: SimulationParams;
}

export const SimulationResults = ({ data, params }: SimulationResultsProps) => {
  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex gap-8 justify-center items-center text-sm mt-4 font-medium">
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-3">
            <div
              className="w-6 h-[2px]"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-700">
              {entry.value === "Temperature" ? "Temperature (°C)" : "Solar Radiation (W/m²)"}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg animate-slide-in">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">Simulation Results</h3>
          <div className="px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
            {params.climate === "arid" ? "Arid" : "Humid"} Climate
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="time"
                label={{ value: "Time (hours)", position: "bottom", style: { fontWeight: 500 } }}
                tick={{ fill: '#4b5563' }}
              />
              <YAxis 
                yAxisId="temp" 
                label={{ value: "Temperature (°C)", angle: -90, position: "insideLeft", style: { fontWeight: 500 } }}
                tick={{ fill: '#ef233c' }}
              />
              <YAxis 
                yAxisId="rad" 
                orientation="right" 
                label={{ value: "Solar Radiation (W/m²)", angle: 90, position: "insideRight", style: { fontWeight: 500 } }}
                tick={{ fill: '#f4a261' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                labelStyle={{ fontWeight: 600, marginBottom: '8px' }}
              />
              <Legend content={renderLegend} />
              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="temperature"
                stroke="#ef233c"
                name="Temperature"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                yAxisId="rad"
                type="monotone"
                dataKey="radiation"
                stroke="#f4a261"
                name="Solar Radiation"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
