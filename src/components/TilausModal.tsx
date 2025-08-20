import React, { useState } from 'react';
import { useShoppingCart } from '@/contexts/ShoppingCartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { X, ShoppingCart, User, Mail, Phone, Calendar, MapPin, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from 'emailjs-com';

interface TilausModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_6r9m8wf";
const EMAILJS_TEMPLATE_ID = "template_on07od7";
const EMAILJS_PUBLIC_KEY = "wRFDBmEPD5mCrpb2a";

const TilausModal = ({ isOpen, onClose }: TilausModalProps) => {
  const { cartItems, clearCart } = useShoppingCart();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'summary' | 'form'>('summary');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    postalCode: '',
    city: '',
    promoCode: '',
    acceptTerms: false
  });

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.,]/g, '').replace(',', '.'));
    return sum + (price * item.quantity);
  }, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      acceptTerms: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      toast({
        title: "Hyväksy ehdot",
        description: "Sinun täytyy hyväksyä ehdot ennen tilauksen tekemistä.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Lähetetään tilauksen tiedot save-order Edge Functioniin
      const orderData = {
        customer_email: formData.email,
        customer_first_name: formData.firstName,
        customer_last_name: formData.lastName,
        customer_phone: formData.phone,
        customer_birth_date: formData.birthDate,
        billing_address: formData.address,
        billing_postal_code: formData.postalCode,
        billing_city: formData.city,
        products: cartItems,
        total_price: totalPrice,
        promo_code: formData.promoCode || null
      };

                    const response = await fetch('https://fsirlcxhtyppecjjdqbp.supabase.co/functions/v1/save-order', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzaXJsY3hodHlwcGVjampkcWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2OTk0NTgsImV4cCI6MjA2OTI3NTQ1OH0.7HZENU4G4fRpemRp44Xj6cGIobhDaxqbJEa7U4gVHVU'
         },
        body: JSON.stringify({ orderData }),
      });

      const result = await response.json();

      if (result.success) {
        // Lähetetään vahvistusviesti asiakkaalle
        const confirmationUrl = `${window.location.origin}/vahvista-tilaus/${result.confirmation_token}`;
        
        const templateParams = {
          subject: 'Tervetuloa OmaVerkkoturva-palveluun!',
          from_name: 'OmaVerkkoturva',
          to_name: `${formData.firstName} ${formData.lastName}`,
          to_email: formData.email,
          message: `🎉 UUSI TILAUS VASTAANOTETTU!

👤 ASIAKASTIEDOT:
Nimi: ${formData.firstName} ${formData.lastName}
Sähköposti: ${formData.email}
Puhelin: ${formData.phone}
Syntymäaika: ${formData.birthDate}

🏠 LASKUTUSTIEDOT:
Osoite: ${formData.address}
Postinumero: ${formData.postalCode}
Postitoimipaikka: ${formData.city}
${formData.promoCode ? `Tarjouskoodi: ${formData.promoCode}` : ''}

🛒 TILATUT TUOTTEET:
${cartItems.map(item => `• ${item.title} - ${item.price} (määrä: ${item.quantity})`).join('\n')}

💰 YHTEENSA: ${totalPrice.toFixed(2).replace('.', ',')} €/kk

📅 Tilausaika: ${new Date().toLocaleString('fi-FI')}

✅ Asiakas on hyväksynyt sopimusehdot ja tietosuojaselosteen

---

Ennen aktivointia, vahvistathan tilauksesi klikkaamalla alla olevaa painiketta:

${confirmationUrl}

---
Tämä viesti on lähetetty automaattisesti OmaVerkkoturva-tilausjärjestelmästä`,
          reply_to: 'tuki@omaverkkoturva.fi'
        };

        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );
        
        toast({
          title: "Tilaus vastaanotettu!",
          description: "Tilauksesi on tallennettu ja vahvistusviesti lähetetty sähköpostiin.",
        });
        
        // Tyhjennetään ostoskori
        clearCart();
        
        // Suljetaan modaali
        onClose();
        setStep('summary');
        
      } else {
        throw new Error(result.error || 'Tilauksen tallentaminen epäonnistui');
      }
      
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "Virhe tilauksen käsittelyssä",
        description: "Yritä uudelleen tai ota yhteyttä asiakaspalveluun.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Tee tilaus</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Sisältö */}
        <div className="p-6">
          {step === 'summary' ? (
            /* Tilausyhteenveto */
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Tilausyhteenveto
                </h3>
                <p className="text-gray-600">
                  Tarkista tilatut tuotteet ja hinta ennen tietojen täyttämistä
                </p>
              </div>

              {/* Tuotteet */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Tilatut tuotteet:</h4>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-600">Määrä: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-blue-900">{item.price}</p>
                    </div>
                  ))}
                </div>
                
                <div className="pt-3 border-t-2 border-gray-300 mt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Kuukausittainen hinta:</span>
                    <span className="text-blue-900">{totalPrice.toFixed(2).replace('.', ',')} €/kk</span>
                  </div>
                </div>
              </div>

              {/* Sopimusehdot */}
              <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  Lähettämällä tämän tilauksen sitoudut Omaverkkoturva-palvelun jatkuvaan tilaukseen, 
                  josta veloitetaan säännöllisesti (ilmaiskokeilut, jotka eivät vaadi sitoutumista, poikkeavat tästä). 
                  Tilauksen kuukausittainen hinta näkyy tilauksen yhteenvedossa. Tilaus on voimassa toistaiseksi, 
                  ja sen voi irtisanoa aikaisintaan kuluvan kuukauden lopussa. Tilatuilla palveluilla on 14 päivän perumisoikeus.
                </p>
                <br />
                <p>
                  Palvelun käyttö edellyttää, että kuukausimaksu on suoritettu, ja Omaverkkoturva pidättää oikeuden 
                  keskeyttää tilaus, mikäli maksua ei ole vastaanotettu. Lähettämällä tilauksen hyväksyt myös 
                  Omaverkkoturva:n yleiset sopimusehdot ja palvelukohtaiset käyttöehdot, jotka löytyvät verkkosivuiltamme 
                  ja toimitetaan tilausvahvistuksen yhteydessä ilmoitettuun sähköpostiosoitteeseen.
                </p>
                <br />
                <p>
                  Omaverkkoturva voi käyttää asiakkaan henkilötietoja ja tunnistamistietoja myös omaan suoramarkkinointiinsa.
                </p>
              </div>

              <Button 
                onClick={() => setStep('form')}
                className="w-full py-3 text-lg"
              >
                Jatka tietojen täyttämiseen
              </Button>
            </div>
          ) : (
            /* Tilaustietolomake */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Täytä tilaustiedot
                </h3>
                <p className="text-gray-600">
                  Täytä kaikki pakolliset kentät (*)
                </p>
              </div>

              {/* Henkilötiedot */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Henkilötiedot
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Etunimi *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Etunimi"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Sukunimi *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Sukunimi"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Sähköpostiosoite *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Sähköpostiosoite"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Puhelinnumero *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Puhelinnumero"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="birthDate">Syntymäaika *</Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    placeholder="01.01.1999"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Laskutustiedot */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Laskutustiedot
                </h4>
                
                <div>
                  <Label htmlFor="address">Laskutusosoite *</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Esimerkkikatu 1"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postalCode">Postinumero *</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      placeholder="40100"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Postitoimipaikka *</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="JYVÄSKYLÄ"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Tarjouskoodi */}
              <div>
                <Label htmlFor="promoCode">Tarjouskoodi</Label>
                <Input
                  id="promoCode"
                  name="promoCode"
                  placeholder="Kirjoita koodi tähän"
                  value={formData.promoCode}
                  onChange={handleInputChange}
                />
              </div>

              {/* Ehdot */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={handleCheckboxChange}
                    className="mt-1"
                  />
                  <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                    Lähettämällä tämän lomakkeen vakuutan, että antamani tiedot ovat oikein. 
                    Lisäksi hyväksyn henkilötietojeni käsittelyn OmaVerkkoturvan tietosuojaselosteen mukaisesti.
                  </Label>
                </div>
              </div>

              {/* Napit */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('summary')}
                  className="flex-1"
                >
                  Takaisin yhteenvetoon
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? 'Käsitellään...' : 'Tee tilaus'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TilausModal;
