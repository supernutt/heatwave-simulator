
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
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100 animate-slide-in">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Simulation Results</h3>
          <div className="text-sm text-gray-500">
            {params.climate === "arid" ? "Arid" : "Humid"} Climate
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="time"
                label={{ value: "Time (hours)", position: "bottom" }}
              />
              <YAxis yAxisId="temp" label={{ value: "Temperature (°C)", angle: -90, position: "insideLeft" }} />
              <YAxis yAxisId="rad" orientation="right" label={{ value: "Solar Radiation (W/m²)", angle: 90, position: "insideRight" }} />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="temperature"
                stroke="#ef233c"
                name="Temperature"
                strokeWidth={2}
                dot={false}
              />
              <Line
                yAxisId="rad"
                type="monotone"
                dataKey="radiation"
                stroke="#f4a261"
                name="Solar Radiation"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
