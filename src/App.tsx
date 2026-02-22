/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw, 
  BookOpen, 
  Trophy,
  AlertCircle,
  Lightbulb,
  GraduationCap
} from 'lucide-react';
import { 
  QUESTION_BANK, 
  Question, 
  Difficulty, 
  GrammarCategory 
} from './types';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [filterCategory, setFilterCategory] = useState<GrammarCategory | 'All'>('All');

  const filteredQuestions = useMemo(() => {
    if (filterCategory === 'All') return QUESTION_BANK;
    return QUESTION_BANK.filter(q => q.category === filterCategory);
  }, [filterCategory]);

  const currentQuestion = filteredQuestions[currentIndex];

  const handleOptionSelect = (blankId: number, option: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [blankId]: option }));
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length < currentQuestion.blanks.length) {
      alert("请完成所有填空后再提交！");
      return;
    }

    let isCorrect = true;
    currentQuestion.blanks.forEach(blank => {
      if (selectedAnswers[blank.id] !== blank.correctAnswer) {
        isCorrect = false;
      }
    });

    if (isCorrect) setScore(prev => prev + 1);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswers({});
      setIsSubmitted(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
    setShowResult(false);
  };

  const renderSentence = () => {
    const parts = currentQuestion.sentence.split(/(\[\d+\])/);
    return parts.map((part, index) => {
      const match = part.match(/\[(\d+)\]/);
      if (match) {
        const blankId = parseInt(match[1]);
        const isCorrect = selectedAnswers[blankId] === currentQuestion.blanks[blankId].correctAnswer;
        
        return (
          <span key={index} className="inline-block mx-1">
            <div 
              className={`
                min-w-[100px] px-3 py-1 border-b-2 text-center transition-all duration-300
                ${!selectedAnswers[blankId] ? 'border-gray-300 text-transparent' : ''}
                ${selectedAnswers[blankId] && !isSubmitted ? 'border-indigo-500 text-indigo-600 font-medium' : ''}
                ${isSubmitted && isCorrect ? 'border-green-500 text-green-600 bg-green-50' : ''}
                ${isSubmitted && !isCorrect ? 'border-red-500 text-red-600 bg-red-50' : ''}
              `}
            >
              {selectedAnswers[blankId] || '_______'}
            </div>
          </span>
        );
      }
      return <span key={index} className="text-gray-800">{part}</span>;
    });
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100"
        >
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">挑战成功!</h2>
          <p className="text-gray-500 mb-8">初二语法你已经掌握得很棒了，继续加油！</p>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="text-5xl font-black text-indigo-600 mb-2">
              {score}<span className="text-2xl text-gray-400 font-medium"> / {filteredQuestions.length}</span>
            </div>
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">最终得分</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={resetQuiz}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
            >
              <RotateCcw className="w-5 h-5" /> 再试一次
            </button>
            <div className="text-sm text-gray-400">
              推荐复习：<a href="#" className="text-indigo-500 hover:underline">非谓语动词专题</a> | <a href="#" className="text-indigo-500 hover:underline">从句引导词辨析</a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans text-gray-900">
      {/* Header */}
      <header className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">GrammarMaster</h1>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Interactive English Lab</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <select 
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value as any);
              setCurrentIndex(0);
              setSelectedAnswers({});
              setIsSubmitted(false);
            }}
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            <option value="All">全部语法点</option>
            {Object.values(GrammarCategory).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 transition-all duration-500" 
                style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-gray-500">{currentIndex + 1} / {filteredQuestions.length}</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Question Info Bar */}
            <div className="px-8 py-4 bg-gray-50 border-bottom border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  currentQuestion.difficulty === Difficulty.JUNIOR ? 'bg-emerald-100 text-emerald-700' :
                  currentQuestion.difficulty === Difficulty.INTERMEDIATE ? 'bg-amber-100 text-amber-700' :
                  'bg-rose-100 text-rose-700'
                }`}>
                  {currentQuestion.difficulty}
                </span>
                <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> {currentQuestion.category}
                </span>
              </div>
              {isSubmitted && (
                <div className={`flex items-center gap-2 text-sm font-bold ${
                  Object.values(selectedAnswers).every((val, idx) => val === currentQuestion.blanks[idx].correctAnswer)
                  ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {Object.values(selectedAnswers).every((val, idx) => val === currentQuestion.blanks[idx].correctAnswer)
                  ? <><CheckCircle2 className="w-4 h-4" /> 正确</>
                  : <><XCircle className="w-4 h-4" /> 错误</>}
                </div>
              )}
            </div>

            {/* Sentence Area */}
            <div className="p-8 md:p-12 text-center">
              <div className="text-2xl md:text-3xl font-serif leading-relaxed text-gray-800">
                {renderSentence()}
              </div>
            </div>

            {/* Options Area */}
            <div className="px-8 pb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentQuestion.blanks[0].options.map((option) => (
                  <button
                    key={option}
                    disabled={isSubmitted}
                    onClick={() => handleOptionSelect(0, option)}
                    className={`
                      py-4 rounded-2xl font-medium transition-all duration-200 border-2
                      ${selectedAnswers[0] === option 
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md' 
                        : 'bg-white border-gray-100 text-gray-600 hover:border-indigo-200 hover:bg-indigo-50/30'}
                      ${isSubmitted && option === currentQuestion.blanks[0].correctAnswer ? 'bg-green-50 border-green-500 text-green-700' : ''}
                      ${isSubmitted && selectedAnswers[0] === option && option !== currentQuestion.blanks[0].correctAnswer ? 'bg-red-50 border-red-500 text-red-700' : ''}
                      ${isSubmitted && option !== currentQuestion.blanks[0].correctAnswer && selectedAnswers[0] !== option ? 'opacity-50 grayscale' : ''}
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    className="px-12 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
                  >
                    提交答案 <ChevronRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-12 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg flex items-center gap-2"
                  >
                    {currentIndex < filteredQuestions.length - 1 ? '下一题' : '查看结果'} <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Explanation Card */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="bg-indigo-50/50 border-t border-indigo-100"
                >
                  <div className="p-8 grid md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                        <Lightbulb className="w-4 h-4" /> 语法规则
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {currentQuestion.explanation.correctRule}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                        <CheckCircle2 className="w-4 h-4" /> 经典例句
                      </div>
                      <p className="text-gray-700 text-sm italic leading-relaxed">
                        "{currentQuestion.explanation.example}"
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                        <AlertCircle className="w-4 h-4" /> 易错辨析
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {currentQuestion.explanation.commonMistake}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Motivation Quote */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm italic">
            "Success is the sum of small efforts, repeated day in and day out."
          </p>
        </div>
      </main>
    </div>
  );
}
