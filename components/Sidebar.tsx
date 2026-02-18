
import React from 'react';
import { CATEGORIES_CONFIG } from '../constants';
import { Category } from '../types';
// Added Sigma to the imports from lucide-react
import { LayoutDashboard, History, Settings, BrainCircuit, Sigma } from 'lucide-react';

interface SidebarProps {
  activeCategory: Category;
  setActiveCategory: (cat: Category) => void;
  activeTab: 'solver' | 'history' | 'quiz';
  setActiveTab: (tab: 'solver' | 'history' | 'quiz') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeCategory, 
  setActiveCategory, 
  activeTab, 
  setActiveTab 
}) => {
  return (
    <aside className="w-72 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="p-2 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-lg">
          <BrainCircuit className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          MathPro Solver
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-8">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Main Menu</p>
          <div className="space-y-1">
            <button 
              onClick={() => setActiveTab('solver')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${activeTab === 'solver' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:bg-white/5'}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Solver Dashboard</span>
            </button>
            <button 
               onClick={() => setActiveTab('history')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${activeTab === 'history' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:bg-white/5'}`}
            >
              <History className="w-5 h-5" />
              <span className="font-medium">Recent History</span>
            </button>
            <button 
               onClick={() => setActiveTab('quiz')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${activeTab === 'quiz' ? 'bg-indigo-500/20 text-indigo-300' : 'text-slate-400 hover:bg-white/5'}`}
            >
              <Sigma className="w-5 h-5" />
              <span className="font-medium">Practice Quiz</span>
            </button>
          </div>
        </div>

        {activeTab === 'solver' && (
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Categories</p>
            <div className="space-y-1">
              {CATEGORIES_CONFIG.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    activeCategory === cat.id 
                      ? 'bg-white/10 text-white border border-white/20 shadow-lg' 
                      : 'text-slate-400 hover:bg-white/5'
                  }`}
                >
                  <div className={`p-1.5 rounded-md bg-gradient-to-br ${cat.color}`}>
                    {cat.icon}
                  </div>
                  <span className="text-sm font-medium">{cat.id}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-white/5 rounded-lg transition-all">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Preferences</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
