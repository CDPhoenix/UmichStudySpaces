import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SpaceCard } from "@/components/SpaceCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUser, useAuth, SignedIn, SignedOut } from "@clerk/clerk-react";
import { favoritesApi, reviewsApi } from "@/lib/api";
import type { Favorite } from "@/lib/api";

export default function Favorites() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [areaRatings, setAreaRatings] = useState<Record<string, { rating: number; count: number }>>({});

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isLoaded) return;
      
      if (!user) {
        navigate("/auth");
        return;
      }

      try {
        const data = await favoritesApi.getUserFavorites(user.id);
        setFavorites(data || []);
        
        // Fetch ratings for all favorite spaces
        if (data && data.length > 0) {
          const token = await getToken();
          const ratings: Record<string, { rating: number; count: number }> = {};
          
          const promises = data.map(async (fav) => {
            const space = (fav as any).study_spaces || fav;
            const spaceId = space.id || fav.space_id;
            if (!spaceId) return;
            
            try {
              const reviews = await reviewsApi.getBySpaceId(spaceId.toString(), token || undefined);
              const count = reviews.length;
              const rating = count > 0 
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / count 
                : 0;
              ratings[spaceId] = { rating, count };
            } catch (error) {
              console.error(`Failed to fetch reviews for space ${spaceId}:`, error);
              ratings[spaceId] = { rating: 0, count: 0 };
            }
          });
          
          await Promise.all(promises);
          setAreaRatings(ratings);
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [navigate, user, isLoaded, getToken]);

  const removeFavorite = async (spaceId: string) => {
    if (!user) return;

    try {
      const token = await getToken();
      if (!token) {
        toast.error("Please sign in");
        return;
      }
      await favoritesApi.remove(user.id, spaceId, token);
      setFavorites(favorites.filter((fav) => {
        const id = (fav as any).study_spaces?.id || fav.space_id;
        return id !== spaceId;
      }));
      toast.success("Removed from favorites");
    } catch (error: any) {
      toast.error(error.message || "Failed to remove favorite");
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-8">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SignedOut>
        <div className="container py-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">
              Please sign in to view your favorites
            </p>
            <Button onClick={() => navigate("/auth")}>Sign In</Button>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="container py-8">
          <h1 className="text-4xl font-bold mb-8">My Favorite Spaces</h1>
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                You haven't added any favorites yet
              </p>
              <button
                onClick={() => navigate("/")}
                className="text-primary hover:underline"
              >
                Explore study spaces
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((fav) => {
                const space = (fav as any).study_spaces || fav;
                const spaceId = space.id || fav.space_id;
                const ratingData = spaceId ? (areaRatings[spaceId] || { rating: 0, count: 0 }) : { rating: 0, count: 0 };
                return (
                  <SpaceCard
                    key={fav.id}
                    space={space}
                    isFavorite={true}
                    onToggleFavorite={() => removeFavorite(spaceId)}
                    averageRating={ratingData.rating > 0 ? ratingData.rating : undefined}
                    reviewCount={ratingData.count}
                  />
                );
              })}
            </div>
          )}
        </div>
      </SignedIn>

      <Footer />
    </div>
  );
}
