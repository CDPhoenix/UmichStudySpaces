import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useUser, useAuth, SignedIn, SignedOut } from "@clerk/clerk-react";
import { submissionsApi, reviewsApi } from "@/lib/api";

const MAX_PHOTOS = 9;

const submitSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  building: z.string().min(2, "Building name required"),
  campus: z.string().min(1, "Please select a campus"),
  description: z.string().max(500, "Description must be less than 500 characters"),
});

export default function Submit() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    building: "",
    campus: "",
    description: "",
    noise_level: "",
    privacy_level: "",
    amenities: [] as string[],
  });

  useEffect(() => {
    if (isLoaded && !user) {
      navigate("/auth");
    }
  }, [navigate, user, isLoaded]);

  const amenityOptions = [
    "Computers",
    "Printer",
    "Whiteboard",
    "Microwave",
    "Café",
    "Lounge Seating",
    "Power Outlets",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to submit");
      navigate("/auth");
      return;
    }

    setLoading(true);

    try {
      const validation = submitSchema.safeParse(formData);
      if (!validation.success) {
        toast.error(validation.error.errors[0].message);
        setLoading(false);
        return;
      }

      const token = await getToken();
      if (!token) {
        toast.error("Please sign in to submit");
        navigate("/auth");
        setLoading(false);
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
          // Continue with submission even if photo upload fails
        }
      }
      
      await submissionsApi.create({
        user_id: user.id,
        name: formData.name,
        building: formData.building,
        campus: formData.campus,
        description: formData.description || undefined,
        noise_level: formData.noise_level || undefined,
        privacy_level: formData.privacy_level || undefined,
        amenities: formData.amenities.length > 0 ? formData.amenities : undefined,
        photos: photoUrls.length > 0 ? photoUrls : undefined,
      }, token);

      toast.success("Thank you! Your submission will be reviewed.");
      // Reset form
      setFormData({
        name: "",
        building: "",
        campus: "",
        description: "",
        noise_level: "",
        privacy_level: "",
        amenities: [],
      });
      setUploadedPhotos([]);
      setPhotoPreviewUrls([]);
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).slice(0, MAX_PHOTOS - uploadedPhotos.length);
    
    if (uploadedPhotos.length + newFiles.length > MAX_PHOTOS) {
      toast.error(`You can upload up to ${MAX_PHOTOS} images`);
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

  if (!isLoaded) {
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
              Please sign in to submit a new study space
            </p>
            <Button onClick={() => navigate("/auth")}>Sign In</Button>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="container py-8 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Submit a New Study Space</CardTitle>
              <CardDescription>
                Know a great study spot? Share it with the UMich community!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Space Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Shapiro Library Reading Room"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="building">Building *</Label>
                  <Input
                    id="building"
                    placeholder="e.g., Shapiro Library"
                    value={formData.building}
                    onChange={(e) =>
                      setFormData({ ...formData, building: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="campus">Campus *</Label>
                  <Select
                    value={formData.campus}
                    onValueChange={(value) =>
                      setFormData({ ...formData, campus: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select campus" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="central">Central Campus</SelectItem>
                      <SelectItem value="north">North Campus</SelectItem>
                      <SelectItem value="medical">Medical Campus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the space, what makes it special..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="noise">Noise Level</Label>
                    <Select
                      value={formData.noise_level}
                      onValueChange={(value) =>
                        setFormData({ ...formData, noise_level: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select noise level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="silent">Silent</SelectItem>
                        <SelectItem value="quiet">Quiet</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="lively">Lively</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="privacy">Privacy Level</Label>
                    <Select
                      value={formData.privacy_level}
                      onValueChange={(value) =>
                        setFormData({ ...formData, privacy_level: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select privacy level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="semi">Semi-Private</SelectItem>
                        <SelectItem value="enclosed">Private Room</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Amenities</Label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {amenityOptions.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={formData.amenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                        />
                        <label
                          htmlFor={amenity}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photo Upload */}
                <div className="space-y-3">
                  <Label>Photos (Optional, up to {MAX_PHOTOS} images)</Label>
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
                    
                    {uploadedPhotos.length < MAX_PHOTOS && (
                      <label className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-umich-blue hover:bg-gray-50 transition-all">
                        <i className="fas fa-cloud-upload-alt text-2xl text-gray-400"></i>
                        <span className="text-sm text-gray-600">
                          Upload Photos {uploadedPhotos.length > 0 && `(${MAX_PHOTOS - uploadedPhotos.length} more allowed)`}
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

                <div className="flex gap-3">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </SignedIn>

      <Footer />
    </div>
  );
}
