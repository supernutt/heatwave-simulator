
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export interface SimulationParams {
  temperature: number;
  humidity: number;
  windSpeed: number;
  dispersalMethod: "tower" | "aircraft";
  climate: "humid" | "arid";
}

interface SimulationControlsProps {
  onParamsChange: (params: SimulationParams) => void;
  onSimulate: () => void;
}

export const SimulationControls = ({
  onParamsChange,
  onSimulate,
}: SimulationControlsProps) => {
  const [params, setParams] = useState<SimulationParams>({
    temperature: 25,
    humidity: 50,
    windSpeed: 5,
    dispersalMethod: "tower",
    climate: "arid",
  });

  const handleParamChange = (
    key: keyof SimulationParams,
    value: string | number
  ) => {
    const newParams = { ...params, [key]: value };
    setParams(newParams);
    onParamsChange(newParams);
  };

  return (
    <div className="space-y-8 p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg animate-fade-in">
      <div className="space-y-2">
        <Label className="text-gray-700 font-medium">Climate Scenario</Label>
        <Select
          value={params.climate}
          onValueChange={(value: "humid" | "arid") =>
            handleParamChange("climate", value)
          }
        >
          <SelectTrigger className="w-full bg-white border-gray-200">
            <SelectValue placeholder="Select climate type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="humid">Humid Climate</SelectItem>
            <SelectItem value="arid">Arid Climate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label className="text-gray-700 font-medium">Temperature (°C)</Label>
          <div className="space-y-2">
            <Slider
              value={[params.temperature]}
              min={15}
              max={45}
              step={1}
              onValueChange={([value]) => handleParamChange("temperature", value)}
              className="my-4"
            />
            <div className="text-sm font-medium text-primary">{params.temperature}°C</div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-gray-700 font-medium">Humidity (%)</Label>
          <div className="space-y-2">
            <Slider
              value={[params.humidity]}
              min={0}
              max={100}
              step={1}
              onValueChange={([value]) => handleParamChange("humidity", value)}
              className="my-4"
            />
            <div className="text-sm font-medium text-primary">{params.humidity}%</div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-gray-700 font-medium">Wind Speed (m/s)</Label>
          <div className="space-y-2">
            <Slider
              value={[params.windSpeed]}
              min={0}
              max={20}
              step={0.5}
              onValueChange={([value]) => handleParamChange("windSpeed", value)}
              className="my-4"
            />
            <div className="text-sm font-medium text-primary">{params.windSpeed} m/s</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-gray-700 font-medium">Dispersal Method</Label>
        <Select
          value={params.dispersalMethod}
          onValueChange={(value: "tower" | "aircraft") =>
            handleParamChange("dispersalMethod", value)
          }
        >
          <SelectTrigger className="w-full bg-white border-gray-200">
            <SelectValue placeholder="Select dispersal method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tower">Tower Dispersal</SelectItem>
            <SelectItem value="aircraft">Aircraft Dispersal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={onSimulate}
        className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-6"
      >
        Run Simulation
      </Button>
    </div>
  );
};
