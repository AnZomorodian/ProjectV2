import { evaluate } from 'mathjs';
import { Formula, Variable } from '../types/formula';

export interface CalculationResult {
  result: number;
  steps: string[];
  units: string;
  accuracy: number;
  warnings: string[];
}

export class EngineeringCalculator {
  private static validateInput(value: number, variable: Variable): string[] {
    const warnings: string[] = [];
    
    if (variable.min !== undefined && value < variable.min) {
      warnings.push(`${variable.name} is below minimum recommended value (${variable.min})`);
    }
    if (variable.max !== undefined && value > variable.max) {
      warnings.push(`${variable.name} exceeds maximum recommended value (${variable.max})`);
    }
    
    return warnings;
  }

  private static formatNumber(num: number): string {
    if (Math.abs(num) >= 1e6 || (Math.abs(num) < 0.001 && num !== 0)) {
      return num.toExponential(4);
    }
    return num.toFixed(6).replace(/\.?0+$/, '');
  }

  static calculate(formula: Formula, inputs: Record<string, number>): CalculationResult {
    const steps: string[] = [];
    const warnings: string[] = [];
    let result = 0;
    let accuracy = 1.0;

    try {
      // Validate all inputs
      formula.variables.forEach(variable => {
        const value = inputs[variable.symbol] || variable.value || 0;
        const varWarnings = this.validateInput(value, variable);
        warnings.push(...varWarnings);
      });

      // Create calculation context
      const context: Record<string, number> = {};
      formula.variables.forEach(variable => {
        context[variable.symbol] = inputs[variable.symbol] || variable.value || 0;
      });

      steps.push(`Formula: ${formula.formula}`);
      steps.push(`Given values:`);
      Object.entries(context).forEach(([symbol, value]) => {
        const variable = formula.variables.find(v => v.symbol === symbol);
        steps.push(`  ${symbol} = ${this.formatNumber(value)} ${variable?.unit || ''}`);
      });

      // Enhanced calculation logic for each formula
      switch (formula.id) {
        case 'stress-formula':
          result = context.F / context.A;
          steps.push(`σ = F / A = ${this.formatNumber(context.F)} / ${this.formatNumber(context.A)}`);
          break;

        case 'strain-formula':
          result = context['ΔL'] / context['L₀'];
          steps.push(`ε = ΔL / L₀ = ${this.formatNumber(context['ΔL'])} / ${this.formatNumber(context['L₀'])}`);
          break;

        case 'youngs-modulus':
          result = context.σ / context.ε;
          steps.push(`E = σ / ε = ${this.formatNumber(context.σ)} / ${this.formatNumber(context.ε)}`);
          break;

        case 'power-formula':
          result = context.F * context.v;
          steps.push(`P = F × v = ${this.formatNumber(context.F)} × ${this.formatNumber(context.v)}`);
          break;

        case 'ohms-law':
          result = context.I * context.R;
          steps.push(`V = I × R = ${this.formatNumber(context.I)} × ${this.formatNumber(context.R)}`);
          break;

        case 'electrical-power':
          result = context.V * context.I;
          steps.push(`P = V × I = ${this.formatNumber(context.V)} × ${this.formatNumber(context.I)}`);
          break;

        case 'capacitive-reactance':
          result = 1 / (2 * Math.PI * context.f * context.C);
          steps.push(`Xc = 1 / (2πfC) = 1 / (2π × ${this.formatNumber(context.f)} × ${this.formatNumber(context.C)})`);
          break;

        case 'inductive-reactance':
          result = 2 * Math.PI * context.f * context.L;
          steps.push(`XL = 2πfL = 2π × ${this.formatNumber(context.f)} × ${this.formatNumber(context.L)}`);
          break;

        case 'beam-deflection':
          result = (5 * context.w * Math.pow(context.L, 4)) / (384 * context.E * context.I);
          steps.push(`δ = (5wL⁴) / (384EI)`);
          steps.push(`δ = (5 × ${this.formatNumber(context.w)} × ${this.formatNumber(context.L)}⁴) / (384 × ${this.formatNumber(context.E)} × ${this.formatNumber(context.I)})`);
          break;

        case 'concrete-strength':
          result = context.P / context.A;
          steps.push(`fc = P / A = ${this.formatNumber(context.P)} / ${this.formatNumber(context.A)}`);
          break;

        case 'soil-bearing-capacity':
          result = context.c * context.Nc + context.γ * context.Df * context.Nq + 0.5 * context.γ * context.B * context.Nγ;
          steps.push(`qu = cNc + γDfNq + 0.5γBNγ`);
          steps.push(`qu = ${this.formatNumber(context.c)}×${this.formatNumber(context.Nc)} + ${this.formatNumber(context.γ)}×${this.formatNumber(context.Df)}×${this.formatNumber(context.Nq)} + 0.5×${this.formatNumber(context.γ)}×${this.formatNumber(context.B)}×${this.formatNumber(context.Nγ)}`);
          break;

        case 'reynolds-number':
          result = (context.ρ * context.v * context.D) / context.μ;
          steps.push(`Re = (ρvD) / μ = (${this.formatNumber(context.ρ)} × ${this.formatNumber(context.v)} × ${this.formatNumber(context.D)}) / ${this.formatNumber(context.μ)}`);
          break;

        case 'ideal-gas-law':
          const R = context.R || 8.314;
          result = (context.n * R * context.T) / context.V;
          steps.push(`P = (nRT) / V = (${this.formatNumber(context.n)} × ${R} × ${this.formatNumber(context.T)}) / ${this.formatNumber(context.V)}`);
          break;

        case 'heat-transfer-conduction':
          result = context.k * context.A * context.dT / context.dx;
          steps.push(`q = kA(dT/dx) = ${this.formatNumber(context.k)} × ${this.formatNumber(context.A)} × ${this.formatNumber(context.dT)} / ${this.formatNumber(context.dx)}`);
          break;

        case 'euler-buckling':
          result = (Math.PI * Math.PI * context.E * context.I) / Math.pow(context.K * context.L, 2);
          steps.push(`Pcr = (π²EI) / (KL)² = (π² × ${this.formatNumber(context.E)} × ${this.formatNumber(context.I)}) / (${this.formatNumber(context.K)} × ${this.formatNumber(context.L)})²`);
          break;

        // New advanced formulas
        case 'fluid-flow-rate':
          result = context.A * context.v;
          steps.push(`Q = A × v = ${this.formatNumber(context.A)} × ${this.formatNumber(context.v)}`);
          break;

        case 'bernoulli-equation':
          result = context.P1 + 0.5 * context.ρ * Math.pow(context.v1, 2) + context.ρ * context.g * context.h1;
          steps.push(`E = P + ½ρv² + ρgh`);
          steps.push(`E = ${this.formatNumber(context.P1)} + 0.5×${this.formatNumber(context.ρ)}×${this.formatNumber(context.v1)}² + ${this.formatNumber(context.ρ)}×${this.formatNumber(context.g)}×${this.formatNumber(context.h1)}`);
          break;

        case 'moment-of-inertia-rectangle':
          result = (context.b * Math.pow(context.h, 3)) / 12;
          steps.push(`I = bh³/12 = ${this.formatNumber(context.b)} × ${this.formatNumber(context.h)}³ / 12`);
          break;

        case 'shear-stress':
          result = context.V / context.A;
          steps.push(`τ = V / A = ${this.formatNumber(context.V)} / ${this.formatNumber(context.A)}`);
          break;

        case 'thermal-expansion':
          result = context.α * context.L * context.ΔT;
          steps.push(`ΔL = αLΔT = ${this.formatNumber(context.α)} × ${this.formatNumber(context.L)} × ${this.formatNumber(context.ΔT)}`);
          break;

        case 'ac-impedance':
          result = Math.sqrt(Math.pow(context.R, 2) + Math.pow(context.X, 2));
          steps.push(`Z = √(R² + X²) = √(${this.formatNumber(context.R)}² + ${this.formatNumber(context.X)}²)`);
          break;

        case 'transformer-ratio':
          result = context.Np / context.Ns;
          steps.push(`a = Np / Ns = ${this.formatNumber(context.Np)} / ${this.formatNumber(context.Ns)}`);
          break;

        case 'three-phase-power':
          result = Math.sqrt(3) * context.VL * context.IL * Math.cos(context.φ * Math.PI / 180);
          steps.push(`P = √3 × VL × IL × cos(φ)`);
          steps.push(`P = √3 × ${this.formatNumber(context.VL)} × ${this.formatNumber(context.IL)} × cos(${this.formatNumber(context.φ)}°)`);
          break;

        case 'pump-power':
          result = (context.ρ * context.g * context.Q * context.H) / context.η;
          steps.push(`P = (ρgQH) / η = (${this.formatNumber(context.ρ)} × ${this.formatNumber(context.g)} × ${this.formatNumber(context.Q)} × ${this.formatNumber(context.H)}) / ${this.formatNumber(context.η)}`);
          break;

        case 'pipe-friction':
          result = context.f * (context.L / context.D) * (Math.pow(context.v, 2) / (2 * context.g));
          steps.push(`hf = f × (L/D) × (v²/2g)`);
          steps.push(`hf = ${this.formatNumber(context.f)} × (${this.formatNumber(context.L)}/${this.formatNumber(context.D)}) × (${this.formatNumber(context.v)}²/(2×${this.formatNumber(context.g)}))`);
          break;

        case 'mohr-circle-analysis':
          // Calculate principal stresses using Mohr circle analysis
          const σx = context.σₓ || context['σx'] || 0;
          const σy = context.σᵧ || context['σy'] || 0;
          const τxy = context.τₘᵧ || context['τxy'] || 0;
          
          const σavg = (σx + σy) / 2;
          const mohrRadius = Math.sqrt(Math.pow((σx - σy) / 2, 2) + Math.pow(τxy, 2));
          const σ1 = σavg + mohrRadius; // Maximum principal stress
          const σ2 = σavg - mohrRadius; // Minimum principal stress
          
          result = σ1; // Return maximum principal stress
          
          steps.push(`Mohr Circle Analysis:`);
          steps.push(`σₓ = ${this.formatNumber(σx)} Pa, σᵧ = ${this.formatNumber(σy)} Pa, τₓᵧ = ${this.formatNumber(τxy)} Pa`);
          steps.push(`Average stress: σₐᵥₐ = (σₓ + σᵧ)/2 = ${this.formatNumber(σavg)} Pa`);
          steps.push(`Radius: R = √[((σₓ - σᵧ)/2)² + τₓᵧ²] = ${this.formatNumber(mohrRadius)} Pa`);
          steps.push(`σ₁ = σₐᵥₐ + R = ${this.formatNumber(σavg)} + ${this.formatNumber(mohrRadius)} = ${this.formatNumber(σ1)} Pa`);
          steps.push(`σ₂ = σₐᵥₐ - R = ${this.formatNumber(σavg)} - ${this.formatNumber(mohrRadius)} = ${this.formatNumber(σ2)} Pa`);
          break;

        case 'mohr-circle-stress':
          // Alternative implementation for mohr-circle-stress ID
          const sigmaX = context.σx || 0;
          const sigmaY = context.σy || 0;
          const tauXY = context.τxy || 0;
          
          const avgStress = (sigmaX + sigmaY) / 2;
          const radius = Math.sqrt(Math.pow((sigmaX - sigmaY) / 2, 2) + Math.pow(tauXY, 2));
          result = avgStress + radius; // Maximum principal stress
          
          steps.push(`σ₁ = (σₓ + σᵧ)/2 + √[((σₓ - σᵧ)/2)² + τₓᵧ²]`);
          steps.push(`σ₁ = (${this.formatNumber(sigmaX)} + ${this.formatNumber(sigmaY)})/2 + √[((${this.formatNumber(sigmaX)} - ${this.formatNumber(sigmaY)})/2)² + ${this.formatNumber(tauXY)}²]`);
          steps.push(`σ₁ = ${this.formatNumber(avgStress)} + ${this.formatNumber(radius)}`);
          break;

        default:
          // Try to evaluate the formula directly using mathjs
          try {
            const expression = formula.formula.replace(/[a-zA-Z_][a-zA-Z0-9_]*/g, (match) => {
              return context[match]?.toString() || match;
            });
            result = evaluate(expression);
            steps.push(`Direct evaluation: ${expression}`);
          } catch (e) {
            throw new Error(`Formula calculation not implemented: ${formula.id}`);
          }
      }

      steps.push(`Result: ${this.formatNumber(result)} ${formula.units || ''}`);

      // Calculate accuracy based on input precision and formula complexity
      accuracy = Math.min(1.0, 1.0 - (warnings.length * 0.1));

      return {
        result,
        steps,
        units: formula.units || '',
        accuracy,
        warnings
      };

    } catch (error) {
      console.error('Calculation error:', error);
      throw new Error(`Calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}