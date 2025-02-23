
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
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100 animate-fade-in">
      <div className="space-y-2">
        <Label>Climate Type</Label>
        <Select
          value={params.climate}
          onValueChange={(value: "humid" | "arid") =>
            handleParamChange("climate", value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select climate type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="humid">Humid Climate</SelectItem>
            <SelectItem value="arid">Arid Climate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Temperature (°C)</Label>
        <Slider
          value={[params.temperature]}
          min={15}
          max={45}
          step={1}
          onValueChange={([value]) => handleParamChange("temperature", value)}
        />
        <div className="text-sm text-gray-500">{params.temperature}°C</div>
      </div>

      <div className="space-y-2">
        <Label>Humidity (%)</Label>
        <Slider
          value={[params.humidity]}
          min={0}
          max={100}
          step={1}
          onValueChange={([value]) => handleParamChange("humidity", value)}
        />
        <div className="text-sm text-gray-500">{params.humidity}%</div>
      </div>

      <div className="space-y-2">
        <Label>Wind Speed (m/s)</Label>
        <Slider
          value={[params.windSpeed]}
          min={0}
          max={20}
          step={0.5}
          onValueChange={([value]) => handleParamChange("windSpeed", value)}
        />
        <div className="text-sm text-gray-500">{params.windSpeed} m/s</div>
      </div>

      <div className="space-y-2">
        <Label>Dispersal Method</Label>
        <Select
          value={params.dispersalMethod}
          onValueChange={(value: "tower" | "aircraft") =>
            handleParamChange("dispersalMethod", value)
          }
        >
          <SelectTrigger>
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
        className="w-full bg-primary hover:bg-primary/90"
      >
        Run Simulation
      </Button>
    </div>
  );
};
