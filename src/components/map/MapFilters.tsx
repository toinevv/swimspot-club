
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface MapFiltersProps {
  onFilterChange: (filters: any) => void;
}

const MapFilters = ({ onFilterChange }: MapFiltersProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg space-y-4">
      <div>
        <Label>Water Type</Label>
        <Select onValueChange={(value) => onFilterChange({ waterType: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select water type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="River">River</SelectItem>
            <SelectItem value="Lake">Lake</SelectItem>
            <SelectItem value="Canal">Canal</SelectItem>
            <SelectItem value="Beach">Beach</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Water Quality</Label>
        <Select onValueChange={(value) => onFilterChange({ quality: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select quality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Qualities</SelectItem>
            <SelectItem value="Excellent">Excellent</SelectItem>
            <SelectItem value="Good">Good</SelectItem>
            <SelectItem value="Moderate">Moderate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Distance (km)</Label>
        <Slider
          defaultValue={[5]}
          max={20}
          step={1}
          onValueChange={(value) => onFilterChange({ distance: value[0] })}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1 km</span>
          <span>5 km</span>
          <span>10 km</span>
          <span>20+ km</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          onCheckedChange={(checked) => onFilterChange({ isPremium: checked })}
        />
        <Label>Premium Spots Only</Label>
      </div>
    </div>
  );
};

export default MapFilters;
