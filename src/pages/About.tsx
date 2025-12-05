import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <div className="bg-primary text-white py-20">
          <div className="container text-center">
            <div className="inline-block bg-accent text-primary px-6 py-2 rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
              Our Mission
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              <span className="block">About This</span>
              <span className="text-accent block -mt-2">Project</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto text-left md:text-center">
              A student-led initiative to help Wolverines discover their ideal study environment
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Mission */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-umich-blue font-display">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Finding the perfect study space can be challenging at a large university like Michigan. 
                  What works for one student might not work for another—some need absolute silence, 
                  while others thrive in bustling environments.
                </p>
                <p>
                  UMich Study Spaces Explorer was created to solve this problem. We provide detailed, 
                  student-evaluated information about study locations across campus, helping you find 
                  spaces that match your specific needs and preferences.
                </p>
              </CardContent>
            </Card>

            {/* 5-Dimension Framework */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-umich-blue font-display">Our 5-Dimension Evaluation Framework</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Each study space is evaluated across five key dimensions to give you a complete picture:
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <span className="text-3xl">🪑</span>
                    <div>
                      <h3 className="font-bold text-umich-blue mb-1">Environment</h3>
                      <p className="text-gray-600">
                        Seating comfort, desk space, lighting quality, and overall ambiance
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-3xl">🔊</span>
                    <div>
                      <h3 className="font-bold text-umich-blue mb-1">Space & Sound</h3>
                      <p className="text-gray-600">
                        Noise levels, privacy, room layout, and crowd density
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-3xl">🔌</span>
                    <div>
                      <h3 className="font-bold text-umich-blue mb-1">Facilities</h3>
                      <p className="text-gray-600">
                        Power outlets, WiFi quality, whiteboards, and technology access
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-3xl">☕</span>
                    <div>
                      <h3 className="font-bold text-umich-blue mb-1">Convenience</h3>
                      <p className="text-gray-600">
                        Nearby food options, restrooms, water fountains, and accessibility
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <span className="text-3xl">🚪</span>
                    <div>
                      <h3 className="font-bold text-umich-blue mb-1">Accessibility</h3>
                      <p className="text-gray-600">
                        Building hours, entry requirements, location, and ease of access
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-umich-blue font-display">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <ol className="space-y-3 list-decimal list-inside">
                  <li>
                    <strong>Browse by Campus:</strong> Choose between Central and North Campus to explore buildings in your area
                  </li>
                  <li>
                    <strong>Filter by Preferences:</strong> Use our advanced filters to find spaces matching your noise level, amenities, and study style
                  </li>
                  <li>
                    <strong>Read Detailed Evaluations:</strong> Each space includes comprehensive information across all five dimensions
                  </li>
                  <li>
                    <strong>Share Your Experience:</strong> Leave reviews and photos to help fellow Wolverines make informed decisions
                  </li>
                </ol>
              </CardContent>
            </Card>

            {/* Student-Led */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-umich-blue font-display">By Students, For Students</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  This project was created by University of Michigan students who understand the 
                  challenges of finding good study spaces on campus. All evaluations are based on 
                  real student experiences and field research.
                </p>
                <p>
                  We believe in the power of community knowledge. Every review, rating, and photo 
                  shared helps create a more comprehensive resource for current and future Wolverines.
                </p>
              </CardContent>
            </Card>

            {/* Contribute */}
            <Card className="bg-accent/10 border-accent">
              <CardHeader>
                <CardTitle className="text-2xl text-umich-blue font-display">Help Us Grow</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Know a great study spot we haven't covered yet? Have insights about a location? 
                  We'd love your contribution!
                </p>
                <p className="font-semibold text-umich-blue">
                  Visit our <a href="/submit" className="underline hover:text-accent">Contribute page</a> to submit new locations 
                  or leave reviews on existing spaces.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
