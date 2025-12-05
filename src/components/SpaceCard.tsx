import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { StudySpace } from "@/types/StudySpace";
import { buildings } from "@/data/buildings";
import { filterOptions } from "@/data/filterOptions";
import { filterSupportedImages } from "@/utils/imageUtils";

interface SpaceCardProps {
  space: StudySpace;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  averageRating?: number;
  reviewCount?: number;
}

export function SpaceCard({ space, isFavorite, onToggleFavorite, averageRating, reviewCount }: SpaceCardProps) {
  const navigate = useNavigate();
  
  // Get building info from buildingId
  const allBuildings = [...buildings.central, ...buildings.north];
  const building = allBuildings.find(b => b.id === space.buildingId);
  
  // Get noise level label
  const noiseOption = filterOptions.noise.find(n => n.value === space.noise);
  const noiseLabel = noiseOption?.label || space.noise;

  const noiseLevelColors: Record<string, string> = {
    silent: "bg-blue-100 text-blue-800",
    quiet: "bg-green-100 text-green-800",
    moderate: "bg-yellow-100 text-yellow-800",
    lively: "bg-orange-100 text-orange-800",
    mixed: "bg-purple-100 text-purple-800",
  };

  // Get amenity labels
  const getAmenityLabel = (amenityValue: string) => {
    const amenity = filterOptions.amenities.find(a => a.value === amenityValue);
    return amenity?.label || amenityValue;
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer border-2 border-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-accent group"
      onClick={() => navigate(`/space/${space.id}`)}
    >
      <div className="relative h-44 bg-gradient-to-br from-umich-blue via-umich-blue to-umich-blue-light overflow-hidden">
        {space.photos && space.photos.length > 0 ? (() => {
          // Find first supported photo
          const supportedPhotos = filterSupportedImages(space.photos);
          const firstPhoto = supportedPhotos[0];
          if (!firstPhoto) {
            console.warn('No supported photos found for space:', space.name, 'Photos:', space.photos);
            return (
              <div className="flex h-full w-full items-center justify-center">
                <i className="fas fa-image text-5xl text-accent opacity-40"></i>
              </div>
            );
          }
          
          // CRITICAL FIX: Must encode for React/Vite - browser doesn't auto-encode in React
          // Old version worked because it was plain HTML, React needs explicit encoding
          let photoPath = firstPhoto.trim();
          if (!photoPath.startsWith('/')) {
            photoPath = `/${photoPath}`;
          }
          // Remove double slashes
          photoPath = photoPath.replace(/([^:]\/)\/+/g, '$1');
          
          // MUST ENCODE for React - encodeURI handles spaces, parentheses, and other special chars
          photoPath = encodeURI(photoPath);
          
          return (
            <img
              key={`img-${space.id}-${Date.now()}`}
              src={photoPath}
              alt={space.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                console.error('❌❌❌ Image FAILED:', {
                  spaceName: space.name,
                  spaceId: space.id,
                  attemptedPath: photoPath,
                  originalPath: firstPhoto,
                  fullSrc: target.src,
                  currentSrc: target.currentSrc,
                  naturalWidth: target.naturalWidth,
                  naturalHeight: target.naturalHeight
                });
                // Try with encoded path as fallback
                const encodedPath = encodeURI(photoPath);
                console.log('Trying encoded fallback:', encodedPath);
                target.src = encodedPath;
              }}
              onLoad={(e) => {
                const target = e.target as HTMLImageElement;
                console.log('✅✅✅ Image LOADED SUCCESSFULLY:', {
                  spaceName: space.name,
                  path: photoPath,
                  src: target.src
                });
              }}
            />
          );
        })() : (
          <div className="flex h-full w-full items-center justify-center">
            <i className="fas fa-image text-5xl text-accent opacity-40"></i>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/95 text-gray-700 hover:bg-white font-semibold text-xs px-3 py-1 rounded-full">
            {noiseLabel}
          </Badge>
        </div>
        {/* Rating and Review Count Badge */}
        {(averageRating !== undefined && averageRating > 0) || (reviewCount !== undefined && reviewCount > 0) ? (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-full text-xs font-semibold">
            {averageRating !== undefined && averageRating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                <span>{averageRating.toFixed(1)}</span>
              </div>
            )}
            {reviewCount !== undefined && reviewCount > 0 && (
              <span className="text-white/90">({reviewCount})</span>
            )}
          </div>
        ) : null}
        {onToggleFavorite && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        )}
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 text-lg font-bold font-sans text-umich-blue">
          {space.name}
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
          <span className="line-clamp-1">
            {building ? building.shortName : space.buildingId} • {building ? (building.campus === 'central' ? 'Central' : 'North') : ''} Campus
          </span>
        </div>
        {/* Rating and Review Count below location */}
        {((averageRating !== undefined && averageRating > 0) || (reviewCount !== undefined && reviewCount > 0)) && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
            {averageRating !== undefined && averageRating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-semibold text-umich-blue">{averageRating.toFixed(1)}</span>
              </div>
            )}
            {reviewCount !== undefined && reviewCount > 0 && (
              <span className="text-gray-500">{reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</span>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        {space.amenities && space.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {space.amenities.slice(0, 3).map((amenity) => (
              <Badge 
                key={amenity} 
                variant="secondary" 
                className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium hover:bg-gray-200"
              >
                {getAmenityLabel(amenity)}
              </Badge>
            ))}
            {space.amenities.length > 3 && (
              <Badge 
                variant="secondary" 
                className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium hover:bg-gray-200"
              >
                +{space.amenities.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
