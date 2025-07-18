
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-8 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side - Company info */}
          <div>
            <h2 className="text-xl font-bold mb-3">
              OmaVerkkoturva
            </h2>
            <div className="space-y-3 text-sm leading-relaxed">
              <p>
                OmaVerkkoturva on suomalainen yritys, joka on erikoistunut identiteettisuojaan ja verkkoturvallisuuteen. 
                Missiomme on suojata ihmisten henkilötietoja ja estää identiteettivarkauksia ennen kuin ne ehtivät tapahtua.
              </p>
              
              <p>
                Yrityksemme perustuu vahvaan suomalaiseen osaamiseen tietoturvassa ja asiakaspalvelussa. 
                Kaikki asiakkaiden tiedot käsitellään Suomessa, ja noudatamme tiukkoja EU:n 
                tietosuoja-asetuksen (GDPR) vaatimuksia.
              </p>
            </div>
          </div>
          
          {/* Right side - Contact info in horizontal layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <Mail className="w-4 h-4 text-blue-900" />
                </div>
                <h3 className="text-sm font-semibold">Yhteystiedot</h3>
              </div>
              <p className="text-gray-600 text-xs ml-10">
                info@omaverkkoturva.fi<br />
                020 123 4567
              </p>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <MapPin className="w-4 h-4 text-blue-900" />
                </div>
                <h3 className="text-sm font-semibold">Toimisto</h3>
              </div>
              <p className="text-gray-600 text-xs ml-10">
                Mannerheimintie 12<br />
                00100 Helsinki<br />
                Suomi
              </p>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <Phone className="w-4 h-4 text-blue-900" />
                </div>
                <h3 className="text-sm font-semibold">Asiakaspalvelu</h3>
              </div>
              <p className="text-gray-600 text-xs ml-10">
                Ma-Pe 8:00-17:00<br />
                Suomenkielinen palvelu<br />
                Nopea vastaus
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} OmaVerkkoturva. Kaikki oikeudet pidätetään.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-sm text-gray-600 hover:text-blue-900 transition-colors">
                Tietosuojaseloste
              </Link>
              <Link to="/terms" className="text-sm text-gray-600 hover:text-blue-900 transition-colors">
                Käyttöehdot
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
