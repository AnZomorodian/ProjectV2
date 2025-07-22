import { Formula } from '../types/formula';

export const formulas: Formula[] = [
  // Mechanical Engineering - Basic
  {
    id: 'stress-formula',
    name: 'Mechanical Stress (σ)',
    description: 'Calculate mechanical stress in materials under applied force',
    formula: 'σ = F / A',
    variables: [
      { 
        symbol: 'F', 
        name: 'Applied Force', 
        unit: 'N',
        description: 'The force applied perpendicular to the cross-sectional area',
        min: 0
      },
      { 
        symbol: 'A', 
        name: 'Cross-sectional Area', 
        unit: 'm²',
        description: 'The area over which the force is distributed',
        min: 0.000001
      }
    ],
    category: 'Material Properties',
    discipline: 'Mechanical',
    units: 'Pa',
    difficulty: 'Basic',
    tags: ['stress', 'materials', 'strength'],
    examples: [
      {
        title: 'Steel Rod Under Tension',
        inputs: { F: 10000, A: 0.001 },
        expectedResult: 10000000,
        description: 'A steel rod with 1 cm² cross-section under 10 kN force'
      }
    ],
    references: ['Mechanics of Materials - Beer & Johnston']
  },
  {
    id: 'strain-formula',
    name: 'Mechanical Strain (ε)',
    description: 'Calculate mechanical strain as relative deformation',
    formula: 'ε = ΔL / L₀',
    variables: [
      { 
        symbol: 'ΔL', 
        name: 'Change in Length', 
        unit: 'm',
        description: 'The change in length due to applied load'
      },
      { 
        symbol: 'L₀', 
        name: 'Original Length', 
        unit: 'm',
        description: 'The original length before deformation',
        min: 0.001
      }
    ],
    category: 'Material Properties',
    discipline: 'Mechanical',
    units: 'dimensionless',
    difficulty: 'Basic',
    tags: ['strain', 'deformation', 'materials'],
    examples: [
      {
        title: 'Concrete Column Compression',
        inputs: { 'ΔL': 0.002, 'L₀': 3 },
        expectedResult: 0.000667,
        description: 'A 3m concrete column compressed by 2mm'
      }
    ]
  },
  {
    id: 'youngs-modulus',
    name: "Young's Modulus (E)",
    description: 'Calculate elastic modulus from stress-strain relationship',
    formula: 'E = σ / ε',
    variables: [
      { symbol: 'σ', name: 'Stress', unit: 'Pa', min: 0 },
      { symbol: 'ε', name: 'Strain', unit: 'dimensionless', min: 0.000001 }
    ],
    category: 'Material Properties',
    discipline: 'Mechanical',
    units: 'Pa',
    difficulty: 'Intermediate',
    tags: ['elasticity', 'modulus', 'materials'],
    examples: [
      {
        title: 'Steel Material Testing',
        inputs: { σ: 200000000, ε: 0.001 },
        expectedResult: 200000000000,
        description: 'Typical steel with 200 MPa stress and 0.1% strain'
      }
    ]
  },
  {
    id: 'power-formula',
    name: 'Mechanical Power',
    description: 'Calculate mechanical power from force and velocity',
    formula: 'P = F × v',
    variables: [
      { symbol: 'F', name: 'Force', unit: 'N', min: 0 },
      { symbol: 'v', name: 'Velocity', unit: 'm/s', min: 0 }
    ],
    category: 'Power & Energy',
    discipline: 'Mechanical',
    units: 'W',
    difficulty: 'Basic',
    tags: ['power', 'force', 'velocity'],
    examples: [
      {
        title: 'Car Engine Power',
        inputs: { F: 2000, v: 30 },
        expectedResult: 60000,
        description: 'Car with 2000N driving force at 30 m/s (108 km/h)'
      }
    ]
  },
  
  // Electrical Engineering
  {
    id: 'ohms-law',
    name: "Ohm's Law (V = IR)",
    description: 'Calculate voltage using fundamental electrical relationship',
    formula: 'V = I × R',
    variables: [
      { symbol: 'I', name: 'Current', unit: 'A', min: 0 },
      { symbol: 'R', name: 'Resistance', unit: 'Ω', min: 0.001 }
    ],
    category: 'Basic Laws',
    discipline: 'Electrical',
    units: 'V',
    difficulty: 'Basic',
    tags: ['voltage', 'current', 'resistance', 'ohm'],
    examples: [
      {
        title: 'LED Circuit',
        inputs: { I: 0.02, R: 220 },
        expectedResult: 4.4,
        description: '20mA through 220Ω resistor for LED protection'
      }
    ]
  },
  {
    id: 'electrical-power',
    name: 'Electrical Power',
    description: 'Calculate electrical power consumption',
    formula: 'P = V × I',
    variables: [
      { symbol: 'V', name: 'Voltage', unit: 'V', min: 0 },
      { symbol: 'I', name: 'Current', unit: 'A', min: 0 }
    ],
    category: 'Power & Energy',
    discipline: 'Electrical',
    units: 'W',
    difficulty: 'Basic',
    tags: ['power', 'voltage', 'current'],
    examples: [
      {
        title: 'Household Appliance',
        inputs: { V: 120, I: 10 },
        expectedResult: 1200,
        description: 'Microwave operating at 120V drawing 10A'
      }
    ]
  },
  {
    id: 'capacitive-reactance',
    name: 'Capacitive Reactance',
    description: 'Calculate impedance of capacitor in AC circuit',
    formula: 'Xc = 1 / (2πfC)',
    variables: [
      { symbol: 'f', name: 'Frequency', unit: 'Hz', min: 0.1 },
      { symbol: 'C', name: 'Capacitance', unit: 'F', min: 0.000000001 }
    ],
    category: 'AC Analysis',
    discipline: 'Electrical',
    units: 'Ω',
    difficulty: 'Intermediate',
    tags: ['reactance', 'capacitor', 'ac', 'impedance'],
    examples: [
      {
        title: 'Audio Coupling Capacitor',
        inputs: { f: 1000, C: 0.000001 },
        expectedResult: 159.15,
        description: '1µF capacitor at 1kHz audio frequency'
      }
    ]
  },
  {
    id: 'inductive-reactance',
    name: 'Inductive Reactance',
    description: 'Calculate impedance of inductor in AC circuit',
    formula: 'XL = 2πfL',
    variables: [
      { symbol: 'f', name: 'Frequency', unit: 'Hz', min: 0.1 },
      { symbol: 'L', name: 'Inductance', unit: 'H', min: 0.000001 }
    ],
    category: 'AC Analysis',
    discipline: 'Electrical',
    units: 'Ω',
    difficulty: 'Intermediate',
    tags: ['reactance', 'inductor', 'ac', 'impedance'],
    examples: [
      {
        title: 'RF Choke Inductor',
        inputs: { f: 100000, L: 0.001 },
        expectedResult: 628.32,
        description: '1mH inductor at 100kHz RF frequency'
      }
    ]
  },

  // Civil Engineering
  {
    id: 'beam-deflection',
    name: 'Simply Supported Beam Deflection',
    description: 'Calculate maximum deflection of uniformly loaded beam',
    formula: 'δ = (5wL⁴) / (384EI)',
    variables: [
      { symbol: 'w', name: 'Distributed Load', unit: 'N/m', min: 0 },
      { symbol: 'L', name: 'Beam Length', unit: 'm', min: 0.1 },
      { symbol: 'E', name: 'Elastic Modulus', unit: 'Pa', min: 1000000 },
      { symbol: 'I', name: 'Moment of Inertia', unit: 'm⁴', min: 0.000000001 }
    ],
    category: 'Structural Analysis',
    discipline: 'Civil',
    units: 'm',
    difficulty: 'Advanced',
    tags: ['beam', 'deflection', 'structural', 'bending'],
    examples: [
      {
        title: 'Steel I-Beam Floor',
        inputs: { w: 5000, L: 6, E: 200000000000, I: 0.0001 },
        expectedResult: 0.00844,
        description: '6m steel beam with 5kN/m load (typical floor beam)'
      }
    ]
  },
  {
    id: 'concrete-strength',
    name: 'Concrete Compressive Strength',
    description: 'Calculate compressive strength from cylinder test',
    formula: 'fc = P / A',
    variables: [
      { symbol: 'P', name: 'Maximum Load', unit: 'N', min: 0 },
      { symbol: 'A', name: 'Cross-sectional Area', unit: 'm²', min: 0.001 }
    ],
    category: 'Materials Testing',
    discipline: 'Civil',
    units: 'Pa',
    difficulty: 'Basic',
    tags: ['concrete', 'compression', 'strength', 'testing'],
    examples: [
      {
        title: 'Standard Concrete Cylinder',
        inputs: { P: 890000, A: 0.0177 },
        expectedResult: 50282486,
        description: '6" diameter cylinder test (typical 28-day strength)'
      }
    ]
  },
  {
    id: 'soil-bearing-capacity',
    name: 'Ultimate Bearing Capacity',
    description: 'Calculate ultimate bearing capacity of soil using Terzaghi equation',
    formula: 'qu = cNc + γDfNq + 0.5γBNγ',
    variables: [
      { symbol: 'c', name: 'Soil Cohesion', unit: 'Pa', min: 0 },
      { symbol: 'Nc', name: 'Bearing Capacity Factor (Nc)', unit: 'dimensionless', min: 1 },
      { symbol: 'γ', name: 'Unit Weight of Soil', unit: 'N/m³', min: 10000 },
      { symbol: 'Df', name: 'Foundation Depth', unit: 'm', min: 0 },
      { symbol: 'Nq', name: 'Bearing Capacity Factor (Nq)', unit: 'dimensionless', min: 1 },
      { symbol: 'B', name: 'Foundation Width', unit: 'm', min: 0.1 },
      { symbol: 'Nγ', name: 'Bearing Capacity Factor (Nγ)', unit: 'dimensionless', min: 0 }
    ],
    category: 'Geotechnical',
    discipline: 'Civil',
    units: 'Pa',
    difficulty: 'Advanced',
    tags: ['bearing', 'capacity', 'foundation', 'soil'],
    examples: [
      {
        title: 'Strip Foundation on Clay',
        inputs: { c: 50000, Nc: 5.7, γ: 18000, Df: 1.5, Nq: 1, B: 2, Nγ: 0 },
        expectedResult: 312000,
        description: 'Strip footing on cohesive soil with typical parameters'
      }
    ]
  },

  // Chemical Engineering
  {
    id: 'reynolds-number',
    name: 'Reynolds Number',
    description: 'Determine flow regime in pipes and channels',
    formula: 'Re = (ρvD) / μ',
    variables: [
      { symbol: 'ρ', name: 'Fluid Density', unit: 'kg/m³', min: 0.1 },
      { symbol: 'v', name: 'Fluid Velocity', unit: 'm/s', min: 0 },
      { symbol: 'D', name: 'Characteristic Length', unit: 'm', min: 0.001 },
      { symbol: 'μ', name: 'Dynamic Viscosity', unit: 'Pa·s', min: 0.000001 }
    ],
    category: 'Fluid Mechanics',
    discipline: 'Chemical',
    units: 'dimensionless',
    difficulty: 'Intermediate',
    tags: ['reynolds', 'flow', 'turbulence', 'fluid'],
    examples: [
      {
        title: 'Water in Pipe',
        inputs: { ρ: 1000, v: 2, D: 0.1, μ: 0.001 },
        expectedResult: 200000,
        description: 'Water flowing at 2 m/s in 10cm diameter pipe'
      }
    ]
  },
  {
    id: 'ideal-gas-law',
    name: 'Ideal Gas Law',
    description: 'Relate pressure, volume, temperature, and amount of gas',
    formula: 'P = (nRT) / V',
    variables: [
      { symbol: 'n', name: 'Amount of Gas', unit: 'mol', min: 0.001 },
      { symbol: 'R', name: 'Gas Constant', unit: 'J/(mol·K)', value: 8.314 },
      { symbol: 'T', name: 'Temperature', unit: 'K', min: 1 },
      { symbol: 'V', name: 'Volume', unit: 'm³', min: 0.000001 }
    ],
    category: 'Thermodynamics',
    discipline: 'Chemical',
    units: 'Pa',
    difficulty: 'Basic',
    tags: ['gas', 'pressure', 'temperature', 'volume'],
    examples: [
      {
        title: 'Standard Conditions',
        inputs: { n: 1, R: 8.314, T: 273.15, V: 0.0224 },
        expectedResult: 101325,
        description: '1 mole of gas at STP (0°C, 1 atm)'
      }
    ]
  },
  {
    id: 'heat-transfer-conduction',
    name: 'Heat Conduction (Fourier Law)',
    description: 'Calculate heat transfer rate through conduction',
    formula: 'q = -kA(dT/dx)',
    variables: [
      { symbol: 'k', name: 'Thermal Conductivity', unit: 'W/(m·K)', min: 0.01 },
      { symbol: 'A', name: 'Cross-sectional Area', unit: 'm²', min: 0.0001 },
      { symbol: 'dT', name: 'Temperature Difference', unit: 'K', min: 0 },
      { symbol: 'dx', name: 'Thickness', unit: 'm', min: 0.001 }
    ],
    category: 'Heat Transfer',
    discipline: 'Chemical',
    units: 'W',
    difficulty: 'Intermediate',
    tags: ['heat', 'conduction', 'thermal', 'fourier'],
    examples: [
      {
        title: 'Wall Heat Loss',
        inputs: { k: 0.04, A: 20, dT: 20, dx: 0.2 },
        expectedResult: 80,
        description: 'Heat loss through 20cm insulated wall with 20K difference'
      }
    ]
  },

  // Advanced Formulas
  {
    id: 'fluid-flow-rate',
    name: 'Fluid Flow Rate',
    description: 'Calculate volumetric flow rate through a pipe or channel',
    formula: 'Q = A × v',
    variables: [
      { symbol: 'A', name: 'Cross-sectional Area', unit: 'm²', min: 0.0001 },
      { symbol: 'v', name: 'Average Velocity', unit: 'm/s', min: 0 }
    ],
    category: 'Fluid Mechanics',
    discipline: 'Chemical',
    units: 'm³/s',
    difficulty: 'Basic',
    tags: ['flow', 'velocity', 'area', 'fluid'],
    examples: [
      {
        title: 'Water Pipe Flow',
        inputs: { A: 0.0314, v: 2.5 },
        expectedResult: 0.0785,
        description: '6-inch diameter pipe with 2.5 m/s water velocity'
      }
    ]
  },
  {
    id: 'bernoulli-equation',
    name: 'Bernoulli Energy Equation',
    description: 'Calculate total mechanical energy per unit volume in fluid flow',
    formula: 'E = P + ½ρv² + ρgh',
    variables: [
      { symbol: 'P1', name: 'Pressure', unit: 'Pa', min: 0 },
      { symbol: 'ρ', name: 'Fluid Density', unit: 'kg/m³', min: 0.1 },
      { symbol: 'v1', name: 'Velocity', unit: 'm/s', min: 0 },
      { symbol: 'g', name: 'Gravitational Acceleration', unit: 'm/s²', value: 9.81 },
      { symbol: 'h1', name: 'Height', unit: 'm', min: 0 }
    ],
    category: 'Fluid Mechanics',
    discipline: 'Chemical',
    units: 'Pa',
    difficulty: 'Advanced',
    tags: ['bernoulli', 'energy', 'pressure', 'velocity'],
    examples: [
      {
        title: 'Water Tank Outlet',
        inputs: { P1: 101325, ρ: 1000, v1: 3, g: 9.81, h1: 5 },
        expectedResult: 150825,
        description: 'Water flowing from elevated tank'
      }
    ]
  },
  {
    id: 'moment-of-inertia-rectangle',
    name: 'Moment of Inertia (Rectangle)',
    description: 'Calculate second moment of area for rectangular cross-section',
    formula: 'I = bh³/12',
    variables: [
      { symbol: 'b', name: 'Width', unit: 'm', min: 0.001 },
      { symbol: 'h', name: 'Height', unit: 'm', min: 0.001 }
    ],
    category: 'Structural Analysis',
    discipline: 'Civil',
    units: 'm⁴',
    difficulty: 'Intermediate',
    tags: ['moment', 'inertia', 'rectangle', 'beam'],
    examples: [
      {
        title: 'Concrete Beam Section',
        inputs: { b: 0.3, h: 0.6 },
        expectedResult: 0.0054,
        description: '300mm × 600mm concrete beam cross-section'
      }
    ]
  },
  {
    id: 'shear-stress',
    name: 'Shear Stress',
    description: 'Calculate shear stress in structural members',
    formula: 'τ = V / A',
    variables: [
      { symbol: 'V', name: 'Shear Force', unit: 'N', min: 0 },
      { symbol: 'A', name: 'Shear Area', unit: 'm²', min: 0.0001 }
    ],
    category: 'Structural Analysis',
    discipline: 'Civil',
    units: 'Pa',
    difficulty: 'Basic',
    tags: ['shear', 'stress', 'force'],
    examples: [
      {
        title: 'Bolt in Shear',
        inputs: { V: 50000, A: 0.0003 },
        expectedResult: 166666667,
        description: '50kN force on 20mm diameter bolt'
      }
    ]
  },
  {
    id: 'thermal-expansion',
    name: 'Linear Thermal Expansion',
    description: 'Calculate change in length due to temperature change',
    formula: 'ΔL = αLΔT',
    variables: [
      { symbol: 'α', name: 'Coefficient of Expansion', unit: '1/K', min: 0 },
      { symbol: 'L', name: 'Original Length', unit: 'm', min: 0.001 },
      { symbol: 'ΔT', name: 'Temperature Change', unit: 'K', min: 0 }
    ],
    category: 'Material Properties',
    discipline: 'Mechanical',
    units: 'm',
    difficulty: 'Basic',
    tags: ['thermal', 'expansion', 'temperature'],
    examples: [
      {
        title: 'Steel Bridge Expansion',
        inputs: { α: 0.000012, L: 100, ΔT: 40 },
        expectedResult: 0.048,
        description: '100m steel bridge with 40K temperature rise'
      }
    ]
  },
  {
    id: 'ac-impedance',
    name: 'AC Circuit Impedance',
    description: 'Calculate total impedance in AC circuits',
    formula: 'Z = √(R² + X²)',
    variables: [
      { symbol: 'R', name: 'Resistance', unit: 'Ω', min: 0 },
      { symbol: 'X', name: 'Reactance', unit: 'Ω', min: 0 }
    ],
    category: 'AC Analysis',
    discipline: 'Electrical',
    units: 'Ω',
    difficulty: 'Intermediate',
    tags: ['impedance', 'ac', 'resistance', 'reactance'],
    examples: [
      {
        title: 'RLC Circuit',
        inputs: { R: 100, X: 75 },
        expectedResult: 125,
        description: 'Circuit with 100Ω resistance and 75Ω net reactance'
      }
    ]
  },
  {
    id: 'transformer-ratio',
    name: 'Transformer Turns Ratio',
    description: 'Calculate voltage transformation ratio',
    formula: 'a = Np / Ns',
    variables: [
      { symbol: 'Np', name: 'Primary Turns', unit: 'turns', min: 1 },
      { symbol: 'Ns', name: 'Secondary Turns', unit: 'turns', min: 1 }
    ],
    category: 'Power Systems',
    discipline: 'Electrical',
    units: 'ratio',
    difficulty: 'Basic',
    tags: ['transformer', 'turns', 'ratio'],
    examples: [
      {
        title: 'Step-down Transformer',
        inputs: { Np: 2400, Ns: 240 },
        expectedResult: 10,
        description: '2400V to 240V transformer (10:1 ratio)'
      }
    ]
  },
  {
    id: 'three-phase-power',
    name: 'Three-Phase Power',
    description: 'Calculate power in balanced three-phase systems',
    formula: 'P = √3 × VL × IL × cos(φ)',
    variables: [
      { symbol: 'VL', name: 'Line Voltage', unit: 'V', min: 0 },
      { symbol: 'IL', name: 'Line Current', unit: 'A', min: 0 },
      { symbol: 'φ', name: 'Power Factor Angle', unit: 'degrees', min: 0, max: 90 }
    ],
    category: 'Power Systems',
    discipline: 'Electrical',
    units: 'W',
    difficulty: 'Advanced',
    tags: ['three-phase', 'power', 'voltage', 'current'],
    examples: [
      {
        title: 'Industrial Motor',
        inputs: { VL: 480, IL: 100, φ: 30 },
        expectedResult: 72111,
        description: '480V, 100A three-phase motor with 30° phase angle'
      }
    ]
  },
  {
    id: 'pump-power',
    name: 'Pump Hydraulic Power',
    description: 'Calculate power required for pumping fluids',
    formula: 'P = (ρgQH) / η',
    variables: [
      { symbol: 'ρ', name: 'Fluid Density', unit: 'kg/m³', min: 0.1 },
      { symbol: 'g', name: 'Gravitational Acceleration', unit: 'm/s²', value: 9.81 },
      { symbol: 'Q', name: 'Flow Rate', unit: 'm³/s', min: 0 },
      { symbol: 'H', name: 'Total Head', unit: 'm', min: 0 },
      { symbol: 'η', name: 'Pump Efficiency', unit: 'decimal', min: 0.1, max: 1.0 }
    ],
    category: 'Fluid Mechanics',
    discipline: 'Chemical',
    units: 'W',
    difficulty: 'Advanced',
    tags: ['pump', 'power', 'flow', 'head'],
    examples: [
      {
        title: 'Water Pump System',
        inputs: { ρ: 1000, g: 9.81, Q: 0.1, H: 50, η: 0.8 },
        expectedResult: 61312.5,
        description: 'Pumping 100 L/s of water to 50m height at 80% efficiency'
      }
    ]
  },
  {
    id: 'pipe-friction',
    name: 'Pipe Friction Head Loss',
    description: 'Calculate head loss due to friction in pipes',
    formula: 'hf = f × (L/D) × (v²/2g)',
    variables: [
      { symbol: 'f', name: 'Friction Factor', unit: 'dimensionless', min: 0.001, max: 0.1 },
      { symbol: 'L', name: 'Pipe Length', unit: 'm', min: 0.1 },
      { symbol: 'D', name: 'Pipe Diameter', unit: 'm', min: 0.001 },
      { symbol: 'v', name: 'Velocity', unit: 'm/s', min: 0 },
      { symbol: 'g', name: 'Gravitational Acceleration', unit: 'm/s²', value: 9.81 }
    ],
    category: 'Fluid Mechanics',
    discipline: 'Chemical',
    units: 'm',
    difficulty: 'Advanced',
    tags: ['friction', 'head loss', 'pipe', 'flow'],
    examples: [
      {
        title: 'Water Pipeline',
        inputs: { f: 0.02, L: 1000, D: 0.5, v: 2, g: 9.81 },
        expectedResult: 8.16,
        description: '1km pipeline, 0.5m diameter, 2 m/s water flow'
      }
    ]
  },
  {
    id: 'euler-buckling',
    name: 'Euler Buckling Load',
    description: 'Calculate critical buckling load for columns',
    formula: 'Pcr = (π²EI) / (KL)²',
    variables: [
      { symbol: 'E', name: 'Elastic Modulus', unit: 'Pa', min: 1000000 },
      { symbol: 'I', name: 'Moment of Inertia', unit: 'm⁴', min: 0.000000001 },
      { symbol: 'K', name: 'Effective Length Factor', unit: 'dimensionless', min: 0.5, max: 2 },
      { symbol: 'L', name: 'Column Length', unit: 'm', min: 0.1 }
    ],
    category: 'Structural Stability',
    discipline: 'Mechanical',
    units: 'N',
    difficulty: 'Advanced',
    tags: ['buckling', 'column', 'stability', 'euler'],
    examples: [
      {
        title: 'Steel Column Design',
        inputs: { E: 200000000000, I: 0.00008, K: 1, L: 4 },
        expectedResult: 9869604.4,
        description: '4m steel column with pinned ends'
      }
    ]
  },
  // New Advanced Formulas
  {
    id: 'reynolds-number-advanced',
    name: 'Reynolds Number',
    description: 'Dimensionless number characterizing fluid flow regime',
    formula: 'Re = ρvD / μ',
    variables: [
      { symbol: 'ρ', name: 'Fluid Density', unit: 'kg/m³', min: 0.1 },
      { symbol: 'v', name: 'Flow Velocity', unit: 'm/s', min: 0 },
      { symbol: 'D', name: 'Characteristic Length', unit: 'm', min: 0.001 },
      { symbol: 'μ', name: 'Dynamic Viscosity', unit: 'Pa·s', min: 0.000001 }
    ],
    category: 'Fluid Mechanics',
    discipline: 'Mechanical',
    units: 'dimensionless',
    difficulty: 'Intermediate',
    tags: ['reynolds', 'flow', 'turbulence', 'dimensionless'],
    examples: [
      {
        title: 'Water Flow in Pipe',
        inputs: { ρ: 1000, v: 2, D: 0.1, μ: 0.001 },
        expectedResult: 200000,
        description: 'Water flowing at 2 m/s in 10cm diameter pipe'
      }
    ]
  },
  {
    id: 'navier-stokes-simplified',
    name: 'Pressure Drop (Simplified)',
    description: 'Simplified pressure drop for viscous flow',
    formula: 'ΔP = 32μLv / D²',
    variables: [
      { symbol: 'μ', name: 'Dynamic Viscosity', unit: 'Pa·s', min: 0.000001 },
      { symbol: 'L', name: 'Length', unit: 'm', min: 0.01 },
      { symbol: 'v', name: 'Average Velocity', unit: 'm/s', min: 0 },
      { symbol: 'D', name: 'Diameter', unit: 'm', min: 0.001 }
    ],
    category: 'Fluid Mechanics',
    discipline: 'Chemical',
    units: 'Pa',
    difficulty: 'Advanced',
    tags: ['pressure', 'viscous', 'flow', 'navier-stokes'],
    examples: [
      {
        title: 'Oil Flow in Capillary',
        inputs: { μ: 0.1, L: 1, v: 0.01, D: 0.001 },
        expectedResult: 32000,
        description: 'Viscous oil flowing through 1mm capillary'
      }
    ]
  },
  {
    id: 'fourier-heat-conduction',
    name: 'Fourier Heat Conduction',
    description: 'One-dimensional steady-state heat conduction',
    formula: 'q = kA(T1 - T2) / L',
    variables: [
      { symbol: 'k', name: 'Thermal Conductivity', unit: 'W/(m·K)', min: 0.01 },
      { symbol: 'A', name: 'Cross-sectional Area', unit: 'm²', min: 0.0001 },
      { symbol: 'T1', name: 'Hot Side Temperature', unit: 'K', min: 273 },
      { symbol: 'T2', name: 'Cold Side Temperature', unit: 'K', min: 273 },
      { symbol: 'L', name: 'Length', unit: 'm', min: 0.001 }
    ],
    category: 'Heat Transfer',
    discipline: 'Mechanical',
    units: 'W',
    difficulty: 'Intermediate',
    tags: ['heat', 'conduction', 'fourier', 'thermal'],
    examples: [
      {
        title: 'Heat Through Wall',
        inputs: { k: 0.8, A: 10, T1: 323, T2: 293, L: 0.2 },
        expectedResult: 1200,
        description: 'Heat transfer through 20cm thick concrete wall'
      }
    ]
  },
  {
    id: 'maxwell-faraday',
    name: 'Faraday\'s Law of Induction',
    description: 'Electromagnetic induction in a coil',
    formula: 'ε = -N × dΦ/dt',
    variables: [
      { symbol: 'N', name: 'Number of Turns', unit: 'turns', min: 1, max: 10000 },
      { symbol: 'dΦ/dt', name: 'Rate of Flux Change', unit: 'Wb/s', description: 'Rate of change of magnetic flux' }
    ],
    category: 'Electromagnetic',
    discipline: 'Electrical',
    units: 'V',
    difficulty: 'Advanced',
    tags: ['faraday', 'induction', 'electromagnetic', 'voltage'],
    examples: [
      {
        title: 'Generator Coil',
        inputs: { N: 100, 'dΦ/dt': 0.01 },
        expectedResult: -1,
        description: '100-turn coil with changing magnetic flux'
      }
    ]
  },
  {
    id: 'mohr-circle-stress',
    name: 'Principal Stress (Mohr\'s Circle)',
    description: 'Maximum principal stress using Mohr\'s circle',
    formula: 'σ1 = (σx + σy)/2 + √[((σx - σy)/2)² + τxy²]',
    variables: [
      { symbol: 'σx', name: 'Normal Stress X', unit: 'Pa', description: 'Normal stress in x-direction' },
      { symbol: 'σy', name: 'Normal Stress Y', unit: 'Pa', description: 'Normal stress in y-direction' },
      { symbol: 'τxy', name: 'Shear Stress XY', unit: 'Pa', description: 'Shear stress in xy-plane' }
    ],
    category: 'Material Properties',
    discipline: 'Mechanical',
    units: 'Pa',
    difficulty: 'Advanced',
    tags: ['mohr', 'principal', 'stress', 'circle'],
    examples: [
      {
        title: 'Biaxial Stress State',
        inputs: { σx: 50000000, σy: 30000000, τxy: 20000000 },
        expectedResult: 68284271,
        description: 'Complex stress state with normal and shear components'
      }
    ]
  },
  {
    id: 'shannon-capacity',
    name: 'Shannon Channel Capacity',
    description: 'Maximum data rate of a communication channel',
    formula: 'C = B × log₂(1 + S/N)',
    variables: [
      { symbol: 'B', name: 'Bandwidth', unit: 'Hz', min: 1 },
      { symbol: 'S/N', name: 'Signal-to-Noise Ratio', unit: 'ratio', min: 0.1, description: 'Linear SNR (not dB)' }
    ],
    category: 'Information Theory',
    discipline: 'Electrical',
    units: 'bits/s',
    difficulty: 'Advanced',
    tags: ['shannon', 'capacity', 'information', 'communication'],
    examples: [
      {
        title: 'WiFi Channel',
        inputs: { B: 20000000, 'S/N': 1000 },
        expectedResult: 199316350,
        description: '20 MHz WiFi channel with 30dB SNR (1000:1 ratio)'
      }
    ]
  },
  {
    id: 'soil-bearing-capacity-terzaghi',
    name: 'Ultimate Bearing Capacity',
    description: 'Terzaghi bearing capacity for shallow foundations',
    formula: 'qu = cNc + γDNq + 0.5γBNγ',
    variables: [
      { symbol: 'c', name: 'Soil Cohesion', unit: 'Pa', min: 0 },
      { symbol: 'γ', name: 'Soil Unit Weight', unit: 'N/m³', min: 15000, max: 25000 },
      { symbol: 'D', name: 'Foundation Depth', unit: 'm', min: 0.5 },
      { symbol: 'B', name: 'Foundation Width', unit: 'm', min: 0.5 },
      { symbol: 'Nc', name: 'Bearing Capacity Factor (c)', unit: 'dimensionless', min: 5, max: 50 },
      { symbol: 'Nq', name: 'Bearing Capacity Factor (q)', unit: 'dimensionless', min: 1, max: 100 },
      { symbol: 'Nγ', name: 'Bearing Capacity Factor (γ)', unit: 'dimensionless', min: 0, max: 200 }
    ],
    category: 'Geotechnical',
    discipline: 'Civil',
    units: 'Pa',
    difficulty: 'Advanced',
    tags: ['bearing', 'capacity', 'foundation', 'terzaghi'],
    examples: [
      {
        title: 'Strip Footing Design',
        inputs: { c: 10000, γ: 18000, D: 1.5, B: 2, Nc: 20, Nq: 10, Nγ: 8 },
        expectedResult: 758000,
        description: '2m wide strip footing at 1.5m depth in cohesive soil'
      }
    ]
  },
  {
    id: 'mohr-circle-analysis',
    name: 'Mohr Circle Principal Stress',
    description: 'Calculate principal stresses using Mohr circle analysis',
    formula: 'σ₁,₂ = (σₓ + σᵧ)/2 ± √[((σₓ - σᵧ)/2)² + τₓᵧ²]',
    variables: [
      { symbol: 'σₓ', name: 'Normal Stress X', unit: 'Pa', min: -1000000000, max: 1000000000 },
      { symbol: 'σᵧ', name: 'Normal Stress Y', unit: 'Pa', min: -1000000000, max: 1000000000 },
      { symbol: 'τₘᵧ', name: 'Shear Stress XY', unit: 'Pa', min: -1000000000, max: 1000000000 }
    ],
    category: 'Structural Analysis',
    discipline: 'Mechanical',
    units: 'Pa',
    difficulty: 'Advanced',
    tags: ['stress', 'mohr', 'principal', 'circle'],
    examples: [
      {
        title: 'Biaxial Stress State',
        inputs: { σₓ: 50000000, σᵧ: 30000000, τₘᵧ: 20000000 },
        expectedResult: 60000000,
        description: 'Principal stress for biaxial loading condition'
      }
    ]
  },
  {
    id: 'voltage-divider-loaded',
    name: 'Loaded Voltage Divider',
    description: 'Voltage divider circuit with load resistance',
    formula: 'Vout = Vin × (R2 || RL) / (R1 + (R2 || RL))',
    variables: [
      { symbol: 'Vin', name: 'Input Voltage', unit: 'V', min: 0.1, max: 1000 },
      { symbol: 'R1', name: 'Resistor 1', unit: 'Ω', min: 1, max: 1000000 },
      { symbol: 'R2', name: 'Resistor 2', unit: 'Ω', min: 1, max: 1000000 },
      { symbol: 'RL', name: 'Load Resistance', unit: 'Ω', min: 1, max: 1000000 }
    ],
    category: 'Basic Laws',
    discipline: 'Electrical',
    units: 'V',
    difficulty: 'Intermediate',
    tags: ['voltage', 'divider', 'loaded', 'circuit'],
    examples: [
      {
        title: 'Sensor Circuit with Load',
        inputs: { Vin: 12, R1: 1000, R2: 2000, RL: 10000 },
        expectedResult: 6.67,
        description: '12V divider with 10kΩ load resistance'
      }
    ]
  },
  {
    id: 'concrete-compressive-strength',
    name: 'Concrete Compressive Strength',
    description: 'Estimate concrete compressive strength from cylinder test',
    formula: 'fc = P / A',
    variables: [
      { symbol: 'P', name: 'Applied Load', unit: 'N', min: 1000, max: 10000000 },
      { symbol: 'A', name: 'Cross-sectional Area', unit: 'm²', min: 0.001, max: 1 }
    ],
    category: 'Materials Testing',
    discipline: 'Civil',
    units: 'Pa',
    difficulty: 'Basic',
    tags: ['concrete', 'compressive', 'strength', 'testing'],
    examples: [
      {
        title: 'Standard 6-inch Cylinder Test',
        inputs: { P: 890000, A: 0.0182 },
        expectedResult: 48901099,
        description: 'Standard concrete cylinder compressive strength test'
      }
    ]
  }
];

export const disciplines = ['All', 'Mechanical', 'Electrical', 'Civil', 'Chemical'];
export const categories = [
  'All', 
  'Material Properties', 
  'Power & Energy', 
  'Basic Laws', 
  'AC Analysis', 
  'Structural Analysis', 
  'Materials Testing',
  'Geotechnical',
  'Fluid Mechanics', 
  'Thermodynamics',
  'Heat Transfer',
  'Structural Stability',
  'Electromagnetic',
  'Information Theory'
];
export const difficulties = ['All', 'Basic', 'Intermediate', 'Advanced'];