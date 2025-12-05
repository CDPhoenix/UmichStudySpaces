import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-primary text-white py-16 border-t border-white/15" style={{ background: 'hsl(var(--umich-blue))' }}>
      <div className="container px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Brand Section - Matching original design */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">〽️</span>
              <span className="text-xl font-bold text-accent font-display">
                UMich Study Spaces
              </span>
            </div>
            <p className="text-white/85 leading-relaxed">
              A student-led initiative to help Wolverines find their perfect study environment.
            </p>
          </div>

          {/* Quick Links - Matching original design */}
          <div>
            <h3 className="text-accent font-bold text-base mb-4 font-sans">Quick Links</h3>
            <ul className="space-y-2 list-none">
              <li>
                <Link to="/" className="text-white/85 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/85 hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-white/85 hover:text-accent transition-colors">
                  Contribute
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources - Matching original design */}
          <div>
            <h3 className="text-accent font-bold text-base mb-4 font-sans">Resources</h3>
            <ul className="space-y-2 list-none">
              <li>
                <a 
                  href="https://www.lib.umich.edu/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/85 hover:text-accent transition-colors"
                >
                  UMich Library
                </a>
              </li>
              <li>
                <a 
                  href="https://studentlife.umich.edu/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/85 hover:text-accent transition-colors"
                >
                  Student Life
                </a>
              </li>
              <li>
                <a 
                  href="https://maps.studentlife.umich.edu/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/85 hover:text-accent transition-colors"
                >
                  Campus Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Matching original design */}
        <div className="border-t border-white/15 pt-8 text-center">
          <p className="text-white/70 mb-2">
            © 2025 UMich Study Spaces Explorer. A student project at the University of Michigan.
          </p>
          <p className="text-accent font-bold text-lg">
            Go Blue! 〽️💛💙
          </p>
        </div>
      </div>
    </footer>
  );
}
