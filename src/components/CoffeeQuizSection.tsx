import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, XCircle, Trophy, ArrowRight, ArrowCounterClockwise, Sparkle, Lightbulb } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';

export interface QuizQuestion {
  id: number;
  statement: {
    id: string;
    en: string;
  };
  correctAnswer: 'fakta' | 'mitos';
  explanation: {
    id: string;
    en: string;
  };
  category: {
    id: string;
    en: string;
  };
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    statement: {
      id: "Kopi sangrai gelap (Dark Roast / Kopi Gosong) memiliki kandungan kafein yang jauh lebih tinggi dibanding Light Roast.",
      en: "Dark Roast coffee has significantly higher caffeine content per gram than Light Roast.",
    },
    correctAnswer: "mitos",
    explanation: {
      id: "Faktanya MITOS. Proses pemanggangan yang lama dan panas tinggi justru membakar sedikit zat kafein. Per gram bubuk, kopi yang disangrai lebih terang (Light Roast) memiliki kadar kafein yang sedikit lebih tinggi.",
      en: "Factually a MYTH. Prolonged roasting and intense heat actually breaks down a small amount of caffeine. Gram for gram, lightly roasted beans retain slightly higher caffeine density.",
    },
    category: {
      id: "Proses Sangrai",
      en: "Roasting Process",
    },
  },
  {
    id: 2,
    statement: {
      id: "Kopi decaf (kopi tanpa kafein) sama sekali tidak memiliki kandungan kafein (0% kafein).",
      en: "Decaf coffee contains absolutely zero caffeine (0% caffeine).",
    },
    correctAnswer: "mitos",
    explanation: {
      id: "Faktanya MITOS. Proses pembersihan kafein menyaring sekitar 97% kafein. Dalam 1 cangkir kopi decaf (250 ml), umumnya masih menyisakan sekitar 2 sampai 5 mg kafein.",
      en: "Factually a MYTH. Decaffeination removes roughly 97% of caffeine. A standard 250 ml cup of decaf still contains about 2 to 5 mg of trace caffeine.",
    },
    category: {
      id: "Kopi Decaf",
      en: "Decaf Coffee",
    },
  },
  {
    id: 3,
    statement: {
      id: "Minum secangkir kopi 45–60 menit sebelum berolahraga dapat meningkatkan tenaga dan mengurangi rasa lelah.",
      en: "Drinking a cup of coffee 45–60 minutes before exercising can boost performance and delay fatigue.",
    },
    correctAnswer: "fakta",
    explanation: {
      id: "Faktanya FAKTA. Kafein terbukti membantu stimulasi otot, meningkatkan pelepasan asam lemak untuk energi, dan membuat tubuh tidak mudah lelah saat berolahraga.",
      en: "Factually a FACT. Caffeine stimulates muscle contraction, mobilizes fatty acids for energy, and significantly lowers the perception of physical fatigue during workouts.",
    },
    category: {
      id: "Aktivitas & Olahraga",
      en: "Sports & Fitness",
    },
  },
  {
    id: 4,
    statement: {
      id: "Kecepatan tubuh seseorang dalam mengolah dan membuang kafein bisa berbeda-beda karena faktor genetik.",
      en: "Individual caffeine metabolism and clearance speeds differ significantly due to genetic factors.",
    },
    correctAnswer: "fakta",
    explanation: {
      id: "Faktanya FAKTA. Enzim di hati (CYP1A2) bekerja dengan kecepatan berbeda pada tiap orang. Ada orang yang kafeinnya hilang cepat, ada pula yang lambat sehingga mudah berdebar.",
      en: "Factually a FACT. Liver enzymes (CYP1A2) vary genetically. Fast metabolizers clear caffeine rapidly, while slow metabolizers experience prolonged alertness or heart jitters.",
    },
    category: {
      id: "Metabolisme Tubuh",
      en: "Metabolism & Genetics",
    },
  },
  {
    id: 5,
    statement: {
      id: "Kopi Cold Brew (seduh dingin) selalu memiliki kadar kafein yang sangat rendah karena diseduh tanpa air panas.",
      en: "Cold Brew coffee always has very low caffeine because it is brewed with cold water.",
    },
    correctAnswer: "mitos",
    explanation: {
      id: "Faktanya MITOS. Meskipun menggunakan air dingin, takaran bubuk kopi yang banyak dan waktu perendaman 12-24 jam menghasilkan kadar kafein yang cukup pekat (150–200 mg per cangkir).",
      en: "Factually a MYTH. While cold water is used, high coffee-to-water ratios and 12–24 hour steeping yield high caffeine extraction (150–200 mg per cup).",
    },
    category: {
      id: "Metode Seduhan",
      en: "Brewing Science",
    },
  },
  {
    id: 6,
    statement: {
      id: "Selain kafein, biji kopi mengandung banyak antioksidan alami yang baik untuk melindungi sel tubuh.",
      en: "Beyond caffeine, coffee beans are naturally rich in antioxidants that protect cellular health.",
    },
    correctAnswer: "fakta",
    explanation: {
      id: "Faktanya FAKTA. Biji kopi kaya akan asam klorogenat dan polifenol, yaitu antioksidan alami yang bermanfaat membantu menjaga kesehatan tubuh dari radikal bebas.",
      en: "Factually a FACT. Coffee beans are loaded with chlorogenic acids and polyphenols, potent dietary antioxidants that neutralize oxidative stress.",
    },
    category: {
      id: "Kesehatan & Nutrisi",
      en: "Health & Nutrition",
    },
  },
];

