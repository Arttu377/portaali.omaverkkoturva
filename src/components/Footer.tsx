
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-16 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tietoa meistä
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed">
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-blue-900" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Yhteystiedot</h3>
            <p className="text-gray-600">
              info@omaverkkoturva.fi<br />
              020 123 4567
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-blue-900" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Toimisto</h3>
            <p className="text-gray-600">
              Mannerheimintie 12<br />
              00100 Helsinki<br />
              Suomi
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-blue-900" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Asiakaspalvelu</h3>
            <p className="text-gray-600">
              Ma-Pe 8:00-17:00<br />
              Suomenkielinen palvelu<br />
              Nopea vastaus
            </p>
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
