
import React, { useState } from 'react';
import { Category, MathSolution } from '../types';
import { solveMathProblem } from '../services/geminiService';
import { MATH_SYMBOLS, EXAMPLE_PROBLEMS } from '../constants';
import { Play, Sparkles, Copy, Download, Baby, AlertCircle, Loader2, CheckCircle2 } from 'lucide-react';
import GraphVisualizer from './GraphVisualizer';

interface MathSolverProps {
  category: Category;
  onSolveSuccess: (input: string, solution: string) => void;
}

const MathSolver: React.FC<MathSolverProps> = ({ category, onSolveSuccess }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState<MathSolution | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [eli5Mode, setEli5Mode] = useState(false);

  const handleSolve = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await solveMathProblem(category, input, eli5Mode);
      setSolution(result);
      onSolveSuccess(input, result.answer);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleSymbolClick = (val: string) => {
    setInput(prev => prev + val);
  };

  const handleCopy = () => {
    if (solution) {
      navigator.clipboard.writeText(JSON.stringify(solution, null, 2));
      alert('Solution copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            New {category} Problem
          </h3>
          <button 
            onClick={() => setInput(EXAMPLE_PROBLEMS[category])}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium border border-indigo-400/30 px-2 py-1 rounded"
          >
            Load Example
          </button>
        </div>

        <div className="relative mb-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Enter your ${category.toLowerCase()} problem here...`}
            className="w-full h-32 bg-slate-900/50 border border-white/10 rounded-xl p-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all math-font resize-none"
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
             <button 
              onClick={() => setEli5Mode(!eli5Mode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                eli5Mode ? 'bg-indigo-500 text-white shadow-lg' : 'bg-white/10 text-slate-400 hover:bg-white/20'
              }`}
            >
              <Baby className="w-3.5 h-3.5" />
              ELI5 Mode
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {MATH_SYMBOLS.filter(s => s.category === 'Logic' || s.category === 'Set' || s.category === 'Comb').map(sym => (
            <button
              key={sym.label}
              onClick={() => handleSymbolClick(sym.value)}
              className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 text-slate-300 font-medium transition-all text-sm"
            >
              {sym.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleSolve}
          disabled={loading || !input.trim()}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg shadow-indigo-500/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Computing Solution...
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              Solve Problem
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl flex items-start gap-3 text-rose-300">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Solution Display */}
      {solution && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 flex gap-2">
              <button onClick={handleCopy} className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-colors" title="Copy Raw">
                <Copy className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 transition-colors" title="Download PDF">
                <Download className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-white">Solution</h2>
            </div>

            <div className="space-y-8">
              {/* Steps */}
              <section>
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">Step-by-Step Reasoning</h4>
                <div className="space-y-4">
                  {solution.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-indigo-400 group-hover:bg-indigo-500/20 transition-all">
                        {idx + 1}
                      </span>
                      <p className="text-slate-300 leading-relaxed pt-1.5">{step}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Formulas */}
              {solution.formulas.length > 0 && (
                <section className="bg-slate-900/50 p-6 rounded-xl border border-white/5">
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3">Mathematical Concepts</h4>
                  <div className="flex flex-wrap gap-3">
                    {solution.formulas.map((f, i) => (
                      <code key={i} className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded text-indigo-300 math-font text-sm">
                        {f}
                      </code>
                    ))}
                  </div>
                </section>
              )}

              {/* ELI5 */}
              {eli5Mode && solution.eli5 && (
                <section className="bg-amber-500/5 p-6 rounded-xl border border-amber-500/20 border-dashed">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-amber-500 uppercase tracking-widest mb-2">
                    <Baby className="w-4 h-4" />
                    Plain English (ELI5)
                  </h4>
                  <p className="text-amber-200/80 leading-relaxed italic">
                    "{solution.eli5}"
                  </p>
                </section>
              )}

              {/* Graph Visualization */}
              {category === Category.GRAPH_THEORY && solution.graphData && (
                 <GraphVisualizer data={solution.graphData} />
              )}

              {/* Truth Table */}
              {category === Category.LOGIC && solution.truthTable && (
                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-slate-400">
                      <tr>
                        {Object.keys(solution.truthTable[0]).map((key) => (
                          <th key={key} className="px-4 py-3 font-semibold">{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {solution.truthTable.map((row, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          {Object.values(row).map((val: any, j) => (
                            <td key={j} className={`px-4 py-3 math-font ${val === true || val === 'T' || val === 1 ? 'text-emerald-400 font-bold' : 'text-rose-400'}`}>
                              {String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Final Answer */}
              <div className="pt-6 border-t border-white/10">
                <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 p-6 rounded-2xl border border-indigo-500/30">
                  <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1">Final Result</p>
                  <p className="text-3xl font-bold text-white math-font">{solution.answer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathSolver;
