import { X } from "lucide-react";
import { filterOptions } from "@/data/filterOptions";
import type { NoiseLevel, BestFor, Amenity, BookableRoom, EnclosedLevel } from "@/data/filterOptions";

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    buildings: string[];
    noise: NoiseLevel[];
    bestFor: BestFor[];
    amenities: Amenity[];
    bookableRooms: BookableRoom[];
    enclosed: EnclosedLevel[];
  };
  onFilterChange: (filterType: string, value: string) => void;
  onClearAll: () => void;
  buildingOptions: { id: string; name: string }[];
}

export function FilterPanel({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearAll,
  buildingOptions
}: FilterPanelProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed lg:sticky top-0 right-0 h-screen lg:h-auto w-80 lg:w-full bg-white shadow-xl lg:shadow-none z-50 lg:z-auto transition-transform duration-300 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between lg:hidden">
          <h3 className="text-lg font-bold text-umich-blue">Filters</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Clear All */}
          <button
            onClick={onClearAll}
            className="w-full text-sm text-accent hover:text-accent/80 font-medium text-left"
          >
            Clear All Filters
          </button>

          {/* Building Filter */}
          <div>
            <h4 className="font-semibold text-umich-blue mb-3">Building</h4>
            <div className="space-y-2">
              {buildingOptions.map((building) => (
                <label key={building.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.buildings.includes(building.id)}
                    onChange={() => onFilterChange('buildings', building.id)}
                    className="w-4 h-4 text-umich-blue border-gray-300 rounded focus:ring-accent"
                  />
                  <span className="text-sm">{building.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Noise Level Filter */}
          <div>
            <h4 className="font-semibold text-umich-blue mb-3">Noise Level</h4>
            <div className="space-y-2">
              {filterOptions.noise.map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.noise.includes(option.value as NoiseLevel)}
                    onChange={() => onFilterChange('noise', option.value)}
                    className="w-4 h-4 text-umich-blue border-gray-300 rounded focus:ring-accent"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Best For Filter */}
          <div>
            <h4 className="font-semibold text-umich-blue mb-3">Best For</h4>
            <div className="space-y-2">
              {filterOptions.bestFor.map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.bestFor.includes(option.value as BestFor)}
                    onChange={() => onFilterChange('bestFor', option.value)}
                    className="w-4 h-4 text-umich-blue border-gray-300 rounded focus:ring-accent"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Amenities Filter */}
          <div>
            <h4 className="font-semibold text-umich-blue mb-3">
              Amenities
              <span className="text-xs text-gray-500 ml-1">(must have all)</span>
            </h4>
            <div className="space-y-2">
              {filterOptions.amenities.map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(option.value as Amenity)}
                    onChange={() => onFilterChange('amenities', option.value)}
                    className="w-4 h-4 text-umich-blue border-gray-300 rounded focus:ring-accent"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Bookable Rooms Filter */}
          <div>
            <h4 className="font-semibold text-umich-blue mb-3">Bookable Rooms</h4>
            <div className="space-y-2">
              {filterOptions.bookableRooms.map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.bookableRooms.includes(option.value as BookableRoom)}
                    onChange={() => onFilterChange('bookableRooms', option.value)}
                    className="w-4 h-4 text-umich-blue border-gray-300 rounded focus:ring-accent"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Privacy Level Filter */}
          <div>
            <h4 className="font-semibold text-umich-blue mb-3">Privacy Level</h4>
            <div className="space-y-2">
              {filterOptions.enclosed.map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.enclosed.includes(option.value as EnclosedLevel)}
                    onChange={() => onFilterChange('enclosed', option.value)}
                    className="w-4 h-4 text-umich-blue border-gray-300 rounded focus:ring-accent"
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
