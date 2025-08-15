
import { ArrowRight, Bell, FileText, Shield, Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { memo, useState } from "react";
import { Link } from "react-router-dom";

const Hero = memo(() => {
  const isMobile = useIsMobile();

  // State for expanding/collapsing cards
  const [showPhishing, setShowPhishing] = useState(false);
  const [showShopping, setShowShopping] = useState(false);
  const [showApps, setShowApps] = useState(false);
  const [showCyberbullying, setShowCyberbullying] = useState(false);

  // State for modal content
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open modal with content
  const openModal = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
    setModalTitle("");
  };

  // Removed scroll transforms for better performance
  
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

  // Per-letter reading effect variants for the monitoring paragraph
  const readingStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  // Simple floating animation for the scam case blocks
  const floatingVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
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

  const letterFade = {
    hidden: { color: "rgb(55,65,81)" }, // gray-700
    visible: {
      color: "rgb(156,163,175)", // gray-400 (lighter but still readable)
      transition: { duration: 1.8, ease: "easeOut" }
    }
  };

  const monitoringText =
     "Valvomme automaattisesti Dark Webiä, sosiaalista mediaa ja tietovuototietokantoja, jotta tietosi pysyvät turvassa vuorokauden jokaisena hetkenä.";
  
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
    <>
      {/* Fixed background image for parallax effect */}
      <div className="fixed inset-0 w-full h-full z-0">
        <motion.img 
          src="/lovable-uploads/iStock-2222199654.jpg" 
          alt="Identity Protection - Secure Digital Life" 
          className={`w-full h-full object-cover ${isMobile ? 'object-right' : 'object-center'}`}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
      </div>

      <motion.div 
        className="relative w-full" 
        initial="hidden" 
        animate="visible" 
        variants={containerVariants}
        style={{ willChange: 'transform' }}
      >
        {/* Hero section with transparent background */}
        <motion.div 
          className="relative h-screen w-full flex items-center"
        >
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full" style={{ position: 'relative', zIndex: 20 }}>
            <motion.div className="w-full max-w-2xl text-left ml-8" variants={staggerContainer}>
              <motion.h1 className="banner-title text-white" variants={itemVariants}>
                Estä identiteettivarkaus ennen kuin se ehtii tapahtua.
              </motion.h1>
              <motion.p className="banner-subtitle text-white mt-4 sm:mt-6" variants={itemVariants}>
                Yksi helppo keino suojata sekä rahasi että yksityiset tietosi.
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
        </motion.div>
      
        <motion.div 
          className="relative w-full bg-gradient-to-b from-white via-blue-100 to-blue-900 py-16 pb-24"
          style={{ position: 'relative', zIndex: 10 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-24" variants={fadeInUpVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Pidä identiteettisi turvassa<br />
                edistyksellisin ratkaisuin
              </h2>
              <p className="text-lg text-gray-700 mb-16">
                OmaVerkkoturva tarjoaa kattavan suojan henkilötiedoillesi
              </p>
              
                             {/* Features section */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                 <div className="space-y-32">
                   <div className="text-left max-w-lg mt-16">
                     <div className="flex items-center space-x-3 mb-4">
                       <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
                         <Bell className="w-4 h-4 text-white" />
                       </div>
                       <h3 className="text-xl font-bold text-gray-900">
                         Reaaliaikainen hälytys
                       </h3>
                     </div>
                     <p className="text-gray-900 leading-relaxed">
                       Saat välittömän ilmoituksen, jos tietosi vuotavat verkkoon. Palvelu suojaa sähköpostisi, henkilötunnuksesi ja maksukorttitietosi sekä valvoo epäilyttäviä luotonhakuja ja osoitteenmuutoksia, jotka voivat viitata huijaukseen.
                     </p>
                   </div>
                   
                   <div className="text-left max-w-lg">
                     <div className="flex items-center space-x-3 mb-4">
                       <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
                         <FileText className="w-4 h-4 text-white" />
                       </div>
                       <h3 className="text-xl font-bold text-gray-900">
                         Saat ohjeet
                       </h3>
                     </div>
                     <p className="text-gray-900 leading-relaxed">
                       Jos riski havaitaan, saat heti selkeät ohjeet seuraaviin toimiin, kuten kortin sulkemiseen tai salasanan vaihtoon.
                     </p>
                   </div>
                   
                   <div className="text-left max-w-lg">
                     <div className="flex items-center space-x-3 mb-4">
                       <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
                         <Shield className="w-4 h-4 text-white" />
                       </div>
                       <h3 className="text-xl font-bold text-gray-900">
                         Vakuutus
                       </h3>
                     </div>
                     <p className="text-gray-900 leading-relaxed">
                       Kun identiteettisi joutuu vaaraan, tilanteen ratkaiseminen voi kestää viikkoja ja maksaa tuhansia euroja. Tuotteeseen sisältyvä vakuutus tuo mielenrauhaa myös pahimman sattuessa.
                     </p>
                   </div>
                   
                   <div className="text-left max-w-lg">
                     <div className="flex items-center space-x-3 mb-4">
                       <div className="w-8 h-8 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
                         <Clock className="w-4 h-4 text-white" />
                       </div>
                       <h3 className="text-xl font-bold text-gray-900">
                         Jatkuva valvonta
                       </h3>
                     </div>
                     <p className="text-gray-900 leading-relaxed">
                       Valvomme automaattisesti Dark Webiä, sosiaalista mediaa ja tietovuototietokantoja, jotta tietosi pysyvät turvassa vuorokauden jokaisena hetkenä.
                     </p>
                   </div>
                 </div>
                
                <div className="lg:flex lg:items-center lg:justify-center">
                  {/* Right side left empty for future images */}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>


        
        {/* Blue background section */}
        <div 
          className="relative w-full bg-gradient-to-b from-blue-900 via-blue-950 to-blue-900 py-32 pb-48"
          style={{ position: 'relative', zIndex: 10 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div>
              <h2 
                className="text-3xl md:text-4xl font-bold text-white mb-8"
              >
                Kokeile veloituksetta, ovatko tietosi vaarantuneet
              </h2>
              <p 
                className="text-lg text-white mb-12 max-w-2xl mx-auto"
              >
                Et jää yksin vahingon sattuessa. Autamme sinua sekä käytännössä että taloudellisesti.
              </p>
              <button 
                className="px-8 py-3 bg-white text-black rounded-md hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
              >
                Tutustu tuotteeseen
              </button>
            </div>
          </div>
        </div>
        
        {/* Case study cards section */}
        <div 
          className="relative w-full bg-white py-24"
          style={{ position: 'relative', zIndex: 10 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mb-16">
                                                       <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                              Tapauksia, joissa rahaa menetettiin<br />
                              huijauksessa
                            </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <motion.div
                className="bg-gradient-to-br from-blue-900/10 to-blue-800/20 p-8 rounded-2xl border border-blue-200/30 shadow-lg backdrop-blur-sm cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: [-4, 4, -4] 
                }}
                transition={{ 
                  opacity: { duration: 0.8, ease: "easeOut" },
                  y: { 
                    duration: 4, 
                    ease: "easeInOut", 
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  } 
                }}
                onClick={() => openModal("Tietojenkalastelu", "Nina sai aidolta näyttävän sähköpostin pankiltaan. Hän klikkasi viestissä ollutta linkkiä ja kirjautui sisään sivulle, joka olikin huijaussivusto. Tietojen avulla rikollinen otti hänen nimissään kolme pikavippiä (yhteensä 11 200€), vaihdatutti hänen postiosoitteensa sekä puhelinnumeronsa ja yritti avata verkkopankkitilejä ja maksukortteja. Palveluun sisältyvä vakuutus korvaa jopa 13 500 € taloudelliset menetykset ja asiantuntijat auttavat asian läpiviennissä.")}
              >
                               <div className="flex items-center space-x-4 mb-6">
                 <div className="w-8 h-8 bg-blue-900/80 rounded-lg flex items-center justify-center shadow-lg">
                   <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                   </svg>
                 </div>
                 <h3 className="text-2xl font-bold text-blue-900">Tietojenkalastelu</h3>
               </div>
              </motion.div>
              
              <motion.div
                className="bg-gradient-to-br from-blue-900/10 to-blue-800/20 p-8 rounded-2xl border border-blue-200/30 shadow-lg backdrop-blur-sm cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: [-4, 4, -4] 
                }}
                transition={{ 
                  opacity: { duration: 0.8, ease: "easeOut", delay: 0.2 },
                  y: { 
                    duration: 4, 
                    ease: "easeInOut", 
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  } 
                }}
                onClick={() => openModal("Verkkokauppahuijaus", "Timo löysi verkosta edullisen tarjouksen uusista kuulokkeista tunnetulta brändiltä. Hinta oli lähes puolet halvempi kuin muualla, ja verkkosivusto näytti aidolla. Logo, arvostelut ja maksutavat kaikki kunnossa. Hän maksoi 129 € pankkikortilla. Tilauksen jälkeen tuotetta ei koskaan saapunut ja verkkokauppa katosi muutamassa päivässä. Koska ostoksen hinta oli 50-700 € välillä, Timo saa rahansa takaisin verkkokauppahuijaukset kattavan vakuutuksen ansiosta.")}
              >
                               <div className="flex items-center space-x-4 mb-6">
                 <div className="w-8 h-8 bg-blue-900/80 rounded-lg flex items-center justify-center shadow-lg">
                   <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                   </svg>
                 </div>
                 <h3 className="text-2xl font-bold text-blue-900">Verkkokauppahuijaus</h3>
               </div>
              </motion.div>
              
              <motion.div
                className="bg-gradient-to-br from-blue-900/10 to-blue-800/20 p-8 rounded-2xl border border-blue-200/30 shadow-lg backdrop-blur-sm cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: [-4, 4, -4] 
                }}
                transition={{ 
                  opacity: { duration: 0.8, ease: "easeOut", delay: 0.4 },
                  y: { 
                    duration: 4, 
                    ease: "easeInOut", 
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  } 
                }}
                onClick={() => openModal("Sovellushankinnat", "Sannan 9-vuotias poika sai pelata hetken äidin puhelimella. Hän latasi vahingossa pelisovelluksen, joka näytti ilmaiselta mutta sisälsi kalliin 112 euron tilauksen. Maksu veloittui heti, koska maksukortti oli tallennettuna puhelimeen. Vakuutus korvaa kulut, jotka liittyvät alle 10-vuotiaan vahingossa tekemiin sovellusostoihin (alle 135 €) suurimmilla alustoilla, kuten mm. App Storessa, Google Playssa tai Steamissa.")}
              >
                               <div className="flex items-center space-x-4 mb-6">
                 <div className="w-8 h-8 bg-blue-900/80 rounded-lg flex items-center justify-center shadow-lg">
                   <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                   </svg>
                 </div>
                 <h3 className="text-2xl font-bold text-blue-900">Sovellushankinnat</h3>
               </div>
              </motion.div>
              
              <motion.div
                className="bg-gradient-to-br from-blue-900/10 to-blue-800/20 p-8 rounded-2xl border border-blue-200/30 shadow-lg backdrop-blur-sm cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: [-4, 4, -4] 
                }}
                transition={{ 
                  opacity: { duration: 0.8, ease: "easeOut", delay: 0.6 },
                  y: { 
                    duration: 4, 
                    ease: "easeInOut", 
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  } 
                }}
                onClick={() => openModal("Nettikiusaaminen", "Emilia joutui nettikiusaamisen kohteeksi sen jälkeen, kun hänen TikTok-videonsa levisi yllättäen laajalle. Tuntemattomat ihmiset alkoivat kommentoida videoita loukkaavasti ja joku perusti tekaistun tilin hänen nimellään ja profiilikuvallaan. Väärennetyllä tilillä julkaistiin sisältöä, joka sai Emilian näyttämään nololta. Hän saa asiantuntijoilta neuvoja ja apuja (25 h) sisällön poistoon ja tilien palautukseen. Tarvittaessa hänen käytössä on myös oikeudellinen tuki ja psykologinen kriisiapu.")}
              >
                               <div className="flex items-center space-x-4 mb-6">
                 <div className="w-8 h-8 bg-blue-900/80 rounded-lg flex items-center justify-center shadow-lg">
                   <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                   </svg>
                 </div>
                 <h3 className="text-2xl font-bold text-blue-900">Nettikiusaaminen</h3>
               </div>
              </motion.div>
            </div>
          </div>
        </div>

      {/* Pricing section */}
      <div 
        className="relative w-full bg-white/80 py-16"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header text - centered */}
          <div className="text-center max-w-4xl mx-auto mb-12 mt-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Valitse sinulle sopivin turva
            </h2>
            <p className="text-lg text-gray-700 mb-2">
              Valitse parhaiten sopiva suojaus.
            </p>
            <p className="text-sm text-gray-600">
              Jokaisessa tilauksessa on 14vrk maksuton peruutusoikeus.
            </p>
          </div>
          
          {/* Pricing cards - horizontal layout */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
              
              {/* Pricing card 1 */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 shadow-lg text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Henkilösuoja Yhdelle
                </h3>
                <div className="text-4xl font-bold text-gray-900 mb-6">
                  21,99 €/kk
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-start">
                    <span className="text-gray-700">• Tietojen monitorointi ja ilmoitus tietovuodoista</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700">• Vakuutus, joka turvaa sinut vahinkojen varalta</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700">• Apu ja tuki</span>
                  </li>
                </ul>
                <button className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                  Suojaa laite
                </button>
              </div>

              {/* Pricing card 2 */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 shadow-lg text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Henkilösuoja Tupla
                </h3>
                <div className="text-4xl font-bold text-gray-900 mb-6">
                  28,99 €/kk
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-start">
                    <span className="text-gray-700">• Tietojen monitorointi ja ilmoitus tietovuodoista sinulle sekä läheisellesi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700">• Vakuutus, joka turvaa sinut ja läheisesi vahinkojen varalta</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700">• Apu ja tuki</span>
                  </li>
                </ul>
                <button className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                  Suojaa laite
                </button>
              </div>

              {/* Pricing card 3 */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 shadow-lg text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Henkilösuoja Perhe
                </h3>
                <div className="text-4xl font-bold text-gray-900 mb-6">
                  32,99 €/kk
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-start">
                    <span className="text-gray-700">• Tietojen monitorointi ja ilmoitus tietovuodoista sinulle sekä koko perheellesi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700">• Vakuutus, joka turvaa sinut ja koko perheesi vahinkojen varalta</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-700">• Apu ja tuki</span>
                  </li>
                </ul>
                <button className="w-full bg-blue-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                  Suojaa laite
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Trial section */}
      <div 
        className="relative w-full bg-gradient-to-b from-white via-blue-50 to-blue-200 py-32"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Additional text section */}
          <div className="text-left max-w-2xl mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
              Voit myös kokeilla identiteettisuojaa ilman sitoumuksia
            </h2>
            <p className="text-base text-black leading-relaxed mb-6">
              Kokeiluversio sisältää henkilötietojen tarkastuksen sekä monipuoliset työkalut, joilla voit ehkäistä tietojesi väärinkäyttöä ja havaita mahdollisia uhkia ajoissa. Saat 30 päivän ilmaisen käyttöjakson, jonka aikana voit rauhassa tutustua palvelun hyötyihin ja varmistaa, että tietosi ovat turvassa.
            </p>
            {/* CTA Button */}
            <button className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-sm">
              Kokeile
              <ArrowRight className="ml-2 h-3 w-3 inline" />
            </button>
          </div>
        </div>
      </div>

      {/* Articles section */}
      <div 
        className="relative w-full bg-gray-50 py-16"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Artikkelit
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Article Card 1 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p className="text-sm">Kuva tulossa pian</p>
                </div>
              </div>
              <div className="p-6">
                <div className="inline-block bg-blue-100 text-blue-900 text-xs font-medium px-3 py-1 rounded-full mb-3">
                  Ajankohtaista
                </div>
                <h3 className="text-lg font-bold text-black mb-2">
                  Ajankohtaisia huijauksia (07/2025)
                </h3>
                <p className="text-sm text-gray-600">4.8.2025</p>
              </div>
            </div>
            
            {/* Article Card 2 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p className="text-sm">Kuva tulossa pian</p>
                </div>
              </div>
              <div className="p-6">
                <div className="inline-block bg-blue-100 text-blue-900 text-xs font-medium px-3 py-1 rounded-full mb-3">
                  Ajankohtaista
                </div>
                <h3 className="text-lg font-bold text-black mb-2">
                  Ajankohtaisia huijauksia (06/2025)
                </h3>
                <p className="text-sm text-gray-600">1.7.2025</p>
              </div>
            </div>
            
            {/* Article Card 3 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p className="text-sm">Kuva tulossa pian</p>
                </div>
              </div>
              <div className="p-6">
                <div className="inline-block bg-blue-900 text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
                  Artikkelit
                </div>
                <h3 className="text-lg font-bold text-black mb-2">
                  Sähköpostin tietoturvallinen käyttö
                </h3>
                <p className="text-sm text-gray-600">16.6.2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
        </motion.div>

      {/* Modal for displaying content */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-blue-900">{modalTitle}</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                ×
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{modalContent}</p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
});

Hero.displayName = 'Hero';

export default Hero;
