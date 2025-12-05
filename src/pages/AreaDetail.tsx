import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { buildings } from "@/data/buildings";
import { studyAreas } from "@/data/studyAreas";
import { filterOptions } from "@/data/filterOptions";
import { ArrowLeft, MapPin, Users, Volume2, Lock, Calendar, Star, Upload, X, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUser, useAuth, SignedIn, SignedOut } from "@clerk/clerk-react";
import { reviewsApi } from "@/lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { filterSupportedImages } from "@/utils/imageUtils";

export default function AreaDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
  const [viewAllPhotos, setViewAllPhotos] = useState(false);

  const area = studyAreas.find(a => a.id === Number(id));
  const allBuildings = [...buildings.central, ...buildings.north];
  const building = area ? allBuildings.find(b => b.id === area.buildingId) : null;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          // Fetch reviews from API
          const token = await getToken();
          const reviewsData = await reviewsApi.getBySpaceId(id, token || undefined);
          setReviews(reviewsData || []);
        } catch (error: any) {
          toast.error(error.message || "Failed to load reviews");
        }
      }
    };

    if (isLoaded) {
      fetchData();
    }
  }, [id, isLoaded, getToken]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).slice(0, 9 - uploadedPhotos.length);
    
    if (uploadedPhotos.length + newFiles.length > 9) {
      toast.error("You can upload up to 9 images");
      return;
    }

    setUploadedPhotos(prev => [...prev, ...newFiles]);
    
    // Create preview URLs
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreviewUrls(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
    setPhotoPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to leave a review");
      navigate("/auth");
      return;
    }

    setSubmitting(true);
    
    try {
      // Get Clerk token for authenticated request
      const token = await getToken();
      
      if (!token) {
        toast.error("Please sign in to leave a review");
        navigate("/auth");
        setSubmitting(false);
        return;
      }
      
      // Upload photos first if any
      let photoUrls: string[] = [];
      if (uploadedPhotos.length > 0) {
        try {
          const uploadResult = await reviewsApi.uploadPhotos(uploadedPhotos, token);
          photoUrls = uploadResult.photoUrls;
          toast.success(`${uploadedPhotos.length} image${uploadedPhotos.length !== 1 ? 's' : ''} uploaded successfully`);
        } catch (uploadError: any) {
          console.error('Photo upload error:', uploadError);
          toast.error(`Failed to upload images: ${uploadError.message}`);
          // Continue with review submission even if photo upload fails
        }
      }

      // Insert review with photos
      await reviewsApi.create(id!, {
        rating,
        comment: comment.trim() || undefined,
        photos: photoUrls,
      }, token);

      toast.success("Review submitted successfully!");
      setComment("");
      setRating(5);
      setUploadedPhotos([]);
      setPhotoPreviewUrls([]);
      
      // Refresh reviews
      const updatedReviews = await reviewsApi.getBySpaceId(id!, token);
      setReviews(updatedReviews || []);
    } catch (err: any) {
      console.error('Review submission error:', err);
      toast.error(err.message || "Failed to submit review");
    }
    
    setSubmitting(false);
  };

  // Get all photos from all reviews
  const allReviewPhotos = reviews.flatMap(review => review.photos || []);

  if (!area || !building) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-8">
          <p>Area not found</p>
        </div>
      </div>
    );
  }

  const noiseOption = filterOptions.noise.find(n => n.value === area.noise);
  const enclosedOption = filterOptions.enclosed.find(e => e.value === area.enclosed);
  const averageRating = reviews.length
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  const [loading, setLoading] = useState(false);
  const handleCheckAvailability = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${window.location.origin}/api/run_fetch`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        }
      });

      const data = await response.json();
      console.log("爬取完成，返回:", data);

      // 跳转到 availability 页面
      window.location.href = `${window.location.origin}/availability.html`;

    } catch (error) {
      console.error("请求失败：", error);
      alert("Request failed, check console.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
         return (
            <div style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
              color: "#333"
            }}>
              <div className="spinner" style={{
                width: "60px",
                height: "60px",
                border: "8px solid #eee",
                borderTop: "8px solid #007bff",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                marginBottom: "20px"
              }}></div>
              Finding available room...
              <br />
              Please wait for 10-30 seconds.
            </div>
          );
  }

  return (

    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb & Back Button - Matching original design */}
      <div className="bg-umich-blue text-white py-24">
        <div className="container px-8">
          <button 
            onClick={() => navigate(`/building/${area.buildingId}`)}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-md transition-all mb-6"
          >
            <i className="fas fa-arrow-left"></i>
            Back to {building.shortName}
          </button>
        </div>
      </div>

      <div className="container py-8 px-8">
        <div className="space-y-6">
          {/* Photo Carousel - Matching original design */}
          <PhotoCarousel 
            photos={area.photos || []} 
            alt={area.name}
          />
          {/* Debug: Show photo count */}
          {process.env.NODE_ENV === 'development' && (
            <div className="text-xs text-gray-500 mt-2 px-8">
              Debug: {area.photos?.length || 0} photos in data, {filterSupportedImages(area.photos || []).length} valid photos
            </div>
          )}

          {/* Area Info - Matching original design */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="text-3xl font-display text-umich-blue mb-3">{area.name}</CardTitle>
              <div className="flex items-center gap-2 text-gray-600">
                <i className="fas fa-map-marker-alt text-accent"></i>
                <span>{building.name} • {area.location}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key Characteristics - Matching original design */}
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-white text-gray-700 px-4 py-2 text-xs font-semibold border border-gray-200">
                  {noiseOption?.label}
                </Badge>
                <Badge className="bg-umich-blue text-accent px-4 py-2 text-xs font-semibold">
                  {enclosedOption?.label}
                </Badge>
                {area.bestFor.map(bf => {
                  const option = filterOptions.bestFor.find(o => o.value === bf);
                  return (
                    <Badge key={bf} className="bg-accent text-umich-blue px-4 py-2 text-xs font-semibold">
                      {option?.label}
                    </Badge>
                  );
                })}
              </div>

              <Separator />

              {/* Quick Info Table - Matching original design */}
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-gray-700 text-sm w-[120px]">Noise Level</td>
                        <td className="py-3 px-4 text-umich-blue font-medium text-sm">{noiseOption?.label}</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-gray-700 text-sm">Best For</td>
                        <td className="py-3 px-4 text-umich-blue font-medium text-sm">
                          {area.bestFor.map(bf => {
                            const option = filterOptions.bestFor.find(o => o.value === bf);
                            return option?.label;
                          }).filter(Boolean).join(', ')}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-gray-700 text-sm">Privacy Level</td>
                        <td className="py-3 px-4 text-umich-blue font-medium text-sm">{enclosedOption?.label}</td>
                      </tr>
                      <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-gray-700 text-sm">Amenities</td>
                        <td className="py-3 px-4 text-umich-blue font-medium text-sm">
                          {area.amenities && area.amenities.length > 0
                            ? area.amenities.map(amenity => {
                                const option = filterOptions.amenities.find(a => a.value === amenity);
                                return option?.label;
                              }).filter(Boolean).join(' ')
                            : 'None'}
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-gray-700 text-sm">Bookable Rooms</td>
                        <td className="py-3 px-4 text-umich-blue font-medium text-sm">
                          {area.bookableRooms && area.bookableRooms.length > 0 && area.bookableRooms[0] !== 'none'
                            ? area.bookableRooms.map(room => {
                                const option = filterOptions.bookableRooms.find(r => r.value === room);
                                return option?.label;
                              }).filter(Boolean).join(' ')
                            : 'None'}
                        </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* ----------👇 你要加的按钮放这里 ------------- */}
              {id === '14' && (
              <button
                style={{
                  backgroundColor: loading ? "#999" : "#00274C",
                  color: "white",
                  padding: "12px 22px",
                  border: "none",
                  borderRadius: "10px",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginTop: "15px",
                  boxShadow: "0px 3px 8px rgba(0,0,0,0.25)",
                  transition: "0.2s ease"
                }}
                onClick={async (e) => {
                  e.stopPropagation();  // <-- 防止触发React的 space/14 导航
                  setLoading(true);

                  try {
                    const res = await fetch(`${window.location.origin}/api/run_fetch`, { cache: "no-cache" });
                    const json = await res.json();
                    console.log("爬虫完成:", json);

                    // 真实跳转
                    window.location.replace(`${window.location.origin}/availability.html`);

                  } catch (e) {
                    console.error(e);
                    setLoading(false);
                  }
                }}
              >
                {loading ? "Fetching..." : "Check Availability"}
              </button>)}
    

              {/* ----------👆 你要加的按钮放这里 ------------- */}

              <Separator />

              {/* 5 Dimensions - Matching original design */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-umich-blue mb-6 font-display flex items-center gap-2">
                  <i className="fas fa-clipboard-check text-accent"></i>
                  5-Dimension Evaluation
                </h3>
                <div className="space-y-5">
                  <div className="bg-white rounded-lg p-5 border-l-4 border-accent">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent to-yellow-400 rounded-full flex items-center justify-center text-umich-blue text-lg">
                        <i className="fas fa-couch"></i>
                      </div>
                      <h4 className="font-bold text-gray-800 font-sans">Environment</h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed ml-13">{area.dimensions.environment}</p>
                  </div>
                  <div className="bg-white rounded-lg p-5 border-l-4 border-accent">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent to-yellow-400 rounded-full flex items-center justify-center text-umich-blue text-lg">
                        <i className="fas fa-volume-down"></i>
                      </div>
                      <h4 className="font-bold text-gray-800 font-sans">Space & Sound</h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed ml-13">{area.dimensions.spaceSound}</p>
                  </div>
                  <div className="bg-white rounded-lg p-5 border-l-4 border-accent">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent to-yellow-400 rounded-full flex items-center justify-center text-umich-blue text-lg">
                        <i className="fas fa-laptop"></i>
                      </div>
                      <h4 className="font-bold text-gray-800 font-sans">Facilities</h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed ml-13">{area.dimensions.facilities}</p>
                  </div>
                  <div className="bg-white rounded-lg p-5 border-l-4 border-accent">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent to-yellow-400 rounded-full flex items-center justify-center text-umich-blue text-lg">
                        <i className="fas fa-coffee"></i>
                      </div>
                      <h4 className="font-bold text-gray-800 font-sans">Convenience</h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed ml-13">{area.dimensions.convenience}</p>
                  </div>
                  <div className="bg-white rounded-lg p-5 border-l-4 border-accent">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent to-yellow-400 rounded-full flex items-center justify-center text-umich-blue text-lg">
                        <i className="fas fa-door-open"></i>
                      </div>
                      <h4 className="font-bold text-gray-800 font-sans">Accessibility</h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed ml-13">{area.dimensions.accessibility}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Amenities - Matching original design */}
              {area.amenities && area.amenities.length > 0 && (
                <div>
                    <h3 className="text-xl font-bold text-umich-blue mb-3 font-display flex items-center gap-2">
                      <i className="fas fa-plug text-accent"></i>
                      Amenities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {area.amenities.map(amenity => {
                        const option = filterOptions.amenities.find(a => a.value === amenity);
                        return (
                          <Badge key={amenity} variant="secondary" className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700">
                            {option?.label}
                          </Badge>
                        );
                      })}
                    </div>
                </div>
              )}

              {/* Bookable Rooms - Matching original design */}
              {area.bookableRooms && area.bookableRooms.length > 0 && area.bookableRooms[0] !== 'none' && (
                <div>
                    <h3 className="text-xl font-bold text-umich-blue mb-3 font-display flex items-center gap-2">
                      <i className="fas fa-door-open text-accent"></i>
                      Bookable Rooms
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {area.bookableRooms.map(room => {
                        const option = filterOptions.bookableRooms.find(r => r.value === room);
                        return option ? (
                          <Badge key={room} className="bg-green-100 text-green-800 text-xs px-3 py-1.5 font-medium">
                            {option.label}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reviews Section - Matching original design */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-6">
                    {reviews.length > 0 && (
                      <div className="text-center">
                        <div className="text-5xl font-display font-bold text-umich-blue leading-none mb-2">
                          {averageRating.toFixed(1)}
                        </div>
                        <div className="flex gap-0.5 justify-center mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <i 
                              key={i} 
                              className={`fas fa-star text-xl ${
                                i < Math.round(averageRating) 
                                  ? 'text-accent' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</div>
                      </div>
                    )}
                  </div>
                  {allReviewPhotos.length > 0 && (
                    <Dialog open={viewAllPhotos} onOpenChange={setViewAllPhotos}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                          <ImageIcon className="h-4 w-4" />
                          View All Photos ({allReviewPhotos.length})
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>All Review Photos</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {filterSupportedImages(allReviewPhotos).map((photo, index) => {
                            // Simple path normalization - match SpaceCard approach
                            let photoPath = photo.trim();
                            if (!photoPath.startsWith('/')) {
                              photoPath = `/${photoPath}`;
                            }
                            photoPath = photoPath.replace(/([^:]\/)\/+/g, '$1');
                            photoPath = encodeURI(photoPath);
                            
                            return (
                              <img
                                key={index}
                                src={photoPath}
                                alt={`Review photo ${index + 1}`}
                                className="w-full h-48 object-cover rounded-lg"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  console.error('Review image failed to load:', photoPath, 'Original:', photo);
                                  target.style.display = 'none';
                                }}
                                onLoad={() => {
                                  console.log('Review image loaded successfully:', photoPath);
                                }}
                              />
                            );
                          })}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
              </div>
              <CardTitle className="text-2xl font-display text-umich-blue">
                Reviews ({reviews.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Review Form - Matching original design */}
                <SignedIn>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <form onSubmit={submitReview} className="space-y-5">
                      <div>
                        <label className="text-sm font-semibold text-umich-blue mb-3 block">Your Rating</label>
                        <div className="flex gap-2 flex-row-reverse justify-end">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <label key={star} className="cursor-pointer">
                              <input
                                type="radio"
                                name="rating"
                                value={star}
                                checked={rating === star}
                                onChange={() => setRating(star)}
                                className="hidden"
                              />
                              <i
                                className={`fas fa-star text-3xl transition-all ${
                                  star <= rating
                                    ? "text-accent"
                                    : "text-gray-300"
                                } hover:text-accent`}
                              />
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-umich-blue mb-2 block">Your Review</label>
                        <Textarea
                          placeholder="Share your experience with this space..."
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          rows={4}
                          className="border-2 border-gray-200 focus:border-umich-blue rounded-md"
                        />
                      </div>
                      
                      {/* Photo Upload - Matching original design */}
                      <div>
                        <label className="text-sm font-semibold text-umich-blue mb-2 block">Photos (Optional, up to 9 images)</label>
                        <div className="space-y-3">
                          {photoPreviewUrls.length > 0 && (
                            <div className="grid grid-cols-3 gap-3">
                              {photoPreviewUrls.map((url, index) => (
                                <div key={index} className="relative group aspect-square">
                                  <img 
                                    src={url} 
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-full object-cover rounded-md"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removePhoto(index)}
                                    className="absolute top-1 right-1 bg-black/60 hover:bg-umich-blue text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {uploadedPhotos.length < 9 && (
                            <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-umich-blue hover:bg-gray-50 transition-all">
                              <i className="fas fa-cloud-upload-alt text-2xl text-gray-400"></i>
                              <span className="text-sm text-gray-600">
                                Upload Photos {uploadedPhotos.length > 0 && `(${9 - uploadedPhotos.length} more allowed)`}
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handlePhotoUpload}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-3 pt-2">
                        <Button 
                          type="submit" 
                          disabled={submitting} 
                          className="bg-umich-blue hover:bg-umich-blue-light text-white font-semibold px-6 py-2.5 rounded-md transition-all"
                        >
                          {submitting ? "Submitting..." : "Submit Review"}
                        </Button>
                      </div>
                    </form>
                  </div>
                </SignedIn>
                <SignedOut>
                  <div className="text-center py-8 bg-gray-50 rounded-xl">
                    <i className="fas fa-lock text-4xl text-gray-400 mb-4"></i>
                    <p className="text-gray-600 mb-4">Sign in to leave a review</p>
                    <Button onClick={() => navigate("/auth")} className="bg-umich-blue hover:bg-umich-blue-light text-white">
                      Sign In
                    </Button>
                  </div>
                </SignedOut>

                <Separator />

                {/* Reviews List - Matching original design */}
                <div className="space-y-5">
                  {reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-xl p-5 border-l-4 border-accent">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-11 w-11 rounded-full bg-umich-blue text-accent flex items-center justify-center font-bold text-lg">
                            {review.author_name?.[0] || review.author?.[0] || "?"}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-0.5 font-sans">
                              {review.author_name || review.author || "Anonymous"}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {new Date(review.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <i
                              key={i}
                              className={`fas fa-star text-sm ${
                                i < review.rating
                                  ? "text-accent"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {(review.comment || review.content) && (
                        <p className="text-gray-700 leading-relaxed mb-3">{review.comment || review.content}</p>
                      )}
                      {review.photos && review.photos.length > 0 && (
                        <div className="flex gap-2 mt-3 flex-wrap">
                          {filterSupportedImages(review.photos).map((photo: string, photoIndex: number) => {
                            // Simple path normalization - match SpaceCard approach
                            let photoPath = photo.trim();
                            if (!photoPath.startsWith('/')) {
                              photoPath = `/${photoPath}`;
                            }
                            photoPath = photoPath.replace(/([^:]\/)\/+/g, '$1');
                            photoPath = encodeURI(photoPath);
                            
                            return (
                              <img
                                key={photoIndex}
                                src={photoPath}
                                alt={`Review photo ${photoIndex + 1}`}
                                className="w-16 h-16 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => window.open(photoPath, '_blank')}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  console.error('Review image failed to load:', photoPath, 'Original:', photo);
                                  target.style.display = 'none';
                                }}
                                onLoad={() => {
                                  console.log('Review image loaded successfully:', photoPath);
                                }}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                  {reviews.length === 0 && (
                    <div className="text-center py-12">
                      <i className="fas fa-comment text-5xl text-gray-300 mb-4"></i>
                      <h4 className="text-xl text-gray-600 mb-2 font-sans">No reviews yet</h4>
                      <p className="text-gray-500">Be the first to review!</p>
                    </div>
                  )}
                </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
