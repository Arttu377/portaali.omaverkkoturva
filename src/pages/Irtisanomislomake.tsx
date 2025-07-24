import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
      // Here you would normally send the data to your backend
      console.log('Irtisanomislomake data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Irtisanomislomake lähetetty",
        description: "Kiitos irtisanomislomakkeestasi. Käsittelemme sen mahdollisimman pian.",
      });
      
      form.reset();
    } catch (error) {
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
        <div className="max-w-2xl mx-auto">
          {/* Kiitosteksti */}
          <div className="mb-8 text-center">
            <p className="text-gray-700 leading-relaxed mb-4">
              Kiitos, että olet ollut mukana turvaamassa verkkoarjessa kanssamme.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Arvostamme sitä, että valitsit OmaVerkkoturvan suojaamaan digitaalisia tietojasi ja identiteettiäsi. Jokainen asiakas on meille tärkeä, ja olemme kiitollisia luottamuksesta, jonka olet meille antanut.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ymmärrämme, että elämäntilanteet ja tarpeet voivat muuttua. Jos päätät lopettaa palvelun, toivomme, että kokemuksesi on ollut hyödyllinen ja että tarjoamamme turva on tuonut sinulle mielenrauhaa verkossa liikkuessasi.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Jos mielessäsi on kysyttävää irtisanomiseen tai tietoturvaan liittyen, asiakastukemme auttaa mielellään. Ja mikäli joskus tulevaisuudessa haluat palata asiakkaaksemme, toivotamme sinut lämpimästi tervetulleeksi takaisin.
            </p>
          </div>
          
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
      </section>
    </PageLayout>
  );
};

export default Irtisanomislomake;