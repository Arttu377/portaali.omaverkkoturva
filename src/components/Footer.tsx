
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-16 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left side - Company info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              OmaVerkkoturva
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                <strong>OmaVerkkoturva</strong> on suomalainen yritys, joka on erikoistunut identiteettisuojaan ja verkkoturvallisuuteen. 
                Missiomme on suojata ihmisten henkilötietoja ja estää identiteettivarkauksia ennen kuin ne ehtivät tapahtua.
              </p>
              
              <p>
                Tarjoamme kattavan suojan henkilötiedoillesi modernin teknologian avulla. 
                Palvelumme valvoo jatkuvasti verkossa liikkuvia tietojasi ja hälyttää heti, 
                jos tietosi ovat vaarantuneet tai niitä käytetään väärin.
              </p>
              
              <p>
                Yrityksemme perustuu vahvaan suomalaiseen osaamiseen tietoturvassa ja asiakaspalvelussa. 
                Kaikki asiakkaiden tiedot käsitellään Suomessa, ja noudatamme tiukkoja EU:n 
                tietosuoja-asetuksen (GDPR) vaatimuksia.
              </p>
            </div>
          </div>
          
          {/* Right side - Contact info */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  <Mail className="w-5 h-5 text-blue-900" />
                </div>
                <h3 className="text-lg font-semibold">Yhteystiedot</h3>
              </div>
              <p className="text-gray-600 text-sm ml-13">
                info@omaverkkoturva.fi<br />
                020 123 4567
              </p>
            </div>
            
            <div>
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  <MapPin className="w-5 h-5 text-blue-900" />
                </div>
                <h3 className="text-lg font-semibold">Toimisto</h3>
              </div>
              <p className="text-gray-600 text-sm ml-13">
                Mannerheimintie 12<br />
                00100 Helsinki<br />
                Suomi
              </p>
            </div>
            
            <div>
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  <Phone className="w-5 h-5 text-blue-900" />
                </div>
                <h3 className="text-lg font-semibold">Asiakaspalvelu</h3>
              </div>
              <p className="text-gray-600 text-sm ml-13">
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
