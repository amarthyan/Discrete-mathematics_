
export enum Category {
  LOGIC = 'Logic',
  SET_THEORY = 'Set Theory',
  RELATIONS = 'Relations',
  FUNCTIONS = 'Functions',
  COMBINATORICS = 'Combinatorics',
  GRAPH_THEORY = 'Graph Theory',
  RECURRENCE = 'Recurrence Relations',
  BOOLEAN_ALGEBRA = 'Boolean Algebra'
}

export interface Problem {
  id: string;
  category: Category;
  input: string;
  solution?: string;
  explanation?: string;
  timestamp: number;
  isFavorite: boolean;
}

export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface MathSolution {
  answer: string;
  steps: string[];
  formulas: string[];
  eli5?: string;
  truthTable?: any[];
  graphData?: {
    nodes: { id: string }[];
    links: { source: string; target: string }[];
  };
}
