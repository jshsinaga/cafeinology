import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CoffeeSpeciesSection } from './components/CoffeeSpeciesSection';
import { CaffeineEffectsSection } from './components/CaffeineEffectsSection';
import { CaffeineConverterSection } from './components/CaffeineConverterSection';
import { CaffeineSimulatorSection } from './components/CaffeineSimulatorSection';
import { CoffeeQuizSection } from './components/CoffeeQuizSection';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { COFFEE_SPECIES } from './data/coffeeData';
import { 
  ShieldCheck, 
  Lightning, 
  Clock, 
  ArrowDown, 
  BookOpen, 
  Scales, 
  Heartbeat 
} from '@phosphor-icons/react';
import { motion } from 'motion/react';

export function App() {
  const { t } = useTranslation();
  const [activeSpeciesId, setActiveSpeciesId] = useState<string>('arabica');
  const [userCalculatedCaffeine, setUserCalculatedCaffeine] = useState<number>(180);

  return (
    <div className="min-h-[100dvh] bg-[#F9F6F0] text-[#3A3532] flex flex-col selection:bg-[#C88242]/20 selection:text-[#1B0F0A]">
      {/* Refined Glass Navbar Header */}
      <header className="sticky top-0 z-50 bg-[#F9F6F0]/80 backdrop-blur-xl border-b border-[#E3DCD2]/80 transition-all">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group cursor-pointer shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#2B1810] text-[#F9F6F0] flex items-center justify-center shadow-xs group-hover:bg-[#1B0F0A] transition-all duration-200">
              <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
                <path d="M8 12h12v7a5 5 0 01-5 5h-2a5 5 0 01-5-5v-7zm12 2h2a2 2 0 012 2v1a2 2 0 01-2 2h-2v-5z" stroke="#E5A96A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11 7c0 1.5-1 2-1 3m4-3c0 1.5-1 2-1 3m4-3c0 1.5-1 2-1 3" stroke="#C88242" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-[#1B0F0A] whitespace-nowrap">
              {t('nav.brand')}
            </span>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold text-[#6E6862] shrink-0">
            <a href="#species" className="hover:text-[#2B1810] transition-colors py-1 whitespace-nowrap">{t('nav.species')}</a>
            <a href="#effects" className="hover:text-[#2B1810] transition-colors py-1 whitespace-nowrap">{t('nav.effects')}</a>
            <a href="#converter" className="hover:text-[#2B1810] transition-colors py-1 whitespace-nowrap">{t('nav.converter')}</a>
            <a href="#simulator" className="hover:text-[#2B1810] transition-colors py-1 whitespace-nowrap">{t('nav.simulator')}</a>
            <a href="#education" className="hover:text-[#2B1810] transition-colors py-1 whitespace-nowrap">{t('nav.quiz')}</a>
          </nav>

          {/* Single-line Action CTA & Language Switcher */}
          <div className="flex items-center gap-2.5 shrink-0">
            <LanguageSwitcher />
            <a
              href="#converter"
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#2B1810] hover:bg-[#1B0F0A] text-[#F9F6F0] font-semibold text-xs transition-all shadow-xs flex items-center gap-2 cursor-pointer active:scale-[0.96] whitespace-nowrap"
            >
              <Lightning size={14} weight="bold" className="text-[#C88242] shrink-0" />
              <span className="whitespace-nowrap">{t('nav.calculateBtn')}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Redesigned Centered Out-of-the-Box Hero Section */}
      <section className="relative pt-10 sm:pt-14 pb-20 sm:pb-28 px-6 sm:px-10 lg:px-12 w-full overflow-hidden">
        {/* Full-Bleed Ambient Dynamic Background & Science Grid */}
        <div className="absolute inset-0 bg-grid-scientific pointer-events-none" />
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

        {/* Minimalist Floating Botanical & Chemical Callouts */}
        
        {/* Left Floating Card */}
        <div className="hidden xl:block absolute top-12 left-28 2xl:left-48 z-20 animate-float-card-1 pointer-events-none">
          <div className="p-4 bg-[#FFFFFF]/80 backdrop-blur-md shadow-xs space-y-2.5 max-w-[240px] text-left border-l-2 border-l-[#C88242]">
            <div className="flex items-center justify-between">
              <span className="text-[9.5px] tracking-widest uppercase text-[#C88242] font-mono font-bold">{t('hero.badgeLeftTag')}</span>
              <span className="text-[9.5px] font-mono text-[#6E6862]">{t('hero.badgeLeftSub')}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-serif text-[#1B0F0A] font-normal tracking-tight">C₈H₁₀N₄O₂</span>
              <span className="text-[10px] text-[#6E6862] font-sans">{t('hero.badgeLeftSub')}</span>
            </div>
            <p className="text-[11px] text-[#6E6862] leading-snug">
              {t('hero.badgeLeftDesc')}
            </p>
          </div>
        </div>

        {/* Right Floating Card */}
        <div className="hidden xl:block absolute top-16 right-28 2xl:right-48 z-20 animate-float-card-2 pointer-events-none">
          <div className="p-4 bg-[#FFFFFF]/80 backdrop-blur-md shadow-xs space-y-2.5 max-w-[240px] text-left border-r-2 border-r-[#4A6B53]">
            <div className="flex items-center justify-between">
              <span className="text-[9.5px] tracking-widest uppercase text-[#4A6B53] font-mono font-bold">{t('hero.badgeRightTag')}</span>
              <span className="text-[9.5px] font-mono text-[#4A6B53] font-bold">{t('hero.badgeRightSub')}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-serif text-[#1B0F0A] font-normal tracking-tight">{t('hero.badgeRightVal')}</span>
              <span className="text-[10px] text-[#C88242] font-bold font-mono">{t('hero.badgeRightPeak')}</span>
            </div>
            <p className="text-[11px] text-[#6E6862] leading-snug">
              {t('hero.badgeRightDesc')}
            </p>
          </div>
        </div>

        {/* Centered Main Hero Container */}
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8 sm:space-y-10 pt-2 sm:pt-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 max-w-2xl mx-auto"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-serif font-normal text-[#1B0F0A] tracking-tight leading-[1.12]">
              {t('hero.titleMain')} <br />
              <span className="italic font-serif text-[#C88242] underline decoration-[#C88242]/30 underline-offset-8">
                {t('hero.titleAccent')}
              </span>{' '}
              {t('hero.titleEnd')}
            </h1>

            <p className="text-[#6E6862] text-sm sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed font-normal pt-1">
              {t('hero.subtitle')}
            </p>
          </motion.div>

          {/* High-Impact Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <a
              href="#simulator"
              className="group relative px-7 py-4 rounded-xl bg-[#2B1810] hover:bg-[#1B0F0A] text-[#F9F6F0] font-medium text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-3 cursor-pointer active:scale-[0.96] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <Clock size={18} weight="bold" className="text-[#C88242] group-hover:rotate-12 transition-transform duration-200" />
              <span className="font-semibold">{t('hero.ctaSchedule')}</span>
              <ArrowDown size={16} weight="bold" className="text-[#C88242] group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#converter"
              className="px-7 py-4 rounded-xl bg-[#FFFFFF] hover:bg-[#F9F6F0] text-[#2B1810] border-2 border-[#E3DCD2] hover:border-[#C88242] font-semibold text-sm sm:text-base transition-all duration-200 shadow-xs flex items-center gap-2.5 cursor-pointer active:scale-[0.96]"
            >
              <Scales size={18} weight="bold" className="text-[#C88242]" />
              <span>{t('hero.ctaConverter')}</span>
            </a>
          </motion.div>

          {/* Unified Clean Specimen & Key Insights Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 sm:mt-16 bg-[#FFFFFF] rounded-2xl border border-[#E3DCD2] p-6 sm:p-8 lg:p-10 shadow-sm text-left relative overflow-hidden space-y-8"
          >
            {/* Top Row: Photo + Elimination Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Photo Specimen */}
              <div className="lg:col-span-5 relative h-56 sm:h-64 rounded-xl overflow-hidden border border-[#E3DCD2] group bg-[#F9F6F0]">
                <img
                  src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80"
                  alt="Seduhan kopi espresso standar"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B0F0A]/90 via-[#1B0F0A]/30 to-transparent flex flex-col justify-end p-5">
                  <span className="text-[10px] uppercase tracking-widest text-[#E5A96A] font-bold">
                    {t('hero.specimenTag')}
                  </span>
                  <span className="text-base sm:text-lg font-serif text-[#F9F6F0] font-normal mt-0.5">
                    {t('hero.specimenTitle')}
                  </span>
                </div>
              </div>

              {/* Right Elimination Timeline Steps */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E3DCD2] pb-3">
                  <div>
                    <span className="text-[10.5px] uppercase tracking-wider text-[#C88242] font-bold block">
                      {t('hero.timelineTag')}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-[#1B0F0A] mt-0.5">
                      {t('hero.timelineTitle')}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-[#4A6B53] bg-[#F9F6F0] px-3 py-1 rounded-full border border-[#E3DCD2]">
                    {t('hero.timelineBadge')}
                  </span>
                </div>

                {/* 4 Elimination Steps in Spacious 2x2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Step 1 */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#F9F6F0] border border-[#E3DCD2] flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-[#1B0F0A] block">{t('hero.step0Label')}</span>
                      <span className="text-[11px] text-[#6E6862] block font-medium">{t('hero.step0Desc')}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-lg sm:text-xl font-extrabold text-[#1B0F0A] block tnum">150 mg</span>
                      <span className="text-[9.5px] text-[#2B1810] font-bold px-1.5 py-0.5 bg-[#FFFFFF] rounded border border-[#E3DCD2] inline-block">
                        {t('hero.step0Badge')}
                      </span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#F9F6F0] border border-[#E3DCD2] flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-[#1B0F0A] block">{t('hero.step1Label')}</span>
                      <span className="text-[11px] text-[#C88242] block font-medium">{t('hero.step1Desc')}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-lg sm:text-xl font-extrabold text-[#C88242] block tnum">75 mg</span>
                      <span className="text-[9.5px] text-[#C88242] font-bold px-1.5 py-0.5 bg-[#FFFFFF] rounded border border-[#E3DCD2] inline-block">
                        {t('hero.step1Badge')}
                      </span>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#F9F6F0] border border-[#E3DCD2] flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-[#1B0F0A] block">{t('hero.step2Label')}</span>
                      <span className="text-[11px] text-[#6E6862] block font-medium">{t('hero.step2Desc')}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-lg sm:text-xl font-extrabold text-[#3A3532] block tnum">37.5 mg</span>
                      <span className="text-[9.5px] text-[#3A3532] font-bold px-1.5 py-0.5 bg-[#FFFFFF] rounded border border-[#E3DCD2] inline-block">
                        {t('hero.step2Badge')}
                      </span>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#F9F6F0] border border-[#E3DCD2] flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-[#1B0F0A] block">{t('hero.step3Label')}</span>
                      <span className="text-[11px] text-[#4A6B53] block font-medium">{t('hero.step3Desc')}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-lg sm:text-xl font-extrabold text-[#4A6B53] block tnum">~7 mg</span>
                      <span className="text-[9.5px] text-[#4A6B53] font-bold px-1.5 py-0.5 bg-[#FFFFFF] rounded border border-[#E3DCD2] inline-block">
                        {t('hero.step3Badge')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: 3 Key Insights */}
            <div className="pt-6 border-t border-[#E3DCD2] grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#F9F6F0] border border-[#E3DCD2] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#FFFFFF] border border-[#E3DCD2] text-[#4A6B53] flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} weight="bold" />
                </div>
                <div>
                  <span className="text-[10px] text-[#6E6862] uppercase tracking-wider block font-bold">{t('hero.metric1Tag')}</span>
                  <span className="text-base sm:text-lg font-extrabold text-[#1B0F0A] tnum block">{t('hero.metric1Val')}</span>
                  <span className="text-[10px] text-[#6E6862] block">{t('hero.metric1Sub')}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F9F6F0] border border-[#E3DCD2] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#FFFFFF] border border-[#E3DCD2] text-[#C88242] flex items-center justify-center shrink-0">
                  <Scales size={20} weight="bold" />
                </div>
                <div>
                  <span className="text-[10px] text-[#6E6862] uppercase tracking-wider block font-bold">{t('hero.metric2Tag')}</span>
                  <span className="text-base sm:text-lg font-extrabold text-[#C88242] tnum block">{t('hero.metric2Val')}</span>
                  <span className="text-[10px] text-[#6E6862] block">{t('hero.metric2Sub')}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F9F6F0] border border-[#E3DCD2] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#FFFFFF] border border-[#E3DCD2] text-[#1B0F0A] flex items-center justify-center shrink-0">
                  <Heartbeat size={20} weight="bold" />
                </div>
                <div>
                  <span className="text-[10px] text-[#6E6862] uppercase tracking-wider block font-bold">{t('hero.metric3Tag')}</span>
                  <span className="text-base sm:text-lg font-extrabold text-[#1B0F0A] tnum block">{t('hero.metric3Val')}</span>
                  <span className="text-[10px] text-[#6E6862] block">{t('hero.metric3Sub')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="flex-1 space-y-24 sm:space-y-32 pb-24">
        {/* 1. Spesies Kopi Section */}
        <CoffeeSpeciesSection
          speciesList={COFFEE_SPECIES}
          selectedSpeciesId={activeSpeciesId}
          onSelectSpecies={(id) => setActiveSpeciesId(id)}
        />

        {/* 2. Respons & Batas Efek Kafein Tubuh */}
        <CaffeineEffectsSection currentCaffeineMg={userCalculatedCaffeine} />

        {/* 3. Slider Konverter & Kalkulator Kafein */}
        <CaffeineConverterSection onCalculatedCaffeineChange={(mg) => setUserCalculatedCaffeine(mg)} />

        {/* 4. Graphing Simulasi Kurva 24 Jam & Efek Tidur */}
        <CaffeineSimulatorSection />

        {/* 5. Game Kuis Interaktif Fakta & Mitos Kopi */}
        <CoffeeQuizSection />
      </main>

      {/* Footer & Medical Disclaimer */}
      <footer className="bg-[#F0EEE8] border-t border-[#E3DCD2] py-16 sm:py-24 px-6 sm:px-10 lg:px-12">
        <div className="max-w-[1280px] mx-auto space-y-10">
          <div className="p-8 sm:p-10 rounded bg-[#FFFFFF] border-l-4 border-l-[#4A6B53] border border-[#E3DCD2] text-xs sm:text-sm text-[#6E6862] space-y-3 shadow-xs">
            <div className="flex items-center gap-2.5 text-[#1B0F0A] font-bold font-sans">
              <BookOpen size={18} className="text-[#4A6B53]" />
              <span className="text-sm sm:text-base">{t('footer.disclaimerTitle')}</span>
            </div>
            <p className="leading-relaxed text-xs sm:text-sm">
              {t('footer.disclaimerText')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#6E6862] pt-8 border-t border-[#E3DCD2]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#2B1810] text-[#F9F6F0] flex items-center justify-center font-bold text-xs">
                <svg className="w-4 h-4" viewBox="0 0 32 32" fill="none">
                  <path d="M8 12h12v7a5 5 0 01-5 5h-2a5 5 0 01-5-5v-7zm12 2h2a2 2 0 012 2v1a2 2 0 01-2 2h-2v-5z" stroke="#E5A96A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11 7c0 1.5-1 2-1 3m4-3c0 1.5-1 2-1 3m4-3c0 1.5-1 2-1 3" stroke="#C88242" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-bold text-[#1B0F0A] text-sm">Kafeinologi &copy; {new Date().getFullYear()}</span>
            </div>
            <p className="font-medium">{t('footer.copyrightText')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
