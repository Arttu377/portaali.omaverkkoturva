import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import emailjs from 'emailjs-com';

// Updated schema with new fields matching the form
const formSchema = z.object({
  subject: z.string().min(1, 'Valitse yhteydenoton aihe'),
  name: z.string().min(2, 'Nimi on pakollinen'),
  phone: z.string().min(5, 'Puhelinnumero on pakollinen'),
  email: z.string().email('Syötä kelvollinen sähköpostiosoite'),
  message: z.string().min(10, 'Viesti on liian lyhyt'),
  privacy: z.boolean().refine(val => val === true, 'Hyväksy henkilötietojenkäsittely'),
  honeypot: z.string().max(0, 'Bot detected'),
  timestamp: z.number()
});

type FormValues = z.infer<typeof formSchema>;

// EmailJS configuration
const EMAILJS_SERVICE_ID = "service_i3h66xg";
const EMAILJS_TEMPLATE_ID = "template_fgq53nh";
const EMAILJS_PUBLIC_KEY = "wQmcZvoOqTAhGnRZ3";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStartTime] = useState<number>(Date.now());
  const navigate = useNavigate();
  
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: '',
      name: '',
      phone: '',
      email: '',
      message: '',
      privacy: false,
      honeypot: '',
      timestamp: formStartTime
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Bot checks
      if (data.honeypot) {
        toast({
          title: "Virhe",
          description: "Lomakkeen lähetyksessä tapahtui virhe. Yritä uudelleen.",
          variant: "destructive"
        });
        return;
      }
      
      const timeDiff = Date.now() - data.timestamp;
      if (timeDiff < 3000) {
        toast({
          title: "Virhe",
          description: "Tarkista viestisi ennen lähettämistä.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      const { honeypot, timestamp, privacy, ...emailData } = data;
      
      const templateParams = {
        subject: emailData.subject,
        from_name: emailData.name,
        phone: emailData.phone,
        from_email: emailData.email,
        message: emailData.message,
        to_name: 'OmaVerkkoturva Team',
        reply_to: emailData.email
      };
      
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      toast({
        title: "Viesti lähetetty!",
        description: "Otamme sinuun yhteyttä pian.",
        variant: "default"
      });

      form.reset({
        subject: '',
        name: '',
        phone: '',
        email: '',
        message: '',
        privacy: false,
        honeypot: '',
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error sending email:', error);
      
      toast({
        title: "Virhe",
        description: "Viestin lähetyksessä tapahtui virhe. Yritä myöhemmin uudelleen.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Contact info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">Ota yhteyttä</h1>
              
              <div className="mb-8">
                <a 
                  href="mailto:info@omaverkkoturva.fi" 
                  className="text-xl text-blue-600 hover:underline font-medium"
                >
                  info@omaverkkoturva.fi
                </a>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  Pyrimme aina vastaamaan 1-2 arkipäivän sisällä. Asiakkaanamme olet oikeutettu nopeaan sekä veloituksettomaan apuun ja tukeen.
                </p>
              </div>
              
              <p className="text-sm text-gray-600 mt-6">
                <strong>HUOM:</strong> Irtisanomiset käsitellään vain puhelimitse tai irtisanomislomakkeella. Linkin irtisanomislomakkeelle siirtymiseen löydätte alta.
              </p>
              
              <button className="mt-6 px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors">
                Irtisanomislomake
              </button>
              
              <div className="mt-8 flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-600" />
                <div>
                  <a 
                    href="tel:010annamunolla" 
                    className="text-xl font-medium text-gray-900 underline hover:no-underline"
                  >
                    010annamunolla
                  </a>
                  <p className="text-sm text-gray-600">
                    Asiakaspalvelumme palvelee puhelimitse jokaisena arkipäivänä klo. 10:00-16:00. Puhelun hinta: mpm/pvm
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Irtisanomislomake nappi */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Haluatko irtisanoa palvelun?</h3>
            <button 
              onClick={() => navigate('/irtisanomislomake')}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors font-medium"
            >
              Siirry irtisanomislomakkeeseen
            </button>
          </div>

          {/* Right side - Contact form */}
          <div className="bg-blue-900 rounded-lg p-8 text-white">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField 
                  control={form.control} 
                  name="subject" 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">Yhteydenoton aihe *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white text-gray-900">
                            <SelectValue placeholder="Valitse aihe" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tuki">Tuki ja apu</SelectItem>
                          <SelectItem value="laskutus">Laskutus</SelectItem>
                          <SelectItem value="tekninen">Tekninen ongelma</SelectItem>
                          <SelectItem value="muu">Muu aihe</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField 
                  control={form.control} 
                  name="name" 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">Etu- ja sukunimi *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Etu- ja sukunimi" 
                          className="bg-white text-gray-900 placeholder-gray-500"
                          {...field} 
                        />
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
                      <FormLabel className="text-white font-medium">Puhelinnumero *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="044 123 4567" 
                          className="bg-white text-gray-900 placeholder-gray-500"
                          {...field} 
                        />
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
                      <FormLabel className="text-white font-medium">Sähköpostiosoite *</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="esimerkki@esimerkki.fi" 
                          className="bg-white text-gray-900 placeholder-gray-500"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField 
                  control={form.control} 
                  name="message" 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-medium">Viesti *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Kerro lisätietoja yhteydenottosi liittyen" 
                          className="min-h-[120px] bg-white text-gray-900 placeholder-gray-500 resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="privacy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="bg-white"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-white">
                          Lähettämällä tämän lomakkeen vakuutan, että antamani tiedot ovat oikeita. Lisäksi hyväksyn henkilötietojeni käsittelyn OmaVerkkoturvan{' '}
                          <a href="/tietosuojaseloste" className="underline hover:no-underline">
                            tietosuojaselosteen
                          </a>{' '}
                          mukaisesti.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                {/* Honeypot field */}
                <FormField 
                  control={form.control} 
                  name="honeypot" 
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input {...field} tabIndex={-1} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {/* Hidden timestamp field */}
                <FormField 
                  control={form.control} 
                  name="timestamp" 
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input type="hidden" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full bg-white hover:bg-gray-100 text-black py-3 px-6 rounded-full transition-colors font-medium disabled:opacity-70"
                >
                  {isSubmitting ? "Lähetetään..." : "Lähetä yhteydenotto"}
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;