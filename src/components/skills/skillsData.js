
import {
  Activity,
  Cpu,
  Gauge,
  Network,
  ShieldCheck,
  Zap,
} from 'lucide-react';

/* =========================================================
   ELECTRICAL ENGINEERING SKILLS DATABASE
   Used by Skills.jsx and SkillsSpinner.jsx
========================================================= */

export const skillGroups = [
  {
    id: 'power',
    number: '01',
    short: 'Power Systems',
    title: 'Electrical Power & Installation',
    subtitle: 'POWER ENGINEERING',
    description:
      'Electrical power generation, distribution, electrical networks, installation and power system analysis.',
    icon: Zap,
    color: '#22D3EE',
    skills: [
      'Single-Phase Electrical Systems',
      'Three-Phase Electrical Systems',
      'AC Electrical Systems',
      'DC Electrical Systems',
      'Electrical Wiring & Installation',
      'Industrial Electrical Installation',
      'Electrical Network Analysis',
      'Load Calculations',
      'Power Calculations',
      'Power Systems Engineering',
      'Cable Selection & Sizing',
      'Earthing & Grounding Systems',
      'Electrical Generators',
      'Power Transformers',
      'Electrical Machines',
      'Power Distribution Systems',
    ],
  },

  {
    id: 'protection',
    number: '02',
    short: 'Protection',
    title: 'Electrical Protection & Panels',
    subtitle: 'INDUSTRIAL ELECTRICAL SYSTEMS',
    description:
      'Industrial electrical panels, protection devices, electrical safety, troubleshooting and maintenance.',
    icon: ShieldCheck,
    color: '#60A5FA',
    skills: [
      'Industrial Panel Board Wiring',
      'Electrical Panel Design',
      'Distribution Board Design',
      'Electrical Protection Systems',
      'Circuit Breaker Selection',
      'Relay Selection',
      'Overload Protection',
      'Short Circuit Protection',
      'Earth Leakage Protection',
      'Electrical Fault Diagnosis',
      'Preventive Maintenance',
      'Corrective Maintenance',
      'Electrical Safety Inspection',
      'Equipment Testing',
      'Equipment Commissioning',
      'Industrial Electrical Maintenance',
    ],
  },

  {
    id: 'machines',
    number: '03',
    short: 'Motors & Drives',
    title: 'Electrical Machines & Motor Control',
    subtitle: 'MOTOR CONTROL ENGINEERING',
    description:
      'Electrical machine technologies, industrial motor applications, speed control and motion control systems.',
    icon: Gauge,
    color: '#A78BFA',
    skills: [
      'AC Motor Control',
      'DC Motor Control',
      'Single-Phase Motors',
      'Three-Phase Motors',
      'Induction Motors',
      'Synchronous Motors',
      'Brushed DC Motors',
      'Brushless DC Motors (BLDC)',
      'Universal Motors',
      'Servo Motors',
      'Stepper Motors',
      'Variable Frequency Drives (VFD)',
      'Motor Starters',
      'Star-Delta Motor Control',
      'Forward & Reverse Motor Control',
      'Motor Protection Systems',
      'Generator Systems',
      'Transformer Applications',
    ],
  },

  {
    id: 'automation',
    number: '04',
    short: 'Automation',
    title: 'Industrial Automation & Control',
    subtitle: 'INTELLIGENT CONTROL SYSTEMS',
    description:
      'Industrial automation, programmable controllers, process control, pneumatic systems and intelligent machinery.',
    icon: Cpu,
    color: '#34D399',
    skills: [
      'PLC Programming',
      'SCADA Systems',
      'HMI Development',
      'Industrial Automation',
      'Industrial Control Systems',
      'PID Control Systems',
      'Pneumatic Systems',
      'Electro-Pneumatic Systems',
      'Hydraulic Systems',
      'Industrial Sensors',
      'Industrial Actuators',
      'Process Instrumentation',
      'Automatic Control Systems',
      'Motor Control Automation',
      'Industrial Machine Control',
      'Control Panel Development',
    ],
  },

  {
    id: 'instrumentation',
    number: '05',
    short: 'Instrumentation',
    title: 'Instrumentation & Communication',
    subtitle: 'INDUSTRIAL CONNECTIVITY',
    description:
      'Industrial measurement, sensor interfacing, monitoring and communication technologies for modern engineering systems.',
    icon: Network,
    color: '#FBBF24',
    skills: [
      'Industrial Instrumentation',
      'Industrial Communication Protocols',
      'Modbus RTU',
      'Modbus TCP',
      'CAN Bus Communication',
      'RS-485 Communication',
      'Industrial Ethernet',
      'UART Communication',
      'I2C Communication',
      'SPI Communication',
      'Analog Signal Processing',
      'Digital Signal Monitoring',
      'Sensor Interfacing',
      'Temperature Measurement',
      'Voltage & Current Monitoring',
      'Industrial Data Acquisition',
    ],
  },
];

/* =========================================================
   ADDITIONAL SECTION DATA
========================================================= */

export const totalSkillCount = skillGroups.reduce(
  (total, group) => total + group.skills.length,
  0
);

export const totalCategories = skillGroups.length;

export const skillOverviewIcon = Activity;

/* =========================================================
   3D SPINNER CONFIGURATION
========================================================= */

export const spinnerConfig = {
  rotationSpeed: 0.12,
  hoverSpeed: 0.025,
  particleCount: 1200,
  orbitRadius: 2.8,
  centerColor: '#22D3EE',
  backgroundColor: '#020617',
};

/* =========================================================
   3D ANIMATION CONFIGURATION
========================================================= */

export const animationConfig = {
  enableParticles: true,
  enableGlow: true,
  enableMouseInteraction: true,
  enableAutoRotation: true,
  enableFloatingMotion: true,
  animationSpeed: 1,
};

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

export const getSkillGroup = (id) => {
  return skillGroups.find((group) => group.id === id);
};

export const getAllSkills = () => {
  return skillGroups.flatMap((group) =>
    group.skills.map((skill) => ({
      name: skill,
      category: group.title,
      categoryId: group.id,
      color: group.color,
    }))
  );
};
