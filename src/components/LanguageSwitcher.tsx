import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from '@phosphor-icons/react';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('en') ? 'en' : 'id';

  const handleToggle = () => {
    const nextLang = currentLang === 'id' ? 'en' : 'id';
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] border border-[#E3DCD2] text-[#2B1810] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-[0.96] shrink-0"
      title="Ganti Bahasa / Switch Language"
    >
      <Globe size={15} weight="bold" className="text-[#C88242] shrink-0" />
      <span className="uppercase tracking-wider font-mono text-[11px] font-extrabold">
        {currentLang === 'id' ? 'ID' : 'EN'}
      </span>
      <span className="text-[#6E6862] text-[10px] font-normal hidden sm:inline">
        {currentLang === 'id' ? '• EN' : '• ID'}
      </span>
    </button>
  );
};
