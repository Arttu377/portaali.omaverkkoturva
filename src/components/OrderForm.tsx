import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface OrderFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onClose, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full my-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Tilaustiedot</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Etu- ja sukunimi *</Label>
              <Input 
                id="firstName" 
                name="firstName" 
                placeholder="Etu- ja sukunimi" 
                required 
              />
            </div>
            <div>
              <Label htmlFor="email">Sähköpostiosoite *</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="Sähköpostiosoite" 
                required 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Puhelinnumero *</Label>
              <Input 
                id="phone" 
                name="phone" 
                type="tel" 
                placeholder="Puhelinnumero" 
                required 
              />
            </div>
            <div>
              <Label htmlFor="birthdate">Syntymäaika *</Label>
              <Input 
                id="birthdate" 
                name="birthdate" 
                type="date" 
                defaultValue="1990-01-01"
                required 
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="address">Laskutusosoite *</Label>
            <Input 
              id="address" 
              name="address" 
              placeholder="Esimerkkikatu 1 A 2" 
              required 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="postalCode">Postinumero *</Label>
              <Input 
                id="postalCode" 
                name="postalCode" 
                placeholder="70100" 
                required 
              />
            </div>
            <div>
              <Label htmlFor="city">Postitoimipaikka *</Label>
              <Input 
                id="city" 
                name="city" 
                placeholder="KUOPIO" 
                required 
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="promoCode">Tarjouskoodi</Label>
            <Input 
              id="promoCode" 
              name="promoCode" 
              placeholder="Kirjoita koodi tähän" 
            />
          </div>
          
          <div className="space-y-4 pt-4">
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                Lähettämällä tämän lomakkeen vakuutan, että antamani tiedot ovat oikein. 
                Lisäksi hyväksyn henkilötietojeni käsittelyn Netin Turvan tietosuojaselosteen mukaisesti.
              </p>
              <p>
                Olen tarkistanut syöttämäni tiedot ja niiden oikeellisuuden. Ymmärrän, että tilauksen 
                onnistuminen vaatii oikeat tiedot ja minulle voidaan soittaa tilauksen vahvistamiseksi.
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              style={{ background: 'var(--gradient-navy)' }}
            >
              Lähetä tilaus
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;