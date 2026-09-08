import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BREW_METHODS } from '../data/coffeeData';
import { SPECIES_EN, BREW_EN } from '../data/coffeeData.i18n';
import { Plus, Trash, Moon, Clock, Sparkle, WarningCircle, Scales, Coffee } from '@phosphor-icons/react';
export interface CoffeeIntake {
  id: string;
  timeHour: number; // 0 - 23 jam
  brewMethodId: string;
  species: 'arabica' | 'robusta' | 'liberica' | 'excelsa';
  coffeeGrams: number;
  roastLevel: 'light' | 'medium' | 'dark';
  caffeineMg: number;
  mode: 'custom' | 'template';
}

export const CaffeineSimulatorSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const langIsEn = i18n.language?.startsWith('en') ?? false;
  const [bedtimeHour, setBedtimeHour] = useState<number>(23);
  const [halfLifeHours, setHalfLifeHours] = useState<number>(5);
  const [physiologyFactor, setPhysiologyFactor] = useState<'normal' | 'pregnant' | 'smoker' | 'oral_contraceptive'>('normal');
  const [intakes, setIntakes] = useState<CoffeeIntake[]>([
    {
      id: '1',
      timeHour: 8,
      brewMethodId: 'manual-brew',
      species: 'arabica',
      coffeeGrams: 15,
      roastLevel: 'medium',
      caffeineMg: 180,
      mode: 'custom',
    },
    {
      id: '2',
      timeHour: 13,
      brewMethodId: 'espresso-double',
      species: 'arabica',
      coffeeGrams: 16,
      roastLevel: 'medium',
      caffeineMg: 192,
      mode: 'custom',
    },
  ]);

  React.useEffect(() => {
    switch (physiologyFactor) {
      case 'pregnant':
        setHalfLifeHours(9.5);
        break;
      case 'smoker':
        setHalfLifeHours(3.0);
        break;
      case 'oral_contraceptive':
        setHalfLifeHours(7.5);
        break;
      default:
        setHalfLifeHours(5.0);
        break;
    }
  }, [physiologyFactor]);

  const calculateIntakeCaffeine = (grams: number, species: CoffeeIntake['species'], roast: CoffeeIntake['roastLevel'], methodId: string): number => {
    const speciesRate = species === 'robusta' ? 25 : species === 'liberica' ? 11 : species === 'excelsa' ? 11.5 : 12;
    const roastFactor = roast === 'light' ? 1.05 : roast === 'dark' ? 0.95 : 1.0;
    
    if (methodId === 'decaf') {
      return Math.round(grams * 0.2);
    }
    if (methodId === 'instant-coffee') {
      return Math.round(grams * 35);
    }

    return Math.round(grams * speciesRate * roastFactor);
  };
  const calculateTemplateCaffeine = (methodId: string, species: CoffeeIntake['species']): number => {
    const brew = BREW_METHODS.find((b) => b.id === methodId);
    const baseMg = brew ? brew.defaultCaffeineMg : 90;
    const speciesMultiplier = species === 'robusta' ? 1.8 : species === 'liberica' ? 0.92 : species === 'excelsa' ? 0.95 : 1.0;
    return Math.round(baseMg * speciesMultiplier);
  };

  const handleAddIntake = () => {
    const nextHour = intakes.length > 0 ? Math.min(22, Math.max(...intakes.map((i) => i.timeHour)) + 4) : 9;
    const defaultGrams = 15;
    const newIntake: CoffeeIntake = {
      id: Date.now().toString(),
      timeHour: nextHour,
      brewMethodId: 'manual-brew',
      species: 'arabica',
      coffeeGrams: defaultGrams,
      roastLevel: 'medium',
      caffeineMg: calculateIntakeCaffeine(defaultGrams, 'arabica', 'medium', 'manual-brew'),
      mode: 'custom',
    };
    setIntakes([...intakes, newIntake].sort((a, b) => a.timeHour - b.timeHour));
  };

  const handleRemoveIntake = (id: string) => {
    setIntakes(intakes.filter((i) => i.id !== id));
  };

  const handleUpdateIntake = (id: string, updates: Partial<CoffeeIntake>) => {
    setIntakes(
      intakes.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...updates };
          if ((updated.mode ?? 'custom') === 'template') {
            updated.caffeineMg = calculateTemplateCaffeine(updated.brewMethodId, updated.species);
          } else {
            updated.caffeineMg = calculateIntakeCaffeine(
              updated.coffeeGrams,
              updated.species,
              updated.roastLevel,
              updated.brewMethodId
            );
          }
          return updated;
        }
        return item;
      }).sort((a, b) => a.timeHour - b.timeHour)
    );
  };

  const timelinePoints = useMemo(() => {
    const points: { hour: number; hourLabel: string; activeCaffeine: number; isBedtime: boolean }[] = [];
    const totalHoursToTrack = 24;
    const startHour = 6;

    for (let i = 0; i <= totalHoursToTrack; i++) {
      const currentHour = (startHour + i) % 24;
      let totalMgAtHour = 0;

      intakes.forEach((intake) => {
        let deltaHours = (startHour + i) - intake.timeHour;
        if (deltaHours >= 0) {
          const remaining = intake.caffeineMg * Math.pow(0.5, deltaHours / halfLifeHours);
          totalMgAtHour += remaining;
        }
      });

      points.push({
        hour: currentHour,
        hourLabel: `${currentHour.toString().padStart(2, '0')}:00`,
        activeCaffeine: Math.round(totalMgAtHour * 10) / 10,
        isBedtime: currentHour === bedtimeHour,
      });
    }

    return points;
  }, [intakes, halfLifeHours, bedtimeHour]);

  const totalCaffeineConsumed = intakes.reduce((sum, item) => sum + item.caffeineMg, 0);
  const bedtimeData = timelinePoints.find((p) => p.isBedtime) || timelinePoints[timelinePoints.length - 1];
  const caffeineAtBedtime = bedtimeData ? bedtimeData.activeCaffeine : 0;
  const maxTimelineCaffeine = Math.max(300, ...timelinePoints.map((p) => p.activeCaffeine)) * 1.2;

  return (
    <section id="simulator" className="px-6 sm:px-10 lg:px-12 max-w-[1280px] mx-auto">
      <div className="border-t border-[#E3DCD2] pt-16 sm:pt-20">
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#C88242] font-bold">
            <span>{t('simulator.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-normal font-serif tracking-tight text-[#1B0F0A]">
            {t('simulator.title')}
          </h2>
          <p className="text-[#6E6862] text-base sm:text-lg leading-relaxed font-normal">
            {t('simulator.subtitle')}
          </p>
        </div>
      </div>

      {/* Unified Master Container */}
      <div className="bg-[#FFFFFF] p-6 sm:p-10 lg:p-12 rounded-2xl border border-[#E3DCD2] shadow-xs space-y-10">
        
        {/* Top Header of the Unified Card */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-[#E3DCD2] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#C88242] font-bold mb-1">
              <span>{t('simulator.unifiedTag')}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B0F0A]">
              {t('simulator.unifiedTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-[#6E6862] mt-1">
              {t('simulator.unifiedSubtitle')}
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-4 text-xs font-semibold bg-[#F9F6F0] p-3 rounded-xl border border-[#E3DCD2] shrink-0">
            <div>
              <span className="text-[#6E6862] block text-[10px] uppercase tracking-wider">{t('simulator.totalIntakeToday')}</span>
              <span className={`font-bold text-base sm:text-lg tnum ${totalCaffeineConsumed > 400 ? 'text-[#9E2A2B]' : 'text-[#1B0F0A]'}`}>
                {totalCaffeineConsumed} mg
              </span>
            </div>
            <div className="border-l border-[#E3DCD2] pl-4">
              <span className="text-[#6E6862] block text-[10px] uppercase tracking-wider">{t('simulator.remainAtBedtime')}</span>
              <span className={`font-bold text-base sm:text-lg tnum ${caffeineAtBedtime > 50 ? 'text-[#D96B27]' : 'text-[#4A6B53]'}`}>
                {caffeineAtBedtime} mg
              </span>
            </div>
          </div>
        </div>

        {/* Unified 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Sub-Column: Cup Intakes with Custom Grams */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold font-serif text-[#1B0F0A]">{t('simulator.cupsListTitle')}</h4>
                <p className="text-xs text-[#6E6862]">{t('simulator.cupsListSub')}</p>
              </div>
              <button
                type="button"
                onClick={handleAddIntake}
                className="px-3.5 py-2 rounded bg-[#2B1810] hover:bg-[#1B0F0A] text-[#F9F6F0] font-medium text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-xs active:scale-[0.96]"
              >
                <Plus size={13} weight="bold" className="text-[#C88242]" />
                <span>{t('simulator.addCupBtn')}</span>
              </button>
            </div>

            {/* Intake List */}
            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1.5">
              {intakes.map((intake, idx) => (
                <div key={intake.id} className="p-4 sm:p-5 bg-[#F9F6F0] rounded-xl border border-[#E3DCD2] space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#2B1810] text-[#F9F6F0] text-[10.5px] flex items-center justify-center font-bold tnum">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-bold font-serif text-[#1B0F0A]">{t('simulator.cupNumber', { idx: idx + 1 })}</span>
                    </div>
                    {intakes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveIntake(intake.id)}
                        className="text-[#6E6862] hover:text-[#9E2A2B] p-1 cursor-pointer transition-colors"
                        title="Hapus cangkir ini"
                      >
                        <Trash size={16} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#6E6862] block mb-1 font-bold">{t('simulator.timeLabel')}</label>
                      <select
                        value={intake.timeHour}
                        onChange={(e) => handleUpdateIntake(intake.id, { timeHour: Number(e.target.value) })}
                        className="w-full bg-[#FFFFFF] border border-[#E3DCD2] rounded py-1.5 px-2.5 text-xs text-[#1B0F0A] focus:outline-none focus:border-[#C88242] font-medium"
                      >
                        {Array.from({ length: 24 }).map((_, h) => (
                          <option key={h} value={h}>
                            {h.toString().padStart(2, '0')}:00
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-[#6E6862] block mb-1 font-bold">{t('simulator.speciesLabel')}</label>
                      <select
                        value={intake.species}
                        onChange={(e) => handleUpdateIntake(intake.id, { species: e.target.value as CoffeeIntake['species'] })}
                        className="w-full bg-[#FFFFFF] border border-[#E3DCD2] rounded py-1.5 px-2.5 text-xs text-[#1B0F0A] focus:outline-none focus:border-[#C88242]"
                      >
                        <option value="arabica">{langIsEn ? (SPECIES_EN.arabica?.name ?? 'Arabica') : 'Arabika'}</option>
                        <option value="robusta">{langIsEn ? (SPECIES_EN.robusta?.name ?? 'Robusta') : 'Robusta'}</option>
                        <option value="liberica">{langIsEn ? (SPECIES_EN.liberica?.name ?? 'Liberica') : 'Liberika'}</option>
                        <option value="excelsa">{langIsEn ? (SPECIES_EN.excelsa?.name ?? 'Excelsa') : 'Excelsa'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Cup Mode Toggle: Custom Grams vs Café Menu Template */}
                  <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-[#FFFFFF] border border-[#E3DCD2]">
                    <button
                      type="button"
                      onClick={() => handleUpdateIntake(intake.id, { mode: 'custom' })}
                      className={`py-1.5 px-2 rounded-md text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        (intake.mode ?? 'custom') === 'custom'
                          ? 'bg-[#2B1810] text-[#F9F6F0] shadow-xs'
                          : 'text-[#6E6862] hover:bg-[#F0EEE8]'
                      }`}
                    >
                      <Scales size={13} weight="bold" />
                      <span>{t('simulator.cupModeCustom')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateIntake(intake.id, { mode: 'template' })}
                      className={`py-1.5 px-2 rounded-md text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                        (intake.mode ?? 'custom') === 'template'
                          ? 'bg-[#2B1810] text-[#F9F6F0] shadow-xs'
                          : 'text-[#6E6862] hover:bg-[#F0EEE8]'
                      }`}
                    >
                      <Coffee size={13} weight="bold" />
                      <span>{t('simulator.cupModeTemplate')}</span>
                    </button>
                  </div>

                  {(intake.mode ?? 'custom') === 'template' ? (
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-[#6E6862] block font-bold">{t('simulator.templateMenuLabel')}</label>
                      <select
                        value={intake.brewMethodId}
                        onChange={(e) => handleUpdateIntake(intake.id, { brewMethodId: e.target.value })}
                        className="w-full bg-[#FFFFFF] border border-[#E3DCD2] rounded py-1.5 px-2.5 text-xs text-[#1B0F0A] focus:outline-none focus:border-[#C88242]"
                      >
                        {BREW_METHODS.map((b) => (
                          <option key={b.id} value={b.id}>
                            {langIsEn ? (BREW_EN[b.id]?.name ?? b.name) : b.name} (~{b.defaultCaffeineMg} mg)
                          </option>
                        ))}
                      </select>
                      <p className="text-[10.5px] text-[#6E6862] leading-snug">{t('simulator.templateHint')}</p>
                    </div>
                  ) : (
                    <>
                  {/* Custom Grams Slider & Input */}
                  <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#E3DCD2] space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10.5px] uppercase tracking-wider text-[#6E6862] font-bold">
                        {t('simulator.customGramLabel')}
                      </label>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={intake.coffeeGrams}
                          onChange={(e) => handleUpdateIntake(intake.id, { coffeeGrams: Math.max(1, Number(e.target.value)) })}
                          className="w-14 text-right font-extrabold text-[#1B0F0A] text-sm bg-[#F9F6F0] border border-[#E3DCD2] rounded py-0.5 px-1.5 focus:outline-none focus:border-[#C88242] tnum"
                        />
                        <span className="text-xs text-[#6E6862] font-medium">gram</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="40"
                      step="1"
                      value={intake.coffeeGrams}
                      onChange={(e) => handleUpdateIntake(intake.id, { coffeeGrams: Number(e.target.value) })}
                      className="w-full h-1.5 bg-[#E3DCD2] rounded appearance-none cursor-pointer accent-[#2B1810]"
                    />
                    <div className="flex justify-between text-[10px] text-[#6E6862] font-semibold tnum">
                      <span>1g</span>
                      <span>8g</span>
                      <span>15g</span>
                      <span>20g</span>
                      <span>40g</span>
                    </div>
                  </div>

                  {/* Roast Level Selection */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[10.5px] text-[#6E6862] font-bold uppercase tracking-wider">{t('simulator.roastLabel')}</span>
                    <div className="inline-flex rounded border border-[#E3DCD2] overflow-hidden">
                      {(['light', 'medium', 'dark'] as const).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => handleUpdateIntake(intake.id, { roastLevel: r })}
                          className={`px-2.5 py-1 text-[11px] font-semibold capitalize cursor-pointer transition-colors ${
                            intake.roastLevel === r
                              ? 'bg-[#2B1810] text-[#F9F6F0]'
                              : 'bg-[#FFFFFF] text-[#6E6862] hover:bg-[#F0EEE8]'
                          }`}
                        >
                          {langIsEn ? r : (r === 'light' ? 'Terang' : r === 'medium' ? 'Sedang' : 'Gelap')}
                        </button>
                      ))}
                    </div>
                  </div>
                    </>
                  )}
                  <div className="pt-2.5 border-t border-[#E3DCD2] flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#6E6862] text-[11px]">{t('simulator.intakeResultLabel')}</span>
                    <span className="font-extrabold text-[#C88242] text-sm tnum">~{intake.caffeineMg} mg</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Physiological & Bedtime Settings */}
            <div className="p-4 sm:p-5 bg-[#F0EEE8] rounded-xl border border-[#E3DCD2] space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs sm:text-sm font-bold font-serif text-[#1B0F0A] flex items-center gap-2">
                    <Moon size={16} className="text-[#C88242]" />
                    <span>{t('simulator.bedtimeSettingTitle')}</span>
                  </label>
                  <span className="text-xs sm:text-sm font-extrabold text-[#2B1810] tnum">
                    {bedtimeHour.toString().padStart(2, '0')}:00
                  </span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="28"
                  step="1"
                  value={bedtimeHour < 6 ? bedtimeHour + 24 : bedtimeHour}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setBedtimeHour(val >= 24 ? val - 24 : val);
                  }}
                  className="w-full h-2 bg-[#E3DCD2] rounded appearance-none cursor-pointer accent-[#2B1810]"
                />
              </div>

              <div>
                <label className="text-xs font-bold font-serif text-[#1B0F0A] block mb-1.5">{t('simulator.metabolismTitle')}</label>
                <select
                  value={physiologyFactor}
                  onChange={(e) => setPhysiologyFactor(e.target.value as any)}
                  className="w-full bg-[#FFFFFF] border border-[#E3DCD2] rounded py-1.5 px-3 text-xs text-[#1B0F0A] focus:outline-none focus:border-[#C88242]"
                >
                  <option value="normal">{t('simulator.normalAdult')}</option>
                  <option value="smoker">{t('simulator.smoker')}</option>
                  <option value="oral_contraceptive">{t('simulator.pillUser')}</option>
                  <option value="pregnant">{t('simulator.pregnant')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Sub-Column: Real-Time Interactive Graph */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between border-b border-[#E3DCD2] pb-3">
              <div>
                <span className="text-[10.5px] uppercase tracking-wider text-[#C88242] font-bold block">
                  {t('simulator.chartTag')}
                </span>
                <h4 className="text-xl font-bold font-serif text-[#1B0F0A] mt-0.5">
                  {t('simulator.chartTitle')}
                </h4>
              </div>
              <span className="text-xs text-[#6E6862] font-semibold bg-[#F9F6F0] px-3 py-1 rounded-full border border-[#E3DCD2] tnum">
                {t('simulator.halfLifeInfo', { hours: halfLifeHours })}
              </span>
            </div>

            <div className="relative bg-[#F9F6F0] p-5 rounded border border-[#E3DCD2] overflow-hidden">
              <div className="w-full aspect-[5/2]">
                <svg className="w-full h-full overflow-visible block" viewBox="0 0 500 200" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="caffeineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C88242" stopOpacity="0.20" />
                      <stop offset="100%" stopColor="#C88242" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Safety threshold line 400mg */}
                  <line
                    x1="0"
                    y1={200 - (400 / maxTimelineCaffeine) * 200}
                    x2="500"
                    y2={200 - (400 / maxTimelineCaffeine) * 200}
                    stroke="#9E2A2B"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                    opacity="0.7"
                  />
                  <text
                    x="6"
                    y={Math.max(12, 200 - (400 / maxTimelineCaffeine) * 200 - 4)}
                    fill="#9E2A2B"
                    fontSize="11"
                    fontWeight="600"
                    className="select-none font-sans"
                  >
                    {t('simulator.maxLimitText')}
                  </text>

                  {/* Sleep safety threshold line 50mg */}
                  <line
                    x1="0"
                    y1={200 - (50 / maxTimelineCaffeine) * 200}
                    x2="500"
                    y2={200 - (50 / maxTimelineCaffeine) * 200}
                    stroke="#4A6B53"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                    opacity="0.7"
                  />
                  <text
                    x="6"
                    y={200 - (50 / maxTimelineCaffeine) * 200 - 4}
                    fill="#4A6B53"
                    fontSize="11"
                    fontWeight="600"
                    className="select-none font-sans"
                  >
                    {t('simulator.sleepLimitText')}
                  </text>

                  {/* Path Area & Line */}
                  {(() => {
                    const n = timelinePoints.length;
                    const stepX = 500 / (n - 1);
                    const pathData = timelinePoints.map((p, idx) => {
                      const x = idx * stepX;
                      const y = 200 - (p.activeCaffeine / maxTimelineCaffeine) * 200;
                      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ');

                    const areaData = `${pathData} L 500 200 L 0 200 Z`;

                    return (
                      <>
                        <path d={areaData} fill="url(#caffeineGradient)" />
                        <path d={pathData} fill="none" stroke="#C88242" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                        {/* Points */}
                        {timelinePoints.map((p, idx) => {
                          const x = idx * stepX;
                          const y = 200 - (p.activeCaffeine / maxTimelineCaffeine) * 200;
                          if (p.isBedtime) {
                            return (
                              <g key={idx}>
                                <line x1={x} y1="0" x2={x} y2="200" stroke="#2B1810" strokeWidth="1.5" strokeDasharray="3 3" />
                                <circle cx={x} cy={y} r="4.5" fill="#2B1810" stroke="#FFFFFF" strokeWidth="2" />
                                <text x={Math.min(415, x - 26)} y="20" fill="#2B1810" fontSize="11" fontWeight="600" className="select-none font-sans">
                                  {t('simulator.bedtimePointText')}
                                </text>
                              </g>
                            );
                          }
                          return null;
                        })}
                      </>
                    );
                  })()}
                </svg>
              </div>

              {/* Time Axis Labels */}
              <div className="flex justify-between text-[11px] font-semibold text-[#6E6862] mt-4 pt-2.5 border-t border-[#E3DCD2] tnum">
                <span>06:00</span>
                <span>09:00</span>
                <span>12:00</span>
                <span>15:00</span>
                <span>18:00</span>
                <span>21:00</span>
                <span>00:00</span>
                <span>03:00</span>
                <span>06:00</span>
              </div>
            </div>

            {/* Sleep Analysis Card */}
            <div className={`p-5 sm:p-6 rounded border transition-all ${
              caffeineAtBedtime > 100
                ? 'bg-[#F9F6F0] border-[#9E2A2B]/40 text-[#9E2A2B]'
                : caffeineAtBedtime > 40
                ? 'bg-[#F9F6F0] border-[#D96B27]/40 text-[#D96B27]'
                : 'bg-[#F9F6F0] border-[#4A6B53]/40 text-[#4A6B53]'
            }`}>
              <div className="flex items-center gap-2.5 mb-2">
                {caffeineAtBedtime > 100 ? (
                  <WarningCircle size={20} className="text-[#9E2A2B] shrink-0" />
                ) : caffeineAtBedtime > 40 ? (
                  <Clock size={20} className="text-[#D96B27] shrink-0" />
                ) : (
                  <Sparkle size={20} className="text-[#4A6B53] shrink-0" />
                )}
                <h4 className="font-bold font-serif text-sm sm:text-base text-[#1B0F0A]">
                  {caffeineAtBedtime > 100
                    ? t('simulator.sleepWarnHighTitle')
                    : caffeineAtBedtime > 40
                    ? t('simulator.sleepWarnMedTitle')
                    : t('simulator.sleepWarnSafeTitle')}
                </h4>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-[#6E6862]">
                {caffeineAtBedtime > 100
                  ? t('simulator.sleepWarnHighDesc', { time: bedtimeHour, caffeine: caffeineAtBedtime })
                  : caffeineAtBedtime > 40
                  ? t('simulator.sleepWarnMedDesc', { caffeine: caffeineAtBedtime })
                  : t('simulator.sleepWarnSafeDesc', { time: bedtimeHour, caffeine: caffeineAtBedtime })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
