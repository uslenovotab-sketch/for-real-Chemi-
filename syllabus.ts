export interface Subtopic {
  id: string;
  title: string;
  desc: string;
  highYield?: boolean;
  marksWeight?: string;
  tags?: string[];
}

export interface Chapter {
  subject: 'inorganic' | 'physical' | 'organic' | 'interdisciplinary';
  subjectName: string;
  chapterId: string;
  title: string;
  description: string;
  subtopics: Subtopic[];
}

export interface SubtopicUserState {
  notesDone: boolean;
  pyqSolved: number;
  pyqTarget: number;
  rev1: boolean;
  rev1Date: string;
  rev2: boolean;
  rev2Date: string;
  rev3: boolean;
  rev3Date: string;
  rev4: boolean;
  rev4Date: string;
  deadline: string;
  isBacklog: boolean;
  backlogPriority: 'High' | 'Medium' | 'Low';
  personalNotes: string;
}

export interface UserState {
  subtopics: Record<string, SubtopicUserState>;
  examTargetDate: string;
  lastUpdated?: string;
}

export const SYLLABUS_DATA: Chapter[] = [
  // ================= INORGANIC CHEMISTRY =================
  {
    subject: 'inorganic',
    subjectName: 'Inorganic Chemistry',
    chapterId: 'inorg_1',
    title: '1. Chemical Periodicity',
    description: 'Periodic properties, size, ionization energy, electron affinity, electronegativity, periodicity in s, p, d, f blocks.',
    subtopics: [
      { id: 'inorg_1_1', title: 'Periodic trends in atomic & ionic radii', desc: 'Slater rules, effective nuclear charge (Zeff), lanthanide contraction effects.', highYield: true, marksWeight: '2-4 M' },
      { id: 'inorg_1_2', title: 'Ionization enthalpy & Electron gain enthalpy', desc: 'Anomalies in s, p, d blocks, inert pair effect, electron affinity trends.' },
      { id: 'inorg_1_3', title: 'Electronegativity scales & applications', desc: 'Pauling, Mulliken, Allred-Rochow scales; polarizability & Fajan rules.' }
    ]
  },
  {
    subject: 'inorganic',
    subjectName: 'Inorganic Chemistry',
    chapterId: 'inorg_2',
    title: '2. Structure & Bonding in Homo/Heteronuclear Molecules',
    description: 'Shapes of molecules, VSEPR theory, Bent rule, MO diagrams, Lewis structures, polarity.',
    subtopics: [
      { id: 'inorg_2_1', title: 'VSEPR Theory & Molecular Geometry', desc: 'Steric number, lone pair repulsions, structures of Xe compounds, IF7, BrF3, etc.', highYield: true, marksWeight: '4 M' },
      { id: 'inorg_2_2', title: 'Bent Rule & Hybridization', desc: 's-character distribution, bond angles, bond lengths in substituted species.', highYield: true, marksWeight: '2-4 M' },
      { id: 'inorg_2_3', title: 'Molecular Orbital (MO) Theory', desc: 'Homo- & heteronuclear diatomics (N2, O2, CO, NO), s-p mixing, bond order & magnetic properties.', highYield: true, marksWeight: '4 M' }
    ]
  },
  {
    subject: 'inorganic',
    subjectName: 'Inorganic Chemistry',
    chapterId: 'inorg_3',
    title: '3. Concepts of Acids and Bases',
    description: 'Hard-Soft Acid-Base (HSAB) concept, non-aqueous solvents, acid strength trends.',
    subtopics: [
      { id: 'inorg_3_1', title: 'HSAB Principle & Applications', desc: 'Hard and soft character, stability of complexes, solubility, direction of reactions.', highYield: true, marksWeight: '2-4 M' },
      { id: 'inorg_3_2', title: 'Non-Aqueous Solvents', desc: 'Liquid NH3, liquid HF, SO2, H2SO4; autoionization, acid-base reactions, solubility.' },
      { id: 'inorg_3_3', title: 'Acid Strength Trends', desc: 'Oxoacids, binary acids, Lewis acidity of boron halides (BF3 vs BCl3 vs BBr3).' }
    ]
  },
  {
    subject: 'inorganic',
    subjectName: 'Inorganic Chemistry',
    chapterId: 'inorg_4',
    title: '4. Main Group Elements & Their Compounds',
    description: 'Allotropy, synthesis, structure and bonding in boranes, silicates, phosphazenes, sulfur-nitrogen compounds.',
    subtopics: [
      { id: 'inorg_4_1', title: 'Boranes, Carboranes & Wade Rules', desc: 'Closo, nido, arachno, hypho structures; B2H6 3c-2e bonding, styx numbers.', highYield: true, marksWeight: '4-8 M' },
      { id: 'inorg_4_2', title: 'Silicates, Aluminosilicates & Zeolites', desc: 'Orthosilicates, pyrosilicates, cyclic, chain, sheet silicates & framework structures.' },
      { id: 'inorg_4_3', title: 'Phosphazenes & Sulfur-Nitrogen Compounds', desc: '(NPCl2)3, S4N4, S2N2, polythiazyl (SN)x conductors, synthesis & bonding.', highYield: true, marksWeight: '4 M' },
      { id: 'inorg_4_4', title: 'Allotropy & Interhalogen Compounds', desc: 'Carbon allotropes (fullerenes, graphene), polyhalides, pseudohalogens.' }
    ]
  },
  {
    subject: 'inorganic',
    subjectName: 'Inorganic Chemistry',
    chapterId: 'inorg_5',
    title: '5. Transition Elements & Coordination Compounds',
    description: 'CFT, LFT, MOT, electronic spectra, magnetic properties, Jahn-Teller effect, substitution mechanisms.',
    subtopics: [
      { id: 'inorg_5_1', title: 'Crystal Field & Ligand Field Theory', desc: '10 Dq, CFSE in octahedral/tetrahedral/square planar, high/low spin, nephelauxetic effect.', highYield: true, marksWeight: '8-12 M' },
      { id: 'inorg_5_2', title: 'Jahn-Teller Distortion & Magnetism', desc: 'Static & dynamic JTD, spin-only magnetic moments, orbital contribution, spin equilibria.', highYield: true, marksWeight: '4 M' },
      { id: 'inorg_5_3', title: 'Electronic Spectra of Complexes', desc: 'd-d transitions, Selection rules (Laporte, Spin), Term symbols, Orgel & Tanabe-Sugano diagrams, Charge Transfer spectra.', highYield: true, marksWeight: '6-8 M' },
      { id: 'inorg_5_4', title: 'Reaction Mechanisms of Coordination Complexes', desc: 'Inert vs labile, substitution in octahedral (D, A, Ia, Id) & square planar (Trans effect), Inner/Outer sphere electron transfer.', highYield: true, marksWeight: '6-8 M' }
    ]
  },
  {
    subject: 'inorganic',
    subjectName: 'Inorganic Chemistry',
    chapterId: 'inorg_6',
    title: '6. Inner Transition Elements (Lanthanides & Actinides)',
    description: 'Spectral & magnetic properties, redox chemistry, separation techniques, analytical applications.',
    subtopics: [
      { id: 'inorg_6_1', title: 'Lanthanide & Actinide Oxidation States', desc: 'Prominent oxidation states, Ln3+ stabilities, Ce4+, Eu2+, Sm2+ redox behavior.', marksWeight: '2-4 M' },
      { id: 'inorg_6_2', title: 'Spectral & Magnetic Properties', desc: 'f-f transitions, sharp absorption bands, luminescence, magnetic moments equation μ = g√[J(J+1)].', highYield: true, marksWeight: '4 M' },
      { id: 'inorg_6_3', title: 'Lanthanide Separation Techniques', desc: 'Ion-exchange chromatography, solvent extraction, shift reagents in NMR.' }
    ]
  },
  {
    subject: 'inorganic',
    subjectName: 'Inorganic Chemistry',
    chapterId: 'inorg_7',
    title: '7. Organometallic Compounds',
    description: 'Synthesis, bonding, 18-electron rule, metal carbonyls, nitrosyls, alkyls, metallocenes.',
    subtopics: [
      { id: 'inorg_7_1', title: '18-Electron Rule & Electron Counting', desc: 'Neutral ligand method vs ionic method, electron count in mononuclear & polynuclear complexes.', highYield: true, marksWeight: '4 M' },
      { id: 'inorg_7_2', title: 'Metal Carbonyls & Nitrosyls', desc: 'pi-backbonding, IR stretching frequency shifts ν(CO), linear vs bent NO ligands.', highYield: true, marksWeight: '4-6 M' },
      { id: 'inorg_7_3', title: 'Metallocenes & Alkene/Alkyne Complexes', desc: 'Ferrocene bonding & reactions, Zeise salt, metal carbene (Fischer vs Schrock) & carbyne.', highYield: true, marksWeight: '4-6 M' }
    ]
  },
  {
    subject: 'inorganic',
    subjectName: 'Inorganic Chemistry',
    chapterId: 'inorg_8',
    title: '8. Organometallics in Homogeneous Catalysis',
    description: 'Hydrogenation, hydroformylation, Monsanto process, Ziegler-Natta, Wacker process, metathesis.',
    subtopics: [
      { id: 'inorg_8_1', title: 'Wilkinson Catalytic Hydrogenation', desc: 'Catalytic cycle, oxidative addition, migratory insertion, reductive elimination.', highYield: true, marksWeight: '4 M' },
      { id: 'inorg_8_2', title: 'Hydroformylation & Monsanto Acetic Acid Process', desc: 'Oxo process using Co/Rh catalysts, Cativa process, aldehyde selectivity.', highYield: true, marksWeight: '4 M' },
      { id: 'inorg_8_3', title: 'Wacker Process, Olefin Metathesis & Ziegler-Natta', desc: 'Pd-catalyzed oxidation of ethylene, Grubbs catalyst metathesis, polymer synthesis.', highYield: true, marksWeight: '4 M' }
    ]
  },
  {
    subject: 'inorganic',
    subjectName: 'Inorganic Chemistry',
    chapterId: 'inorg_9',
    title: '9. Cages and Metal Clusters',
    description: 'Wade-Mingos rules, borane clusters, low & high nuclearity metal carbonyl clusters, isolobal analogy.',
    subtopics: [
      { id: 'inorg_9_1', title: 'Metal Carbonyl Clusters & Wade-Mingos Rules', desc: 'Total Electron Count (TEC), Polyhedral Skeleton Electron Pair Theory (PSEPT).', highYield: true, marksWeight: '4 M' },
      { id: 'inorg_9_2', title: 'Isolobal Analogy', desc: 'Fragment isolobal relationships between main group and transition metal complexes.', highYield: true, marksWeight: '2-4 M' },
      { id: 'inorg_9_3', title: 'Metal-Metal Multiple Bonds', desc: 'Quadruple bonds in Re2Cl8(2-), Mo2(OR)6, delta bonding.' }
    ]
  },
  {
    subject: 'inorganic',
    subjectName: 'Inorganic Chemistry',
    chapterId: 'inorg_10',
    title: '10. Analytical Chemistry',
    description: 'Separation techniques, spectroscopic methods, electro- and thermoanalytical methods (TGA, DTA, DSC).',
    subtopics: [
      { id: 'inorg_10_1', title: 'Chromatography & Separation Methods', desc: 'HPLC, GC, TLC, solvent extraction, ion exchange retention factors.' },
      { id: 'inorg_10_2', title: 'Thermoanalytical Techniques', desc: 'TGA mass loss curves, DTA exothermic/endothermic peaks, DSC heat capacity.', highYield: true, marksWeight: '2-4 M' },
      { id: 'inorg_10_3', title: 'Electroanalytical Methods', desc: 'Voltammetry, cyclic voltammetry (CV), polarography, amperometry.' }
    ]
  },
  {
    subject: 'inorganic',
    subjectName: 'Inorganic Chemistry',
    chapterId: 'inorg_11',
    title: '11. Bioinorganic Chemistry',
    description: 'Photosystems, porphyrins, metalloenzymes, oxygen transport, nitrogen fixation, metal drugs.',
    subtopics: [
      { id: 'inorg_11_1', title: 'Oxygen Transport Proteins', desc: 'Hemoglobin & Myoglobin (cooperativity, Bohr effect), Hemocyanin, Hemerythrin.', highYield: true, marksWeight: '4-6 M' },
      { id: 'inorg_11_2', title: 'Metalloenzymes & Electron Carriers', desc: 'Cytochrome P450, Carbonic Anhydrase, Carboxypeptidase, Superoxide Dismutase, Rubredoxin, Ferredoxin.', highYield: true, marksWeight: '6-8 M' },
      { id: 'inorg_11_3', title: 'Photosystems, Nitrogen Fixation & Cisplatin', desc: 'OEC in Photosystem II, Nitrogenase Mo-Fe protein, Cisplatin anti-cancer mechanism.', marksWeight: '4 M' }
    ]
  },
  {
    subject: 'inorganic',
    subjectName: 'Inorganic Chemistry',
    chapterId: 'inorg_12',
    title: '12. Characterisation of Inorganic Compounds',
    description: 'IR, Raman, NMR, EPR, Mössbauer, UV-vis, NQR, MS, electron spectroscopy and microscopic techniques.',
    subtopics: [
      { id: 'inorg_12_1', title: 'Inorganic EPR / ESR Spectroscopy', desc: 'g-factor, hyperfine coupling, Kramer degeneracy, anisotropy in Cu(II) complexes.', highYield: true, marksWeight: '4-6 M' },
      { id: 'inorg_12_2', title: 'Mössbauer Spectroscopy', desc: 'Isomer shift, quadrupole splitting, magnetic hyperfine splitting in 57Fe & 119Sn.', highYield: true, marksWeight: '4-6 M' },
      { id: 'inorg_12_3', title: 'Heteronuclear NMR (31P, 19F, 11B, 195Pt)', desc: 'Chemical shifts, spin-spin coupling constants, fluxionality in inorganic molecules.', highYield: true, marksWeight: '4 M' }
    ]
  },
  {
    subject: 'inorganic',
    subjectName: 'Inorganic Chemistry',
    chapterId: 'inorg_13',
    title: '13. Nuclear Chemistry',
    description: 'Nuclear reactions, fission/fusion, radio-analytical techniques, neutron activation analysis.',
    subtopics: [
      { id: 'inorg_13_1', title: 'Nuclear Stability & Decay Kinetics', desc: 'N/P ratio, binding energy per nucleon, half-life calculations, radioactive equilibria.', marksWeight: '2-4 M' },
      { id: 'inorg_13_2', title: 'Nuclear Fission, Fusion & Activation Analysis', desc: 'Neutron cross section, NAA, radiometric titrations, carbon dating.' }
    ]
  },

  // ================= PHYSICAL CHEMISTRY =================
  {
    subject: 'physical',
    subjectName: 'Physical Chemistry',
    chapterId: 'phys_1',
    title: '1. Basic Principles of Quantum Mechanics',
    description: 'Postulates, operator algebra, particle-in-a-box, harmonic oscillator, hydrogen atom, angular momentum, tunneling.',
    subtopics: [
      { id: 'phys_1_1', title: 'Quantum Postulates & Operator Algebra', desc: 'Hermitian operators, commutators, uncertainty principle, wavefunctions normalization.', highYield: true, marksWeight: '4 M' },
      { id: 'phys_1_2', title: 'Exactly Solvable Systems (1D/2D/3D Box, Oscillator)', desc: 'Energy eigenvalues, wavefunctions, zero-point energy, degeneracy, quantum tunneling.', highYield: true, marksWeight: '6-8 M' },
      { id: 'phys_1_3', title: 'Rigid Rotor & Hydrogen Atom', desc: 'Spherical harmonics, radial & angular wavefunctions, orbital & spin angular momenta, term symbols.', highYield: true, marksWeight: '4 M' }
    ]
  },
  {
    subject: 'physical',
    subjectName: 'Physical Chemistry',
    chapterId: 'phys_2',
    title: '2. Approximate Methods of Quantum Mechanics',
    description: 'Variational principle, perturbation theory up to second order in energy, applications.',
    subtopics: [
      { id: 'phys_2_1', title: 'Variational Principle', desc: 'Trial wavefunctions, optimization of parameter, ground state energy upper bound.', highYield: true, marksWeight: '4 M' },
      { id: 'phys_2_2', title: 'Non-degenerate Perturbation Theory', desc: 'First and second order energy corrections, 1st order wavefunction correction.', highYield: true, marksWeight: '4-6 M' },
      { id: 'phys_2_3', title: 'Application to Helium Atom & H2+ System', desc: 'Electron repulsion integral, effective nuclear charge in He atom.' }
    ]
  },
  {
    subject: 'physical',
    subjectName: 'Physical Chemistry',
    chapterId: 'phys_3',
    title: '3. Atomic Structure and Spectroscopy',
    description: 'Term symbols, many-electron systems, antisymmetry principle, LS & jj coupling.',
    subtopics: [
      { id: 'phys_3_1', title: 'Atomic Term Symbols', desc: 'L, S, J quantum numbers, Hund rules, term symbols for ground & excited states of atoms/ions.', highYield: true, marksWeight: '4 M' },
      { id: 'phys_3_2', title: 'Many-Electron Systems & Pauli Principle', desc: 'Slater determinants, exchange integral, spin-orbit coupling.' }
    ]
  },
  {
    subject: 'physical',
    subjectName: 'Physical Chemistry',
    chapterId: 'phys_4',
    title: '4. Chemical Bonding in Diatomics & Hückel Theory',
    description: 'MO and VB theories, Hückel theory for conjugated pi-electron systems.',
    subtopics: [
      { id: 'phys_4_1', title: 'LCAO-MO vs VB Theory in Diatomics', desc: 'H2+ ion, H2 molecule, bonding & antibonding orbitals, resonance integral.' },
      { id: 'phys_4_2', title: 'Hückel MO Theory (HMO)', desc: 'Secular determinant, alpha & beta integrals, pi-charge density, bond order, delocalization energy in ethylene, butadiene, benzene, cyclobutadiene.', highYield: true, marksWeight: '4-8 M' }
    ]
  },
  {
    subject: 'physical',
    subjectName: 'Physical Chemistry',
    chapterId: 'phys_5',
    title: '5. Chemical Applications of Group Theory',
    description: 'Symmetry elements, point groups, character tables, selection rules, hybrid orbitals.',
    subtopics: [
      { id: 'phys_5_1', title: 'Symmetry Elements & Point Group Assignment', desc: 'Cnv, Cnh, Dnh, Dnd, Td, Oh, Ih point group classification.', highYield: true, marksWeight: '4 M' },
      { id: 'phys_5_2', title: 'Great Orthogonality Theorem & Character Tables', desc: 'Irreducible representations, mulliken symbols (A, B, E, T, g, u), reduction formula.', highYield: true, marksWeight: '4-6 M' },
      { id: 'phys_5_3', title: 'Group Theory Selection Rules', desc: 'IR and Raman activity of vibrational modes, SALCs, hybrid orbital derivation.', highYield: true, marksWeight: '4 M' }
    ]
  },
  {
    subject: 'physical',
    subjectName: 'Physical Chemistry',
    chapterId: 'phys_6',
    title: '6. Molecular Spectroscopy',
    description: 'Rotational, vibrational, electronic spectra, IR and Raman activities, magnetic resonance.',
    subtopics: [
      { id: 'phys_6_1', title: 'Rotational Spectroscopy', desc: 'Rigid & non-rigid rotor, rotational constant B, centrifugal distortion, selection rules, isotope effect.', highYield: true, marksWeight: '4 M' },
      { id: 'phys_6_2', title: 'Vibrational IR & Raman Spectroscopy', desc: 'Harmonic & anharmonic oscillator, Birge-Sponer plot, fundamental, overtone, hot bands, Mutual Exclusion principle.', highYield: true, marksWeight: '4-6 M' },
      { id: 'phys_6_3', title: 'Electronic Spectroscopy & Magnetic Resonance', desc: 'Franck-Condon principle, NMR chemical shift & spin-spin splitting, ESR g-value.', marksWeight: '4 M' }
    ]
  },
  {
    subject: 'physical',
    subjectName: 'Physical Chemistry',
    chapterId: 'phys_7',
    title: '7. Chemical Thermodynamics',
    description: 'Laws, state/path functions, Maxwell relations, spontaneity, phase equilibria, non-ideal systems.',
    subtopics: [
      { id: 'phys_7_1', title: 'Laws of Thermodynamics & Maxwell Relations', desc: 'First, Second, Third Laws; Carnot cycle, Maxwell thermodynamic square relations.', highYield: true, marksWeight: '4 M' },
      { id: 'phys_7_2', title: 'Phase Equilibria & Phase Rule', desc: 'Clapeyron and Clausius-Clapeyron equations, one-component & two-component phase diagrams, eutectic systems.', highYield: true, marksWeight: '4-6 M' },
      { id: 'phys_7_3', title: 'Partial Molar Quantities & Non-Ideal Solutions', desc: 'Chemical potential, Gibbs-Duhem equation, fugacity, activity coefficients.' }
    ]
  },
  {
    subject: 'physical',
    subjectName: 'Physical Chemistry',
    chapterId: 'phys_8',
    title: '8. Statistical Thermodynamics',
    description: 'Boltzmann distribution, partition functions, thermodynamic quantities calculation.',
    subtopics: [
      { id: 'phys_8_1', title: 'Ensembles & Boltzmann Distribution', desc: 'Microcanonical, canonical, grand canonical ensembles, most probable distribution.' },
      { id: 'phys_8_2', title: 'Partition Functions (q_trans, q_rot, q_vib, q_elec)', desc: 'Molecular & canonical partition functions, thermodynamic properties (U, H, S, G, Cp).', highYield: true, marksWeight: '6-8 M' },
      { id: 'phys_8_3', title: 'Residual Entropy & Equipartition Theorem', desc: 'CO, N2O crystalline residual entropy, molar heat capacities.', marksWeight: '2-4 M' }
    ]
  },
  {
    subject: 'physical',
    subjectName: 'Physical Chemistry',
    chapterId: 'phys_9',
    title: '9. Electrochemistry',
    description: 'Nernst equation, Debye-Hückel theory, Kohlrausch law, conductometric/potentiometric titrations.',
    subtopics: [
      { id: 'phys_9_1', title: 'Electrochemical Cells & Nernst Equation', desc: 'EMF calculation, cell thermodynamics (delta G, delta H, delta S), liquid junction potential.', highYield: true, marksWeight: '4-6 M' },
      { id: 'phys_9_2', title: 'Debye-Hückel Theory & Activity Coefficients', desc: 'Ionic strength I, Debye-Hückel limiting law, mean ionic activity coefficient.', highYield: true, marksWeight: '4 M' },
      { id: 'phys_9_3', title: 'Electrolytic Conductance & Titrations', desc: 'Kohlrausch law, conductometric, potentiometric & pH titrations, overpotential.' }
    ]
  },
  {
    subject: 'physical',
    subjectName: 'Physical Chemistry',
    chapterId: 'phys_10',
    title: '10. Chemical Kinetics',
    description: 'Empirical rate laws, complex reactions, SSA, collision & TST theories, enzyme kinetics, photochemistry.',
    subtopics: [
      { id: 'phys_10_1', title: 'Rate Laws & Steady State Approximation (SSA)', desc: 'Order & molecularity, consecutive, parallel, opposing reactions, Lindemann unimolecular mechanism.', highYield: true, marksWeight: '6-8 M' },
      { id: 'phys_10_2', title: 'Collision Theory & Transition State Theory (TST)', desc: 'Arrhenius equation, activation parameters (delta H#, delta S#), Eyring equation, primary & secondary salt effects.', highYield: true, marksWeight: '4-6 M' },
      { id: 'phys_10_3', title: 'Enzyme Kinetics & Photochemistry', desc: 'Michaelis-Menten mechanism, Lineweaver-Burk plot, quantum yield, quenching & Stern-Volmer equation.', highYield: true, marksWeight: '4 M' }
    ]
  },
  {
    subject: 'physical',
    subjectName: 'Physical Chemistry',
    chapterId: 'phys_11',
    title: '11. Colloids and Surfaces',
    description: 'Colloid stability, isotherms (Langmuir, Freundlich, BET), heterogeneous catalysis.',
    subtopics: [
      { id: 'phys_11_1', title: 'Adsorption Isotherms (Langmuir, Freundlich, BET)', desc: 'Derivations, surface area determination, enthalpy of adsorption (physisorption vs chemisorption).', highYield: true, marksWeight: '4 M' },
      { id: 'phys_11_2', title: 'Colloid Stability & Surface Heterogeneous Catalysis', desc: 'DLVO theory, zeta potential, Langmuir-Hinshelwood vs Eley-Rideal mechanisms.' }
    ]
  },
  {
    subject: 'physical',
    subjectName: 'Physical Chemistry',
    chapterId: 'phys_12',
    title: '12. Solid State Chemistry',
    description: 'Crystal structures, Bragg law, band structure, crystal defects.',
    subtopics: [
      { id: 'phys_12_1', title: 'Crystal Lattices, Miller Indices & Bragg Law', desc: 'Unit cells (sc, bcc, fcc, hcp), d-spacing formula, X-ray diffraction, systematic absences.', highYield: true, marksWeight: '4 M' },
      { id: 'phys_12_2', title: 'Band Structure & Crystal Defects', desc: 'Metals, semiconductors (p-type, n-type), insulators, Schottky & Frenkel defects, non-stoichiometric defects.', highYield: true, marksWeight: '2-4 M' }
    ]
  },
  {
    subject: 'physical',
    subjectName: 'Physical Chemistry',
    chapterId: 'phys_13',
    title: '13. Polymer Chemistry',
    description: 'Molar masses (Mn, Mw, Mz), kinetics of polymerization.',
    subtopics: [
      { id: 'phys_13_1', title: 'Polymer Molar Mass Averages', desc: 'Number-average (Mn), weight-average (Mw), z-average (Mz), polydispersity index (PDI).', highYield: true, marksWeight: '4 M' },
      { id: 'phys_13_2', title: 'Kinetics of Polymerization', desc: 'Addition/chain-growth vs condensation/step-growth polymerization, Mayo equation.' }
    ]
  },
  {
    subject: 'physical',
    subjectName: 'Physical Chemistry',
    chapterId: 'phys_14',
    title: '14. Data Analysis',
    description: 'Mean, standard deviation, errors, linear regression, covariance, correlation coefficient.',
    subtopics: [
      { id: 'phys_14_1', title: 'Error Analysis & Propagation', desc: 'Absolute vs relative error, mean, median, standard deviation, variance, error propagation formulas.', marksWeight: '2 M' },
      { id: 'phys_14_2', title: 'Linear Regression & Correlation', desc: 'Least squares fit, slope & intercept error, Pearson correlation coefficient r.' }
    ]
  },

  // ================= ORGANIC CHEMISTRY =================
  {
    subject: 'organic',
    subjectName: 'Organic Chemistry',
    chapterId: 'org_1',
    title: '1. IUPAC Nomenclature & Isomerism',
    description: 'IUPAC naming of complex molecules, regio- and stereoisomers, CIP rules.',
    subtopics: [
      { id: 'org_1_1', title: 'IUPAC Naming of Polyfunctional & Spiro/Fused Systems', desc: 'Priority order of functional groups, bicyclo & spiro compound naming, atropisomers.' },
      { id: 'org_1_2', title: 'Regio- and Stereoisomerism Rules', desc: 'E/Z, R/S, D/L, Re/Si face designation, absolute vs relative configuration.', highYield: true, marksWeight: '4 M' }
    ]
  },
  {
    subject: 'organic',
    subjectName: 'Organic Chemistry',
    chapterId: 'org_2',
    title: '2. Principles of Stereochemistry',
    description: 'Configurational and conformational isomerism, stereoselectivity, enantioselectivity, asymmetric induction.',
    subtopics: [
      { id: 'org_2_1', title: 'Conformational Analysis of Cyclic & Acyclic Systems', desc: 'Ethane, butane, cyclohexane mono/di-substituted ring flipping, decalins, A-values.', highYield: true, marksWeight: '4-6 M' },
      { id: 'org_2_2', title: 'Stereoselectivity & Asymmetric Induction', desc: 'Enantiomeric excess (%ee), diastereomeric excess (%de), Cram rule, Felkin-Anh model, Chelation control.', highYield: true, marksWeight: '6-8 M' }
    ]
  },
  {
    subject: 'organic',
    subjectName: 'Organic Chemistry',
    chapterId: 'org_3',
    title: '3. Aromaticity',
    description: 'Benzenoid and non-benzenoid compounds, antiaromaticity, annulenes, aromatic ions.',
    subtopics: [
      { id: 'org_3_1', title: 'Hückel Rule & Aromaticity Criteria', desc: '4n+2 rule, benzenoid vs non-benzenoid, aromaticity in ions (tropylium, cyclopentadienyl anion).', highYield: true, marksWeight: '4 M' },
      { id: 'org_3_2', title: 'Annulenes, Homoaromaticity & Antiaromaticity', desc: '10-, 14-, 18-annulenes, antiaromatic 4n systems (cyclobutadiene), NMR chemical shifts in ring currents.', highYield: true, marksWeight: '4 M' }
    ]
  },
  {
    subject: 'organic',
    subjectName: 'Organic Chemistry',
    chapterId: 'org_4',
    title: '4. Organic Reactive Intermediates',
    description: 'Carbocations, carbanions, free radicals, carbenes, benzynes, nitrenes.',
    subtopics: [
      { id: 'org_4_1', title: 'Carbocations & Carbanions', desc: 'Generation, stability order, non-classical carbocations (norbornyl cation), carbanion reactivity.', highYield: true, marksWeight: '4 M' },
      { id: 'org_4_2', title: 'Carbenes, Nitrenes & Benzynes', desc: 'Singlet vs triplet carbenes (Reimer-Tiemann, Simmons-Smith), nitrene generation, benzyne mechanism & trapping.', highYield: true, marksWeight: '4-6 M' }
    ]
  },
  {
    subject: 'organic',
    subjectName: 'Organic Chemistry',
    chapterId: 'org_5',
    title: '5. Organic Reaction Mechanisms',
    description: 'Addition, elimination, substitution reactions (electrophilic, nucleophilic, radical), kinetic isotope effects.',
    subtopics: [
      { id: 'org_5_1', title: 'Nucleophilic & Electrophilic Substitutions', desc: 'SN1, SN2, SNi, Neighboring Group Participation (NGP), SEAr, SNAr, Benzyne mechanism.', highYield: true, marksWeight: '6-8 M' },
      { id: 'org_5_2', title: 'Elimination & Addition Reactions', desc: 'E1, E2, E1cB stereospecificity (Saytzeff vs Hofmann), Markovnikov & anti-Markovnikov additions.', highYield: true, marksWeight: '4 M' }
    ]
  },
  {
    subject: 'organic',
    subjectName: 'Organic Chemistry',
    chapterId: 'org_6',
    title: '6. Common Named Reactions & Rearrangements',
    description: 'Aldol, Claisen, Wittig, Michael, Pinacol, Beckmann, Hofmann, Favorskii, Fries, Claisen rearrangement.',
    subtopics: [
      { id: 'org_6_1', title: 'Carbon-Carbon Bond Forming Reactions', desc: 'Aldol condensation, Claisen ester, Wittig & Horner-Wadsworth-Emmons, Michael addition, Stork enamine.', highYield: true, marksWeight: '8-12 M' },
      { id: 'org_6_2', title: 'Carbocation & Electron-Deficient Rearrangements', desc: 'Pinacol-Pinacolone, Wagner-Meerwein, Beckmann, Hofmann, Curtius, Lossen, Schmidt, Baeyer-Villiger.', highYield: true, marksWeight: '8-12 M' },
      { id: 'org_6_3', title: 'Favorskii, Fries & Benzil-Benzilic Acid Rearrangements', desc: 'Mechanisms, migratory aptitudes, synthetic utility.', highYield: true, marksWeight: '4 M' }
    ]
  },
  {
    subject: 'organic',
    subjectName: 'Organic Chemistry',
    chapterId: 'org_7',
    title: '7. Organic Transformations & Reagents',
    description: 'Oxidations, reductions, organometallic reagents (Li, Mg, Zn, Cu, B, Si, Pd coupling).',
    subtopics: [
      { id: 'org_7_1', title: 'Selective Oxidation Reagents', desc: 'PCC, PDC, Swern, Dess-Martin, KMnO4, OsO4, SeO2, mCPBA, Sharpless epoxidation.', highYield: true, marksWeight: '8-10 M' },
      { id: 'org_7_2', title: 'Selective Reduction Reagents', desc: 'NaBH4, LiAlH4, DIBAL-H, Birch reduction, Luche reduction, Catalytic hydrogenation, Clemmensen, Wolff-Kishner.', highYield: true, marksWeight: '8-10 M' },
      { id: 'org_7_3', title: 'Organometallics & Palladium Coupling Reagents', desc: 'Gilman reagent (R2CuLi), Organolithium, Organozinc (Reformatsky), Heck, Suzuki, Sonogashira, Stille coupling.', highYield: true, marksWeight: '8-12 M' }
    ]
  },
  {
    subject: 'organic',
    subjectName: 'Organic Chemistry',
    chapterId: 'org_8',
    title: '8. Concepts in Organic Synthesis (Retrosynthesis)',
    description: 'Retrosynthesis, disconnection, synthons, umpolung, protecting groups.',
    subtopics: [
      { id: 'org_8_1', title: 'Disconnection Approach & Synthons', desc: 'Target molecule analysis, 1,3- and 1,5-difunctionalized compounds, synthetic equivalents.', highYield: true, marksWeight: '4-6 M' },
      { id: 'org_8_2', title: 'Umpolung Reactivity & Protecting Groups', desc: '1,3-Dithianes (Corey-Seebach), protecting groups for alcohols (THP, TBS, Bn), amines (Boc, Cbz, Fmoc), carbonyls (acetals).', highYield: true, marksWeight: '6-8 M' }
    ]
  },
  {
    subject: 'organic',
    subjectName: 'Organic Chemistry',
    chapterId: 'org_9',
    title: '9. Asymmetric Synthesis',
    description: 'Chiral auxiliaries, asymmetric induction, optical resolution techniques.',
    subtopics: [
      { id: 'org_9_1', title: 'Chiral Auxiliaries & Substrate-Controlled Reactions', desc: 'Evans oxazolidinones, Enders SAMP/RAMP hydrazones, chiral catalysts (BINAP, CBS reduction).', highYield: true, marksWeight: '4-6 M' },
      { id: 'org_9_2', title: 'Resolution Methods & Enantiomeric Excess', desc: 'Optical resolution, kinetic resolution, polarimetry, chiral HPLC & NMR shift reagents.' }
    ]
  },
  {
    subject: 'organic',
    subjectName: 'Organic Chemistry',
    chapterId: 'org_10',
    title: '10. Pericyclic Reactions & Photochemistry',
    description: 'Electrocyclic, cycloaddition, sigmatropic rearrangements, photochemical reactions.',
    subtopics: [
      { id: 'org_10_1', title: 'Electrocyclic & Cycloaddition Reactions', desc: 'Woodward-Hoffmann rules, FMO analysis, Thermal vs Photochemical [4+2] Diels-Alder & [2+2] cycloadditions.', highYield: true, marksWeight: '8-12 M' },
      { id: 'org_10_2', title: 'Sigmatropic Rearrangements', desc: '[1,3], [1,5], [3,3]-Cope and Claisen rearrangements, suprafacial vs antarafacial orbital symmetry.', highYield: true, marksWeight: '6-8 M' },
      { id: 'org_10_3', title: 'Organic Photochemistry', desc: 'Norrish Type I & II reactions, Paterno-Büchi reaction, Di-pi-methane rearrangement, Jablonski diagram.', highYield: true, marksWeight: '4-6 M' }
    ]
  },
  {
    subject: 'organic',
    subjectName: 'Organic Chemistry',
    chapterId: 'org_11',
    title: '11. Heterocyclic Chemistry',
    description: 'Synthesis & reactivity of pyrrole, furan, thiophene, pyridine, indole, quinoline, isoquinoline.',
    subtopics: [
      { id: 'org_11_1', title: '5-Membered Heterocycles (Pyrrole, Furan, Thiophene)', desc: 'Paal-Knorr synthesis, electrophilic substitution position (C-2 vs C-3).', highYield: true, marksWeight: '4 M' },
      { id: 'org_11_2', title: '6-Membered & Fused Heterocycles (Pyridine, Indole, Quinoline)', desc: 'Chichibabin reaction, Fischer indole synthesis, Bischler-Napieralski & Skraup synthesis.', highYield: true, marksWeight: '4-6 M' }
    ]
  },
  {
    subject: 'organic',
    subjectName: 'Organic Chemistry',
    chapterId: 'org_12',
    title: '12. Chemistry of Natural Products',
    description: 'Carbohydrates, proteins, fatty acids, nucleic acids, terpenes, steroids, alkaloids.',
    subtopics: [
      { id: 'org_12_1', title: 'Carbohydrates, Amino Acids & Nucleic Acids', desc: 'Mutarotation, D-glucose reactions, peptide sequence determination, DNA/RNA bases.', highYield: true, marksWeight: '4-6 M' },
      { id: 'org_12_2', title: 'Terpenes, Alkaloids & Biogenesis', desc: 'Isoprene rule, mono/sesqui/diterpenes, alkaloid classification, mevalonate pathway.' }
    ]
  },
  {
    subject: 'organic',
    subjectName: 'Organic Chemistry',
    chapterId: 'org_13',
    title: '13. Structure Determination (Organic Spectroscopy)',
    description: 'IR, UV-Vis, 1H & 13C NMR, Mass Spectrometry interpretation.',
    subtopics: [
      { id: 'org_13_1', title: '1H & 13C NMR Spectral Interpretation', desc: 'Chemical shifts, spin-spin splitting J-values, DEPT-45/90/135, NOE, 2D NMR basics.', highYield: true, marksWeight: '8-14 M' },
      { id: 'org_13_2', title: 'IR, UV-Vis & Mass Spectrometry', desc: 'Woodward-Fieser rules for conjugated dienes/enones, McLafferty fragmentation, molecular ion peak.', highYield: true, marksWeight: '6-8 M' }
    ]
  },

  // ================= INTERDISCIPLINARY TOPICS =================
  {
    subject: 'interdisciplinary',
    subjectName: 'Interdisciplinary Topics',
    chapterId: 'inter_1',
    title: '1. Chemistry in Nanoscience & Technology',
    description: 'Nanomaterials synthesis, quantum dots, carbon nanotubes, characterization.',
    subtopics: [
      { id: 'inter_1_1', title: 'Synthesis & Properties of Nanomaterials', desc: 'Top-down & bottom-up methods, sol-gel, quantum confinement, band gap tunability.' },
      { id: 'inter_1_2', title: 'CNTs, Graphene & Characterization (AFM, TEM, SEM)', desc: 'Single-walled vs multi-walled CNTs, electron microscopy principles.', marksWeight: '2-4 M' }
    ]
  },
  {
    subject: 'interdisciplinary',
    subjectName: 'Interdisciplinary Topics',
    chapterId: 'inter_2',
    title: '2. Catalysis and Green Chemistry',
    description: '12 Principles of Green Chemistry, atom economy, ionic liquids, PTC, biocatalysis.',
    subtopics: [
      { id: 'inter_2_1', title: 'Principles of Green Chemistry & Atom Economy', desc: 'Calculation of % Atom Economy, E-factor, green solvents (ionic liquids, supercritical CO2).', highYield: true, marksWeight: '2-4 M' },
      { id: 'inter_2_2', title: 'Phase Transfer & Biocatalysis', desc: 'Crown ethers & quaternary ammonium PTC mechanisms, enzymatic transformations.' }
    ]
  },
  {
    subject: 'interdisciplinary',
    subjectName: 'Interdisciplinary Topics',
    chapterId: 'inter_3',
    title: '3. Medicinal Chemistry',
    description: 'Drug design, SAR, pharmacophores, mode of action of antibiotics & anticancer agents.',
    subtopics: [
      { id: 'inter_3_1', title: 'Structure-Activity Relationship (SAR) & Drug Design', desc: 'Pharmacophore identification, QSAR, ED50, LD50, therapeutic index.' },
      { id: 'inter_3_2', title: 'Modes of Action of Antibiotics & Anticancer Drugs', desc: 'Beta-lactams (penicillin), sulfa drugs, alkylating agents, antimetabolites.', marksWeight: '2-4 M' }
    ]
  },
  {
    subject: 'interdisciplinary',
    subjectName: 'Interdisciplinary Topics',
    chapterId: 'inter_4',
    title: '4. Supramolecular Chemistry',
    description: 'Host-guest chemistry, crown ethers, cryptands, calixarenes, rotaxanes, catenanes.',
    subtopics: [
      { id: 'inter_4_1', title: 'Host-Guest Molecular Recognition', desc: 'Crown ether cation selectivity, cryptands, cyclodextrins, binding constants.', marksWeight: '2-4 M' },
      { id: 'inter_4_2', title: 'Self-Assembly & Molecular Machines', desc: 'Hydrogen bonding networks, rotaxanes, catenanes, molecular switches.' }
    ]
  },
  {
    subject: 'interdisciplinary',
    subjectName: 'Interdisciplinary Topics',
    chapterId: 'inter_5',
    title: '5. Environmental Chemistry',
    description: 'Atmospheric pollution, greenhouse effect, ozone layer, water pollutants, heavy metals.',
    subtopics: [
      { id: 'inter_5_1', title: 'Atmospheric Chemistry & Photochemical Smog', desc: 'Stratospheric ozone depletion mechanism, greenhouse gases, acid rain.', marksWeight: '2-4 M' },
      { id: 'inter_5_2', title: 'Water Pollution & Heavy Metal Toxicity', desc: 'BOD, COD, DO, toxic effects of As, Pb, Cd, Hg, water purification methods.' }
    ]
  }
];
