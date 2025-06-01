
import { CityData } from '@/utils/cityData';

interface CityContentProps {
  cityData: CityData;
  spotCount?: number;
}

const CityContent = ({ cityData, spotCount }: CityContentProps) => {
  return (
    <section className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-6 mt-4 mx-4 mb-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-swimspot-blue-green mb-3">
          Wild Swimming in {cityData.displayName}
        </h1>
        <p className="text-gray-700 mb-4 leading-relaxed">
          {cityData.description}
        </p>
        {spotCount && spotCount > 0 && (
          <p className="text-sm text-gray-600">
            Currently showing {spotCount} swim spots in {cityData.displayName}. 
            Use the map above to explore locations, check details, and read community reviews.
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-swimspot-drift-sand/30 text-swimspot-blue-green text-sm rounded-full">
            Wild Swimming
          </span>
          <span className="px-3 py-1 bg-swimspot-drift-sand/30 text-swimspot-blue-green text-sm rounded-full">
            {cityData.displayName}
          </span>
          <span className="px-3 py-1 bg-swimspot-drift-sand/30 text-swimspot-blue-green text-sm rounded-full">
            Netherlands
          </span>
        </div>
      </div>
    </section>
  );
};

export default CityContent;
