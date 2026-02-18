
import React, { useState, useEffect } from 'react';
import { Category } from '../types';
import { generateQuiz } from '../services/geminiService';
import { Brain, ArrowRight, RotateCcw, Loader2, CheckCircle, XCircle } from 'lucide-react';

interface PracticeQuizProps {
  category: Category;
}

const PracticeQuiz: React.FC<PracticeQuizProps> = ({ category }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const fetchQuiz = async () => {
    setLoading(true);
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    try {
      const data = await generateQuiz(category);
      setQuestions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [category]);

  const handleNext = () => {
    if (selectedOption === questions[currentIndex].correctIndex) {
      setScore(s => s + 1);
    }
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
        <p className="text-slate-400 animate-pulse">Generating your personalized practice set...</p>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-10 text-center animate-in zoom-in duration-300">
        <div className="inline-block p-4 bg-indigo-500/20 rounded-full mb-6 text-indigo-400">
          <Brain className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
        <p className="text-slate-400 mb-8">You mastered {category} today.</p>
        
        <div className="text-6xl font-black text-white mb-8">
          {Math.round((score / questions.length) * 100)}%
          <span className="block text-lg font-medium text-slate-500 mt-2">
            ({score} of {questions.length} Correct)
          </span>
        </div>

        <div className="flex gap-4 justify-center">
          <button 
            onClick={fetchQuiz}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            Try New Questions
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Question {currentIndex + 1} of {questions.length}</span>
          <h2 className="text-2xl font-bold mt-1">Challenge your logic</h2>
        </div>
        <div className="h-2 w-32 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-500 transition-all duration-500" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl space-y-8 animate-in slide-in-from-right-8 duration-300">
        <p className="text-xl leading-relaxed text-slate-200 math-font">
          {currentQ.question}
        </p>

        <div className="grid grid-cols-1 gap-4">
          {currentQ.options.map((opt: string, i: number) => (
            <button
              key={i}
              onClick={() => setSelectedOption(i)}
              className={`flex items-center justify-between p-5 rounded-xl border text-left transition-all ${
                selectedOption === i 
                  ? 'bg-indigo-500/20 border-indigo-500 text-indigo-200' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <span className="font-medium">{opt}</span>
              {selectedOption === i && <CheckCircle className="w-5 h-5 shrink-0" />}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="w-full flex items-center justify-center gap-2 py-4 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-lg transition-all"
        >
          {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PracticeQuiz;
