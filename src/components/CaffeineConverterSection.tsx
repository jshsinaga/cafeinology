import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { COFFEE_SPECIES, BREW_METHODS, OTHER_BEVERAGES } from '../data/coffeeData';
import { SPECIES_EN, BREW_EN, BEVERAGE_EN } from '../data/coffeeData.i18n';
import { Scales, Coffee, Fire, Warning } from '@phosphor-icons/react';

interface CaffeineConverterProps {
  onCalculatedCaffeineChange?: (mg: number) => void;
}

export const CaffeineConverterSection: React.FC<CaffeineConverterProps> = ({ onCalculatedCaffeineChange }) => {
  const { t, i18n } = useTranslation();
  const langIsEn = i18n.language?.startsWith('en') ?? false;
  const [mode, setMode] = useState<'powder' | 'brew'>('powder');
  
  // Powder state
  const [speciesId, setSpeciesId] = useState<string>('arabica');
  const [powderGrams, setPowderGrams] = useState<number>(15);
  const [roastLevel, setRoastLevel] = useState<'light' | 'medium' | 'dark'>('medium');

  // Brew method state
  const [brewMethodId, setBrewMethodId] = useState<string>('manual-brew');
  const [servings, setServings] = useState<number>(1);

  // Perhitungan Kafein Bubuk
  const currentSpecies = COFFEE_SPECIES.find((s) => s.id === speciesId) || COFFEE_SPECIES[0];
  const roastFactor = roastLevel === 'light' ? 1.05 : roastLevel === 'dark' ? 0.95 : 1.0;
  const estimatedPowderCaffeine = Math.round(powderGrams * currentSpecies.mgPerGram.avg * roastFactor);

  // Perhitungan Kafein Metode Seduh
  const currentBrewMethod = BREW_METHODS.find((b) => b.id === brewMethodId) || BREW_METHODS[0];
  const estimatedBrewCaffeine = Math.round(currentBrewMethod.defaultCaffeineMg * servings);

  const activeCaffeineMg = mode === 'powder' ? estimatedPowderCaffeine : estimatedBrewCaffeine;

  React.useEffect(() => {
    if (onCalculatedCaffeineChange) {
      onCalculatedCaffeineChange(activeCaffeineMg);
    }
  }, [activeCaffeineMg, onCalculatedCaffeineChange]);

  return (
    <section id="converter" className="px-6 sm:px-10 lg:px-12 max-w-[1280px] mx-auto">
      <div className="border-t border-[#E3DCD2] pt-16 sm:pt-20">
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#C88242] font-bold">
            <span>{t('converter.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-normal font-serif tracking-tight text-[#1B0F0A]">
            {t('converter.title')}
          </h2>
          <p className="text-[#6E6862] text-base sm:text-lg leading-relaxed font-normal">
            {t('converter.subtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Interactive Calculator Controls */}
        <div className="lg:col-span-7 bg-[#FFFFFF] p-8 sm:p-10 rounded border border-[#E3DCD2] shadow-xs space-y-8">
          {/* Segmented Mode Selector */}
          <div className="flex bg-[#F9F6F0] p-1.5 rounded border border-[#E3DCD2]">
            <button
              onClick={() => setMode('powder')}
              className={`flex-1 py-2.5 px-4 rounded text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                mode === 'powder'
                  ? 'bg-[#FFFFFF] text-[#2B1810] shadow-xs border-b-2 border-b-[#C88242] font-bold'
                  : 'text-[#6E6862] hover:text-[#1B0F0A]'
              }`}
            >
              <Scales size={16} />
              <span>{t('converter.tabPowder')}</span>
            </button>
            <button
              onClick={() => setMode('brew')}
              className={`flex-1 py-2.5 px-4 rounded text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                mode === 'brew'
                  ? 'bg-[#FFFFFF] text-[#2B1810] shadow-xs border-b-2 border-b-[#C88242] font-bold'
                  : 'text-[#6E6862] hover:text-[#1B0F0A]'
              }`}
            >
              <Coffee size={16} />
              <span>{t('converter.tabBrew')}</span>
            </button>
          </div>

          {/* Mode 1: Powder Grams Controls */}
          {mode === 'powder' && (
            <div className="space-y-7 pt-1">
              {/* Species Selection */}
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#6E6862] block mb-3 font-bold">
                  {t('converter.step1Powder')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {COFFEE_SPECIES.map((s) => {
                    const displayName = langIsEn ? (SPECIES_EN[s.id]?.name ?? s.name) : s.name;
                    return (
                    <button
                      key={s.id}
                      onClick={() => setSpeciesId(s.id)}
                      className={`p-3.5 sm:p-4 rounded text-left border transition-all cursor-pointer ${
                        speciesId === s.id
                          ? 'bg-[#F9F6F0] border-[#C88242] text-[#2B1810] ring-1 ring-[#C88242]'
                          : 'bg-[#FFFFFF] border-[#E3DCD2] text-[#6E6862] hover:border-[#C88242]/50'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm font-serif text-[#1B0F0A]">{displayName}</div>
                      <div className="text-[11px] text-[#6E6862] mt-1 font-semibold tnum">~{s.mgPerGram.avg} mg/g</div>
                    </button>
                    );
                  })}
                </div>
              </div>

              {/* Grams Slider */}
              <div className="bg-[#F9F6F0] p-6 sm:p-7 rounded border border-[#E3DCD2] space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="powder-grams" className="text-[11px] uppercase tracking-wider text-[#6E6862] font-bold">
                    {t('converter.step2Powder')}
                  </label>
                  <span className="text-3xl font-extrabold text-[#2B1810] tnum">
                    {powderGrams} <span className="text-xs font-normal text-[#6E6862]">gram</span>
                  </span>
                </div>
                <input
                  id="powder-grams"
                  type="range"
                  min="1"
                  max="60"
                  step="1"
                  value={powderGrams}
                  onChange={(e) => setPowderGrams(Number(e.target.value))}
                  className="w-full h-2 bg-[#E3DCD2] rounded appearance-none cursor-pointer accent-[#2B1810]"
                />
                <div className="flex justify-between text-[11px] font-semibold text-[#6E6862] pt-1 tnum">
                  <span>1g</span>
                  <span>15g</span>
                  <span>30g</span>
                  <span>60g</span>
                </div>
              </div>

              {/* Roast Level */}
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#6E6862] block mb-3 font-bold">
                  {t('converter.step3Powder')}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['light', 'medium', 'dark'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setRoastLevel(lvl)}
                      className={`py-3 px-3.5 rounded border text-xs sm:text-[13px] font-semibold capitalize transition-all cursor-pointer ${
                        roastLevel === lvl
                          ? 'bg-[#F9F6F0] border-[#C88242] text-[#2B1810] ring-1 ring-[#C88242]'
                          : 'bg-[#FFFFFF] border-[#E3DCD2] text-[#6E6862] hover:border-[#C88242]/50'
                      }`}
                    >
                      {lvl === 'light' ? t('converter.roastLight') : lvl === 'medium' ? t('converter.roastMedium') : t('converter.roastDark')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mode 2: Brew Methods Controls */}
          {mode === 'brew' && (
            <div className="space-y-7 pt-1">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#6E6862] block mb-3 font-bold">
                  {t('converter.step1Brew')}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {BREW_METHODS.map((b) => {
                    const displayName = langIsEn ? (BREW_EN[b.id]?.name ?? b.name) : b.name;
                    const displayNotes = langIsEn ? (BREW_EN[b.id]?.notes ?? b.notes) : b.notes;
                    const methodLabel = langIsEn ? (BREW_EN[currentBrewMethod.id]?.name ?? currentBrewMethod.name) : currentBrewMethod.name;
                    void methodLabel;
                    return (
                    <button
                      key={b.id}
                      onClick={() => setBrewMethodId(b.id)}
                      className={`p-4 rounded text-left border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        brewMethodId === b.id
                          ? 'bg-[#F9F6F0] border-[#C88242] text-[#2B1810] ring-1 ring-[#C88242]'
                          : 'bg-[#FFFFFF] border-[#E3DCD2] text-[#6E6862] hover:border-[#C88242]/50'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-sm font-serif text-[#1B0F0A]">{displayName}</div>
                        <div className="text-xs text-[#6E6862] mt-1">{displayNotes}</div>
                      </div>
                      <div className="pt-2 border-t border-[#E3DCD2] flex justify-between items-center text-xs font-semibold">
                        <span className="text-[#6E6862] tnum">{b.defaultVolumeMl} ml</span>
                        <span className="font-bold text-[#C88242] tnum">~{b.defaultCaffeineMg} mg</span>
                      </div>
                    </button>
                    );
                  })}
                </div>
              </div>

              {/* Servings */}
              <div className="bg-[#F9F6F0] p-6 sm:p-7 rounded border border-[#E3DCD2] space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="serving-cups" className="text-[11px] uppercase tracking-wider text-[#6E6862] font-bold">
                    {t('converter.step2Brew')}
                  </label>
                  <span className="text-3xl font-extrabold text-[#2B1810] tnum">
                    {servings} <span className="text-xs font-normal text-[#6E6862]">{t('converter.portionCount')}</span>
                  </span>
                </div>
                <input
                  id="serving-cups"
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={servings}
                  onChange={(e) => setServings(Number(e.target.value))}
                  className="w-full h-2 bg-[#E3DCD2] rounded appearance-none cursor-pointer accent-[#2B1810]"
                />
                <div className="flex justify-between text-[11px] font-semibold text-[#6E6862] pt-1 tnum">
                  <span>1</span>
                  <span>2</span>
                  <span>4</span>
                  <span>6</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Dynamic Metric Display */}
        <div className="lg:col-span-5 bg-[#FFFFFF] p-8 sm:p-10 rounded border border-[#E3DCD2] shadow-xs space-y-7">
          <div className="flex items-center justify-between border-b border-[#E3DCD2] pb-4">
            <span className="text-[11px] uppercase tracking-wider text-[#6E6862] font-bold">{t('converter.resultTag')}</span>
            <span className="text-[10.5px] px-2.5 py-0.5 rounded-full bg-[#F9F6F0] text-[#2B1810] border border-[#E3DCD2] font-bold">
              {t('converter.resultBadge')}
            </span>
          </div>

          <div className="text-center py-4">
            <div className="text-6xl sm:text-7xl lg:text-8xl font-extrabold text-[#1B0F0A] tracking-tight tnum">
              {activeCaffeineMg}
              <span className="text-2xl sm:text-3xl lg:text-4xl text-[#C88242] font-normal ml-2">mg</span>
            </div>
            <p className="text-xs sm:text-sm text-[#6E6862] mt-3 font-medium">
              {mode === 'powder'
                ? t('converter.resultBasedPowder', { grams: powderGrams, species: langIsEn ? (SPECIES_EN[currentSpecies.id]?.name ?? currentSpecies.name) : currentSpecies.name, roast: roastLevel })
                : t('converter.resultBasedBrew', { servings, method: langIsEn ? (BREW_EN[currentBrewMethod.id]?.name ?? currentBrewMethod.name) : currentBrewMethod.name })}
            </p>
          </div>

          {/* Gauge Batas Harian 400 mg */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#6E6862]">{t('converter.safeLimitTitle')}</span>
              <span className={`font-bold tnum ${
                activeCaffeineMg > 400 ? 'text-[#9E2A2B]' : activeCaffeineMg > 250 ? 'text-[#D96B27]' : 'text-[#4A6B53]'
              }`}>
                {t('converter.safeLimitPercent', { percent: Math.round((activeCaffeineMg / 400) * 100) })}
              </span>
            </div>
            <div className="w-full h-3 bg-[#F0EEE8] rounded-full overflow-hidden p-0.5 border border-[#E3DCD2]">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  activeCaffeineMg > 400
                    ? 'bg-[#9E2A2B]'
                    : activeCaffeineMg > 250
                    ? 'bg-[#D96B27]'
                    : 'bg-[#4A6B53]'
                }`}
                style={{ width: `${Math.min(100, (activeCaffeineMg / 400) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Smart Recommendation Box */}
          <div className="p-5 rounded bg-[#F9F6F0] border border-[#E3DCD2] space-y-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold font-sans">
              {activeCaffeineMg > 400 ? (
                <>
                  <Warning size={17} weight="bold" className="text-[#9E2A2B]" />
                  <span className="text-[#9E2A2B]">{t('converter.warnHighTitle')}</span>
                </>
              ) : activeCaffeineMg > 200 ? (
                <>
                  <Fire size={17} weight="bold" className="text-[#D96B27]" />
                  <span className="text-[#D96B27]">{t('converter.warnMedTitle')}</span>
                </>
              ) : (
                <>
                  <Coffee size={17} weight="bold" className="text-[#4A6B53]" />
                  <span className="text-[#4A6B53]">{t('converter.warnSafeTitle')}</span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-[13px] text-[#6E6862] leading-relaxed">
              {activeCaffeineMg > 400
                ? t('converter.warnHighDesc')
                : activeCaffeineMg > 200
                ? t('converter.warnMedDesc')
                : t('converter.warnSafeDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* Other Beverages & Food Comparison Matrix */}
      <div className="mt-14 bg-[#FFFFFF] p-8 sm:p-10 rounded border border-[#E3DCD2] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#C88242] font-bold mb-1">
              <span>{t('converter.otherTag')}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B0F0A]">
              {t('converter.otherTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-[#6E6862] mt-1 max-w-2xl">
              {t('converter.otherSubtitle')}
            </p>
          </div>
          <span className="text-[11px] font-semibold text-[#6E6862] bg-[#F9F6F0] px-3 py-1 rounded border border-[#E3DCD2] shrink-0 self-start sm:self-auto">
            {t('converter.otherCategoryCount')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {OTHER_BEVERAGES.map((bev) => {
            const loc = langIsEn ? BEVERAGE_EN[bev.id] : undefined;
            const displayName = loc?.name ?? bev.name;
            const displayPortion = loc?.portion ?? bev.portion;
            const displayCategory = loc?.category ?? bev.category;
            return (
            <div
              key={bev.id}
              className="group bg-[#F9F6F0] rounded border border-[#E3DCD2] overflow-hidden flex flex-col justify-between hover:border-[#C88242]/50 hover:shadow-xs transition-all duration-200"
            >
              <div className="relative h-36 w-full overflow-hidden bg-[#E3DCD2]">
                <img
                  src={bev.imageUrl}
                  alt={displayName}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#1B0F0A]/85 text-[#F9F6F0] font-bold backdrop-blur-xs">
                    {displayCategory}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-sm sm:text-base font-bold font-serif text-[#1B0F0A] leading-snug">
                    {displayName}
                  </h4>
                  <span className="text-[11.5px] text-[#6E6862] block mt-0.5 font-medium">
                    {t('converter.otherStandardPortion')} {displayPortion}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#E3DCD2] flex items-center justify-between">
                  <span className="text-[11px] text-[#6E6862] font-semibold">{t('converter.otherEstimate')}</span>
                  <div className="text-right">
                    <span className="text-sm sm:text-base font-extrabold text-[#C88242] tnum block">
                      {bev.caffeineRange}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
