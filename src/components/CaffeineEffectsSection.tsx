import React from 'react';
import { useTranslation } from 'react-i18next';
import { DOSE_EFFECTS, SPECIAL_GROUPS, DoseEffect } from '../data/coffeeData';
import { DOSE_EN, GROUP_EN } from '../data/coffeeData.i18n';
import { Heartbeat, ShieldCheck } from '@phosphor-icons/react';

interface CaffeineEffectsProps {
  currentCaffeineMg?: number;
}

export const CaffeineEffectsSection: React.FC<CaffeineEffectsProps> = ({ currentCaffeineMg = 150 }) => {
  const { t, i18n } = useTranslation();
  const langIsEn = i18n.language?.startsWith('en') ?? false;
  const getBadgeStyle = (level: DoseEffect['colorLevel']) => {
    switch (level) {
      case 'safe':
        return 'bg-[#F9F6F0] text-[#4A6B53] border-[#4A6B53]/40';
      case 'active':
        return 'bg-[#F9F6F0] text-[#C88242] border-[#C88242]/40';
      case 'warning':
        return 'bg-[#F9F6F0] text-[#D96B27] border-[#D96B27]/40';
      case 'danger':
        return 'bg-[#F9F6F0] text-[#9E2A2B] border-[#9E2A2B]/40';
      case 'toxic':
        return 'bg-[#F9F6F0] text-[#9E2A2B] border-[#9E2A2B]/60 font-bold';
    }
  };

  return (
    <section id="effects" className="px-6 sm:px-10 lg:px-12 max-w-[1280px] mx-auto">
      <div className="border-t border-[#E3DCD2] pt-16 sm:pt-20">
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#C88242] font-bold">
            <span>{t('effects.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-normal font-serif tracking-tight text-[#1B0F0A]">
            {t('effects.title')}
          </h2>
          <p className="text-[#6E6862] text-base sm:text-lg leading-relaxed font-normal">
            {t('effects.subtitle')}
          </p>
        </div>
      </div>

      {/* Dose Levels Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
        {DOSE_EFFECTS.map((tier, idx) => {
          const isCurrentActive = currentCaffeineMg >= tier.minMg && currentCaffeineMg < tier.maxMg;
          const displayCategory = langIsEn ? (DOSE_EN[tier.range]?.category ?? tier.category) : tier.category;
          const displayEffect = langIsEn ? (DOSE_EN[tier.range]?.effect ?? tier.effect) : tier.effect;
          return (
            <div
              key={idx}
              className={`p-6 sm:p-7 rounded border transition-all duration-200 flex flex-col justify-between space-y-4 ${
                isCurrentActive
                  ? 'bg-[#FFFFFF] border-[#C88242] shadow-sm ring-1 ring-[#C88242]'
                  : 'bg-[#FFFFFF] border-[#E3DCD2] hover:border-[#C88242]/40'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6E6862] font-bold tnum">{tier.range}</span>
                  <span className={`text-[10.5px] px-2.5 py-0.5 rounded-full border uppercase tracking-wider font-bold ${getBadgeStyle(tier.colorLevel)}`}>
                    {displayCategory.split('(')[0]}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-serif text-[#1B0F0A]">{displayCategory}</h3>
                <p className="text-xs sm:text-[13px] text-[#6E6862] leading-relaxed font-normal">{displayEffect}</p>
              </div>
              {isCurrentActive && (
                <div className="pt-3 border-t border-[#E3DCD2] flex items-center gap-2 text-xs text-[#C88242] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#C88242]"></span>
                  <span className="tnum">{t('effects.currentDose')} ({currentCaffeineMg} mg)</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Biological Mechanism & Special Populations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Biological Mechanism Card */}
        <div className="lg:col-span-5 bg-[#FFFFFF] p-8 sm:p-10 rounded border border-[#E3DCD2] shadow-xs flex flex-col justify-between space-y-7">
          <div>
            <div className="flex items-center gap-2 text-[#C88242] mb-3">
              <div className="w-8 h-8 rounded bg-[#F9F6F0] border border-[#E3DCD2] flex items-center justify-center">
                <Heartbeat size={18} weight="bold" />
              </div>
              <span className="text-[11px] uppercase tracking-wider font-bold">{t('effects.howTag')}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#1B0F0A] mb-3">{t('effects.howTitle')}</h3>
            <p className="text-xs sm:text-sm text-[#6E6862] leading-relaxed mb-6">
              {t('effects.howDesc')}
            </p>

            {/* Stepper Timeline Container */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs pb-1 border-b border-[#E3DCD2]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E6862]">{t('effects.journeyTag')}</span>
                <span className="text-[11px] text-[#C88242] font-bold">{t('effects.journeySteps')}</span>
              </div>

              <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E3DCD2]">
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-[#FFFFFF] border-2 border-[#C88242] flex items-center justify-center shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C88242]"></span>
                  </div>
                  <div className="p-3 rounded bg-[#F9F6F0] border border-[#E3DCD2] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1B0F0A]">{t('effects.step1Title')}</span>
                      <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-[#FFFFFF] border border-[#E3DCD2] text-[#C88242] font-bold tnum">
                        {t('effects.step1Time')}
                      </span>
                    </div>
                    <p className="text-xs text-[#6E6862] leading-relaxed">
                      {t('effects.step1Desc')}
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-[#FFFFFF] border-2 border-[#C88242] flex items-center justify-center shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C88242]"></span>
                  </div>
                  <div className="p-3 rounded bg-[#F9F6F0] border border-[#E3DCD2] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1B0F0A]">{t('effects.step2Title')}</span>
                      <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-[#FFFFFF] border border-[#E3DCD2] text-[#2B1810] font-bold tnum">
                        {t('effects.step2Time')}
                      </span>
                    </div>
                    <p className="text-xs text-[#6E6862] leading-relaxed">
                      {t('effects.step2Desc')}
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-[#FFFFFF] border-2 border-[#4A6B53] flex items-center justify-center shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A6B53]"></span>
                  </div>
                  <div className="p-3 rounded bg-[#F9F6F0] border border-[#E3DCD2] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1B0F0A]">{t('effects.step3Title')}</span>
                      <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-[#FFFFFF] border border-[#E3DCD2] text-[#4A6B53] font-bold tnum">
                        {t('effects.step3Time')}
                      </span>
                    </div>
                    <p className="text-xs text-[#6E6862] leading-relaxed">
                      {t('effects.step3Desc')}
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-[#FFFFFF] border-2 border-[#6E6862] flex items-center justify-center shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6E6862]"></span>
                  </div>
                  <div className="p-3 rounded bg-[#F9F6F0] border border-[#E3DCD2] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1B0F0A]">{t('effects.step4Title')}</span>
                      <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-[#FFFFFF] border border-[#E3DCD2] text-[#6E6862] font-bold tnum">
                        {t('effects.step4Time')}
                      </span>
                    </div>
                    <p className="text-xs text-[#6E6862] leading-relaxed">
                      {t('effects.step4Desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Special Populations Table Card */}
        <div className="lg:col-span-7 bg-[#FFFFFF] p-8 sm:p-10 rounded border border-[#E3DCD2] shadow-xs flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 text-[#4A6B53] mb-3">
              <div className="w-8 h-8 rounded bg-[#F9F6F0] border border-[#E3DCD2] flex items-center justify-center">
                <ShieldCheck size={18} weight="bold" />
              </div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#1B0F0A]">{t('effects.specialTag')}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#1B0F0A] mb-2">{t('effects.specialTitle')}</h3>
            <p className="text-xs sm:text-sm text-[#6E6862] mb-6">{t('effects.specialSubtitle')}</p>

            <div className="space-y-3">
              {SPECIAL_GROUPS.map((grp, i) => {
                const localized = langIsEn ? GROUP_EN[grp.group] : undefined;
                return (
                <div key={i} className="p-3.5 sm:p-4 rounded bg-[#F9F6F0] border border-[#E3DCD2] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm sm:text-base font-bold text-[#1B0F0A]">{localized?.group ?? grp.group}</span>
                      <span className="text-[10.5px] px-2.5 py-0.5 rounded bg-[#FFFFFF] border border-[#E3DCD2] text-[#2B1810] font-bold">
                        {localized?.badge ?? grp.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#6E6862] mt-1">{localized?.note ?? grp.note}</p>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <span className="text-xs sm:text-sm font-bold text-[#C88242] block tnum">{localized?.limit ?? grp.limit}</span>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Caffeine Withdrawal Syndrome Card */}
      <div className="mt-12 p-8 sm:p-10 rounded bg-[#F0EEE8] border border-[#E3DCD2] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6 space-y-3">
          <div className="flex items-center gap-2 text-[#C88242] text-[11px] uppercase tracking-wider font-bold">
            <span>{t('effects.stopTag')}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#1B0F0A]">{t('effects.stopTitle')}</h3>
          <p className="text-xs sm:text-sm text-[#6E6862] leading-relaxed">
            {t('effects.stopDesc')}
          </p>
        </div>

        <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 sm:p-5 bg-[#FFFFFF] rounded border border-[#E3DCD2] shadow-xs">
            <span className="font-bold text-[#1B0F0A] block mb-1.5 font-sans text-sm">{t('effects.symptom1Title')}</span>
            <span className="text-[#6E6862] text-xs leading-relaxed">{t('effects.symptom1Desc')}</span>
          </div>
          <div className="p-4 sm:p-5 bg-[#FFFFFF] rounded border border-[#E3DCD2] shadow-xs">
            <span className="font-bold text-[#1B0F0A] block mb-1.5 font-sans text-sm">{t('effects.symptom2Title')}</span>
            <span className="text-[#6E6862] text-xs leading-relaxed">{t('effects.symptom2Desc')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
