import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { buildings } from "@/data/buildings";

export default function Home() {
  const navigate = useNavigate();

  const centralCount = buildings.central.length;
  const northCount = buildings.north.length;
  const centralAreas = buildings.central.reduce((sum, b) => sum + b.areaCount, 0);
  const northAreas = buildings.north.reduce((sum, b) => sum + b.areaCount, 0);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section - Matching original design */}
      <div className="relative bg-umich-blue text-white min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/10 pointer-events-none" 
             style={{
               background: 'radial-gradient(circle at 20% 80%, rgba(255, 203, 5, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 203, 5, 0.08) 0%, transparent 50%)'
             }} />
        
        <div className="container relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-accent/20 text-accent px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            🎓 Field-Evaluated by Students
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6 text-white leading-tight px-2">
            Find Your Perfect<br /><span className="text-accent">Study Space</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            Explore study locations across Central and North Campus, each evaluated using our 5-dimension research framework
          </p>
          <div className="flex flex-col items-center gap-2 text-accent animate-bounce">
            <span className="font-semibold text-sm uppercase tracking-wider">Choose Your Campus</span>
            <i className="fas fa-arrow-down text-xl"></i>
          </div>
        </div>
      </div>

      {/* Campus Selection - Matching original design */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Central Campus Card */}
            <div 
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer border-2 border-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-accent group"
              onClick={() => navigate('/campus/central')}
            >
              <div className="relative h-[280px] overflow-hidden">
                <img 
                  src={encodeURI("/Campus photos/Central Campus.jpg")} 
                  alt="Central Campus" 
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    console.error('Campus image failed:', '/Campus photos/Central Campus.jpg');
                    target.style.display = 'none';
                    if (!target.nextElementSibling) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'absolute inset-0 bg-gradient-to-br from-umich-blue to-umich-blue-light flex items-center justify-center';
                      placeholder.innerHTML = '<span class="text-6xl">🏛️</span>';
                      target.parentElement?.appendChild(placeholder);
                    }
                  }}
                  onLoad={() => {
                    console.log('Campus image loaded: Central Campus');
                  }}
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="p-4 sm:p-6 lg:p-8">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-umich-blue mb-2 sm:mb-3">Central Campus</h2>
                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  Historic heart of UMich with iconic libraries, academic buildings, and the famous Diag
                </p>
                <div className="flex gap-6 sm:gap-8 mb-4 sm:mb-6">
                  <div className="text-center">
                    <span className="block text-3xl sm:text-4xl font-display font-bold text-umich-blue">{centralCount}</span>
                    <span className="text-xs sm:text-sm text-gray-600">Buildings</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-3xl sm:text-4xl font-display font-bold text-umich-blue">{centralAreas}</span>
                    <span className="text-xs sm:text-sm text-gray-600">Study Areas</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">Libraries</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">Cafés</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">Historic</span>
                </div>
                <button className="w-full bg-umich-blue hover:bg-umich-blue-light text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base group-hover:bg-accent group-hover:text-umich-blue">
                  <span className="hidden sm:inline">Explore Central Campus</span>
                  <span className="sm:hidden">Explore</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>

            {/* North Campus Card */}
            <div 
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer border-2 border-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-accent group"
              onClick={() => navigate('/campus/north')}
            >
              <div className="relative h-[280px] overflow-hidden">
                <img 
                  src={encodeURI("/Campus photos/North Campus.jpg")} 
                  alt="North Campus" 
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    console.error('Campus image failed:', '/Campus photos/North Campus.jpg');
                    target.style.display = 'none';
                    if (!target.nextElementSibling) {
                      const placeholder = document.createElement('div');
                      placeholder.className = 'absolute inset-0 bg-gradient-to-br from-umich-blue-light to-umich-blue flex items-center justify-center';
                      placeholder.innerHTML = '<span class="text-6xl">🏗️</span>';
                      target.parentElement?.appendChild(placeholder);
                    }
                  }}
                  onLoad={() => {
                    console.log('Campus image loaded: North Campus');
                  }}
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="p-4 sm:p-6 lg:p-8">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-umich-blue mb-2 sm:mb-3">North Campus</h2>
                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  Modern engineering and arts hub featuring state-of-the-art facilities and tech resources
                </p>
                <div className="flex gap-6 sm:gap-8 mb-4 sm:mb-6">
                  <div className="text-center">
                    <span className="block text-3xl sm:text-4xl font-display font-bold text-umich-blue">{northCount}</span>
                    <span className="text-xs sm:text-sm text-gray-600">Buildings</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-3xl sm:text-4xl font-display font-bold text-umich-blue">{northAreas}</span>
                    <span className="text-xs sm:text-sm text-gray-600">Study Areas</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">Engineering</span>
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">Modern</span>
                  <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">24/7</span>
                </div>
                <button className="w-full bg-umich-blue hover:bg-umich-blue-light text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base group-hover:bg-accent group-hover:text-umich-blue">
                  <span className="hidden sm:inline">Explore North Campus</span>
                  <span className="sm:hidden">Explore</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats - Matching original design */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center p-6 sm:p-8 bg-gray-50 rounded-xl">
              <i className="fas fa-map-marker-alt text-3xl sm:text-4xl text-accent mb-3 sm:mb-4 block"></i>
              <span className="block text-4xl sm:text-5xl font-display font-bold text-umich-blue mb-2">{centralAreas + northAreas}</span>
              <span className="text-gray-600 text-xs sm:text-sm">Study Locations</span>
            </div>
            <div className="text-center p-6 sm:p-8 bg-gray-50 rounded-xl">
              <i className="fas fa-building text-3xl sm:text-4xl text-accent mb-3 sm:mb-4 block"></i>
              <span className="block text-4xl sm:text-5xl font-display font-bold text-umich-blue mb-2">{centralCount + northCount}</span>
              <span className="text-gray-600 text-xs sm:text-sm">Buildings</span>
            </div>
            <div className="text-center p-6 sm:p-8 bg-gray-50 rounded-xl">
              <i className="fas fa-clipboard-check text-3xl sm:text-4xl text-accent mb-3 sm:mb-4 block"></i>
              <span className="block text-4xl sm:text-5xl font-display font-bold text-umich-blue mb-2">5</span>
              <span className="text-gray-600 text-xs sm:text-sm">Evaluation Dimensions</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
