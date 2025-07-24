
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
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            
            <motion.h1 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }} 
              className="text-4xl font-bold mb-6"
            >
              Keitä me olemme ja miksi OmaVerkkoturva syntyi?
            </motion.h1>
            
            <div className="prose prose-lg max-w-none">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5, delay: 0.2 }} 
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-4">Missiomme</h2>
                <p className="text-gray-600 text-lg">
                  Meidän tavoite on yksinkertainen: haluamme tehdä suomalaisista turvattuja verkossa. Jokaisella tulisi olla suoja, joka estää identiteettivarkaudet ja auttaa silloin, kun jotain ikävää ehtii jo tapahtua.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-4">Ketkä me olemme?</h2>
                <p className="text-gray-600 text-lg">
                  Olemme kaksi nuorta kaveria, Arttu Ruotsalainen ja Arttu Simanainen, ja perimmäinen syymme OmaVerkkoturvan perustamiseen oli turhautuminen kasvavaan verkkorikollisuuteen. Näemme jatkuvasti, miten ihmiset joutuvat huijauksien ja identiteettivarkauksien uhreiksi, sekä halusimme tehdä asialle jotain konkreettista.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-12"
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
                className="mb-12"
              >
                <h2 className="text-2xl font-bold mb-4">Tuki ja turva - aina läsnä</h2>
                <p className="text-gray-600 text-lg">
                  Me emme ole pelkkä työkalu. Me olemme myös tukitiimi, joka vastaa tietoturvaan ja tietoliikenteeseen liittyviin kysymyksiin ilman turhaa teknistä jargonia. Halusitpa tietää, miten suojautua huijauksilta tai mikä on turvallinen netin käyttö lapsille, olemme täällä auttamassa.
                </p>
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
            
            <div className="mt-16 pt-8 border-t border-gray-200">
              <Link to="/careers" className="inline-flex items-center px-5 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all group">
                Join Our Team
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
