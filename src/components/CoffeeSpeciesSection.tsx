import React from 'react';
import { useTranslation } from 'react-i18next';
import { CoffeeSpecies } from '../data/coffeeData';
import { SPECIES_EN } from '../data/coffeeData.i18n';
import { Coffee, ShieldCheck, Drop, Sparkle, Mountains, Plant, Dna } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';

interface CoffeeSpeciesProps {
  speciesList: CoffeeSpecies[];
  selectedSpeciesId: string;
  onSelectSpecies: (id: string) => void;
}

export const CoffeeSpeciesSection: React.FC<CoffeeSpeciesProps> = ({
  speciesList,
  selectedSpeciesId,
  onSelectSpecies,
}) => {
  const { t, i18n } = useTranslation();
  const langIsEn = i18n.language?.startsWith('en') ?? false;
  const selectedSpecies = speciesList.find((s) => s.id === selectedSpeciesId) || speciesList[0];
  return (
    <section id="species" className="px-6 sm:px-10 lg:px-12 max-w-[1280px] mx-auto">
      <div className="border-t border-[#E3DCD2] pt-16 sm:pt-20">
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#C88242] font-bold">
            <span>{t('species.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-normal font-serif tracking-tight text-[#1B0F0A]">
            {t('species.title')}
          </h2>
          <p className="text-[#6E6862] text-base sm:text-lg leading-relaxed font-normal">
            {t('species.subtitle')}
          </p>
        </div>

        {/* 4 Species Cards: Horizontal Snap Scroll on Mobile, Grid on Desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-14 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 -mx-6 px-6 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {speciesList.map((item) => {
            const isSelected = item.id === selectedSpeciesId;
            const displayName = langIsEn ? (SPECIES_EN[item.id]?.name ?? item.name) : item.name;
            const displayDesc = langIsEn ? (SPECIES_EN[item.id]?.description ?? item.description) : item.description;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSpecies(item.id)}
                className={`group text-left rounded-xl sm:rounded border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between shrink-0 w-[172px] sm:w-auto snap-start active:scale-[0.96] ${
                  isSelected
                    ? 'bg-[#FFFFFF] border-[#C88242] shadow-sm ring-1 ring-[#C88242]'
                    : 'bg-[#FFFFFF] border-[#E3DCD2] hover:border-[#C88242]/50 hover:shadow-xs'
                }`}
              >
                <div className="relative h-24 sm:h-40 w-full overflow-hidden bg-[#F9F6F0]">
                  <img
                    src={item.imageUrl}
                    alt={displayName}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />
                  <div className="absolute top-2 sm:top-3.5 right-2 sm:right-3.5">
                    <span className={`text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 rounded-full font-bold tnum shadow-xs ${
                      item.id === 'robusta' 
                        ? 'bg-[#9E2A2B] text-[#FFFFFF]'
                        : 'bg-[#FFFFFF]/90 text-[#2B1810] border border-[#E3DCD2]'
                    }`}>
                      {item.caffeinePercent}
                    </span>
                  </div>
                </div>

                <div className="p-3 sm:p-6 flex-1 flex flex-col justify-between gap-2 sm:gap-0 sm:space-y-4">
                  <div>
                    <span className="hidden sm:block text-[11px] text-[#6E6862] italic mb-1 font-serif">
                      {item.latinName}
                    </span>
                    <h3 className="text-base sm:text-xl font-bold font-serif text-[#1B0F0A] sm:mb-1.5 whitespace-nowrap">{displayName}</h3>
                    <p className="hidden sm:block text-xs sm:text-[13px] text-[#6E6862] line-clamp-2 leading-relaxed">{displayDesc}</p>
                  </div>
                  
                  <div className="pt-2 sm:pt-3.5 border-t border-[#E3DCD2] flex items-center justify-between text-xs">
                    <span className="text-[#6E6862] text-[10.5px] sm:text-[11.5px] font-medium">{t('species.average')}</span>
                    <span className="font-bold text-[#C88242] tnum text-[11px] sm:text-xs">{item.mgPerGram.avg} mg/g</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Species Detail Specimen Card */}
        {/* Selected Species Detail Specimen Card with Rich Botanical Photography */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedSpecies.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#FFFFFF] rounded border border-[#E3DCD2] p-8 sm:p-10 lg:p-12 shadow-xs space-y-10"
          >
            {/* Header & Botanical Anatomy Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[#F9F6F0] border border-[#E3DCD2] text-[#C88242] flex items-center justify-center">
                    <Coffee size={18} weight="bold" />
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-[#C88242] font-bold">
                    {t('species.detailTag')}
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-serif font-normal text-[#1B0F0A] tracking-tight">
                  {langIsEn ? (SPECIES_EN[selectedSpecies.id]?.name ?? selectedSpecies.name) : selectedSpecies.name}{' '}
                  <span className="text-xl sm:text-2xl italic text-[#6E6862] font-serif block sm:inline mt-1 sm:mt-0">
                    ({selectedSpecies.latinName})
                  </span>
                </h3>
                <p className="text-[#6E6862] text-base sm:text-[17px] leading-relaxed max-w-2xl pt-1">
                  {langIsEn ? (SPECIES_EN[selectedSpecies.id]?.description ?? selectedSpecies.description) : selectedSpecies.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-3">
                  <div className="p-4 rounded bg-[#F9F6F0] border border-[#E3DCD2]">
                    <div className="flex items-center gap-2 text-[#6E6862] text-xs mb-1">
                      <Sparkle size={15} className="text-[#C88242]" />
                      <span className="text-[10.5px] uppercase tracking-wider font-bold">{t('species.flavorTag')}</span>
                    </div>
                    <p className="text-xs sm:text-[13px] font-semibold text-[#1B0F0A] leading-snug">{langIsEn ? (SPECIES_EN[selectedSpecies.id]?.flavorProfile ?? selectedSpecies.flavorProfile) : selectedSpecies.flavorProfile}</p>
                  </div>

                  <div className="p-4 rounded bg-[#F9F6F0] border border-[#E3DCD2]">
                    <div className="flex items-center gap-2 text-[#6E6862] text-xs mb-1">
                      <Drop size={15} className="text-[#C88242]" />
                      <span className="text-[10.5px] uppercase tracking-wider font-bold">{t('species.rangeTag')}</span>
                    </div>
                    <p className="text-xs sm:text-[13px] font-bold text-[#C88242] tnum">
                      {selectedSpecies.mgPerGram.min} - {selectedSpecies.mgPerGram.max} mg / g
                    </p>
                  </div>

                  <div className="p-4 rounded bg-[#F9F6F0] border border-[#E3DCD2]">
                    <div className="flex items-center gap-2 text-[#6E6862] text-xs mb-1">
                      <Mountains size={15} className="text-[#4A6B53]" />
                      <span className="text-[10.5px] uppercase tracking-wider font-bold">{t('species.elevationTag')}</span>
                    </div>
                    <p className="text-xs sm:text-[13px] font-semibold text-[#1B0F0A] tnum">
                      {langIsEn ? (SPECIES_EN[selectedSpecies.id]?.elevation ?? selectedSpecies.elevation) : selectedSpecies.elevation}
                    </p>
                  </div>
                </div>
              </div>

              {/* High-Resolution Botanical Specimen Showcase */}
              <div className="lg:col-span-5">
                <div className="relative h-64 sm:h-72 w-full rounded overflow-hidden border border-[#E3DCD2] bg-[#F0EEE8]">
                  <img
                    src={selectedSpecies.detailImageUrl || selectedSpecies.imageUrl}
                    alt={`Morfologi dan struktur biji ${selectedSpecies.name}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B0F0A]/85 via-transparent to-transparent flex items-end p-5">
                    <div className="text-[#F9F6F0]">
                      <span className="text-[10px] uppercase tracking-widest text-[#E5A96A] block font-bold">
                        {t('species.botanicalTag')}
                      </span>
                      <span className="text-sm font-serif font-normal block mt-0.5">
                        {langIsEn ? (SPECIES_EN[selectedSpecies.id]?.name ?? selectedSpecies.name) : selectedSpecies.name} ({selectedSpecies.latinName})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botanical Traits & Dry Dose Dual Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 border-t border-[#E3DCD2]">
              {/* Botanical Traits Breakdown */}
              <div className="lg:col-span-7 bg-[#F9F6F0] p-6 sm:p-7 rounded border border-[#E3DCD2] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Plant size={16} className="text-[#4A6B53]" />
                    <h4 className="text-sm font-bold font-serif text-[#1B0F0A] uppercase tracking-wider">
                      {t('species.botanicalBoxTitle')}
                    </h4>
                  </div>
                  <span className="text-[10.5px] px-2.5 py-0.5 rounded bg-[#FFFFFF] border border-[#E3DCD2] text-[#4A6B53] font-bold">
                    {t('species.botanicalBoxBadge')}
                  </span>
                </div>

                {selectedSpecies.botanicalTraits && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div className="p-3.5 bg-[#FFFFFF] rounded border border-[#E3DCD2] space-y-1">
                      <span className="text-[10.5px] uppercase tracking-wider text-[#6E6862] font-bold block">{t('species.leafLabel')}</span>
                      <p className="text-[#1B0F0A] font-medium leading-relaxed">{langIsEn ? (SPECIES_EN[selectedSpecies.id]?.leafStructure ?? selectedSpecies.botanicalTraits.leafStructure) : selectedSpecies.botanicalTraits.leafStructure}</p>
                    </div>
                    <div className="p-3.5 bg-[#FFFFFF] rounded border border-[#E3DCD2] space-y-1">
                      <span className="text-[10.5px] uppercase tracking-wider text-[#6E6862] font-bold block">{t('species.beanLabel')}</span>
                      <p className="text-[#1B0F0A] font-medium leading-relaxed">{langIsEn ? (SPECIES_EN[selectedSpecies.id]?.beanShape ?? selectedSpecies.botanicalTraits.beanShape) : selectedSpecies.botanicalTraits.beanShape}</p>
                    </div>
                    <div className="p-3.5 bg-[#FFFFFF] rounded border border-[#E3DCD2] space-y-1">
                      <span className="text-[10.5px] uppercase tracking-wider text-[#6E6862] font-bold block flex items-center gap-1.5">
                        <Dna size={12} className="text-[#C88242]" />
                        <span>{t('species.growLabel')}</span>
                      </span>
                      <p className="text-[#1B0F0A] font-medium leading-relaxed">{langIsEn ? (SPECIES_EN[selectedSpecies.id]?.chromosomes ?? selectedSpecies.botanicalTraits.chromosomes) : selectedSpecies.botanicalTraits.chromosomes}</p>
                    </div>
                    <div className="p-3.5 bg-[#FFFFFF] rounded border border-[#E3DCD2] space-y-1">
                      <span className="text-[10.5px] uppercase tracking-wider text-[#6E6862] font-bold block">{t('species.purposeLabel')}</span>
                      <p className="text-[#1B0F0A] font-medium leading-relaxed">{langIsEn ? (SPECIES_EN[selectedSpecies.id]?.caffeinePurpose ?? selectedSpecies.botanicalTraits.caffeinePurpose) : selectedSpecies.botanicalTraits.caffeinePurpose}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Dry Dose Conversion Side Specimen */}
              <div className="lg:col-span-5 bg-[#F0EEE8] p-6 sm:p-7 rounded border border-[#E3DCD2] flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10.5px] text-[#6E6862] uppercase tracking-wider font-bold">{t('species.doseBoxTag')}</span>
                    <span className="text-[10.5px] text-[#C88242] font-bold tnum">{t('species.doseBoxRatio')} {selectedSpecies.ratioMultiplier}x</span>
                  </div>
                  <h4 className="text-base font-bold font-serif text-[#1B0F0A] mb-3">{t('species.doseBoxTitle')}</h4>
                    <li className="flex justify-between py-1.5 border-b border-[#E3DCD2]">
                      <span className="text-[#6E6862]">{t('species.dose1g')}</span>
                      <span className="font-bold text-[#1B0F0A] tnum">~{selectedSpecies.mgPerGram.avg} mg</span>
                    </li>
                    <li className="flex justify-between py-1.5 border-b border-[#E3DCD2]">
                      <span className="text-[#6E6862]">{t('species.dose10g')}</span>
                      <span className="font-bold text-[#1B0F0A] tnum">~{selectedSpecies.mgPerGram.avg * 10} mg</span>
                    </li>
                    <li className="flex justify-between py-1.5 border-b border-[#E3DCD2]">
                      <span className="text-[#6E6862]">{t('species.dose15g')}</span>
                      <span className="font-bold text-[#C88242] tnum">~{Math.round(selectedSpecies.mgPerGram.avg * 15)} mg</span>
                    </li>
                    <li className="flex justify-between py-1.5">
                      <span className="text-[#6E6862]">{t('species.dose20g')}</span>
                      <span className="font-bold text-[#C88242] tnum">~{Math.round(selectedSpecies.mgPerGram.avg * 20)} mg</span>
                    </li>
                </div>

                <div className="pt-3 border-t border-[#E3DCD2] flex items-center gap-2 text-xs text-[#6E6862]">
                  <ShieldCheck size={16} className="text-[#4A6B53] shrink-0" />
                  <span className="text-[11px]">{t('species.doseFootnote')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
