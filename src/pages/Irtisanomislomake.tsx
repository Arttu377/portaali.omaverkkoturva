import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from 'emailjs-com';
import PageLayout from '@/components/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// EmailJS configuration
const SERVICE_ID = 'service_6r9m8wf';
const TEMPLATE_ID = 'template_on07od7';
const PUBLIC_KEY = 'wRFDBmEPD5mCrpb2a';

const formSchema = z.object({
  name: z.string().min(1, 'Nimi on pakollinen'),
  email: z.string().email('Virheellinen sähköpostiosoite').min(1, 'Sähköpostiosoite on pakollinen'),
  phone: z.string().min(1, 'Puhelinnumero on pakollinen'),
  address: z.string().min(1, 'Katuosoite on pakollinen'),
  reason: z.string().min(1, 'Syy peruutukselle on pakollinen'),
  confirmation: z.boolean().refine(val => val === true, 'Vahvistus on pakollinen'),
});

type FormData = z.infer<typeof formSchema>;

const Irtisanomislomake = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      reason: '',
      confirmation: false,
    },
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      console.log('EmailJS Configuration:', {
        SERVICE_ID,
        TEMPLATE_ID,
        PUBLIC_KEY: PUBLIC_KEY.substring(0, 5) + '...'
      });

      const templateParams = {
        subject: 'Irtisanomislomake',
        from_name: data.name,
        phone: data.phone,
        from_email: data.email,
        message: `Irtisanomislomake:

Nimi: ${data.name}
Sähköposti: ${data.email}
Puhelinnumero: ${data.phone}
Osoite: ${data.address}
Syy peruutukselle: ${data.reason}
Vahvistus: ${data.confirmation ? 'Kyllä' : 'Ei'}`,
        to_name: 'OmaVerkkoturva Team',
        reply_to: data.email,
      };

      console.log('Template Parameters:', templateParams);
      
      const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      console.log('EmailJS Success:', result);
      
      toast({
        title: "Irtisanomislomake lähetetty",
        description: "Kiitos irtisanomislomakkeestasi. Käsittelemme sen mahdollisimman pian.",
      });
      
      form.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Virhe",
        description: "Lomakkeen lähetyksessä tapahtui virhe. Yritä uudelleen.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancellationReasons = [
    "En tarvitse palvelua enää",
    "Palvelu on liian kallis",
    "Löysin paremman vaihtoehdon",
    "Teknisiä ongelmia",
    "Huono asiakaspalvelu",
    "Muu syy"
  ];

  return (
    <PageLayout showContact={false}>
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Otsikko */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Täältä pystyt irtisanomaan palvelun
            </h2>
          </div>

          {/* Teksti ja kuva rinnakkain */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            {/* Vasemmanpuoleinen teksti */}
            <div className="flex flex-col justify-center">
              <p className="text-gray-900 text-xl font-semibold leading-relaxed mb-6">
                Kiitos, että olet ollut mukana turvaamassa verkkoa kanssamme.
              </p>
              <p className="text-gray-900 text-lg leading-relaxed mb-6">
                Arvostamme sitä, että valitsit OmaVerkkoturvan suojaamaan digitaalisia tietojasi ja identiteettiäsi. Jokainen asiakas on meille tärkeä, ja olemme kiitollisia luottamuksesta, jonka olet meille antanut.
              </p>
              <p className="text-gray-900 text-lg leading-relaxed mb-6">
                Ymmärrämme, että elämäntilanteet ja tarpeet voivat muuttua. Jos päätät lopettaa palvelun, toivomme, että kokemuksesi on ollut hyödyllinen ja että tarjoamamme turva on tuonut sinulle mielenrauhaa verkossa liikkuessasi.
              </p>
              <p className="text-gray-900 text-lg leading-relaxed">
                Jos mielessäsi on kysyttävää irtisanomiseen tai tietoturvaan liittyen, asiakastukemme auttaa mielellään. Ja mikäli joskus tulevaisuudessa haluat palata asiakkaaksemme, toivotamme sinut lämpimästi tervetulleeksi takaisin.
              </p>
            </div>

            {/* Oikeanpuoleinen kuva */}
            <div className="flex items-center justify-center">
              <img 
                src="/lovable-uploads/e965541f-fa90-41e5-a251-5e576e0ac7bd.png" 
                alt="Tiimityö ja yhteistyö" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Irtisanomislomake
              </h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Etu- ja sukunimi</FormLabel>
                      <FormControl>
                        <Input placeholder="Nimi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sähköpostiosoite *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="sähköposti@esimerkki.fi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Puhelinnumero *</FormLabel>
                      <FormControl>
                        <Input placeholder="040 123 4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Katuosoite *</FormLabel>
                      <FormControl>
                        <Input placeholder="Katuosoite 1, 00100 Helsinki" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Syy peruutukselle *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Valitse syy" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cancellationReasons.map((reason) => (
                            <SelectItem key={reason} value={reason}>
                              {reason}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmation"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm">
                          Vahvistan täyttäneeni lomakkeen omilla tiedoillani.
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white py-3 px-6 rounded-full transition-all font-medium disabled:opacity-70"
                >
                  {isSubmitting ? "Lähetetään..." : "Lähetä irtisanomislomake"}
                </Button>
              </form>
            </Form>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Irtisanomislomake;