export const CoffeeQuizSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'id';

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'fakta' | 'mitos' | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];
  const isCurrentAnswered = selectedAnswer !== null;

  const handleSelectAnswer = (answer: 'fakta' | 'mitos') => {
    if (isCurrentAnswered) return;
    setSelectedAnswer(answer);

    const isCorrect = answer === currentQ.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <section id="education" className="px-6 sm:px-10 lg:px-12 max-w-[1280px] mx-auto">
      <div className="border-t border-[#E3DCD2] pt-16 sm:pt-20">
        <div className="max-w-3xl mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#C88242] font-bold">
            <Sparkle size={14} weight="bold" />
            <span>{t('quiz.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-normal font-serif tracking-tight text-[#1B0F0A]">
            {t('quiz.title')}
          </h2>
          <p className="text-[#6E6862] text-base sm:text-lg leading-relaxed font-normal">
            {t('quiz.subtitle')}
          </p>
        </div>

        {/* Main Quiz Box */}
        <div className="max-w-3xl mx-auto bg-[#FFFFFF] rounded-2xl border border-[#E3DCD2] shadow-xs p-6 sm:p-10">
          {!isCompleted ? (
            <div className="space-y-8">
              {/* Progress Bar & Header */}
              <div className="space-y-3 border-b border-[#E3DCD2] pb-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#C88242] uppercase tracking-wider">
                    {currentQ.category[lang]}
                  </span>
                  <span className="font-bold text-[#1B0F0A] tnum">
                    {t('quiz.questionCount', { current: currentIndex + 1, total: QUIZ_QUESTIONS.length })}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-[#F9F6F0] rounded-full overflow-hidden border border-[#E3DCD2]">
                  <div
                    className="h-full bg-[#C88242] transition-all duration-300 rounded-full"
                    style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Statement */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQ.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="text-lg sm:text-2xl font-serif text-[#1B0F0A] leading-snug">
                    "{currentQ.statement[lang]}"
                  </div>

                  {/* Fact or Myth Buttons */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    {/* Tombol Fakta */}
                    <button
                      type="button"
                      disabled={isCurrentAnswered}
                      onClick={() => handleSelectAnswer('fakta')}
                      className={`p-4 sm:p-5 rounded-xl border text-sm sm:text-base font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.97] ${
                        !isCurrentAnswered
                          ? 'bg-[#F9F6F0] border-[#E3DCD2] text-[#1B0F0A] hover:border-[#4A6B53] hover:bg-[#FFFFFF]'
                          : currentQ.correctAnswer === 'fakta'
                          ? 'bg-[#4A6B53] text-[#FFFFFF] border-[#4A6B53] ring-2 ring-[#4A6B53]/30'
                          : selectedAnswer === 'fakta'
                          ? 'bg-[#9E2A2B] text-[#FFFFFF] border-[#9E2A2B]'
                          : 'bg-[#F9F6F0] opacity-50 border-[#E3DCD2] text-[#6E6862]'
                      }`}
                    >
                      <span>{t('quiz.factBtn')}</span>
                      {isCurrentAnswered && currentQ.correctAnswer === 'fakta' && (
                        <CheckCircle size={20} weight="fill" />
                      )}
                      {isCurrentAnswered && selectedAnswer === 'fakta' && currentQ.correctAnswer !== 'fakta' && (
                        <XCircle size={20} weight="fill" />
                      )}
                    </button>

                    {/* Tombol Mitos */}
                    <button
                      type="button"
                      disabled={isCurrentAnswered}
                      onClick={() => handleSelectAnswer('mitos')}
                      className={`p-4 sm:p-5 rounded-xl border text-sm sm:text-base font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.97] ${
                        !isCurrentAnswered
                          ? 'bg-[#F9F6F0] border-[#E3DCD2] text-[#1B0F0A] hover:border-[#C88242] hover:bg-[#FFFFFF]'
                          : currentQ.correctAnswer === 'mitos'
                          ? 'bg-[#C88242] text-[#FFFFFF] border-[#C88242] ring-2 ring-[#C88242]/30'
                          : selectedAnswer === 'mitos'
                          ? 'bg-[#9E2A2B] text-[#FFFFFF] border-[#9E2A2B]'
                          : 'bg-[#F9F6F0] opacity-50 border-[#E3DCD2] text-[#6E6862]'
                      }`}
                    >
                      <span>{t('quiz.mythBtn')}</span>
                      {isCurrentAnswered && currentQ.correctAnswer === 'mitos' && (
                        <CheckCircle size={20} weight="fill" />
                      )}
                      {isCurrentAnswered && selectedAnswer === 'mitos' && currentQ.correctAnswer !== 'mitos' && (
                        <XCircle size={20} weight="fill" />
                      )}
                    </button>
                  </div>

                  {/* Explanation Box */}
                  {isCurrentAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 sm:p-5 rounded-xl border space-y-2 ${
                        selectedAnswer === currentQ.correctAnswer
                          ? 'bg-[#F9F6F0] border-[#4A6B53]/30 text-[#1B0F0A]'
                          : 'bg-[#F9F6F0] border-[#9E2A2B]/30 text-[#1B0F0A]'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                        <Lightbulb size={16} className="text-[#C88242]" />
                        <span>
                          {selectedAnswer === currentQ.correctAnswer ? t('quiz.correctFeedback') : t('quiz.wrongFeedback')}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#6E6862] leading-relaxed">
                        {currentQ.explanation[lang]}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Bottom Action */}
              {isCurrentAnswered && (
                <div className="pt-4 border-t border-[#E3DCD2] flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-6 py-3 rounded-xl bg-[#2B1810] hover:bg-[#1B0F0A] text-[#F9F6F0] font-semibold text-sm flex items-center gap-2 cursor-pointer transition-all shadow-xs active:scale-[0.96]"
                  >
                    <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? t('quiz.nextBtn') : t('quiz.resultBtn')}</span>
                    <ArrowRight size={16} weight="bold" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Result Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 sm:py-8 space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#F9F6F0] border border-[#E3DCD2] text-[#C88242] flex items-center justify-center mx-auto shadow-xs">
                <Trophy size={32} weight="duotone" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#6E6862] font-bold">{t('quiz.resultTag')}</span>
                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B0F0A]">
                  {t('quiz.scoreSummary', { score, total: QUIZ_QUESTIONS.length })}
                </h3>
                <p className="text-sm sm:text-base text-[#6E6862] max-w-md mx-auto">
                  {score === QUIZ_QUESTIONS.length
                    ? t('quiz.perfectMsg')
                    : score >= 4
                    ? t('quiz.goodMsg')
                    : t('quiz.tryAgainMsg')}
                </p>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
                <div className="p-3 bg-[#F9F6F0] rounded-xl border border-[#E3DCD2]">
                  <span className="text-[10px] uppercase text-[#6E6862] block font-bold">{t('quiz.correctCount')}</span>
                  <span className="text-lg font-bold text-[#4A6B53] tnum">{score}</span>
                </div>
                <div className="p-3 bg-[#F9F6F0] rounded-xl border border-[#E3DCD2]">
                  <span className="text-[10px] uppercase text-[#6E6862] block font-bold">{t('quiz.wrongCount')}</span>
                  <span className="text-lg font-bold text-[#9E2A2B] tnum">{QUIZ_QUESTIONS.length - score}</span>
                </div>
                <div className="p-3 bg-[#F9F6F0] rounded-xl border border-[#E3DCD2]">
                  <span className="text-[10px] uppercase text-[#6E6862] block font-bold">{t('quiz.accuracyCount')}</span>
                  <span className="text-lg font-bold text-[#C88242] tnum">{Math.round((score / QUIZ_QUESTIONS.length) * 100)}%</span>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E3DCD2]">
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="px-6 py-3.5 rounded-xl bg-[#2B1810] hover:bg-[#1B0F0A] text-[#F9F6F0] font-semibold text-sm flex items-center gap-2 mx-auto cursor-pointer transition-all shadow-xs active:scale-[0.96]"
                >
                  <ArrowCounterClockwise size={16} weight="bold" />
                  <span>{t('quiz.restartBtn')}</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
