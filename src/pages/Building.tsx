import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { buildings } from "@/data/buildings";
import { getAreasByBuilding } from "@/data/studyAreas";
import { ArrowLeft, MapPin } from "lucide-react";
import { SpaceCard } from "@/components/SpaceCard";
import { reviewsApi } from "@/lib/api";
import { useAuth } from "@clerk/clerk-react";

export default function Building() {
  const { buildingId } = useParams<{ buildingId: string }>();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [areaRatings, setAreaRatings] = useState<Record<number, { rating: number; count: number }>>({});
  const [loadingRatings, setLoadingRatings] = useState(false);

  const allBuildings = [...buildings.central, ...buildings.north];
  const building = allBuildings.find(b => b.id === buildingId);
  const areas = buildingId ? getAreasByBuilding(buildingId) : [];

  // Fetch ratings for all areas in this building
  useEffect(() => {
    const fetchRatings = async () => {
      if (areas.length === 0) {
        setAreaRatings({});
        setLoadingRatings(false);
        return;
      }
      
      setLoadingRatings(true);
      const ratings: Record<number, { rating: number; count: number }> = {};
      
      try {
        const token = await getToken();
        
        // Set timeout to prevent infinite loading
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        );
        
        const promises = areas.map(async (area) => {
          try {
            const reviewsPromise = reviewsApi.getBySpaceId(area.id.toString(), token || undefined);
            const reviews = await Promise.race([reviewsPromise, timeoutPromise]) as any[];
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
        // Set default ratings for all areas if fetch fails
        areas.forEach(area => {
          ratings[area.id] = { rating: 0, count: 0 };
        });
        setAreaRatings(ratings);
      } finally {
        setLoadingRatings(false);
      }
    };

    fetchRatings();
  }, [areas, getToken]);

  if (!building) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-8">
          <p>Building not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Building Hero with Image - Matching original design */}
      <div className="building-hero">
        <div className="container px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate(`/campus/${building.campus}`)}
            className="back-btn text-sm sm:text-base px-3 sm:px-5 py-2 sm:py-2.5"
          >
            <i className="fas fa-arrow-left"></i>
            <span className="hidden sm:inline">Back to {building.campus === 'central' ? 'Central' : 'North'} Campus</span>
            <span className="sm:hidden">Back</span>
          </button>
          
          <div className="building-hero-content">
            <div className="building-hero-text">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl">{building.name}</h1>
              <p className="building-subtitle text-sm sm:text-base lg:text-lg">
                <i className="fas fa-map-marker-alt"></i>
                {building.address}
              </p>
              <p className="building-description text-sm sm:text-base">{building.description}</p>
              <div className="building-meta">
                <div className="building-meta-item">
                  <i className="fas fa-chair text-accent"></i>
                  <span>{areas.length} Study Areas</span>
                </div>
                <div className="building-meta-item">
                  <i className="fas fa-building text-accent"></i>
                  <span>{building.type}</span>
                </div>
                <div className="building-meta-item">
                  <i className="fas fa-map-marker-alt text-accent"></i>
                  <span className="capitalize">{building.campus} Campus</span>
                </div>
              </div>
            </div>
            <div className="building-hero-image">
              {building.image ? (
                <img
                  src={encodeURI(`/${building.image}`)}
                  alt={building.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    console.error('Building image failed:', building.image);
                    target.style.display = 'none';
                    if (!target.nextElementSibling) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'placeholder';
                      placeholder.innerHTML = '<i class="fas fa-building"></i>';
                      target.parentElement?.appendChild(placeholder);
                    }
                  }}
                  onLoad={() => {
                    console.log('Building image loaded:', building.image);
                  }}
                />
              ) : (
                <div className="placeholder">
                  <i className="fas fa-building"></i>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Building Info - Matching original design */}
      <div className="container py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-umich-blue font-display">{areas.length}</div>
              <div className="text-gray-600 mt-1 text-sm">Study Areas</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-umich-blue font-sans">{building.type}</div>
              <div className="text-gray-600 mt-1 text-sm">Building Type</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-umich-blue font-sans capitalize">{building.campus === 'central' ? 'Central' : 'North'} Campus</div>
              <div className="text-gray-600 mt-1 text-sm">Campus</div>
            </div>
          </div>
        </div>

        {/* Study Areas - Matching original design */}
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-umich-blue mb-4 sm:mb-6 flex items-center gap-2">
            <i className="fas fa-chair text-accent text-lg sm:text-xl"></i>
            <span className="text-base sm:text-xl">Study Areas in this Building</span>
          </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {areas.map((area) => {
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
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">Loading ratings...</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
