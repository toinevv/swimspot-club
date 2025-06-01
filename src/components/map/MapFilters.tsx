
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";

interface MapFiltersProps {
  onFilterChange: (filters: any) => void;
  currentCity?: string;
}

const MapFilters = ({ onFilterChange, currentCity }: MapFiltersProps) => {
  const navigate = useNavigate();
  
  // Fetch all cities for the city filter
  const { data: cities = [] } = useQuery({
    queryKey: ['cities'],
    queryFn: () => api.getAllCities()
  });

  const handleCityChange = (value: string) => {
    if (value === "all") {
      navigate('/');
    } else {
      navigate(`/${value}`);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg space-y-4">
      <div>
        <Label>City</Label>
        <Select 
          defaultValue={currentCity || "all"} 
          onValueChange={handleCityChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city.id} value={city.slug}>
                {city.display_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Water Type</Label>
        <Select onValueChange={(value) => onFilterChange({ waterType: value === "all" ? undefined : value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select water type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="River">River</SelectItem>
            <SelectItem value="Lake">Lake</SelectItem>
            <SelectItem value="Beach">Beach</SelectItem>
            <SelectItem value="Urban">Urban</SelectItem>
          </SelectContent>
        </Select>
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
