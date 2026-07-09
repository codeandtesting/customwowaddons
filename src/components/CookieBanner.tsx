"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const [preferences, setPreferences] = useState({
    necessary: true, // always true
    functional: false,
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    // Check if consent has been given previously
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      // Small delay to ensure smooth entry
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      try {
        setPreferences(JSON.parse(consent));
      } catch (e) {
        console.error("Could not parse cookie consent", e);
      }
    }
  }, []);

  const acceptAll = () => {
    const allOn = {
      necessary: true,
      functional: true,
      analytics: true,
      advertising: true,
    };
    setPreferences(allOn);
    saveConsent(allOn);
  };

  const rejectAll = () => {
    const allOff = {
      necessary: true,
      functional: false,
      analytics: false,
      advertising: false,
    };
    setPreferences(allOff);
    saveConsent(allOff);
  };

  const savePreferences = () => {
    saveConsent(preferences);
  };

  const saveConsent = (prefs: any) => {
    localStorage.setItem("cookie_consent", JSON.stringify(prefs));
    setShowBanner(false);
    setShowModal(false);
  };

  const togglePref = (key: keyof typeof preferences) => {
    if (key === "necessary") return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && !showModal && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 w-full z-50 p-4 border-t border-grid-border bg-[#0B0A0D]/95 backdrop-blur-md shadow-2xl"
          >
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-bone-white/80 text-sm md:text-base font-body max-w-3xl">
                We use cookies to improve website performance and ensure you get the best experience.
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setShowModal(true)}
                  className="px-6 py-2 border border-white/20 text-bone-white hover:bg-white/10 font-label text-sm uppercase tracking-widest transition-colors w-full sm:w-auto"
                >
                  Customize
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-2 bg-bone-white text-obsidian font-label text-sm font-bold uppercase tracking-widest hover:bg-bone-white/90 transition-colors w-full sm:w-auto"
                >
                  Accept
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => {
                if (showBanner) setShowModal(false);
              }}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-bone-white rounded-none shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-obsidian/20"
            >
              <div className="p-6 md:p-8 flex-1 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-obsidian font-headline text-2xl md:text-3xl font-black uppercase tracking-tighter">
                    Cookie & Privacy Settings
                  </h2>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="text-obsidian/50 hover:text-obsidian transition-colors"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                
                <p className="text-obsidian/70 font-body text-sm leading-relaxed mb-6">
                  We use cookies for various purposes to improve your online experience on our platform. 
                  You can withdraw consent anytime via 'Manage cookies'.
                </p>

                <div className="flex gap-3 mb-8">
                  <button
                    onClick={rejectAll}
                    className="flex-1 py-3 border border-obsidian text-obsidian font-label text-sm font-bold uppercase tracking-widest hover:bg-obsidian/5 transition-colors"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={acceptAll}
                    className="flex-1 py-3 bg-obsidian text-bone-white font-label text-sm font-bold uppercase tracking-widest hover:bg-obsidian/90 transition-colors"
                  >
                    Accept All
                  </button>
                </div>

                <h3 className="text-obsidian font-headline text-lg font-bold mb-4">Change my preferences</h3>
                
                <div className="space-y-6">
                  {/* Necessary */}
                  <div className="flex flex-col gap-2 pb-6 border-b border-obsidian/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-obsidian/50 text-xl font-light">+</span>
                        <h4 className="text-obsidian font-label font-bold">Necessary cookies</h4>
                        <span className="text-obsidian/40 text-[10px] uppercase tracking-wider font-mono">(Always Active)</span>
                      </div>
                      {/* Fake disabled toggle */}
                      <div className="w-12 h-6 bg-obsidian/40 rounded-full relative">
                        <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full shadow" />
                      </div>
                    </div>
                    <p className="text-obsidian/60 text-xs font-body pl-6">
                      Essential for the website to function. These cannot be disabled.
                    </p>
                  </div>

                  {/* Functional */}
                  <div className="flex flex-col gap-2 pb-6 border-b border-obsidian/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-obsidian/50 text-xl font-light">+</span>
                        <h4 className="text-obsidian font-label font-bold">Functional cookies</h4>
                      </div>
                      <button 
                        onClick={() => togglePref('functional')}
                        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${preferences.functional ? 'bg-gold-accent' : 'bg-obsidian/20'}`}
                      >
                        <motion.div 
                          className="absolute top-1 bg-white w-4 h-4 rounded-full shadow"
                          animate={{ left: preferences.functional ? 'calc(100% - 20px)' : '4px' }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>
                    <p className="text-obsidian/60 text-xs font-body pl-6">
                      Enable personalized features like remembering your preferences and settings.
                    </p>
                  </div>

                  {/* Analytics */}
                  <div className="flex flex-col gap-2 pb-6 border-b border-obsidian/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-obsidian/50 text-xl font-light">+</span>
                        <h4 className="text-obsidian font-label font-bold">Analytics cookies</h4>
                      </div>
                      <button 
                        onClick={() => togglePref('analytics')}
                        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${preferences.analytics ? 'bg-gold-accent' : 'bg-obsidian/20'}`}
                      >
                        <motion.div 
                          className="absolute top-1 bg-white w-4 h-4 rounded-full shadow"
                          animate={{ left: preferences.analytics ? 'calc(100% - 20px)' : '4px' }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>
                    <p className="text-obsidian/60 text-xs font-body pl-6">
                      Help us understand how visitors interact with our website to improve performance.
                    </p>
                  </div>

                  {/* Advertising */}
                  <div className="flex flex-col gap-2 pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-obsidian/50 text-xl font-light">+</span>
                        <h4 className="text-obsidian font-label font-bold">Advertising cookies</h4>
                      </div>
                      <button 
                        onClick={() => togglePref('advertising')}
                        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${preferences.advertising ? 'bg-gold-accent' : 'bg-obsidian/20'}`}
                      >
                        <motion.div 
                          className="absolute top-1 bg-white w-4 h-4 rounded-full shadow"
                          animate={{ left: preferences.advertising ? 'calc(100% - 20px)' : '4px' }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>
                    <p className="text-obsidian/60 text-xs font-body pl-6">
                      Used to deliver relevant ads and track campaign performance across platforms.
                    </p>
                  </div>

                </div>
              </div>

              {/* Bottom Sticky Action */}
              <div className="p-6 bg-bone-white border-t border-obsidian/10">
                <button
                  onClick={savePreferences}
                  className="w-full py-4 bg-obsidian text-bone-white font-label text-sm font-bold uppercase tracking-widest hover:bg-obsidian/90 transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
