
import { ArrowRight, Code, Cpu, Layers, MessageSquare, Package } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { memo } from "react";
import { Link } from "react-router-dom";

const Hero = memo(() => {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();
  
  // Simplified scroll transforms for better performance
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  
  // Simplified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        duration: 0.8,
        ease: "easeOut"
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeInUpVariants = {
    hidden: { 
      opacity: 0, 
      y: 40
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
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
  
  return (
    <motion.div 
      className="relative w-full" 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      style={{ willChange: 'transform' }}
    >
      <motion.div 
        className="banner-container bg-black relative overflow-hidden h-screen w-full"
        style={{ y: heroY, opacity: heroOpacity, willChange: 'transform' }}
      >
        <div className="absolute inset-0 bg-black w-full">
          <motion.img 
            src="/lovable-uploads/8e39c5ba-0ce6-4338-9dbb-3c3c9b33cbb7.png" 
            alt="Identity Protection - Secure Digital Life" 
            className={`w-full h-full object-cover ${isMobile ? 'object-right' : 'object-center'}`}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-white"></div>
        </div>
        
        <div className="banner-overlay bg-transparent pt-8 sm:pt-12 md:pt-16 w-full">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full">
            <motion.div className="w-full max-w-2xl text-left ml-8" variants={staggerContainer}>
              <motion.h1 className="banner-title text-white" variants={itemVariants}>
                Estä identiteettivarkaus ennen kuin se ehtii tapahtua.
              </motion.h1>
              <motion.p className="banner-subtitle text-white mt-4 sm:mt-6" variants={itemVariants}>
                Suojaa rahasi ja henkilötietosi helposti yhdellä ratkaisulla.
              </motion.p>
              <motion.div className="flex justify-start mt-6 sm:mt-8" variants={itemVariants}>
                <motion.button 
                  className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-md hover:from-blue-800 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group text-sm sm:text-base font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="relative z-10 w-full bg-gradient-to-b from-white via-blue-200 to-blue-900 py-16 pb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" variants={fadeInUpVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Suojaa identiteettisi modernilla teknologialla
            </h2>
            <p className="text-lg text-gray-700">
              OmaVerkkoturva tarjoaa kattavan suojan henkilötiedoillesi
            </p>
          </motion.div>
          
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8" variants={staggerContainer}>
            <div className="space-y-8">
              <motion.div 
                className="bg-white/90 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300" 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
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
                className="bg-white/80 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300" 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
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
                className="bg-white/70 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300" 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
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
                className="bg-white/60 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300" 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
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
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        className="relative z-10 w-full bg-gradient-to-b from-blue-900 via-blue-950 to-blue-900 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUpVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeInUpVariants}>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Kokeile veloituksetta, ovatko tietosi vaarantuneet
            </motion.h2>
            <motion.p 
              className="text-lg text-white mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              Et jää yksin vahingon sattuessa. Autamme sinua sekä käytännössä että taloudellisesti.
            </motion.p>
            <motion.button 
              className="px-8 py-3 bg-white text-black rounded-md hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Tutustu tuotteeseen
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        className="relative z-10 w-full bg-gradient-to-b from-blue-900 to-white py-16 pt-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" variants={fadeInUpVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tuntemattomasta numerosta saapuvaan puheluun ei voi aina luottaa
            </h2>
            <p className="text-lg text-white/90">
              Puheturva tekee puheluihin vastaamisesta turvallista
            </p>
          </motion.div>
          
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8" variants={staggerContainer}>
            <div className="space-y-8">
              <motion.div 
                className="bg-white/90 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300" 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Reaaliaikainen ilmoitus</h3>
                    <p className="text-gray-700 mb-2">Saat ilmoituksen heti, kun epäilyttävä soitto havaitaan</p>
                    <p className="text-gray-700 mb-2">OmaPuheturva tunnistaa puhelut, jotka voivat liittyä huijauksiin, puhelinmyyntiin tai muuhun epätoivottuun toimintaan.</p>
                    <p className="text-gray-700">Saat hälytyksen heti, kun riski havaitaan ja ennen kuin vastaat puheluun.</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white/80 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300" 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Itseoppiva suoja</h3>
                    <p className="text-gray-700 mb-2">Parviäly tunnistaa uhkia ja oppii jokaisesta soitosta</p>
                    <p className="text-gray-700 mb-2">Palvelu hyödyntää tekoälyä ja yhteisön palautetta suojatakseen käyttäjää entistä paremmin.</p>
                    <p className="text-gray-700">Mitä enemmän käyttäjät raportoivat haitallisia puheluja, sitä älykkäämmäksi ja tarkemmaksi järjestelmä kehittyy.</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white/70 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300" 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Jatkuva puheluliikenteen valvonta</h3>
                    <p className="text-gray-700 mb-2">Valvonta toimii taustalla 24/7 – et huomaa sitä ennen kuin sitä tarvitaan</p>
                    <p className="text-gray-700 mb-2">Palvelu analysoi tulevat puhelut jatkuvasti.</p>
                    <p className="text-gray-700">Se vertaa niitä tunnettuihin huijausnumeroihin, epäilyttäviin puhelumalleihin ja käyttäjäyhteisön palautteeseen. Näin sinä voit käyttää puhelintasi rauhassa ilman huolta.</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:flex lg:items-center lg:justify-center">
              {/* Right side left empty for future content */}
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div 
        className="relative z-10 w-full bg-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUpVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeInUpVariants}>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-black mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Kokeile kuukausi ilmaiseksi ilman sitoutumista
            </motion.h2>
            <motion.p 
              className="text-lg text-black mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              Tilauksesi peruuntuu automaattisesti kuukauden jälkeen
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <Link to="/verkkokauppa">
                <motion.button 
                  className="px-8 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-md hover:from-blue-800 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Aloita suojaaminen
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
});

Hero.displayName = 'Hero';

export default Hero;
