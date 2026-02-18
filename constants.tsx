
import React from 'react';
import { 
  Sigma, 
  Binary, 
  Layers, 
  Share2, 
  FunctionSquare, 
  Hash, 
  Network, 
  Repeat, 
  Cpu 
} from 'lucide-react';
import { Category } from './types';

export const CATEGORIES_CONFIG = [
  { id: Category.LOGIC, icon: <Binary className="w-5 h-5" />, color: 'from-blue-500 to-cyan-500' },
  { id: Category.SET_THEORY, icon: <Layers className="w-5 h-5" />, color: 'from-purple-500 to-indigo-500' },
  { id: Category.RELATIONS, icon: <Share2 className="w-5 h-5" />, color: 'from-pink-500 to-rose-500' },
  { id: Category.FUNCTIONS, icon: <FunctionSquare className="w-5 h-5" />, color: 'from-orange-500 to-amber-500' },
  { id: Category.COMBINATORICS, icon: <Hash className="w-5 h-5" />, color: 'from-green-500 to-emerald-500' },
  { id: Category.GRAPH_THEORY, icon: <Network className="w-5 h-5" />, color: 'from-blue-600 to-indigo-600' },
  { id: Category.RECURRENCE, icon: <Repeat className="w-5 h-5" />, color: 'from-violet-500 to-fuchsia-500' },
  { id: Category.BOOLEAN_ALGEBRA, icon: <Cpu className="w-5 h-5" />, color: 'from-teal-500 to-cyan-600' },
];

export const MATH_SYMBOLS = [
  { label: '∧', value: '∧', category: 'Logic' },
  { label: '∨', value: '∨', category: 'Logic' },
  { label: '¬', value: '¬', category: 'Logic' },
  { label: '→', value: '→', category: 'Logic' },
  { label: '↔', value: '↔', category: 'Logic' },
  { label: '∈', value: '∈', category: 'Set' },
  { label: '⊆', value: '⊆', category: 'Set' },
  { label: '∪', value: '∪', category: 'Set' },
  { label: '∩', value: '∩', category: 'Set' },
  { label: '∅', value: '∅', category: 'Set' },
  { label: '∑', value: '∑', category: 'Comb' },
  { label: 'nCr', value: 'C(n,r)', category: 'Comb' },
  { label: 'nPr', value: 'P(n,r)', category: 'Comb' },
];

export const EXAMPLE_PROBLEMS: Record<Category, string> = {
  [Category.LOGIC]: "(P ∧ Q) → R",
  [Category.SET_THEORY]: "A = {1, 2, 3}, B = {2, 3, 4}, Find A ∪ B",
  [Category.RELATIONS]: "R = {(1,1), (2,2), (1,2)}, Is it transitive?",
  [Category.FUNCTIONS]: "f(x) = x^2, Check injectivity on R",
  [Category.COMBINATORICS]: "C(10, 3) + P(5, 2)",
  [Category.GRAPH_THEORY]: "Adjacency matrix: [[0,1,0],[1,0,1],[0,1,0]]",
  [Category.RECURRENCE]: "a_n = 2a_{n-1} + 3a_{n-2}, a_0=1, a_1=2",
  [Category.BOOLEAN_ALGEBRA]: "A'B + AB' + AB",
};
