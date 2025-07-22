export interface Formula {
  id: string;
  name: string;
  description: string;
  formula: string;
  variables: Variable[];
  category: string;
  discipline: string;
  units?: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  tags: string[];
  examples?: FormulaExample[];
  references?: string[];
}

export interface Variable {
  symbol: string;
  name: string;
  unit: string;
  value?: number;
  min?: number;
  max?: number;
  description?: string;
}

export interface FormulaExample {
  title: string;
  inputs: Record<string, number>;
  expectedResult: number;
  description: string;
}

export interface Calculation {
  id: string;
  formulaId: string;
  formulaName: string;
  inputs: Record<string, number>;
  result: number;
  timestamp: Date;
  notes?: string;
  accuracy?: number;
}

export interface UnitConversion {
  from: string;
  to: string;
  factor: number;
}

export interface CalculationSession {
  id: string;
  name: string;
  calculations: Calculation[];
  createdAt: Date;
  updatedAt: Date;
}