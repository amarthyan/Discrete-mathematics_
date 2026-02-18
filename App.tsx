
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MathSolver from './components/MathSolver';
import PracticeQuiz from './components/PracticeQuiz';
import { Category, Problem } from './types';
// Added ArrowRight and BrainCircuit to the imports from lucide-react
import { LayoutDashboard, History, Sparkles, LogOut, Clock, Trash2, Github, ArrowRight, BrainCircuit } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.LOGIC);
  const [activeTab, setActiveTab] = useState<'solver' | 'history' | 'quiz'>('solver');
  const [history, setHistory] = useState<Problem[]>([]);
  const [user, setUser] = useState({ username: 'MathWhiz_99', isAuthenticated: true });

  useEffect(() => {
    const saved = localStorage.getItem('math_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleSolveSuccess = (input: string, solution: string) => {
    // Fixed: 'answer' property was incorrectly used instead of 'solution' as defined in Problem interface
    const newEntry: Problem = {
      id: Math.random().toString(36).substr(2, 9),
      category: activeCategory,
      input,
      solution,
      timestamp: Date.now(),
      isFavorite: false
    };
    const updated = [newEntry, ...history.slice(0, 49)];
    setHistory(updated);
    localStorage.setItem('math_history', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('math_history');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      </div>

      <Sidebar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 ml-72 overflow-y-auto min-h-screen relative">
        {/* Header */}
        <header className="sticky top-0 z-10 w-full px-8 py-4 bg-slate-950/50 backdrop-blur-md border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-slate-400">
             <LayoutDashboard className="w-4 h-4" />
             <span>/</span>
             <span className="capitalize text-indigo-400 font-medium">{activeTab}</span>
             {activeTab === 'solver' && (
               <>
                 <span>/</span>
                 <span className="text-slate-200">{activeCategory}</span>
               </>
             )}
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <div className="h-6 w-px bg-white/10 mx-2" />
            <div className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold">
                MW
              </div>
              <span className="text-xs font-semibold text-slate-300">{user.username}</span>
            </div>
            <button className="text-slate-400 hover:text-rose-400 p-2 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 max-w-6xl mx-auto w-full">
          {activeTab === 'solver' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="space-y-2">
                <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 flex items-center gap-3">
                  {activeCategory} Solver
                  <Sparkles className="w-8 h-8 text-indigo-500" />
                </h1>
                <p className="text-slate-400 max-w-2xl leading-relaxed">
                  Advanced computational engine for {activeCategory.toLowerCase()}. Enter your problem using symbols or LaTeX notation for precision.
                </p>
              </div>
              
              <MathSolver 
                category={activeCategory} 
                onSolveSuccess={handleSolveSuccess} 
              />
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Recent Solutions</h1>
                  <p className="text-slate-400">Track your learning progress and review previous computations.</p>
                </div>
                {history.length > 0 && (
                  <button 
                    onClick={clearHistory}
                    className="flex items-center gap-2 px-4 py-2 text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all text-sm font-medium border border-rose-400/20"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear History
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="py-20 text-center space-y-4 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                  <div className="inline-block p-4 bg-white/5 rounded-full mb-2">
                    <Clock className="w-12 h-12 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-300">No history yet</h3>
                  <p className="text-slate-500">Solved problems will appear here for your review.</p>
                  <button 
                    onClick={() => setActiveTab('solver')}
                    className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-bold transition-all"
                  >
                    Start Solving
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {history.map((item) => (
                    <div 
                      key={item.id} 
                      className="group bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-xl border border-white/5 p-6 transition-all duration-300 flex justify-between items-center"
                    >
                      <div className="flex gap-6 items-center">
                        <div className="p-3 bg-slate-900 rounded-lg border border-white/5 group-hover:border-indigo-500/50 transition-colors">
                          <History className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{item.category}</p>
                          <h4 className="text-lg font-bold math-font line-clamp-1">{item.input}</h4>
                          {/* Fixed: Property 'answer' does not exist on type 'Problem', used 'solution' instead */}
                          <p className="text-sm text-indigo-300 font-medium truncate mt-1">Ans: {item.solution}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-6">
                        <div className="hidden sm:block">
                          <p className="text-xs text-slate-500 font-medium uppercase">{new Date(item.timestamp).toLocaleDateString()}</p>
                          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <button className="p-2 hover:bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRight className="w-5 h-5 text-indigo-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="animate-in fade-in duration-500">
               <PracticeQuiz category={activeCategory} />
            </div>
          )}
        </div>

        {/* Floating Call-to-Action */}
        <div className="fixed bottom-8 right-8 z-20">
           <button 
            className="group relative p-4 bg-indigo-600 rounded-2xl shadow-2xl shadow-indigo-600/40 hover:scale-110 transition-transform active:scale-95 overflow-hidden"
            title="Need Help?"
           >
             <BrainCircuit className="w-6 h-6 text-white relative z-10" />
             <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
           </button>
        </div>
      </main>
    </div>
  );
};

export default App;
