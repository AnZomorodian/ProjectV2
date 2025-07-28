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
  },

  // NEW ADDITIONAL FORMULAS (10 more advanced formulas)

  // 16. Piezoelectric Charge Constant
  {
    id: 'piezoelectric-charge-constant',
    name: 'Piezoelectric Charge Constant',
    description: 'Calculate piezoelectric charge constant for smart materials',
    formula: 'd = Q / F',
    variables: [
      { symbol: 'Q', name: 'Generated Charge', unit: 'C', min: 1e-12, max: 1e-6 },
      { symbol: 'F', name: 'Applied Force', unit: 'N', min: 0.1, max: 10000 }
    ],
    category: 'Smart Materials',
    discipline: 'Electrical',
    units: 'C/N',
    difficulty: 'Advanced',
    tags: ['piezoelectric', 'smart materials', 'sensors', 'actuators'],
    examples: [
      {
        title: 'Piezoelectric Sensor',
        inputs: { Q: 1e-9, F: 10 },
        expectedResult: 1e-10,
        description: 'Piezoelectric sensor under 10 N force'
      }
    ]
  },

  // 17. Bragg's Law for X-ray Crystallography
  {
    id: 'braggs-law-crystallography',
    name: 'Bragg\'s Law',
    description: 'Determine conditions for constructive interference in X-ray diffraction',
    formula: 'n × λ = 2 × d × sin(θ)',
    variables: [
      { symbol: 'n', name: 'Order of Diffraction', unit: 'dimensionless', min: 1, max: 5 },
      { symbol: 'λ', name: 'X-ray Wavelength', unit: 'm', min: 1e-12, max: 1e-9 },
      { symbol: 'd', name: 'Interplanar Spacing', unit: 'm', min: 1e-11, max: 1e-9 },
      { symbol: 'θ', name: 'Bragg Angle', unit: 'rad', min: 0.1, max: 1.5 }
    ],
    category: 'Materials Characterization',
    discipline: 'Chemical',
    units: 'dimensionless',
    difficulty: 'Advanced',
    tags: ['crystallography', 'diffraction', 'materials', 'analysis'],
    examples: [
      {
        title: 'Crystal Structure Analysis',
        inputs: { n: 1, λ: 1.54e-10, d: 2e-10, θ: 0.4 },
        expectedResult: 1,
        description: 'First-order diffraction from crystal planes'
      }
    ]
  },

  // 18. Archie's Law for Reservoir Engineering
  {
    id: 'archies-law-reservoir',
    name: 'Archie\'s Law',
    description: 'Relate rock porosity to electrical resistivity for oil/gas exploration',
    formula: 'F = a / φ^m',
    variables: [
      { symbol: 'a', name: 'Tortuosity Factor', unit: 'dimensionless', min: 0.5, max: 2.0 },
      { symbol: 'φ', name: 'Porosity', unit: 'dimensionless', min: 0.05, max: 0.4 },
      { symbol: 'm', name: 'Cementation Exponent', unit: 'dimensionless', min: 1.3, max: 2.5 }
    ],
    category: 'Reservoir Engineering',
    discipline: 'Civil',
    units: 'dimensionless',
    difficulty: 'Advanced',
    tags: ['reservoir', 'porosity', 'resistivity', 'petroleum'],
    examples: [
      {
        title: 'Sandstone Reservoir',
        inputs: { a: 1, φ: 0.2, m: 2 },
        expectedResult: 25,
        description: 'Sandstone with 20% porosity'
      }
    ]
  },

  // 19. Fick's Second Law of Diffusion
  {
    id: 'ficks-second-law-diffusion',
    name: 'Fick\'s Second Law of Diffusion',
    description: 'Describe how concentration changes over time due to diffusion',
    formula: '∂C/∂t = D × ∂²C/∂x²',
    variables: [
      { symbol: 'D', name: 'Diffusion Coefficient', unit: 'm²/s', min: 1e-12, max: 1e-6 },
      { symbol: 'C', name: 'Concentration Gradient', unit: 'mol/m⁴', min: 1, max: 10000 },
      { symbol: 't', name: 'Time Step', unit: 's', min: 0.1, max: 3600 }
    ],
    category: 'Mass Transfer',
    discipline: 'Chemical',
    units: 'mol/(m³·s)',
    difficulty: 'Advanced',
    tags: ['diffusion', 'mass transfer', 'concentration', 'transport'],
    examples: [
      {
        title: 'Drug Diffusion',
        inputs: { D: 1e-9, C: 1000, t: 3600 },
        expectedResult: 2.78e-10,
        description: 'Drug diffusion through biological membrane'
      }
    ]
  },

  // 20. Mohr-Coulomb Failure Criterion
  {
    id: 'mohr-coulomb-failure',
    name: 'Mohr-Coulomb Failure Criterion',
    description: 'Predict failure in soils and rocks under shear stress',
    formula: 'τ = c + σ × tan(φ)',
    variables: [
      { symbol: 'c', name: 'Cohesion', unit: 'Pa', min: 0, max: 100000 },
      { symbol: 'σ', name: 'Normal Stress', unit: 'Pa', min: 1000, max: 1000000 },
      { symbol: 'φ', name: 'Friction Angle', unit: 'rad', min: 0.26, max: 0.87 }
    ],
    category: 'Geotechnical',
    discipline: 'Civil',
    units: 'Pa',
    difficulty: 'Intermediate',
    tags: ['geotechnical', 'failure', 'soil mechanics', 'stability'],
    examples: [
      {
        title: 'Clay Soil Failure',
        inputs: { c: 10000, σ: 50000, φ: 0.52 },
        expectedResult: 38660,
        description: 'Clay soil under foundation loading'
      }
    ]
  },

  // 21. Planck's Radiation Law
  {
    id: 'planck-radiation-law',
    name: 'Planck\'s Radiation Law',
    description: 'Calculate spectral radiance of electromagnetic radiation from black body',
    formula: 'B = (2hc²/λ⁵) / (exp(hc/(λkT)) - 1)',
    variables: [
      { symbol: 'λ', name: 'Wavelength', unit: 'm', min: 100e-9, max: 3000e-9 },
      { symbol: 'T', name: 'Temperature', unit: 'K', min: 300, max: 6000 },
      { symbol: 'h', name: 'Planck Constant', unit: 'J·s', value: 6.626e-34 },
      { symbol: 'c', name: 'Speed of Light', unit: 'm/s', value: 299792458 },
      { symbol: 'k', name: 'Boltzmann Constant', unit: 'J/K', value: 1.381e-23 }
    ],
    category: 'Thermal Radiation',
    discipline: 'Mechanical',
    units: 'W/(m²·sr·m)',
    difficulty: 'Advanced',
    tags: ['radiation', 'thermal', 'quantum', 'spectral'],
    examples: [
      {
        title: 'Solar Radiation',
        inputs: { λ: 500e-9, T: 5778 },
        expectedResult: 2.0e13,
        description: 'Solar radiation at 500 nm wavelength'
      }
    ]
  },

  // 22. Hall Effect Coefficient
  {
    id: 'hall-effect-coefficient',
    name: 'Hall Effect Coefficient',
    description: 'Measure Hall coefficient for semiconductor characterization',
    formula: 'RH = VH × t / (I × B)',
    variables: [
      { symbol: 'VH', name: 'Hall Voltage', unit: 'V', min: 0.001, max: 1 },
      { symbol: 't', name: 'Sample Thickness', unit: 'm', min: 1e-6, max: 0.01 },
      { symbol: 'I', name: 'Current', unit: 'A', min: 0.001, max: 10 },
      { symbol: 'B', name: 'Magnetic Field', unit: 'T', min: 0.01, max: 2 }
    ],
    category: 'Semiconductor Physics',
    discipline: 'Electrical',
    units: 'm³/C',
    difficulty: 'Advanced',
    tags: ['semiconductors', 'hall effect', 'carriers', 'conductivity'],
    examples: [
      {
        title: 'Silicon Hall Measurement',
        inputs: { VH: 0.01, t: 1e-3, I: 0.1, B: 0.1 },
        expectedResult: 1,
        description: 'Hall measurement on silicon wafer'
      }
    ]
  },

  // 23. Rayleigh-Jeans Approximation
  {
    id: 'rayleigh-jeans-approximation',
    name: 'Rayleigh-Jeans Approximation',
    description: 'Classical approximation for black-body radiation at long wavelengths',
    formula: 'B = (2ckT) / λ⁴',
    variables: [
      { symbol: 'c', name: 'Speed of Light', unit: 'm/s', value: 299792458 },
      { symbol: 'k', name: 'Boltzmann Constant', unit: 'J/K', value: 1.381e-23 },
      { symbol: 'T', name: 'Temperature', unit: 'K', min: 100, max: 1000 },
      { symbol: 'λ', name: 'Wavelength', unit: 'm', min: 1e-5, max: 1e-3 }
    ],
    category: 'Classical Physics',
    discipline: 'Mechanical',
    units: 'W/(m²·sr·m)',
    difficulty: 'Intermediate',
    tags: ['classical', 'radiation', 'approximation', 'thermal'],
    examples: [
      {
        title: 'Infrared Radiation',
        inputs: { T: 300, λ: 10e-6 },
        expectedResult: 3.4e8,
        description: 'Room temperature infrared radiation'
      }
    ]
  },

  // 24. Wien's Displacement Law
  {
    id: 'wiens-displacement-law',
    name: 'Wien\'s Displacement Law',
    description: 'Find wavelength of peak emission for black-body radiation',
    formula: 'λmax = b / T',
    variables: [
      { symbol: 'b', name: 'Wien Displacement Constant', unit: 'm·K', value: 2.898e-3 },
      { symbol: 'T', name: 'Temperature', unit: 'K', min: 100, max: 10000 }
    ],
    category: 'Thermal Radiation',
    discipline: 'Mechanical',
    units: 'm',
    difficulty: 'Basic',
    tags: ['thermal', 'radiation', 'peak', 'wavelength'],
    examples: [
      {
        title: 'Solar Peak Wavelength',
        inputs: { T: 5778 },
        expectedResult: 501e-9,
        description: 'Peak wavelength of solar radiation (green light)'
      }
    ]
  },

  // 25. Stefan-Boltzmann Law
  {
    id: 'stefan-boltzmann-law',
    name: 'Stefan-Boltzmann Law',
    description: 'Calculate total power radiated by black body',
    formula: 'P = σ × A × T⁴',
    variables: [
      { symbol: 'σ', name: 'Stefan-Boltzmann Constant', unit: 'W/(m²·K⁴)', value: 5.67e-8 },
      { symbol: 'A', name: 'Surface Area', unit: 'm²', min: 0.001, max: 1000 },
      { symbol: 'T', name: 'Temperature', unit: 'K', min: 100, max: 3000 }
    ],
    category: 'Thermal Radiation',
    discipline: 'Mechanical',
    units: 'W',
    difficulty: 'Basic',
    tags: ['thermal', 'radiation', 'power', 'emission'],
    examples: [
      {
        title: 'Hot Metal Surface',
        inputs: { A: 0.1, T: 1000 },
        expectedResult: 5670,
        description: 'Power radiated by 1000K metal surface'
      }
    ]
  },
  
  // 30 NEW FORMULAS ADDITION
  
  // Advanced Mechanical Engineering Formulas
  {
    id: 'hertz-contact-stress',
    name: 'Hertz Contact Stress',
    description: 'Calculate maximum contact stress between two elastic bodies',
    formula: 'σ_max = √(3 × F × E* / (2 × π × R*))',
    variables: [
      { symbol: 'F', name: 'Contact Force', unit: 'N', min: 1, max: 1000000 },
      { symbol: 'E*', name: 'Effective Elastic Modulus', unit: 'Pa', min: 1e9, max: 1e12 },
      { symbol: 'R*', name: 'Effective Radius', unit: 'm', min: 0.001, max: 1 }
    ],
    category: 'Contact Mechanics',
    discipline: 'Mechanical',
    units: 'Pa',
    difficulty: 'Advanced',
    tags: ['contact', 'stress', 'hertz', 'elastic']
  },

  {
    id: 'reynolds-number-pipe',
    name: 'Reynolds Number (Pipe Flow)',
    description: 'Determine flow regime in circular pipes',
    formula: 'Re = ρ × V × D / μ',
    variables: [
      { symbol: 'ρ', name: 'Fluid Density', unit: 'kg/m³', min: 0.1, max: 10000 },
      { symbol: 'V', name: 'Average Velocity', unit: 'm/s', min: 0.01, max: 100 },
      { symbol: 'D', name: 'Pipe Diameter', unit: 'm', min: 0.001, max: 10 },
      { symbol: 'μ', name: 'Dynamic Viscosity', unit: 'Pa·s', min: 1e-6, max: 1 }
    ],
    category: 'Fluid Mechanics',
    discipline: 'Mechanical',
    units: 'dimensionless',
    difficulty: 'Intermediate',
    tags: ['reynolds', 'flow', 'turbulence', 'pipe']
  },

  {
    id: 'gear-tooth-bending-stress',
    name: 'Gear Tooth Bending Stress',
    description: 'Calculate bending stress in gear teeth (Lewis formula)',
    formula: 'σ = W_t / (F × m × Y)',
    variables: [
      { symbol: 'W_t', name: 'Tangential Force', unit: 'N', min: 1, max: 100000 },
      { symbol: 'F', name: 'Face Width', unit: 'm', min: 0.001, max: 1 },
      { symbol: 'm', name: 'Module', unit: 'm', min: 0.001, max: 0.1 },
      { symbol: 'Y', name: 'Lewis Form Factor', unit: 'dimensionless', min: 0.1, max: 0.5 }
    ],
    category: 'Machine Design',
    discipline: 'Mechanical',
    units: 'Pa',
    difficulty: 'Advanced',
    tags: ['gear', 'bending', 'stress', 'lewis']
  },

  {
    id: 'bearing-life-calculation',
    name: 'Bearing Life (L10)',
    description: 'Calculate bearing life for 90% reliability',
    formula: 'L_10 = (C / P)^n × 10^6',
    variables: [
      { symbol: 'C', name: 'Dynamic Load Rating', unit: 'N', min: 100, max: 1000000 },
      { symbol: 'P', name: 'Equivalent Dynamic Load', unit: 'N', min: 1, max: 100000 },
      { symbol: 'n', name: 'Life Exponent', unit: 'dimensionless', value: 3, description: '3 for ball bearings, 10/3 for roller bearings' }
    ],
    category: 'Machine Design',
    discipline: 'Mechanical',
    units: 'revolutions',
    difficulty: 'Intermediate',
    tags: ['bearing', 'life', 'reliability', 'fatigue']
  },

  {
    id: 'shaft-critical-speed',
    name: 'Shaft Critical Speed',
    description: 'Calculate first critical speed of a rotating shaft',
    formula: 'ω_cr = √(g / δ)',
    variables: [
      { symbol: 'g', name: 'Gravitational Acceleration', unit: 'm/s²', value: 9.81 },
      { symbol: 'δ', name: 'Static Deflection', unit: 'm', min: 1e-6, max: 0.01 }
    ],
    category: 'Vibration Analysis',
    discipline: 'Mechanical',
    units: 'rad/s',
    difficulty: 'Intermediate',
    tags: ['critical', 'speed', 'vibration', 'shaft']
  },

  // Advanced Electrical Engineering Formulas
  {
    id: 'skin-effect-resistance',
    name: 'AC Resistance (Skin Effect)',
    description: 'Calculate AC resistance considering skin effect',
    formula: 'R_ac = R_dc × √(f / f_0)',
    variables: [
      { symbol: 'R_dc', name: 'DC Resistance', unit: 'Ω', min: 1e-6, max: 1000 },
      { symbol: 'f', name: 'Frequency', unit: 'Hz', min: 1, max: 1e9 },
      { symbol: 'f_0', name: 'Reference Frequency', unit: 'Hz', value: 1000 }
    ],
    category: 'High Frequency',
    discipline: 'Electrical',
    units: 'Ω',
    difficulty: 'Advanced',
    tags: ['skin', 'effect', 'resistance', 'frequency']
  },

  {
    id: 'transmission-line-impedance',
    name: 'Characteristic Impedance',
    description: 'Calculate characteristic impedance of transmission line',
    formula: 'Z_0 = √(L / C)',
    variables: [
      { symbol: 'L', name: 'Inductance per unit length', unit: 'H/m', min: 1e-9, max: 1e-3 },
      { symbol: 'C', name: 'Capacitance per unit length', unit: 'F/m', min: 1e-12, max: 1e-6 }
    ],
    category: 'Transmission Lines',
    discipline: 'Electrical',
    units: 'Ω',
    difficulty: 'Advanced',
    tags: ['impedance', 'transmission', 'line', 'characteristic']
  },

  {
    id: 'motor-torque-speed',
    name: 'Motor Torque-Speed Relationship',
    description: 'Calculate motor torque at different speeds',
    formula: 'T = T_0 × (1 - s) / s',
    variables: [
      { symbol: 'T_0', name: 'Starting Torque', unit: 'N·m', min: 0.1, max: 10000 },
      { symbol: 's', name: 'Slip', unit: 'dimensionless', min: 0.001, max: 1 }
    ],
    category: 'Motor Control',
    discipline: 'Electrical',
    units: 'N·m',
    difficulty: 'Intermediate',
    tags: ['motor', 'torque', 'speed', 'slip']
  },

  {
    id: 'transformer-regulation',
    name: 'Transformer Voltage Regulation',
    description: 'Calculate voltage regulation of transformer',
    formula: 'VR = (E_2nl - V_2fl) / V_2fl × 100',
    variables: [
      { symbol: 'E_2nl', name: 'No-load Secondary Voltage', unit: 'V', min: 1, max: 50000 },
      { symbol: 'V_2fl', name: 'Full-load Secondary Voltage', unit: 'V', min: 1, max: 50000 }
    ],
    category: 'Power Systems',
    discipline: 'Electrical',
    units: '%',
    difficulty: 'Intermediate',
    tags: ['transformer', 'regulation', 'voltage', 'efficiency']
  },

  {
    id: 'antenna-gain-calculation',
    name: 'Antenna Gain (dBi)',
    description: 'Calculate antenna gain relative to isotropic radiator',
    formula: 'G_dBi = 10 × log10(η × D)',
    variables: [
      { symbol: 'η', name: 'Antenna Efficiency', unit: 'dimensionless', min: 0.1, max: 1 },
      { symbol: 'D', name: 'Directivity', unit: 'dimensionless', min: 1, max: 10000 }
    ],
    category: 'Antennas',
    discipline: 'Electrical',
    units: 'dBi',
    difficulty: 'Advanced',
    tags: ['antenna', 'gain', 'directivity', 'efficiency']
  },

  // Advanced Civil Engineering Formulas
  {
    id: 'pile-bearing-capacity',
    name: 'Pile Bearing Capacity',
    description: 'Calculate ultimate bearing capacity of pile foundation',
    formula: 'Q_u = Q_p + Q_s = A_p × q_p + A_s × q_s',
    variables: [
      { symbol: 'A_p', name: 'Pile Base Area', unit: 'm²', min: 0.01, max: 10 },
      { symbol: 'q_p', name: 'Unit End Bearing', unit: 'Pa', min: 10000, max: 10000000 },
      { symbol: 'A_s', name: 'Pile Surface Area', unit: 'm²', min: 0.1, max: 100 },
      { symbol: 'q_s', name: 'Unit Skin Friction', unit: 'Pa', min: 1000, max: 200000 }
    ],
    category: 'Foundation Engineering',
    discipline: 'Civil',
    units: 'N',
    difficulty: 'Advanced',
    tags: ['pile', 'bearing', 'capacity', 'foundation']
  },

  {
    id: 'retaining-wall-pressure',
    name: 'Active Earth Pressure',
    description: 'Calculate active earth pressure behind retaining wall',
    formula: 'P_a = 0.5 × γ × H² × K_a',
    variables: [
      { symbol: 'γ', name: 'Unit Weight of Soil', unit: 'N/m³', min: 15000, max: 25000 },
      { symbol: 'H', name: 'Wall Height', unit: 'm', min: 1, max: 30 },
      { symbol: 'K_a', name: 'Active Earth Pressure Coefficient', unit: 'dimensionless', min: 0.2, max: 0.5 }
    ],
    category: 'Geotechnical',
    discipline: 'Civil',
    units: 'N/m',
    difficulty: 'Intermediate',
    tags: ['earth', 'pressure', 'retaining', 'wall']
  },

  {
    id: 'concrete-mix-design',
    name: 'Water-Cement Ratio',
    description: 'Calculate water-cement ratio for concrete strength',
    formula: 'W/C = A / (B + C × f_c)',
    variables: [
      { symbol: 'A', name: 'Empirical Constant', unit: 'dimensionless', value: 0.5 },
      { symbol: 'B', name: 'Empirical Constant', unit: 'dimensionless', value: 0.5 },
      { symbol: 'C', name: 'Empirical Constant', unit: 'dimensionless', value: 0.15 },
      { symbol: 'f_c', name: 'Compressive Strength', unit: 'Pa', min: 10000000, max: 100000000 }
    ],
    category: 'Concrete Design',
    discipline: 'Civil',
    units: 'dimensionless',
    difficulty: 'Intermediate',
    tags: ['concrete', 'mix', 'design', 'strength']
  },

  {
    id: 'traffic-flow-rate',
    name: 'Traffic Flow Rate',
    description: 'Calculate traffic flow rate on highways',
    formula: 'q = k × v',
    variables: [
      { symbol: 'k', name: 'Traffic Density', unit: 'vehicles/km', min: 1, max: 200 },
      { symbol: 'v', name: 'Space Mean Speed', unit: 'km/h', min: 10, max: 120 }
    ],
    category: 'Transportation',
    discipline: 'Civil',
    units: 'vehicles/h',
    difficulty: 'Basic',
    tags: ['traffic', 'flow', 'density', 'speed']
  },

  {
    id: 'seismic-base-shear',
    name: 'Seismic Base Shear',
    description: 'Calculate seismic base shear for building design',
    formula: 'V = C_s × W',
    variables: [
      { symbol: 'C_s', name: 'Seismic Response Coefficient', unit: 'dimensionless', min: 0.01, max: 0.3 },
      { symbol: 'W', name: 'Total Dead Load', unit: 'N', min: 100000, max: 100000000 }
    ],
    category: 'Seismic Design',
    discipline: 'Civil',
    units: 'N',
    difficulty: 'Advanced',
    tags: ['seismic', 'base', 'shear', 'earthquake']
  },

  // Advanced Chemical Engineering Formulas
  {
    id: 'distillation-minimum-reflux',
    name: 'Minimum Reflux Ratio',
    description: 'Calculate minimum reflux ratio for distillation',
    formula: 'R_min = (x_D - y*) / (y* - x_D)',
    variables: [
      { symbol: 'x_D', name: 'Distillate Composition', unit: 'mole fraction', min: 0.5, max: 0.99 },
      { symbol: 'y*', name: 'Equilibrium Vapor Composition', unit: 'mole fraction', min: 0.1, max: 0.95 }
    ],
    category: 'Separation Processes',
    discipline: 'Chemical',
    units: 'dimensionless',
    difficulty: 'Advanced',
    tags: ['distillation', 'reflux', 'separation', 'minimum']
  },

  {
    id: 'reactor-conversion',
    name: 'Reactor Conversion',
    description: 'Calculate conversion in continuous stirred tank reactor',
    formula: 'X = k × τ / (1 + k × τ)',
    variables: [
      { symbol: 'k', name: 'Reaction Rate Constant', unit: 's⁻¹', min: 0.001, max: 10 },
      { symbol: 'τ', name: 'Residence Time', unit: 's', min: 1, max: 10000 }
    ],
    category: 'Reaction Engineering',
    discipline: 'Chemical',
    units: 'dimensionless',
    difficulty: 'Intermediate',
    tags: ['reactor', 'conversion', 'kinetics', 'cstr']
  },

  {
    id: 'mass-transfer-coefficient',
    name: 'Mass Transfer Coefficient',
    description: 'Calculate mass transfer coefficient using Sherwood number',
    formula: 'k_L = Sh × D_AB / L',
    variables: [
      { symbol: 'Sh', name: 'Sherwood Number', unit: 'dimensionless', min: 1, max: 1000 },
      { symbol: 'D_AB', name: 'Diffusivity', unit: 'm²/s', min: 1e-10, max: 1e-4 },
      { symbol: 'L', name: 'Characteristic Length', unit: 'm', min: 0.001, max: 10 }
    ],
    category: 'Mass Transfer',
    discipline: 'Chemical',
    units: 'm/s',
    difficulty: 'Advanced',
    tags: ['mass', 'transfer', 'sherwood', 'diffusion']
  },

  {
    id: 'heat-exchanger-lmtd',
    name: 'Log Mean Temperature Difference',
    description: 'Calculate LMTD for heat exchanger design',
    formula: 'LMTD = (ΔT_1 - ΔT_2) / ln(ΔT_1 / ΔT_2)',
    variables: [
      { symbol: 'ΔT_1', name: 'Temperature Difference 1', unit: 'K', min: 1, max: 1000 },
      { symbol: 'ΔT_2', name: 'Temperature Difference 2', unit: 'K', min: 1, max: 1000 }
    ],
    category: 'Heat Transfer',
    discipline: 'Chemical',
    units: 'K',
    difficulty: 'Intermediate',
    tags: ['heat', 'exchanger', 'lmtd', 'temperature']
  },

  {
    id: 'pressure-drop-packed-bed',
    name: 'Pressure Drop in Packed Bed',
    description: 'Calculate pressure drop through packed bed (Ergun equation)',
    formula: 'ΔP/L = 150 × μ × v / d_p² + 1.75 × ρ × v² / d_p',
    variables: [
      { symbol: 'μ', name: 'Fluid Viscosity', unit: 'Pa·s', min: 1e-5, max: 1 },
      { symbol: 'v', name: 'Superficial Velocity', unit: 'm/s', min: 0.001, max: 10 },
      { symbol: 'd_p', name: 'Particle Diameter', unit: 'm', min: 1e-5, max: 0.01 },
      { symbol: 'ρ', name: 'Fluid Density', unit: 'kg/m³', min: 0.1, max: 2000 }
    ],
    category: 'Fluid Mechanics',
    discipline: 'Chemical',
    units: 'Pa/m',
    difficulty: 'Advanced',
    tags: ['pressure', 'drop', 'packed', 'bed', 'ergun']
  },

  // Materials Science and Engineering
  {
    id: 'crystal-lattice-parameter',
    name: 'Crystal Lattice Parameter',
    description: 'Calculate lattice parameter from X-ray diffraction',
    formula: 'a = λ / (2 × sin(θ) × √(h² + k² + l²))',
    variables: [
      { symbol: 'λ', name: 'X-ray Wavelength', unit: 'm', min: 1e-11, max: 1e-9 },
      { symbol: 'θ', name: 'Bragg Angle', unit: 'rad', min: 0.01, max: 1.57 },
      { symbol: 'h', name: 'Miller Index h', unit: 'dimensionless', min: 1, max: 5 },
      { symbol: 'k', name: 'Miller Index k', unit: 'dimensionless', min: 1, max: 5 },
      { symbol: 'l', name: 'Miller Index l', unit: 'dimensionless', min: 1, max: 5 }
    ],
    category: 'Crystallography',
    discipline: 'Materials Science',
    units: 'm',
    difficulty: 'Advanced',
    tags: ['crystal', 'lattice', 'xrd', 'bragg']
  },

  {
    id: 'grain-boundary-energy',
    name: 'Grain Boundary Energy',
    description: 'Calculate grain boundary energy in polycrystalline materials',
    formula: 'γ_gb = γ_s × (1 - cos(θ/2))',
    variables: [
      { symbol: 'γ_s', name: 'Surface Energy', unit: 'J/m²', min: 0.1, max: 10 },
      { symbol: 'θ', name: 'Misorientation Angle', unit: 'rad', min: 0, max: 3.14159 }
    ],
    category: 'Microstructure',
    discipline: 'Materials Science',
    units: 'J/m²',
    difficulty: 'Advanced',
    tags: ['grain', 'boundary', 'energy', 'polycrystal']
  },

  {
    id: 'hall-petch-relation',
    name: 'Hall-Petch Relation',
    description: 'Calculate yield strength dependence on grain size',
    formula: 'σ_y = σ_0 + k_y × d^(-1/2)',
    variables: [
      { symbol: 'σ_0', name: 'Friction Stress', unit: 'Pa', min: 1e6, max: 1e9 },
      { symbol: 'k_y', name: 'Hall-Petch Constant', unit: 'Pa·m^0.5', min: 1e5, max: 1e7 },
      { symbol: 'd', name: 'Grain Size', unit: 'm', min: 1e-8, max: 1e-3 }
    ],
    category: 'Mechanical Properties',
    discipline: 'Materials Science',
    units: 'Pa',
    difficulty: 'Advanced',
    tags: ['hall', 'petch', 'grain', 'strength']
  },

  {
    id: 'thermal-expansion-coefficient',
    name: 'Linear Thermal Expansion',
    description: 'Calculate thermal expansion of materials',
    formula: 'ΔL = α × L_0 × ΔT',
    variables: [
      { symbol: 'α', name: 'Thermal Expansion Coefficient', unit: 'K⁻¹', min: 1e-7, max: 1e-4 },
      { symbol: 'L_0', name: 'Original Length', unit: 'm', min: 0.001, max: 100 },
      { symbol: 'ΔT', name: 'Temperature Change', unit: 'K', min: 1, max: 1000 }
    ],
    category: 'Thermal Properties',
    discipline: 'Materials Science',
    units: 'm',
    difficulty: 'Basic',
    tags: ['thermal', 'expansion', 'temperature', 'deformation']
  },

  {
    id: 'young-modulus-calculation',
    name: 'Young\'s Modulus from Stress-Strain',
    description: 'Calculate Young\'s modulus from stress-strain data',
    formula: 'E = Δσ / Δε',
    variables: [
      { symbol: 'Δσ', name: 'Stress Change', unit: 'Pa', min: 1000, max: 1e10 },
      { symbol: 'Δε', name: 'Strain Change', unit: 'dimensionless', min: 1e-6, max: 0.1 }
    ],
    category: 'Mechanical Properties',
    discipline: 'Materials Science',
    units: 'Pa',
    difficulty: 'Basic',
    tags: ['young', 'modulus', 'stress', 'strain']
  },

  // Advanced Interdisciplinary Formulas
  {
    id: 'fractal-dimension',
    name: 'Fractal Dimension (Box Counting)',
    description: 'Calculate fractal dimension using box counting method',
    formula: 'D = -log(N) / log(r)',
    variables: [
      { symbol: 'N', name: 'Number of Boxes', unit: 'dimensionless', min: 1, max: 1000000 },
      { symbol: 'r', name: 'Box Size', unit: 'dimensionless', min: 1e-6, max: 1 }
    ],
    category: 'Mathematical Analysis',
    discipline: 'Interdisciplinary',
    units: 'dimensionless',
    difficulty: 'Advanced',
    tags: ['fractal', 'dimension', 'geometry', 'scaling']
  },

  {
    id: 'shannon-entropy',
    name: 'Shannon Entropy',
    description: 'Calculate information entropy of a signal',
    formula: 'H = -Σ(p_i × log2(p_i))',
    variables: [
      { symbol: 'p_i', name: 'Probability of Event i', unit: 'dimensionless', min: 0.001, max: 1 }
    ],
    category: 'Information Theory',
    discipline: 'Interdisciplinary',
    units: 'bits',
    difficulty: 'Advanced',
    tags: ['shannon', 'entropy', 'information', 'probability']
  },

  {
    id: 'fourier-number',
    name: 'Fourier Number',
    description: 'Calculate dimensionless time for heat transfer',
    formula: 'Fo = α × t / L²',
    variables: [
      { symbol: 'α', name: 'Thermal Diffusivity', unit: 'm²/s', min: 1e-8, max: 1e-3 },
      { symbol: 't', name: 'Time', unit: 's', min: 1, max: 1e6 },
      { symbol: 'L', name: 'Characteristic Length', unit: 'm', min: 0.001, max: 10 }
    ],
    category: 'Heat Transfer',
    discipline: 'Interdisciplinary',
    units: 'dimensionless',
    difficulty: 'Intermediate',
    tags: ['fourier', 'number', 'heat', 'transfer']
  },

  {
    id: 'nusselt-number-correlation',
    name: 'Nusselt Number (Natural Convection)',
    description: 'Calculate Nusselt number for natural convection',
    formula: 'Nu = C × (Gr × Pr)^n',
    variables: [
      { symbol: 'C', name: 'Correlation Constant', unit: 'dimensionless', min: 0.1, max: 1 },
      { symbol: 'Gr', name: 'Grashof Number', unit: 'dimensionless', min: 1e3, max: 1e12 },
      { symbol: 'Pr', name: 'Prandtl Number', unit: 'dimensionless', min: 0.1, max: 100 },
      { symbol: 'n', name: 'Exponent', unit: 'dimensionless', min: 0.1, max: 0.33 }
    ],
    category: 'Heat Transfer',
    discipline: 'Interdisciplinary',
    units: 'dimensionless',
    difficulty: 'Advanced',
    tags: ['nusselt', 'convection', 'heat', 'transfer']
  }
];

export const disciplines = ['All', 'Mechanical', 'Electrical', 'Civil', 'Chemical', 'Materials Science', 'Interdisciplinary']; 
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
  'Signal Processing',
  'Smart Materials',
  'Materials Characterization',
  'Reservoir Engineering',
  'Mass Transfer',
  'Thermal Radiation',
  'Semiconductor Physics',
  'Classical Physics'
];
export const difficulties = ['All', 'Basic', 'Intermediate', 'Advanced'];