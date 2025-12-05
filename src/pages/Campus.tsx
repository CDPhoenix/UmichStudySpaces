import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { buildings } from "@/data/buildings";
import { getAreasByCampus } from "@/data/studyAreas";
import { ArrowLeft, Building as BuildingIcon, MapPin, Filter, X, ArrowUpDown, Star } from "lucide-react";
import { SpaceCard } from "@/components/SpaceCard";
import { FilterPanel } from "@/components/FilterPanel";
import { reviewsApi } from "@/lib/api";
import { useAuth } from "@clerk/clerk-react";
import type { NoiseLevel, BestFor, Amenity, BookableRoom, EnclosedLevel } from "@/data/filterOptions";

type SortOption = 'default' | 'rating-desc' | 'rating-asc' | 'reviews-desc' | 'reviews-asc';

export default function Campus() {
  const { campus } = useParams<{ campus: 'central' | 'north' }>();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [activeTab, setActiveTab] = useState<'buildings' | 'areas'>('buildings');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [areaRatings, setAreaRatings] = useState<Record<number, { rating: number; count: number }>>({});
  const [loadingRatings, setLoadingRatings] = useState(false);
  const [filters, setFilters] = useState<{
    buildings: string[];
    noise: NoiseLevel[];
    bestFor: BestFor[];
    amenities: Amenity[];
    bookableRooms: BookableRoom[];
    enclosed: EnclosedLevel[];
  }>({
    buildings: [],
    noise: [],
    bestFor: [],
    amenities: [],
    bookableRooms: [],
    enclosed: []
  });

  const campusBuildings = campus ? buildings[campus] : [];
  const campusTitle = campus === 'central' ? 'Central Campus' : 'North Campus';
  const totalAreas = campusBuildings.reduce((sum, b) => sum + b.areaCount, 0);
  const allAreas = useMemo(() => {
    return campus ? getAreasByCampus(campus) : [];
  }, [campus]);

  // Fetch ratings for all areas
  useEffect(() => {
    const fetchRatings = async () => {
      if (activeTab !== 'areas' || allAreas.length === 0) {
        setAreaRatings({});
        return;
      }
      
      setLoadingRatings(true);
      const ratings: Record<number, { rating: number; count: number }> = {};
      
      try {
        const token = await getToken();
        const promises = allAreas.map(async (area) => {
          try {
            const reviews = await reviewsApi.getBySpaceId(area.id.toString(), token || undefined);
            const count = reviews.length;
            const rating = count > 0 
              ? reviews.reduce((sum, r) => sum + r.rating, 0) / count 
              : 0;
            ratings[area.id] = { rating, count };
          } catch (error) {
            console.error(`Failed to fetch reviews for area ${area.id}:`, error);
            ratings[area.id] = { rating: 0, count: 0 };
          }
        });
        
        await Promise.all(promises);
        setAreaRatings(ratings);
      } catch (error) {
        console.error('Failed to fetch ratings:', error);
      } finally {
        setLoadingRatings(false);
      }
    };

    fetchRatings();
  }, [activeTab, allAreas.length, campus]);

  // Filter and sort areas
  let filteredAreas = allAreas.filter(area => {
    // Building filter
    if (filters.buildings.length > 0 && !filters.buildings.includes(area.buildingId)) {
      return false;
    }
    
    // Noise filter
    if (filters.noise.length > 0 && !filters.noise.includes(area.noise)) {
      return false;
    }
    
    // Best For filter
    if (filters.bestFor.length > 0) {
      const hasMatch = filters.bestFor.some(bf => area.bestFor.includes(bf));
      if (!hasMatch) return false;
    }
    
    // Amenities filter (must have all selected)
    if (filters.amenities.length > 0) {
      const hasAll = filters.amenities.every(am => area.amenities.includes(am));
      if (!hasAll) return false;
    }
    
    // Bookable Rooms filter
    if (filters.bookableRooms.length > 0) {
      const hasMatch = filters.bookableRooms.some(br => area.bookableRooms.includes(br));
      if (!hasMatch) return false;
    }
    
    // Enclosed filter
    if (filters.enclosed.length > 0 && !filters.enclosed.includes(area.enclosed)) {
      return false;
    }
    
    return true;
  });

  // Sort filtered areas
  if (sortBy !== 'default') {
    filteredAreas = [...filteredAreas].sort((a, b) => {
      const aRating = areaRatings[a.id] || { rating: 0, count: 0 };
      const bRating = areaRatings[b.id] || { rating: 0, count: 0 };
      
      switch (sortBy) {
        case 'rating-desc':
          return bRating.rating - aRating.rating;
        case 'rating-asc':
          return aRating.rating - bRating.rating;
        case 'reviews-desc':
          return bRating.count - aRating.count;
        case 'reviews-asc':
          return aRating.count - bRating.count;
        default:
          return 0;
      }
    });
  }

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => {
      const currentValues = prev[filterType as keyof typeof prev] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return { ...prev, [filterType]: newValues };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      buildings: [],
      noise: [],
      bestFor: [],
      amenities: [],
      bookableRooms: [],
      enclosed: []
    });
  };

  const activeFilterCount = Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* View Header - Matching original design */}
      <div className="view-header">
        <div className="container px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/')}
            className="back-btn text-sm sm:text-base px-3 sm:px-5 py-2 sm:py-2.5"
          >
            <i className="fas fa-arrow-left"></i>
            <span className="hidden sm:inline">Back to Campus Selection</span>
            <span className="sm:hidden">Back</span>
          </button>
          <div className="view-header-content">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl">{campusTitle}</h1>
            <p className="text-base sm:text-lg lg:text-xl">
              {campusBuildings.length} buildings with {totalAreas} study areas
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation - Matching original design */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex">
            <button
              className={`flex-1 py-3 sm:py-4 px-3 sm:px-6 font-semibold text-center border-b-3 transition-all flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base ${
                activeTab === 'buildings'
                  ? 'text-umich-blue border-accent bg-gray-50'
                  : 'text-gray-600 border-transparent hover:text-umich-blue hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('buildings')}
            >
              <i className="fas fa-building text-sm sm:text-base"></i>
              <span className="hidden sm:inline">Browse by Building</span>
              <span className="sm:hidden">Buildings</span>
            </button>
            <button
              className={`flex-1 py-3 sm:py-4 px-3 sm:px-6 font-semibold text-center border-b-3 transition-all flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base ${
                activeTab === 'areas'
                  ? 'text-umich-blue border-accent bg-gray-50'
                  : 'text-gray-600 border-transparent hover:text-umich-blue hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab('areas')}
            >
              <i className="fas fa-map-marker-alt text-sm sm:text-base"></i>
              <span className="hidden sm:inline">Browse All Areas</span>
              <span className="sm:hidden">Areas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        {activeTab === 'buildings' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {campusBuildings.map((building) => (
              <div
                key={building.id}
                onClick={() => navigate(`/building/${building.id}`)}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer border-2 border-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-accent group flex flex-col"
              >
                <div className="relative h-48 bg-gradient-to-br from-umich-blue to-umich-blue-light overflow-hidden flex-shrink-0">
                  {building.image ? (
                    <img
                      src={encodeURI(`/${building.image}`)}
                      alt={building.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        console.error('Building image failed:', building.image);
                        target.style.display = 'none';
                        if (!target.nextElementSibling) {
                          const placeholder = document.createElement('div');
                          placeholder.className = 'absolute inset-0 flex items-center justify-center';
                          placeholder.innerHTML = '<i class="fas fa-building text-5xl text-accent opacity-40"></i>';
                          target.parentElement?.appendChild(placeholder);
                        }
                      }}
                      onLoad={() => {
                        console.log('Building image loaded:', building.image);
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <i className="fas fa-building text-5xl text-accent opacity-40"></i>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-accent text-umich-blue px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                    {building.areaCount} {building.areaCount === 1 ? 'area' : 'areas'}
                  </div>
                </div>
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-bold text-umich-blue mb-2 font-sans leading-tight">{building.shortName}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 flex items-start gap-2 min-h-[2.5rem]">
                    <i className="fas fa-map-marker-alt text-accent mt-0.5 flex-shrink-0 text-xs sm:text-sm"></i>
                    <span className="line-clamp-2 leading-relaxed">{building.type}</span>
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 mb-3 sm:mb-4 leading-relaxed flex-1">
                    {building.description}
                  </p>
                  <div className="flex justify-end mt-auto pt-2 border-t border-gray-100">
                    <span className="text-umich-blue font-semibold text-sm flex items-center gap-1 group-hover:text-accent transition-colors">
                      View Details
                      <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-6">
            {/* Sidebar Filters (Desktop) */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <FilterPanel
                isOpen={true}
                onClose={() => {}}
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearAll={clearAllFilters}
                buildingOptions={campusBuildings.map(b => ({ id: b.id, name: b.shortName }))}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Button */}
              <div className="lg:hidden mb-4 flex items-center justify-between">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="inline-flex items-center gap-2 bg-umich-blue text-white px-4 py-2 rounded-lg hover:bg-umich-blue-light transition-all"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-accent text-umich-blue px-2 py-0.5 rounded-full text-xs font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <p className="text-gray-600 text-sm">
                  {filteredAreas.length} {filteredAreas.length === 1 ? 'area' : 'areas'}
                </p>
              </div>

              {/* Sort and Filter Controls */}
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                {/* Active Filters */}
                {activeFilterCount > 0 && (
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium text-gray-600">Active Filters:</span>
                    {Object.entries(filters).map(([key, values]) => 
                      (values as string[]).map(value => (
                        <button
                          key={`${key}-${value}`}
                          onClick={() => handleFilterChange(key, value)}
                          className="inline-flex items-center gap-1 bg-accent/20 text-umich-blue px-3 py-1 rounded-full text-sm hover:bg-accent/30 transition-all"
                        >
                          {value}
                          <X className="w-3 h-3" />
                        </button>
                      ))
                    )}
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-gray-500 hover:text-gray-700 underline"
                    >
                      Clear all
                    </button>
                  </div>
                )}

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 sm:ml-auto">
                  <ArrowUpDown className="w-4 h-4 text-gray-600" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-umich-blue focus:border-transparent flex-1 sm:flex-none"
                  >
                    <option value="default">Default</option>
                    <option value="rating-desc">Rating: High to Low</option>
                    <option value="rating-asc">Rating: Low to High</option>
                    <option value="reviews-desc">Reviews: Most to Least</option>
                    <option value="reviews-asc">Reviews: Least to Most</option>
                  </select>
                </div>
              </div>

              {/* Areas Grid */}
              {filteredAreas.length > 0 ? (
                <>
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {filteredAreas.map((area) => {
                      const ratingData = areaRatings[area.id] || { rating: 0, count: 0 };
                      return (
                        <SpaceCard 
                          key={area.id} 
                          space={area}
                          averageRating={ratingData.rating > 0 ? ratingData.rating : undefined}
                          reviewCount={ratingData.count}
                        />
                      );
                    })}
                  </div>
                  {loadingRatings && (
                    <div className="text-center py-4 mt-4">
                      <p className="text-sm text-gray-500">Loading ratings...</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 text-lg mb-2">No areas match your filters</p>
                  <p className="text-gray-500 text-sm mb-4">
                    Try adjusting your filter criteria
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-2 bg-umich-blue text-white px-6 py-2 rounded-lg hover:bg-umich-blue-light transition-all"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Filter Panel - Only render when open */}
      {isFilterOpen && (
        <FilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearAll={clearAllFilters}
          buildingOptions={campusBuildings.map(b => ({ id: b.id, name: b.shortName }))}
        />
      )}

      <Footer />
    </div>
  );
}
