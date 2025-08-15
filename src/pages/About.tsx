
import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <PageLayout>
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            
            <motion.h1 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }} 
              className="text-4xl font-bold mb-36 text-center"
            >
              Keitä me olemme ja miksi OmaVerkkoturva syntyi?
            </motion.h1>
            
            <div className="prose prose-lg max-w-none">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5, delay: 0.2 }} 
                className="mb-36 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div className="flex justify-center lg:order-1">
                  <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-500">Kuva tulossa</span>
                  </div>
                </div>
                <div className="lg:order-2">
                  <h2 className="text-2xl font-bold mb-4">Ketkä me olemme?</h2>
                  <p className="text-gray-600 text-lg">
                    Olemme kaksi nuorta kaveria, Arttu Ruotsalainen ja Arttu Simanainen, ja olemme tehneet uraa tietoliikennepalveluiden parissa, jossa meille realisoitui kuinka paljon nettirikollisuutta oikeasti on. Näemme jatkuvasti, miten ihmiset joutuvat huijauksien ja identiteettivarkauksien uhreiksi, sekä halusimme tehdä asialle jotain konkreettista.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-36 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-4">Missiomme</h2>
                  <p className="text-gray-600 text-lg">
                    Meidän tavoite on yksinkertainen: haluamme tehdä suomalaisista turvattuja verkossa. Jokaisella tulisi olla suoja, joka estää identiteettivarkaudet ja auttaa silloin, kun jotain ikävää ehtii jo tapahtua.
                  </p>
                </div>
                                                  <div className="flex justify-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center text-white text-center p-4">
                      <div className="text-lg font-semibold">Kuvat tulossa</div>
                    </div>
                  </div>
                             </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }} 
                 animate={{ opacity: 1, y: 0 }} 
                 transition={{ duration: 0.6, delay: 0.4 }}
                 className="mb-36 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
               >
                                   <div className="flex justify-center lg:order-1">
                    <div className="w-48 h-48 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center text-white text-center p-4">
                      <div className="text-lg font-semibold">Kuvat tulossa</div>
                    </div>
                  </div>
                 <div className="lg:order-2">
                   <h2 className="text-2xl font-bold mb-4">Visiomme</h2>
                   <p className="text-gray-600 text-lg">
                     Haluamme, että jokainen suomalainen voi käyttää nettiä ilman jatkuvaa huolta siitä, mihin omat tiedot päätyvät. Me uskomme, että hyvä digitaalinen turva ei ole vain palomuureja ja salasanoja, vaan mielenrauhaa ja sitä, että jos jotain sattuukin, et jää yksin. Siksi rakennamme palvelua, joka tunnistaa uhat ajoissa, auttaa sinua toimimaan heti ja seisoo rinnallasi, jos vahinko ehtii tapahtua. Meidän unelma on, että verkossa liikkuminen olisi yhtä huoleton asia kuin kävely kotipihalla.
                   </p>
                 </div>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }} 
                 animate={{ opacity: 1, y: 0 }} 
                 transition={{ duration: 0.6, delay: 0.5 }}
                 className="mb-36"
               >
                 <h2 className="text-2xl font-bold mb-4">Mitä OmaVerkkoturva tekee?</h2>
                 <p className="text-gray-600 text-lg mb-4">
                   Tarjoamme palvelun, joka auttaa ennaltaehkäisemään identiteettivarkauksia ja reagoimaan nopeasti, jos jotain sattuu. Me ymmärrämme, että huijaukset kehittyvät jatkuvasti ja siksi kehitämme myös itseämme sekä teknologiaamme jatkuvasti mukana.
                 </p>
                 <p className="text-gray-600 text-lg">
                   Palveluumme sisältyy myös vakuutus, joka kattaa kyberrikollisuudesta aiheutuneita taloudellisia menetyksiä. Näin voit liikkua verkossa varmemmin ja tiedät, että sinulla on selusta turvattu.
                 </p>
               </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-36 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-4">Tuki ja turva - aina läsnä</h2>
                  <p className="text-gray-600 text-lg">
                    Osaamisemme ei rajoitu pelkästään tietoturvaan, vaan haluamme olla tukena myös kaikissa tietoliikenteeseen liittyvissä kysymyksissä ja haasteissa, sillä kyse on kokonaisuudessaan laajasta ja toisiinsa linkittyvästä kentästä.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Kuva tulossa</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-4">Turvallinen verkko kuuluu kaikille</h2>
                <p className="text-gray-600 text-lg">
                  Verkkorikollisuus kasvaa koko ajan, mutta niin kasvaa myös tietoisuus. Me haluamme olla mukana rakentamassa Suomea, jossa jokainen voi tuntea olonsa turvalliseksi netissä - iästä, taustasta tai teknisestä osaamisesta riippumatta.
                </p>
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
