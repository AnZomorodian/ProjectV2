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
  },

  // NEW ADVANCED FORMULAS (15 additional formulas)

  // 1. Fatigue Life Prediction
  {
    id: 'fatigue-life-sn',
    name: 'S-N Fatigue Life Prediction',
    description: 'Predict fatigue life cycles using stress-life approach',
    formula: 'N = (Sf / S)^b',
    variables: [
      { symbol: 'Sf', name: 'Fatigue Strength Coefficient', unit: 'Pa', min: 100000000, max: 2000000000 },
      { symbol: 'S', name: 'Applied Stress Amplitude', unit: 'Pa', min: 1000000, max: 1000000000 },
      { symbol: 'b', name: 'Fatigue Strength Exponent', unit: 'dimensionless', min: -0.2, max: -0.05 }
    ],
    category: 'Fatigue Analysis',
    discipline: 'Mechanical',
    units: 'cycles',
    difficulty: 'Advanced',
    tags: ['fatigue', 'life', 'cycles', 'failure'],
    examples: [
      {
        title: 'Steel Component Fatigue',
        inputs: { Sf: 1000000000, S: 200000000, b: -0.1 },
        expectedResult: 31.62,
        description: 'Steel part under cyclic loading with 200 MPa stress amplitude'
      }
    ]
  },

  // 2. Heat Exchanger Effectiveness
  {
    id: 'heat-exchanger-effectiveness',
    name: 'Heat Exchanger Effectiveness',
    description: 'Calculate thermal effectiveness of heat exchanger',
    formula: 'ε = (Th_in - Th_out) / (Th_in - Tc_in)',
    variables: [
      { symbol: 'Th_in', name: 'Hot Fluid Inlet Temperature', unit: 'K', min: 300, max: 1000 },
      { symbol: 'Th_out', name: 'Hot Fluid Outlet Temperature', unit: 'K', min: 250, max: 950 },
      { symbol: 'Tc_in', name: 'Cold Fluid Inlet Temperature', unit: 'K', min: 200, max: 400 }
    ],
    category: 'Heat Transfer',
    discipline: 'Mechanical',
    units: 'dimensionless',
    difficulty: 'Intermediate',
    tags: ['heat', 'exchanger', 'effectiveness', 'thermal'],
    examples: [
      {
        title: 'Shell-and-Tube Heat Exchanger',
        inputs: { Th_in: 450, Th_out: 350, Tc_in: 300 },
        expectedResult: 0.667,
        description: 'Industrial heat exchanger with 67% effectiveness'
      }
    ]
  },

  // 3. Buckling Critical Load
  {
    id: 'euler-buckling-load',
    name: 'Euler Buckling Critical Load',
    description: 'Calculate critical load for column buckling',
    formula: 'Pcr = (π²EI) / (KL)²',
    variables: [
      { symbol: 'E', name: 'Elastic Modulus', unit: 'Pa', min: 1000000000, max: 500000000000 },
      { symbol: 'I', name: 'Moment of Inertia', unit: 'm⁴', min: 0.000000001, max: 0.01 },
      { symbol: 'K', name: 'Effective Length Factor', unit: 'dimensionless', min: 0.5, max: 2.0 },
      { symbol: 'L', name: 'Column Length', unit: 'm', min: 0.1, max: 50 }
    ],
    category: 'Structural Stability',
    discipline: 'Civil',
    units: 'N',
    difficulty: 'Advanced',
    tags: ['buckling', 'column', 'stability', 'critical'],
    examples: [
      {
        title: 'Steel Column Buckling',
        inputs: { E: 200000000000, I: 0.0001, K: 1.0, L: 5 },
        expectedResult: 7895683.52,
        description: '5m steel column with both ends pinned'
      }
    ]
  },

  // 4. Pump Efficiency
  {
    id: 'pump-efficiency',
    name: 'Pump Hydraulic Efficiency',
    description: 'Calculate efficiency of centrifugal pump',
    formula: 'η = (ρgQH) / P',
    variables: [
      { symbol: 'ρ', name: 'Fluid Density', unit: 'kg/m³', min: 500, max: 2000 },
      { symbol: 'g', name: 'Gravitational Acceleration', unit: 'm/s²', value: 9.81 },
      { symbol: 'Q', name: 'Flow Rate', unit: 'm³/s', min: 0.001, max: 10 },
      { symbol: 'H', name: 'Total Head', unit: 'm', min: 1, max: 200 },
      { symbol: 'P', name: 'Power Input', unit: 'W', min: 100, max: 1000000 }
    ],
    category: 'Fluid Machinery',
    discipline: 'Mechanical',
    units: 'dimensionless',
    difficulty: 'Intermediate',
    tags: ['pump', 'efficiency', 'hydraulic', 'power'],
    examples: [
      {
        title: 'Water Pump Performance',
        inputs: { ρ: 1000, g: 9.81, Q: 0.1, H: 30, P: 35000 },
        expectedResult: 0.84,
        description: 'Water pump with 84% efficiency at rated conditions'
      }
    ]
  },

  // 5. Antenna Gain
  {
    id: 'antenna-gain',
    name: 'Antenna Gain (dB)',
    description: 'Calculate antenna gain in decibels',
    formula: 'G = 10 × log10(4πA/λ²)',
    variables: [
      { symbol: 'A', name: 'Effective Aperture Area', unit: 'm²', min: 0.001, max: 1000 },
      { symbol: 'λ', name: 'Wavelength', unit: 'm', min: 0.001, max: 1000 }
    ],
    category: 'Electromagnetic',
    discipline: 'Electrical',
    units: 'dB',
    difficulty: 'Advanced',
    tags: ['antenna', 'gain', 'electromagnetic', 'wireless'],
    examples: [
      {
        title: 'Parabolic Dish Antenna',
        inputs: { A: 28.27, λ: 0.1 },
        expectedResult: 35.0,
        description: '6m diameter dish antenna at 3 GHz (10cm wavelength)'
      }
    ]
  },

  // 6. Soil Consolidation Settlement
  {
    id: 'soil-consolidation',
    name: 'Primary Consolidation Settlement',
    description: 'Calculate settlement due to soil consolidation',
    formula: 'S = (Cc × H × log10((σ0 + Δσ)/σ0)) / (1 + e0)',
    variables: [
      { symbol: 'Cc', name: 'Compression Index', unit: 'dimensionless', min: 0.1, max: 2.0 },
      { symbol: 'H', name: 'Layer Thickness', unit: 'm', min: 0.5, max: 50 },
      { symbol: 'σ0', name: 'Initial Effective Stress', unit: 'Pa', min: 10000, max: 1000000 },
      { symbol: 'Δσ', name: 'Stress Increase', unit: 'Pa', min: 1000, max: 500000 },
      { symbol: 'e0', name: 'Initial Void Ratio', unit: 'dimensionless', min: 0.3, max: 3.0 }
    ],
    category: 'Geotechnical',
    discipline: 'Civil',
    units: 'm',
    difficulty: 'Advanced',
    tags: ['consolidation', 'settlement', 'soil', 'foundation'],
    examples: [
      {
        title: 'Building Foundation Settlement',
        inputs: { Cc: 0.3, H: 10, σ0: 100000, Δσ: 50000, e0: 0.8 },
        expectedResult: 0.293,
        description: 'Settlement under building foundation load'
      }
    ]
  },

  // 7. Crystal Growth Rate
  {
    id: 'crystal-growth-rate',
    name: 'Crystal Growth Rate',
    description: 'Calculate crystal growth rate in crystallization process',
    formula: 'G = kg × (C - Csat)^g',
    variables: [
      { symbol: 'kg', name: 'Growth Rate Constant', unit: 'm/s', min: 0.0000001, max: 0.001 },
      { symbol: 'C', name: 'Solution Concentration', unit: 'kg/m³', min: 1, max: 1000 },
      { symbol: 'Csat', name: 'Saturation Concentration', unit: 'kg/m³', min: 0.1, max: 800 },
      { symbol: 'g', name: 'Growth Order', unit: 'dimensionless', min: 1, max: 3 }
    ],
    category: 'Crystallization',
    discipline: 'Chemical',
    units: 'm/s',
    difficulty: 'Advanced',
    tags: ['crystal', 'growth', 'crystallization', 'kinetics'],
    examples: [
      {
        title: 'Sugar Crystal Growth',
        inputs: { kg: 0.00001, C: 500, Csat: 300, g: 2 },
        expectedResult: 0.0004,
        description: 'Sugar crystallization in supersaturated solution'
      }
    ]
  },

  // 8. Wind Load Pressure
  {
    id: 'wind-load-pressure',
    name: 'Wind Load Pressure',
    description: 'Calculate wind pressure on structures',
    formula: 'p = 0.5 × ρ × v² × Cp',
    variables: [
      { symbol: 'ρ', name: 'Air Density', unit: 'kg/m³', value: 1.225 },
      { symbol: 'v', name: 'Wind Speed', unit: 'm/s', min: 5, max: 100 },
      { symbol: 'Cp', name: 'Pressure Coefficient', unit: 'dimensionless', min: 0.3, max: 2.0 }
    ],
    category: 'Wind Engineering',
    discipline: 'Civil',
    units: 'Pa',
    difficulty: 'Intermediate',
    tags: ['wind', 'pressure', 'load', 'building'],
    examples: [
      {
        title: 'Building Facade Wind Load',
        inputs: { ρ: 1.225, v: 40, Cp: 0.8 },
        expectedResult: 784,
        description: 'Wind pressure on building facade at 40 m/s wind speed'
      }
    ]
  },

  // 9. Magnetic Field Strength
  {
    id: 'magnetic-field-solenoid',
    name: 'Magnetic Field in Solenoid',
    description: 'Calculate magnetic field inside solenoid',
    formula: 'B = μ0 × n × I',
    variables: [
      { symbol: 'μ0', name: 'Permeability of Free Space', unit: 'H/m', value: 0.000001257 },
      { symbol: 'n', name: 'Turn Density', unit: 'turns/m', min: 100, max: 100000 },
      { symbol: 'I', name: 'Current', unit: 'A', min: 0.1, max: 1000 }
    ],
    category: 'Electromagnetic',
    discipline: 'Electrical',
    units: 'T',
    difficulty: 'Intermediate',
    tags: ['magnetic', 'field', 'solenoid', 'electromagnet'],
    examples: [
      {
        title: 'Electromagnet Coil',
        inputs: { μ0: 0.000001257, n: 10000, I: 5 },
        expectedResult: 0.0628,
        description: 'Solenoid with 10,000 turns/m carrying 5A current'
      }
    ]
  },

  // 10. Distillation Column Efficiency
  {
    id: 'distillation-efficiency',
    name: 'Murphree Tray Efficiency',
    description: 'Calculate efficiency of distillation tray',
    formula: 'EMV = (yn - yn+1) / (yn* - yn+1)',
    variables: [
      { symbol: 'yn', name: 'Vapor Mole Fraction Leaving', unit: 'dimensionless', min: 0, max: 1 },
      { symbol: 'yn+1', name: 'Vapor Mole Fraction Entering', unit: 'dimensionless', min: 0, max: 1 },
      { symbol: 'yn*', name: 'Equilibrium Vapor Mole Fraction', unit: 'dimensionless', min: 0, max: 1 }
    ],
    category: 'Separation Processes',
    discipline: 'Chemical',
    units: 'dimensionless',
    difficulty: 'Advanced',
    tags: ['distillation', 'efficiency', 'tray', 'separation'],
    examples: [
      {
        title: 'Ethanol-Water Distillation Tray',
        inputs: { yn: 0.65, 'yn+1': 0.45, 'yn*': 0.75 },
        expectedResult: 0.667,
        description: 'Distillation tray with 67% Murphree efficiency'
      }
    ]
  },

  // 11. Seismic Response Spectrum
  {
    id: 'seismic-response',
    name: 'Seismic Response Acceleration',
    description: 'Calculate seismic design acceleration for structures',
    formula: 'Sa = SDS × (1 + (T/T0) × (SMS/SDS - 1))',
    variables: [
      { symbol: 'SDS', name: 'Design Spectral Acceleration', unit: 'm/s²', min: 0.1, max: 20 },
      { symbol: 'T', name: 'Structure Period', unit: 's', min: 0.1, max: 5 },
      { symbol: 'T0', name: 'Transition Period', unit: 's', min: 0.05, max: 1 },
      { symbol: 'SMS', name: 'Short Period Acceleration', unit: 'm/s²', min: 0.2, max: 30 }
    ],
    category: 'Seismic Design',
    discipline: 'Civil',
    units: 'm/s²',
    difficulty: 'Advanced',
    tags: ['seismic', 'earthquake', 'response', 'design'],
    examples: [
      {
        title: 'High-Rise Building Seismic Design',
        inputs: { SDS: 1.0, T: 2.0, T0: 0.2, SMS: 1.5 },
        expectedResult: 6.0,
        description: 'Seismic acceleration for 2-second period building'
      }
    ]
  },

  // 12. Battery Energy Density
  {
    id: 'battery-energy-density',
    name: 'Battery Energy Density',
    description: 'Calculate gravimetric energy density of battery',
    formula: 'ED = (V × C × 3600) / m',
    variables: [
      { symbol: 'V', name: 'Nominal Voltage', unit: 'V', min: 1, max: 1000 },
      { symbol: 'C', name: 'Capacity', unit: 'Ah', min: 0.1, max: 1000 },
      { symbol: 'm', name: 'Mass', unit: 'kg', min: 0.01, max: 1000 }
    ],
    category: 'Energy Storage',
    discipline: 'Electrical',
    units: 'J/kg',
    difficulty: 'Intermediate',
    tags: ['battery', 'energy', 'density', 'storage'],
    examples: [
      {
        title: 'Li-ion Battery Cell',
        inputs: { V: 3.7, C: 3.5, m: 0.065 },
        expectedResult: 708000,
        description: 'Lithium-ion cell with 708 kJ/kg energy density'
      }
    ]
  },

  // 13. Thermal Expansion
  {
    id: 'linear-thermal-expansion',
    name: 'Linear Thermal Expansion',
    description: 'Calculate thermal expansion of materials',
    formula: 'ΔL = α × L0 × ΔT',
    variables: [
      { symbol: 'α', name: 'Coefficient of Thermal Expansion', unit: '1/K', min: 0.000001, max: 0.0001 },
      { symbol: 'L0', name: 'Initial Length', unit: 'm', min: 0.001, max: 1000 },
      { symbol: 'ΔT', name: 'Temperature Change', unit: 'K', min: -200, max: 1000 }
    ],
    category: 'Thermal Properties',
    discipline: 'Mechanical',
    units: 'm',
    difficulty: 'Basic',
    tags: ['thermal', 'expansion', 'temperature', 'deformation'],
    examples: [
      {
        title: 'Steel Bridge Expansion',
        inputs: { α: 0.000012, L0: 100, ΔT: 40 },
        expectedResult: 0.048,
        description: '100m steel bridge expanding 4.8cm with 40K temperature rise'
      }
    ]
  },

  // 14. Fluid Viscosity (Sutherland)',
  {
    id: 'sutherland-viscosity',
    name: 'Sutherland Viscosity Formula',
    description: 'Calculate dynamic viscosity of gases with temperature',
    formula: 'μ = μ0 × (T/T0)^(3/2) × (T0 + S)/(T + S)',
    variables: [
      { symbol: 'μ0', name: 'Reference Viscosity', unit: 'Pa·s', min: 0.000001, max: 0.001 },
      { symbol: 'T', name: 'Temperature', unit: 'K', min: 200, max: 2000 },
      { symbol: 'T0', name: 'Reference Temperature', unit: 'K', value: 273.15 },
      { symbol: 'S', name: 'Sutherland Constant', unit: 'K', min: 50, max: 500 }
    ],
    category: 'Fluid Properties',
    discipline: 'Chemical',
    units: 'Pa·s',
    difficulty: 'Advanced',
    tags: ['viscosity', 'temperature', 'gas', 'sutherland'],
    examples: [
      {
        title: 'Air Viscosity at High Temperature',
        inputs: { μ0: 0.00001716, T: 500, T0: 273.15, S: 110.4 },
        expectedResult: 0.0000266,
        description: 'Air dynamic viscosity at 500K using Sutherland equation'
      }
    ]
  },

  // 15. Signal-to-Noise Ratio
  {
    id: 'signal-noise-ratio',
    name: 'Signal-to-Noise Ratio (dB)',
    description: 'Calculate SNR in decibels for communication systems',
    formula: 'SNR = 10 × log10(Psignal / Pnoise)',
    variables: [
      { symbol: 'Psignal', name: 'Signal Power', unit: 'W', min: 0.000001, max: 1000 },
      { symbol: 'Pnoise', name: 'Noise Power', unit: 'W', min: 0.000000001, max: 1 }
    ],
    category: 'Signal Processing',
    discipline: 'Electrical',
    units: 'dB',
    difficulty: 'Intermediate',
    tags: ['signal', 'noise', 'ratio', 'communication'],
    examples: [
      {
        title: 'Digital Communication Link',
        inputs: { Psignal: 0.001, Pnoise: 0.000001 },
        expectedResult: 30,
        description: 'Communication system with 30 dB SNR'
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
  'Information Theory',
  'Fatigue Analysis',
  'Fluid Machinery',
  'Crystallization',
  'Wind Engineering',
  'Separation Processes',
  'Seismic Design',
  'Energy Storage',
  'Thermal Properties',
  'Fluid Properties',
  'Signal Processing'
];
export const difficulties = ['All', 'Basic', 'Intermediate', 'Advanced'];