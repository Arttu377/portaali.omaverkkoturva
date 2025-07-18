import { ArrowRight, Code, Cpu, Layers, MessageSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const isMobile = useIsMobile();
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.8
      }
    }
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };
  
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  return <motion.div className="relative w-full" initial="hidden" animate="visible" variants={containerVariants}>
      <div className="banner-container bg-black relative overflow-hidden h-screen w-full">
        <div className="absolute inset-0 bg-black w-full">
          <img 
            src="/lovable-uploads/8e39c5ba-0ce6-4338-9dbb-3c3c9b33cbb7.png" 
            alt="Identity Protection - Secure Digital Life" 
            className={`w-full h-full object-cover ${isMobile ? 'object-right' : 'object-center'}`} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-white"></div>
        </div>
        
        <div className="banner-overlay bg-transparent pt-8 sm:pt-12 md:pt-16 w-full">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full">
            <motion.div className="w-full max-w-2xl text-left ml-8" variants={itemVariants}>
              <motion.h1 className="banner-title text-white" variants={itemVariants}>Estä identiteettivarkaus ennen kuin se ehtii tapahtua.</motion.h1>
              <motion.p className="banner-subtitle text-white mt-4 sm:mt-6" variants={itemVariants}>
                Suojaa rahasi ja henkilötietosi helposti yhdellä ratkaisulla.
              </motion.p>
              <motion.div className="flex justify-start mt-6 sm:mt-8" variants={itemVariants}>
                <button 
                  className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-md hover:from-blue-800 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/20 flex items-center justify-center group text-sm sm:text-base font-medium"
                  onClick={e => {
                    e.preventDefault();
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                      projectsSection.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  Tutustu tästä
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 w-full bg-gradient-to-b from-white via-blue-200 to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Suojaa identiteettisi modernilla teknologialla
            </h2>
            <p className="text-lg text-gray-700">
              OmaVerkkoturva tarjoaa kattavan suojan henkilötiedoillesi
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <motion.div 
                className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm" 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Reaaliaikainen hälytys</h3>
                    <p className="text-gray-700 mb-2">Saat ilmoituksen heti, jos tietosi vuotavat verkkoon</p>
                    <p className="text-gray-700 mb-2">Palvelu suojaa sähköpostisi, henkilötunnuksesi tai maksukorttitietosi.</p>
                    <p className="text-gray-700">Valvomme epäilyttävää luotonhakua tai osoitteenmuutoksia, jotka voivat olla merkki huijauksesta.</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm" 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Saat ohjeet, mitä tehdä</h3>
                    <p className="text-gray-700">Jos riski löytyy, saat heti selkeät toimintaohjeet (esim. kortin sulkeminen tai salasanan vaihto)</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white/70 backdrop-blur-sm p-6 rounded-lg shadow-sm" 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Vakuutusturva</h3>
                    <p className="text-gray-700 mb-2">Vakuutus jopa 13 500 euroon asti</p>
                    <p className="text-gray-700">Kun identiteetti joutuu vaaraan, tilanteen hoitaminen voi viedä viikkoja ja maksaa tuhansia euroja. OmaVerkkoturvan vakuutus antaa mielenrauhaa silloinkin, kun pahin tapahtuu</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-sm" 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Jatkuva valvonta</h3>
                    <p className="text-gray-700 mb-2">Valvonta toimii ympäri vuorokauden</p>
                    <p className="text-gray-700">Valvomme pimeää verkkoa (Dark Web), sosiaalista mediaa ja tietovuototietokantoja automaattisesti</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:flex lg:items-center lg:justify-center">
              {/* Right side left empty for future content */}
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 w-full bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Kokeile veloituksetta, ovatko tietosi vaarantuneet
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Et jää yksin vahingon sattuessa. Autamme sinua sekä käytännössä että taloudellisesti.
            </p>
            <button 
              className="px-8 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-md hover:from-blue-800 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/20 font-medium"
            >
              Tutustu tuotteeseen
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>;
};

export default Hero;
