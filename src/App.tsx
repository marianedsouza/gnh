import React, { useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'motion/react';
import { HeroIllustration } from './HeroIllustration';
import {
  Brain,
  Eye,
  HandHeart,
  Globe,
  ArrowRight,
  Check,
  Sparkles,
  Shield,
  ChevronRight,
  Users,
  Mail,
  Heart,
  UserCheck,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  Zap,
  Award,
  Lock,
  Phone,
  FileText,
  MapPin,
  ChevronDown,
  Compass,
  Briefcase,
  Network,
  Building2,
  GraduationCap,
  Mic,
  Box,
  Sprout,
  Book
} from 'lucide-react';

import LogoGrupoNH from './assets/LOGO Grupo NH.png';
import LogoSynaptEssence from './assets/LOGO SynaptEssence.png';
import LogoODespertar from './assets/LOGO o despertar.png';
import LogoConscienciaViva from './assets/LOGO Escola da Consciencia VIVA.png';
import LogoRazga from './assets/RASGA LOGO-1.png';
import LogoPodRazgar from './assets/LOGO POD RAZGAR.png';
import LogoInstitutoNH from './assets/LOGO Instituto NH.png';
import LogoHorizonteMulher from './assets/LOGO Horizonte MULHER.png';
import LogoMundialBusiness from './assets/LOGO Mundial BUSINESS.png';
import ImgGnh1 from './assets/gnh (1).jpeg';
import HeroImage from './assets/hero.png';



/* -------------------------------------------------------------------------- */
/*                                SVG GENERATOR                               */
/* -------------------------------------------------------------------------- */

function generateGearPath(rOuter: number, rInner: number, teeth: number) {
  let d = '';
  const step = (Math.PI * 2) / teeth;
  const tW = 0.2; // 20% flat top
  const vW = 0.2; // 20% flat valley
  const sW = (1 - tW - vW) / 2; // remaining 60% slope

  for (let i = 0; i <= teeth; i++) {
    const angle = i * step;
    const a1 = angle - step * (tW / 2);
    const a2 = angle + step * (tW / 2);
    const a3 = a2 + step * sW;
    const a4 = a3 + step * vW;

    const p1 = [Math.cos(a1) * rOuter, Math.sin(a1) * rOuter];
    const p2 = [Math.cos(a2) * rOuter, Math.sin(a2) * rOuter];
    const p3 = [Math.cos(a3) * rInner, Math.sin(a3) * rInner];
    const p4 = [Math.cos(a4) * rInner, Math.sin(a4) * rInner];

    if (i === 0) {
      d += `M ${p1[0]} ${p1[1]} `;
      d += `L ${p2[0]} ${p2[1]} L ${p3[0]} ${p3[1]} L ${p4[0]} ${p4[1]} `;
    } else if (i === teeth) {
      d += `L ${p1[0]} ${p1[1]} `;
    } else {
      d += `L ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]} L ${p3[0]} ${p3[1]} L ${p4[0]} ${p4[1]} `;
    }
  }
  d += 'Z';
  return d;
}

/* -------------------------------------------------------------------------- */
/*                                 SVG DEFS                                   */
/* -------------------------------------------------------------------------- */

const SVGDefs = () => (
  <svg style={{ width: 0, height: 0, position: 'absolute', visibility: 'hidden' }} aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="gold-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DFC373" />
        <stop offset="30%" stopColor="#FFF2C3" />
        <stop offset="60%" stopColor="#C99D3C" />
        <stop offset="100%" stopColor="#8A601B" />
      </linearGradient>
      <linearGradient id="gold-side" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#553C12" />
        <stop offset="50%" stopColor="#9C772F" />
        <stop offset="100%" stopColor="#DFC373" />
      </linearGradient>
      <linearGradient id="blue-top" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1B3A64" />
        <stop offset="40%" stopColor="#0B1A30" />
        <stop offset="100%" stopColor="#050C18" />
      </linearGradient>
      <linearGradient id="blue-side" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#03080F" />
        <stop offset="100%" stopColor="#0E233E" />
      </linearGradient>
    </defs>
  </svg>
);

/* -------------------------------------------------------------------------- */
/*                               EXRUDED GEAR                                 */
/* -------------------------------------------------------------------------- */

interface ExtrudedGearProps {
  teeth: number;
  rOuter: number;
  rInner: number;
  depth?: number;
  layers?: number;
  type?: 'gold' | 'blue';
  className?: string;
}

const ExtrudedGear = React.memo(
  ({
    teeth,
    rOuter = 100,
    rInner = 80,
    depth = 15,
    layers = 5,
    type = 'gold',
    className = '',
  }: ExtrudedGearProps) => {
    const path = useMemo(() => generateGearPath(rOuter, rInner, teeth), [teeth, rOuter, rInner]);

    return (
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className} [transform-style:preserve-3d]`}>
        <svg
          viewBox="-105 -105 210 210"
          className="absolute inset-0 w-full h-full"
          style={{ transform: `translate(-4px, 12px) scale(0.97)`, filter: 'blur(8px) opacity(0.3)' }}
        >
          <path d={path} fill="#000" />
        </svg>

        {Array.from({ length: layers }).map((_, i) => {
          const isTop = i === layers - 1;
          const z = (i / layers) * depth;
          return (
            <svg
              key={i}
              viewBox="-105 -105 210 210"
              className="absolute inset-0 w-full h-full"
              style={{ transform: `translateZ(${z}px)` }}
            >
              <path d={path} fill={`url(#${type}-${isTop ? 'top' : 'side'})`} />
            </svg>
          );
        })}
      </div>
    );
  }
);

/* -------------------------------------------------------------------------- */
/*                                LABEL BOX                                   */
/* -------------------------------------------------------------------------- */

interface LabelBoxProps {
  title: string;
  subtitle: string;
  isLeft: boolean;
}

const LabelBox = ({ title, subtitle, isLeft }: LabelBoxProps) => (
  <div
    className={`relative flex items-center justify-center sm:justify-start ${isLeft ? 'sm:flex-row-reverse' : 'sm:flex-row'} pointer-events-none w-max`}
  >
    <div className={`hidden sm:block w-12 h-px bg-gradient-to-r ${isLeft ? 'from-[#9C772F] to-[#DFC373]' : 'from-[#DFC373] to-[#9C772F]'}`} />
    <div className="hidden sm:block w-2.5 h-2.5 rounded-full bg-[#DFC373] shrink-0" />

    <div
      className={`bg-white/85 backdrop-blur-md border border-[#DFC373]/35 px-3 py-2 sm:px-5 sm:py-3 rounded-lg shadow-[0_8px_30px_rgba(156,119,47,0.15)] ${isLeft ? 'sm:mr-3 text-center sm:text-right' : 'sm:ml-3 text-center sm:text-left'
        }`}
    >
      <div className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-widest text-[#0C223F] mb-0.5 sm:mb-1 uppercase leading-tight">
        {title}
      </div>
      <div className="text-[11.5px] sm:text-xs md:text-sm font-bold tracking-wider text-[#9C772F] uppercase leading-tight font-serif">
        {subtitle}
      </div>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*                                GEAR NODE                                   */
/* -------------------------------------------------------------------------- */

interface GearNodeProps {
  type: 'center' | 'outer';
  rotation: MotionValue<number>;
  orbitAngle?: MotionValue<number>;
  initialAngle?: number;
  distance?: number;
  title?: string;
  subtitle?: string;
  icon?: any;
  labelPos?: 'left' | 'right';
  initialRot?: number;
  textOpacity?: MotionValue<number>;
  logoUrl?: string;
  onClick?: () => void;
  isMobile?: boolean;
}

const GearNode = ({
  type,
  rotation,
  orbitAngle,
  initialAngle = 0,
  distance = 0,
  title,
  subtitle,
  icon: Icon,
  labelPos,
  initialRot = 0,
  textOpacity,
  logoUrl,
  onClick,
  isMobile = false,
}: GearNodeProps) => {
  const isCenter = type === 'center';
  const safeOrbit = orbitAngle || new MotionValue(0);

  const x = useTransform(safeOrbit, v =>
    distance * Math.sin((v + initialAngle) * (Math.PI / 180))
  );

  const y = useTransform(safeOrbit, v =>
    -distance * Math.cos((v + initialAngle) * (Math.PI / 180))
  );

  const styleObj = isCenter ? { x: 0, y: 0 } : { x, y };

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center [transform-style:preserve-3d]"
      style={styleObj}
    >
      {/* Dynamic Rotation Gear */}
      {isMobile ? (
        <motion.div
          className="absolute w-0 h-0 flex items-center justify-center [transform-style:preserve-3d]"
          animate={{ rotate: isCenter ? 360 : -360 }}
          transition={{ repeat: Infinity, duration: isCenter ? 15 : 10, ease: "linear" }}
        >
          <div className="absolute w-0 h-0" style={{ transform: `rotate(${initialRot}deg)` }}>
            {isCenter ? (
              <ExtrudedGear
                type="blue"
                teeth={18}
                rOuter={95}
                rInner={72.5}
                depth={24}
                layers={5}
                className="w-[190px] h-[190px]"
              />
            ) : (
              <ExtrudedGear
                type="gold"
                teeth={12}
                rOuter={95}
                rInner={65}
                depth={16}
                layers={4}
                className="w-[130px] h-[130px]"
              />
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="absolute w-0 h-0 flex items-center justify-center [transform-style:preserve-3d]"
          style={{ rotate: rotation }}
        >
          <div className="absolute w-0 h-0" style={{ transform: `rotate(${initialRot}deg)` }}>
            {isCenter ? (
              <ExtrudedGear
                type="blue"
                teeth={18}
                rOuter={95}
                rInner={72.5}
                depth={24}
                layers={5}
                className="w-[190px] h-[190px]"
              />
            ) : (
              <ExtrudedGear
                type="gold"
                teeth={12}
                rOuter={95}
                rInner={65}
                depth={16}
                layers={4}
                className="w-[130px] h-[130px]"
              />
            )}
          </div>
        </motion.div>
      )}

      {/* Faceplate */}
      <div
        className="absolute w-0 h-0 flex items-center justify-center [transform-style:preserve-3d]"
        style={{ transform: `translateZ(${isCenter ? 25 : 17}px)` }}
      >
        {isCenter ? (
          <div
            onClick={onClick}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130px] h-[130px] rounded-full border border-[#061224] bg-radial from-[#12284C] to-[#081326] flex flex-col items-center justify-center text-center shadow-[inset_0_4px_12px_rgba(0,0,0,0.6),_0_5px_12px_rgba(0,0,0,0.4)] p-4 pointer-events-auto cursor-pointer"
          >
            <div className="absolute inset-1.5 rounded-full border border-[#DFC373]/60" />
            <div className="absolute inset-2.5 rounded-full border-[0.5px] border-[#DFC373]/20" />
            {logoUrl ? (
              <img src={logoUrl} alt="Grupo Novo Horizonte" className="w-[85px] h-[85px] object-contain z-10 brightness-0 invert" />
            ) : (
              <div className="z-10 flex flex-col items-center justify-center mt-0.5 px-3">
                <span className="text-[9px] text-[#DFC373] tracking-[0.15em] font-sans uppercase mb-1 leading-none">
                  NÚCLEO INTEGRADOR
                </span>
                <span className="text-[11px] md:text-[12px] font-bold text-white tracking-wider leading-tight font-serif uppercase">
                  GRUPO NOVO
                  <br />
                  HORIZONTE&reg;
                </span>
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={onClick}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-full bg-gradient-to-br from-white to-[#F5F5F3] flex items-center justify-center shadow-[inset_0_2px_6px_rgba(0,0,0,0.05),_0_4px_10px_rgba(0,0,0,0.2)] border border-[#DFC373]/30 p-2 pointer-events-auto cursor-pointer hover:border-[#DFC373] hover:scale-105 transition-all duration-300"
          >
            <div className="absolute inset-1.5 rounded-full border-[1.5px] border-[#DFC373]" />
            <div className="absolute inset-[6px] rounded-full border-[0.5px] border-[#DFC373]/30" />
            {logoUrl ? (
              <img src={logoUrl} alt={subtitle} className="w-[58px] h-[58px] object-contain z-10" />
            ) : Icon && (
              <Icon
                className="w-8 h-8 text-[#9C772F] z-10"
                strokeWidth={1.25}
              />
            )}
          </div>
        )}
      </div>
      {/* Label Assembly — hidden on mobile, visible sm+ */}
      {!isCenter && title && subtitle && labelPos && (
        <div
          onClick={onClick}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden sm:flex items-center justify-center w-max -translate-y-1/2 cursor-pointer pointer-events-auto hover:scale-105 transition-all duration-300 ${labelPos === 'left'
            ? 'left-auto right-[40px] translate-x-0'
            : 'left-[40px] translate-x-0'
            }`}
          style={{ zIndex: 30 }}
        >
          <LabelBox title={title} subtitle={subtitle} isLeft={labelPos === 'left'} />
        </div>
      )}

    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*                               PILLAR ICON                                  */
/* -------------------------------------------------------------------------- */

interface PillarIconProps {
  active: boolean;
  className?: string;
}

const PillarIcon = ({ active, className = "w-5 h-5" }: PillarIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={active ? "2" : "1.5"}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-all duration-300 ${className}`}
  >
    {/* Capital */}
    <path d="M4 4h16M5 7h14" />
    {/* Columns */}
    <path d="M8 7v11M12 7v11M16 7v11" />
    {/* Base */}
    <path d="M5 18h14M3 21h18" strokeWidth={active ? "2.3" : "1.8"} />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*                                MAIN APPLICATION                            */
/* -------------------------------------------------------------------------- */

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Custom states for interactions
  const [activeProblemStep, setActiveProblemStep] = useState<number>(0);
  const [activePillarTab, setActivePillarTab] = useState<'p1' | 'p2' | 'p3' | 'p4'>('p1');
  const [formData, setFormData] = useState({ name: '', email: '', organization: '', profile: 'Padrinho / Madrinha de Impacto', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionProtocol, setSubmissionProtocol] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 22, stiffness: 95 });

  const textOpacity = useTransform(smoothProgress, [0, 0.12, 0.3, 1], [1, 1, 0, 0]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.12, 0.3, 1], [1, 1, 0, 0]);
  // rotateCenter/rotateOuter still used on desktop
  const rotateCenter = useTransform(smoothProgress, [0, 1], [0, 310]);
  const rotateOuter = useTransform(smoothProgress, [0, 1], [0, -465]);

  const D = 142; // Perfect meshing distance

  // Smooth scroll handler
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  const selectProfileAndScroll = (profileValue: string) => {
    setFormData(prev => ({ ...prev, profile: profileValue }));
    scrollTo('aliancas');
  };

  // Structured Content Arrays to reduce code token payload
  const problemSteps = [
    {
      title: "TRAUMA",
      desc: "Eventos doloridos ou rupturas estruturais que fragilizam a integridade mental e emocional primitiva do indivíduo."
    },
    {
      title: "SILÊNCIO",
      desc: "O abafamento da dor e dos tabus comunitários. O silenciamento das narrativas pessoais impede a cura coletiva."
    },
    {
      title: "VULNERABILIDADE",
      desc: "A perda das defesas psíquicas e sociais, abrindo espaço para riscos iminentes à dignidade humana básica."
    },
    {
      title: "DESESTRUTURA FAMILIAR",
      desc: "O colapso da rede de suporte primária. Quando a família se desfaz, rompem-se as referências e a proteção mútua."
    },
    {
      title: "FALTA DE AUTONOMIA",
      desc: "Dependência de auxílios externos crônicos, vulnerabilidade financeira extrema e aprisionamento social recorrente."
    },
    {
      title: "EXCLUSÃO SOCIAL",
      desc: "A perda de laços comunitários e de pertencimento, empurrando as pessoas para as margens da sociedade."
    },
    {
      title: "IMPACTO TERRITORIAL",
      desc: "O esvaziamento econômico e social de regiões inteiras, perpetuando ciclos geracionais de escassez."
    }
  ];

  const dynamicsSteps = [
    {
      num: "01",
      title: "FORTALECER O SER",
      desc: "Reconstrução da base individual e psíquica através de metodologias clínicas e comportamentais.",
      brand: "Synapt Essence"
    },
    {
      num: "02",
      title: "EXPANDIR CONSCIÊNCIA",
      desc: "Transformação cultural profunda e rompimento estruturado de silêncios históricos.",
      brand: "Despertar & Rázga"
    },
    {
      num: "03",
      title: "RECONSTRUIR VIDAS",
      desc: "Impacto social aplicado, acolhimento clínico e restauração da dignidade comunitária básica.",
      brand: "Instituto & Horizonte Mulher"
    },
    {
      num: "04",
      title: "GERAR AUTONOMIA",
      desc: "Sustentabilidade econômica real e regeneração territorial sustentável com autonomia produtiva.",
      brand: "Mundial Business"
    }
  ];

  // Formata o link do WhatsApp para o redirecionamento
  const getWhatsappUrl = (protocolCode = submissionProtocol) => {
    const textMessage = `Olá! Gostaria de registrar uma Intenção de Aliança no Ecossistema Novo Horizonte.

👤 *Nome*: ${formData.name}
📧 *E-mail*: ${formData.email}
💼 *Perfil*: ${formData.profile}
🏢 *Organização*: ${formData.organization || 'Não informada'}
💬 *Proposta/Mensagem*: ${formData.message || 'Sem mensagem adicional'}
🔑 *Protocolo*: ${protocolCode}`;

    return `https://wa.me/5567996671390?text=${encodeURIComponent(textMessage)}`;
  };

  // Proposal submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    const protocolCode = 'NH-' + Math.floor(Math.random() * 900000 + 100000);
    setSubmissionProtocol(protocolCode);

    // Tenta abrir o WhatsApp imediatamente
    const whatsappUrl = getWhatsappUrl(protocolCode);
    window.open(whatsappUrl, '_blank');

    setFormSubmitted(true);
  };

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-[#FBFBFA] font-sans antialiased text-[#0F213A] selection:bg-[#DFC373] selection:text-white relative overflow-x-hidden">
      <SVGDefs />


      {/* -------------------------------------------------------------------------- */
      /*                                NAVBAR                                      */
      /* -------------------------------------------------------------------------- */}
      <header className="sticky top-0 w-full bg-[#FCFAF5]/60 backdrop-blur-xl border-b border-[#DFC373]/20 shadow-[0_4px_30px_rgba(156,119,47,0.04)] z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
            <img src={LogoGrupoNH} alt="Logo Grupo Novo Horizonte" className="h-14 sm:h-16 w-auto object-contain py-1" />
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold text-[#0F213A]/80">
            <button onClick={() => scrollTo('hero')} className="hover:text-[#DFC373] transition-colors cursor-pointer">Início</button>
            <button onClick={() => scrollTo('problema')} className="hover:text-[#DFC373] transition-colors cursor-pointer">Problema</button>
            <button onClick={() => scrollTo('experienca')} className="hover:text-[#DFC373] transition-colors cursor-pointer">A Engrenagem</button>
            <button onClick={() => scrollTo('dinamica')} className="hover:text-[#DFC373] transition-colors cursor-pointer">Como Funciona</button>
            <button onClick={() => scrollTo('pilares')} className="hover:text-[#DFC373] transition-colors cursor-pointer">Os Pilares</button>
            <button onClick={() => scrollTo('diferencial')} className="hover:text-[#DFC373] transition-colors cursor-pointer">Diferencial</button>
          </nav>

          <button
            onClick={() => scrollTo('aliancas')}
            className="border-b-2 border-[#DFC373] pb-1.5 pt-0.5 text-xs sm:text-sm tracking-wider uppercase text-[#0B1B33] font-bold hover:text-[#9C772F] transition-all flex items-center gap-2 group cursor-pointer"
          >
            Fazer Parte
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </header>

      {/* -------------------------------------------------------------------------- */
      /*                               HERO SECTION                                 */
      /* -------------------------------------------------------------------------- */}
      <section id="hero" className="relative w-full min-h-[90dvh] flex flex-col justify-center py-20 px-6 sm:px-12 bg-radial from-white to-[#F7F6F2] z-10 border-b border-[#DFC373]/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#dfc37305_1px,transparent_1px),linear-gradient(to_bottom,#dfc37305_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          <div className="lg:col-span-6 flex flex-col items-start text-left z-20 order-2 lg:order-1 mt-2 lg:mt-0">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#DFC373]/30 bg-[#DFC373]/5 text-[10px] md:text-xs font-semibold tracking-widest text-[#9C772F] uppercase mb-6">
              <Sparkles className="w-3 h-3 text-[#DFC373]" /> Grupo Novo Horizonte® | Ecossistema de Regeneração Humana e Territorial
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#0B1B33] font-serif tracking-tight leading-[1.15] mb-6">
              Pessoas Fortalecidas.<br />
              Comunidades Vivas.<br />
              <span
                className="font-bold relative bg-clip-text bg-gradient-to-r from-[#0B1B33] via-[#9C772F] to-[#DFC373]"
                style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', color: 'transparent' }}
              >
                Territórios Regenerados.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#0F213A]/80 font-normal max-w-xl leading-relaxed mb-10">
              Integramos o potencial de cada ser humano, o cuidado social e o desenvolvimento sustentável para gerar transformações reais e duradouras nas pessoas e no mundo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => scrollTo('experienca')}
                className="bg-gradient-to-r from-[#0B1B33] to-[#122A4E] text-white px-8 py-4 rounded-lg tracking-wider text-xs sm:text-sm font-bold uppercase transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-3 hover:shadow-lg cursor-pointer hover:from-[#122A4E] hover:to-[#0B1B33]"
              >
                Compreenda Nosso Modelo
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('aliancas')}
                className="border border-[#DFC373] hover:bg-[#DFC373]/5 text-[#9C772F] px-8 py-4 rounded-lg tracking-wider text-xs sm:text-sm font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Tornar-se Aliado Estratégico
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex justify-center items-center w-full order-1 lg:order-2 mb-10 lg:mb-0">
            <div className="relative w-full max-w-[600px] mx-auto lg:ml-auto">
              <motion.div
                className="w-full"
                animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              >
                 <img src={HeroImage} className="w-full h-auto object-cover" alt="Hero Image" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */
      /*                         BRAND SHOWCASE SECTION                             */
      /* -------------------------------------------------------------------------- */}
      <section className="relative w-full py-12 px-6 bg-gradient-to-b from-[#F7F6F2] to-white border-b border-[#DFC373]/15 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[10px] tracking-[0.25em] text-[#9C772F] font-bold uppercase block mb-8">
            NOSSO ECOSSISTEMA INTEGRADOR DE MARCAS & INICIATIVAS
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-4 items-stretch justify-center">
            {/* GRUPO NH */}
            <div
              onClick={() => scrollTo('pilares')}
              className="p-4 rounded-xl border border-[#DFC373]/20 bg-white/70 backdrop-blur-md hover:bg-white hover:border-[#DFC373]/50 hover:scale-[1.02] shadow-[0_4px_24px_rgba(156,119,47,0.04)] hover:shadow-[0_8px_32px_rgba(156,119,47,0.1)] transition-all duration-300 flex flex-col justify-between items-center text-center group cursor-pointer"
            >
              <div className="flex-1 flex items-center justify-center min-h-[110px] sm:min-h-[130px] lg:min-h-[140px]">
                <img src={LogoGrupoNH} alt="Grupo Novo Horizonte Logo" className="h-14 sm:h-16 lg:h-18 w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-[#0C223F] uppercase mt-3">Grupo NH</span>
              <span className="text-[10px] text-[#0F213A]/60 font-semibold">Núcleo Integrador</span>
            </div>

            {/* SYNAPT */}
            <div
              onClick={() => { setActivePillarTab('p1'); scrollTo('pilares'); }}
              className="p-4 rounded-xl border border-[#DFC373]/20 bg-white/70 backdrop-blur-md hover:bg-white hover:border-[#DFC373]/50 hover:scale-[1.02] shadow-[0_4px_24px_rgba(156,119,47,0.04)] hover:shadow-[0_8px_32px_rgba(156,119,47,0.1)] transition-all duration-300 flex flex-col justify-between items-center text-center group cursor-pointer"
            >
              <div className="flex-1 flex items-center justify-center min-h-[110px] sm:min-h-[130px] lg:min-h-[140px]">
                <img src={LogoSynaptEssence} alt="Synapt Essence Logo" className="h-14 sm:h-16 lg:h-18 w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-[#0C223F] uppercase mt-3">Synapt Essence</span>
              <span className="text-[10px] text-[#0F213A]/60 font-semibold">Desenv. Humano</span>
            </div>

            {/* O DESPERTAR */}
            <div
              onClick={() => { setActivePillarTab('p2'); scrollTo('pilares'); }}
              className="p-4 rounded-xl border border-[#DFC373]/20 bg-white/70 backdrop-blur-md hover:bg-white hover:border-[#DFC373]/50 hover:scale-[1.02] shadow-[0_4px_24px_rgba(156,119,47,0.04)] hover:shadow-[0_8px_32px_rgba(156,119,47,0.1)] transition-all duration-300 flex flex-col justify-between items-center text-center group cursor-pointer"
            >
              <div className="flex-1 flex items-center justify-center min-h-[110px] sm:min-h-[130px] lg:min-h-[140px]">
                <img src={LogoODespertar} alt="O Despertar Logo" className="h-14 sm:h-16 lg:h-18 w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-[#0C223F] uppercase mt-3">O Despertar</span>
              <span className="text-[10px] text-[#0F213A]/60 font-semibold">Mentoria Consciência</span>
            </div>

            {/* ESCOLA DA CONSCIENCIA VIVA */}
            <div
              onClick={() => { setActivePillarTab('p2'); scrollTo('pilares'); }}
              className="p-4 rounded-xl border border-[#DFC373]/20 bg-white/70 backdrop-blur-md hover:bg-white hover:border-[#DFC373]/50 hover:scale-[1.02] shadow-[0_4px_24px_rgba(156,119,47,0.04)] hover:shadow-[0_8px_32px_rgba(156,119,47,0.1)] transition-all duration-300 flex flex-col justify-between items-center text-center group cursor-pointer"
            >
              <div className="flex-1 flex items-center justify-center min-h-[110px] sm:min-h-[130px] lg:min-h-[140px]">
                <img src={LogoConscienciaViva} alt="Escola da Consciência Viva Logo" className="h-14 sm:h-16 lg:h-18 w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-[#0C223F] uppercase mt-3">Consciência Viva</span>
              <span className="text-[10px] text-[#0F213A]/60 font-semibold">Escola de Líderes</span>
            </div>

            {/* RÁZGA */}
            <div
              onClick={() => { setActivePillarTab('p2'); scrollTo('pilares'); }}
              className="p-4 rounded-xl border border-[#DFC373]/20 bg-white/70 backdrop-blur-md hover:bg-white hover:border-[#DFC373]/50 hover:scale-[1.02] shadow-[0_4px_24px_rgba(156,119,47,0.04)] hover:shadow-[0_8px_32px_rgba(156,119,47,0.1)] transition-all duration-300 flex flex-col justify-between items-center text-center group cursor-pointer"
            >
              <div className="flex-1 flex items-center justify-center min-h-[110px] sm:min-h-[130px] lg:min-h-[140px]">
                <img src={LogoRazga} alt="Rázga Logo" className="h-[120px] sm:h-[135px] lg:h-[145px] max-w-full w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-[#0C223F] uppercase mt-3">Rázga</span>
              <span className="text-[10px] text-[#0F213A]/60 font-semibold">Rompendo Silêncio</span>
            </div>

            {/* POD RÁZGAR */}
            <div
              onClick={() => { setActivePillarTab('p2'); scrollTo('pilares'); }}
              className="p-4 rounded-xl border border-[#DFC373]/20 bg-white/70 backdrop-blur-md hover:bg-white hover:border-[#DFC373]/50 hover:scale-[1.02] shadow-[0_4px_24px_rgba(156,119,47,0.04)] hover:shadow-[0_8px_32px_rgba(156,119,47,0.1)] transition-all duration-300 flex flex-col justify-between items-center text-center group cursor-pointer"
            >
              <div className="flex-1 flex items-center justify-center min-h-[110px] sm:min-h-[130px] lg:min-h-[140px]">
                <img src={LogoPodRazgar} alt="Pod Rázgar Logo" className="h-[38px] sm:h-[44px] w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-[#0C223F] uppercase mt-3">Pod Rázgar</span>
              <span className="text-[10px] text-[#0F213A]/60 font-semibold">Voz & Transparência</span>
            </div>

            {/* INSTITUTO NH */}
            <div
              onClick={() => { setActivePillarTab('p3'); scrollTo('pilares'); }}
              className="p-4 rounded-xl border border-[#DFC373]/20 bg-white/70 backdrop-blur-md hover:bg-white hover:border-[#DFC373]/50 hover:scale-[1.02] shadow-[0_4px_24px_rgba(156,119,47,0.04)] hover:shadow-[0_8px_32px_rgba(156,119,47,0.1)] transition-all duration-300 flex flex-col justify-between items-center text-center group cursor-pointer"
            >
              <div className="flex-1 flex items-center justify-center min-h-[110px] sm:min-h-[130px] lg:min-h-[140px]">
                <img src={LogoInstitutoNH} alt="Instituto NH Logo" className="h-14 sm:h-16 lg:h-18 w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-[#0C223F] uppercase mt-3">Instituto NH</span>
              <span className="text-[10px] text-[#0F213A]/60 font-semibold">Ação Regenerativa</span>
            </div>

            {/* HORIZONTE MULHER */}
            <div
              onClick={() => { setActivePillarTab('p3'); scrollTo('pilares'); }}
              className="p-4 rounded-xl border border-[#DFC373]/20 bg-white/70 backdrop-blur-md hover:bg-white hover:border-[#DFC373]/50 hover:scale-[1.02] shadow-[0_4px_24px_rgba(156,119,47,0.04)] hover:shadow-[0_8px_32px_rgba(156,119,47,0.1)] transition-all duration-300 flex flex-col justify-between items-center text-center group cursor-pointer"
            >
              <div className="flex-1 flex items-center justify-center min-h-[110px] sm:min-h-[130px] lg:min-h-[140px]">
                <img src={LogoHorizonteMulher} alt="Horizonte Mulher Logo" className="h-14 sm:h-16 lg:h-18 w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-[#0C223F] uppercase mt-3">Horizonte Mulher</span>
              <span className="text-[10px] text-[#0F213A]/60 font-semibold">Sustento Familiar</span>
            </div>

            {/* MUNDIAL BUSINESS */}
            <div
              onClick={() => { setActivePillarTab('p4'); scrollTo('pilares'); }}
              className="p-4 rounded-xl border border-[#DFC373]/20 bg-white/70 backdrop-blur-md hover:bg-white hover:border-[#DFC373]/50 hover:scale-[1.02] shadow-[0_4px_24px_rgba(156,119,47,0.04)] hover:shadow-[0_8px_32px_rgba(156,119,47,0.1)] transition-all duration-300 flex flex-col justify-between items-center text-center group cursor-pointer"
            >
              <div className="flex-1 flex items-center justify-center min-h-[110px] sm:min-h-[130px] lg:min-h-[140px]">
                <img src={LogoMundialBusiness} alt="Mundial Business Logo" className="h-14 sm:h-16 lg:h-18 w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-[#0C223F] uppercase mt-3">Mundial Business</span>
              <span className="text-[10px] text-[#0F213A]/60 font-semibold">Autonomia Financeira</span>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */
      /*                             SEÇÃO PROBLEMA                                 */
      /* -------------------------------------------------------------------------- */}
      <section id="problema" className="relative w-full py-24 px-6 sm:px-12 bg-white z-10 border-b border-[#DFC373]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs tracking-[0.25em] text-[#9C772F] font-semibold uppercase block mb-3">ENFRENTAMENTO DE CAUSAS</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#0B1B33] leading-tight">
              O problema não é isolado.<br />
              <span className="font-bold">Então a solução também não pode ser.</span>
            </h2>
          </div>

          {/* Interactive Connective Problem Flow */}
          <div className="border border-[#DFC373]/20 bg-white/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 lg:p-10 mb-16 shadow-[0_8px_32px_rgba(156,119,47,0.04)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 relative">
              {problemSteps.map((step, idx) => (
                <div
                  key={step.title}
                  onClick={() => setActiveProblemStep(idx)}
                  className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col items-start text-left relative ${activeProblemStep === idx
                    ? 'bg-[#0B1B33] border-[#0B1B33] text-white shadow-md shadow-slate-900/10 scale-[1.02]'
                    : 'bg-white/70 backdrop-blur-md border border-[#DFC373]/15 hover:border-[#DFC373]/40 hover:bg-white/90 hover:scale-[1.01]'
                    }`}
                >
                  <div className="flex justify-between items-center w-full mb-3">
                    <span className={`text-[10px] font-mono font-bold ${activeProblemStep === idx ? 'text-[#DFC373]' : 'text-[#9C772F]/70'}`}>
                      Passo {idx + 1}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${activeProblemStep === idx ? 'bg-[#DFC373]' : 'bg-[#DFC373]/20'}`} />
                  </div>
                  <h3 className="text-xs font-serif font-bold tracking-tight uppercase mb-2 w-full break-words min-h-[2.5rem] flex items-center leading-tight">
                    {step.title}
                  </h3>
                  <div className={`w-full h-px my-2 ${activeProblemStep === idx ? 'bg-[#DFC373]/30' : 'bg-[#DFC373]/10'}`} />
                  <p className={`text-[11px] ${activeProblemStep === idx ? 'text-slate-300' : 'text-[#0F213A]/70'} leading-relaxed`}>
                    {step.desc}
                  </p>

                  {/* Visual connecting arrow between items */}
                  {idx < 6 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3.5 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border border-[#DFC373]/20 items-center justify-center text-[#9C772F] shadow-sm">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Connective Highlights */}
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-r from-[#0B1B33] to-[#122A4E] text-white rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden border border-[#DFC373]/10">
              {/* Abs decoration circles */}
              <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full border border-[#DFC373]/10" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full border border-[#DFC373]/10" />

              <h4 className="text-xl md:text-3xl font-serif text-[#FFF2C3] leading-tight mb-4 text-center relative z-10 font-bold">
                “Problemas complexos exigem respostas integradas.”
              </h4>
              <p className="text-sm md:text-lg text-slate-200 text-center relative z-10 max-w-2xl mx-auto leading-relaxed">
                O Grupo Novo Horizonte atua na raiz das vulnerabilidades humanas, sociais e territoriais.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* -------------------------------------------------------------------------- */
      /*              A GRANDE ENGRENAGEM — SEÇÃO FIXA INLINE                       */
      /* -------------------------------------------------------------------------- */}
      <section id="experienca" className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#F7F6F2] border-b border-[#DFC373]/15 z-10 py-8 md:py-16 [perspective:1200px]">

        {/* Background subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#dfc37305_1px,transparent_1px),linear-gradient(to_bottom,#dfc37305_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#DFC373]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Title block */}
        <div className="relative z-10 text-center px-4 mb-6 md:mb-10 max-w-4xl mx-auto">
          <span className="text-[10px] md:text-xs tracking-[0.3em] text-[#9C772F] font-bold uppercase block mb-2 md:mb-3">
            NOSSA TESE
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-light text-[#0B1B33] leading-tight mb-4">
            Uma engrenagem <span className="font-bold text-[#9C772F]">viva de regeneração</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#0F213A]/80 leading-relaxed max-w-2xl mx-auto mb-4 font-sans">
            O Grupo Novo Horizonte não é um conjunto de projetos isolados. É uma arquitetura sistêmica onde cada frente possui propósito, competência e impacto próprios — mas nenhuma atua isoladamente.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#9C772F]">
            <span>TUDO SE CONECTA</span>
            <span className="text-slate-300">•</span>
            <span>TUDO SE FORTALECE</span>
            <span className="text-slate-300">•</span>
            <span>TUDO SE RETROALIMENTA</span>
          </div>
        </div>

        {/* Gear 3D Canvas */}
        <div className="relative z-10 w-full flex items-center justify-center flex-1 min-h-[420px] sm:min-h-[500px] md:min-h-[560px] [transform-style:preserve-3d]">
          <div className="[transform-style:preserve-3d] scale-[0.72] xs:scale-[0.78] sm:scale-[0.82] md:scale-[0.9] lg:scale-[1.0] xl:scale-[1.05] flex items-center justify-center w-0 h-0">
            {/* Connecting Circle Rim */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[284px] h-[284px] rounded-full border-[1.5px] border-[#DFC373]/25 [transform:translateZ(-20px)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-[#DFC373]/08 [transform:translateZ(-30px)]" />

            {/* Center Node — always auto-rotating */}
            <GearNode type="center" rotation={rotateCenter} logoUrl={LogoGrupoNH} onClick={() => scrollTo('pilares')} isMobile={true} />

            {/* Outer Nodes — always auto-rotating */}
            <GearNode
              type="outer"
              icon={Brain}
              title="Pilar 1 — Ser"
              subtitle="Synapt Essence®"
              labelPos="left"
              rotation={rotateOuter}
              initialAngle={315}
              distance={D}
              initialRot={15}
              textOpacity={textOpacity}
              logoUrl={LogoSynaptEssence}
              onClick={() => { setActivePillarTab('p1'); scrollTo('pilares'); }}
              isMobile={true}
            />
            <GearNode
              type="outer"
              icon={Eye}
              title="Pilar 2 — Consciência"
              subtitle="Despertar & Rázga"
              labelPos="left"
              rotation={rotateOuter}
              initialAngle={225}
              distance={D}
              initialRot={15}
              textOpacity={textOpacity}
              logoUrl={LogoODespertar}
              onClick={() => { setActivePillarTab('p2'); scrollTo('pilares'); }}
              isMobile={true}
            />
            <GearNode
              type="outer"
              icon={HandHeart}
              title="Pilar 3 — Impacto"
              subtitle="Instituto NH"
              labelPos="right"
              rotation={rotateOuter}
              initialAngle={45}
              distance={D}
              initialRot={0}
              textOpacity={textOpacity}
              logoUrl={LogoInstitutoNH}
              onClick={() => { setActivePillarTab('p3'); scrollTo('pilares'); }}
              isMobile={true}
            />
            <GearNode
              type="outer"
              icon={Globe}
              title="Pilar 4 — Território"
              subtitle="Mundial Business®"
              labelPos="right"
              rotation={rotateOuter}
              initialAngle={135}
              distance={D}
              initialRot={0}
              textOpacity={textOpacity}
              logoUrl={LogoMundialBusiness}
              onClick={() => { setActivePillarTab('p4'); scrollTo('pilares'); }}
              isMobile={true}
            />
          </div>
        </div>

        {/* Call-to-action bottom */}
        <div className="relative z-10 text-center mt-4 md:mt-8 px-4">
          <p className="text-xs sm:text-sm text-[#0F213A]/80 font-bold max-w-lg mx-auto mb-2 leading-relaxed">
            Engenharia institucional conectando todos os pilares do ecossistema.
          </p>
          <p className="text-[10px] sm:text-[11px] text-[#0F213A]/50 uppercase tracking-widest mb-4 font-sans">
            Clique em uma engrenagem para ver o pilar correspondente
          </p>
          <button
            onClick={() => scrollTo('pilares')}
            className="bg-gradient-to-r from-[#0B1B33] to-[#122A4E] text-white px-6 py-3 rounded-lg tracking-wider text-xs font-bold uppercase transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 mx-auto hover:shadow-lg cursor-pointer hover:from-[#122A4E] hover:to-[#0B1B33]"
          >
            Explorar os Pilares
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>


      {/* -------------------------------------------------------------------------- */
      /*                      SEÇÃO DINÂMICA DO ECOSSISTEMA                         */
      /* -------------------------------------------------------------------------- */}
      <section id="dinamica" className="relative w-full py-24 px-6 sm:px-12 bg-[#0B1B33] text-white z-10 border-b border-[#DFC373]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs tracking-[0.25em] text-[#DFC373] font-semibold uppercase block mb-3">CONEXÃO NA PRÁTICA</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight">
              Como a engrenagem transforma<br />
              <span
                className="font-bold bg-clip-text bg-gradient-to-r from-white via-[#DFC373] to-[#FFF2C3]"
                style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', color: 'transparent' }}
              >
                a realidade na prática
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {dynamicsSteps.map((step) => (
              <div key={step.num} className="p-8 rounded-xl border border-white/10 bg-slate-950/40 relative group hover:border-[#DFC373]/40 transition-all duration-300">
                <div className="absolute top-6 right-6 font-mono text-4xl font-black text-[#DFC373]/20 group-hover:text-[#DFC373]/30 transition-colors">
                  {step.num}
                </div>
                <span className="text-[10px] tracking-widest font-bold text-[#DFC373] uppercase block mb-4">
                  {step.brand}
                </span>
                <h4 className="text-lg font-bold text-white mb-3 tracking-wide">{step.title}</h4>
                <div className="w-10 h-0.5 bg-[#DFC373] mb-4" />
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Highlight Quote */}
          <div className="max-w-3xl mx-auto text-center border-t border-white/10 pt-10">
            <p className="text-lg md:text-xl text-[#DFC373] tracking-wider italic font-serif leading-relaxed">
              “Cada peça possui uma função específica. Juntas, elas regeneram territórios e criam legado.”
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */
      /*                              SEÇÃO PILARES                                 */
      /* -------------------------------------------------------------------------- */}
      <section id="pilares" className="relative w-full py-24 px-6 sm:px-12 bg-[#FCFCFB] z-10 border-b border-[#DFC373]/15">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs tracking-[0.25em] text-[#9C772F] font-semibold uppercase block mb-3">METODOLOGIA DA OPERAÇÃO</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#0B1B33]">
              Os 4 Pilares da Engenharia Sistêmica
            </h2>
            <p className="text-xs md:text-sm text-[#0F213A]/60 uppercase tracking-widest mt-2">
              Explore o funcionamento e os impactos de cada pilar da nossa tese
            </p>
          </div>

          {(() => {
            const pillarTabsList = [
              { id: 'p1', label: 'Pilar 1', name: 'Ser', sub: 'Synapt Essence®' },
              { id: 'p2', label: 'Pilar 2', name: 'Consciência', sub: 'Despertar & Rázga' },
              { id: 'p3', label: 'Pilar 3', name: 'Impacto Social', sub: 'Instituto NH®' },
              { id: 'p4', label: 'Pilar 4', name: 'Território', sub: 'Mundial Business®' }
            ];
            return (
              <div className="w-full max-w-5xl mx-auto mb-16 p-2 bg-white/40 backdrop-blur-md rounded-2xl border border-[#DFC373]/20 shadow-[0_8px_32px_rgba(156,119,47,0.03)] selection:bg-[#DFC373]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {pillarTabsList.map((tab) => {
                    const isActive = activePillarTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActivePillarTab(tab.id as 'p1' | 'p2' | 'p3' | 'p4');
                          setTimeout(() => {
                            const el = document.getElementById('pilares-conteudo');
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                            }
                          }, 150);
                        }}
                        className={`relative group px-5 py-4 rounded-xl text-left transition-all duration-500 cursor-pointer overflow-hidden flex items-center gap-4 border ${isActive
                          ? 'bg-[#0B1B33] border-[#0B1B33] text-white shadow-lg shadow-[#0B1B33]/15'
                          : 'bg-white/60 hover:bg-white/90 border-[#DFC373]/10 hover:border-[#DFC373]/30 text-[#0F213A]/70'
                          }`}
                      >
                        {/* Animated background decoration on active */}
                        {isActive && (
                          <motion.div
                            layoutId="activePillarBg"
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#DFC373]/5 to-transparent pointer-events-none"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}

                        {/* Pillar Icon Box with beautiful layout */}
                        <div className={`p-3 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'bg-[#DFC373]/20 text-[#DFC373]' : 'bg-[#DFC373]/5 text-[#9C772F]'
                          }`}>
                          <PillarIcon active={isActive} className="w-6 h-6" />
                        </div>

                        <div className="flex flex-col min-w-0">
                          <span className={`text-[10px] font-mono font-black tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-[#DFC373]' : 'text-[#9C772F]'
                            }`}>
                            {tab.label}
                          </span>
                          <span className="text-sm font-serif font-bold tracking-tight truncate">
                            {tab.name}
                          </span>
                          <span className={`text-[10px] font-medium tracking-wide truncate ${isActive ? 'text-white/70' : 'text-[#0F213A]/50'
                            }`}>
                            {tab.sub}
                          </span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider mt-1 transition-all duration-300 ${isActive ? 'text-[#DFC373]' : 'text-slate-400 opacity-60 group-hover:opacity-100'
                            }`}>
                            {isActive ? 'Ativo' : 'Clique aqui'}
                          </span>
                        </div>

                        {/* Left edge subtle indicator */}
                        <div className={`absolute top-0 bottom-0 left-0 w-1 transition-all duration-300 ${isActive ? 'bg-[#DFC373]' : 'bg-transparent group-hover:bg-[#DFC373]/30'
                          }`} />
                      </button>
                    );
                  })}
                </div>

                {/* Mobile scroll helper alert */}
                <div className="text-center mt-3 lg:hidden animate-pulse">
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#9C772F] font-bold uppercase tracking-wider">
                    <ChevronDown className="w-3.5 h-3.5 animate-bounce" /> Conteúdo atualizado abaixo • Role para ver
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Tab Content Display */}
          <div id="pilares-conteudo" className="max-w-6xl mx-auto min-h-[460px]">
            {/* PILLAR 1 */}
            {activePillarTab === 'p1' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white/75 backdrop-blur-md border border-[#DFC373]/20 p-8 sm:p-12 rounded-2xl shadow-[0_8px_32px_rgba(156,119,47,0.05)]"
              >
                <div className="lg:col-span-4 flex flex-col justify-between text-left space-y-6 lg:space-y-0">
                  <div>
                    <div className="h-24 flex items-center mb-4">
                      <img src={LogoSynaptEssence} alt="Synapt Essence Logo" className="h-24 w-auto object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-[#9C772F] tracking-[0.2em] uppercase block mb-2">PILAR 1 — SER</span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1B33]">SYNAPT ESSENCE®</h3>
                    <div className="w-12 h-0.5 bg-[#DFC373] mt-3 mb-6" />
                  </div>
                  <div className="p-5 bg-gradient-to-br from-[#DFC373]/5 to-[#9C772F]/5 border-l-4 border-[#DFC373] rounded-r-xl">
                    <span className="text-[10px] uppercase font-mono tracking-widest font-black text-[#9C772F] block mb-2">FUNÇÃO</span>
                    <p className="font-serif italic text-[#0F213A]/90 font-medium text-sm leading-relaxed">
                      “Reconstruir o indivíduo.”
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-8 flex flex-col text-left space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="p-6 rounded-xl border border-[#DFC373]/15 bg-[#FCFCFB]/90 shadow-sm flex flex-col justify-between">
                      <div>
                        <h4 className="text-[#9C772F] font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Brain className="w-4 h-4 text-[#DFC373]" /> ATUA EM
                        </h4>
                        <ul className="space-y-2.5 text-xs sm:text-sm text-[#0F213A]/85 font-semibold grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                          <li className="flex items-center gap-2.5">
                            <span className="text-[#DFC373] text-lg leading-none">•</span>
                            <span>Acompanhamento no desenvolvimento humano</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <span className="text-[#DFC373] text-lg leading-none">•</span>
                            <span>Processos de reorganização emocional</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <span className="text-[#DFC373] text-lg leading-none">•</span>
                            <span>Metodologia NeuroEssence360°</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <span className="text-[#DFC373] text-lg leading-none">•</span>
                            <span>Programas de saúde integrativa</span>
                          </li>
                          <li className="flex items-center gap-2.5">
                            <span className="text-[#DFC373] text-lg leading-none">•</span>
                            <span>Consolidação e fortalecimento interno</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-r from-[#0B1B33]/5 to-[#0B1B33]/0 border border-[#0B1B33]/5 border-l-4 border-[#0B1B33]">
                    <span className="text-[10px] uppercase font-mono tracking-widest font-black text-[#9C772F] block mb-2">RESULTADO</span>
                    <p className="text-sm sm:text-base text-[#0B1B33] font-black uppercase tracking-wide">
                      Pessoas fortalecidas.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PILLAR 2 */}
            {activePillarTab === 'p2' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white/75 backdrop-blur-md border border-[#DFC373]/20 p-8 sm:p-12 rounded-2xl shadow-[0_8px_32px_rgba(156,119,47,0.05)]"
              >
                <div className="col-span-full flex flex-col md:flex-row items-center md:items-start justify-between gap-6 pb-6 border-b border-[#DFC373]/15">
                  <div className="flex items-center gap-4 text-left">
                    <div className="p-3.5 rounded-full bg-[#DFC373]/10 text-[#9C772F] border border-[#DFC373]/25 shadow-[0_4px_12px_rgba(223,195,115,0.08)] shrink-0">
                      <Eye className="w-9 h-9" />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs font-mono font-bold text-[#9C772F] tracking-[0.2em] uppercase block mb-1">PILAR 2 — CONSCIÊNCIA</span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1B33] tracking-tight">DESPERTAR & RÁZGA®</h3>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-[#DFC373]/5 to-[#9C772F]/5 border-l-4 border-[#DFC373] rounded-r-xl max-w-xl md:self-center text-left">
                    <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-[#9C772F] block mb-1">FRASE CENTRAL</span>
                    <p className="font-serif italic text-[#0F213A] font-bold text-xs sm:text-sm leading-relaxed">
                      “A consciência pode despertar por expansão ou por ruptura.”
                    </p>
                  </div>
                </div>

                <div className="col-span-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* DESPERTAR ESPIRITUAL */}
                  <div className="p-6 rounded-xl border border-[#DFC373]/15 bg-[#FCFCFB]/90 shadow-sm flex flex-col justify-between min-h-[460px]">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap mb-4 justify-between">
                        <div>
                          <span className="p-1 px-2.5 rounded bg-[#9C772F]/10 text-[#9C772F] text-[10px] tracking-widest font-black uppercase">CONSCIÊNCIA PELA EXPANSÃO</span>
                          <span className="text-[10px] text-[#0F213A]/50 block mt-1">Atua através da:</span>
                        </div>
                        <img src={LogoODespertar} alt="O Despertar Logo" className="h-14 sm:h-18 w-auto object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="font-serif font-bold text-lg text-[#0B1B33] mb-1">DESPERTAR ESPIRITUAL®</h4>
                      <span className="text-xs uppercase font-semibold text-[#0F213A]/50 tracking-wider block mb-3">ESCOLA DA CONSCIÊNCIA VIVA®</span>

                      <div className="p-4 bg-[#DFC373]/5 border-l-2 border-[#DFC373] rounded-r-lg mb-4">
                        <span className="text-[10px] uppercase font-mono tracking-widest font-black text-[#9C772F] block mb-1.5">FOCO</span>
                        <ul className="space-y-2 text-xs text-[#0F213A]/80 font-semibold grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                          <li className="flex items-center gap-1.5">
                            <span className="text-[#DFC373]">•</span>
                            <span>Formação</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="text-[#DFC373]">•</span>
                            <span>Jornadas</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="text-[#DFC373]">•</span>
                            <span>Espiritualidade aplicada</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="text-[#DFC373]">•</span>
                            <span>Retiros</span>
                          </li>
                          <li className="flex items-center gap-1.5 col-span-full">
                            <span className="text-[#DFC373]">•</span>
                            <span>Consciência expandida</span>
                          </li>
                        </ul>
                      </div>

                      {/* COMPLEMENTARY SCHOOL */}
                      <div className="p-4 rounded-xl bg-gradient-to-br from-[#DFC373]/8 to-[#9C772F]/3 border border-[#DFC373]/25 flex flex-col items-center text-center gap-2 shadow-sm transition-all duration-300 hover:shadow-md">
                        <img src={LogoConscienciaViva} alt="Escola da Consciência Viva Logo" className="h-10 w-auto object-contain shrink-0" referrerPolicy="no-referrer" />
                        <div className="flex flex-col items-center">
                          <div className="text-[11px] font-black text-[#0B1B33] uppercase tracking-wide">ESCOLA DA CONSCIÊNCIA VIVA®</div>
                          <p className="text-[11px] text-[#0F213A]/85 font-semibold max-w-sm mb-2">
                            Plataforma de desenvolvimento com cursos didáticos e vivenciais estruturados.
                          </p>
                          <a
                            href="https://escola-consciencia-viva.netlify.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0B1B33] text-white text-[10px] font-bold uppercase tracking-wider transition-all hover:bg-[#122A4E] cursor-pointer"
                          >
                            Conheça a comunidade
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-[#DFC373]/15 pt-3 mt-4">
                      <span className="text-[10px] uppercase font-mono tracking-widest font-black text-[#9C772F] block mb-1">RESULTADO</span>
                      <div className="text-xs uppercase font-extrabold text-[#0B1B33]">
                        Seres humanos mais conscientes.
                      </div>
                    </div>
                  </div>

                  {/* RÁZGA */}
                  <div className="p-6 rounded-xl border border-[#DFC373]/15 bg-[#FCFCFB]/90 shadow-sm flex flex-col justify-between min-h-[460px]">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap mb-4 justify-between">
                        <div>
                          <span className="p-1 px-2.5 rounded bg-[#9C772F]/10 text-[#9C772F] text-[10px] tracking-widest font-black uppercase">CONSCIÊNCIA PELA RUPTURA</span>
                          <span className="text-[10px] text-[#0F213A]/50 block mt-1">Atua através do:</span>
                        </div>
                        <img src={LogoRazga} alt="Rázga Logo" className="h-9 w-auto object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="font-serif font-bold text-lg text-[#0B1B33] mb-1">RÁZGA®</h4>
                      <span className="text-xs uppercase font-semibold text-[#0F213A]/50 tracking-wider block mb-3 font-mono">POD RÁZGAR®</span>

                      <div className="p-4 bg-[#0B1B33]/5 border-l-2 border-[#0B1B33] rounded-r-lg mb-4">
                        <span className="text-[10px] uppercase font-mono tracking-widest font-black text-[#9C772F] block mb-1.5">FOCO</span>
                        <ul className="space-y-2 text-xs text-[#0B1B33] font-semibold grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                          <li className="flex items-center gap-1.5">
                            <span className="text-[#DFC373]">•</span>
                            <span>Voz</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="text-[#DFC373]">•</span>
                            <span>Pertencimento</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="text-[#DFC373]">•</span>
                            <span>Transformação cultural</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="text-[#DFC373]">•</span>
                            <span>Coragem</span>
                          </li>
                          <li className="flex items-center gap-1.5 col-span-full">
                            <span className="text-[#DFC373]">•</span>
                            <span>Narrativas reais</span>
                          </li>
                        </ul>
                      </div>

                      <div className="flex justify-start mb-4">
                        <a
                          href="https://razga.netlify.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#0B1B33] to-[#122A4E] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all hover:shadow-md active:scale-[0.98] cursor-pointer"
                        >
                          Conheça o Rázga
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      {/* COMPLEMENTARY PROJECT */}
                      <div className="p-4 rounded-xl bg-gradient-to-br from-[#DFC373]/8 to-[#9C772F]/3 border border-[#DFC373]/25 flex flex-col items-center text-center gap-2 shadow-sm transition-all duration-300 hover:shadow-md">
                        <img src={LogoPodRazgar} alt="Pod Rázgar Logo" className="h-10 w-auto object-contain shrink-0" referrerPolicy="no-referrer" />
                        <div className="flex flex-col items-center">
                          <div className="text-[11px] font-black text-[#0B1B33] uppercase tracking-wide">Pod Rázgar®</div>
                          <p className="text-[11px] text-[#0F213A]/85 font-semibold max-w-sm italic font-serif leading-relaxed">
                            “Coragem, transparência radical e compromisso absoluto com a libertação pela expressão verbal ativa.”
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-[#DFC373]/15 pt-3 mt-4">
                      <span className="text-[10px] uppercase font-mono tracking-widest font-black text-[#9C772F] block mb-1">RESULTADO</span>
                      <div className="text-xs uppercase font-extrabold text-[#0B1B33]">
                        Consciência coletiva e mobilização.
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PILLAR 3 */}
            {activePillarTab === 'p3' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white/75 backdrop-blur-md border border-[#DFC373]/20 p-8 sm:p-12 rounded-2xl shadow-[0_8px_32px_rgba(156,119,47,0.05)]"
              >
                <div className="lg:col-span-4 flex flex-col justify-between text-left space-y-6 lg:space-y-0">
                  <div>
                    <div className="h-24 flex items-center mb-4">
                      <img src={LogoInstitutoNH} alt="Instituto Novo Horizonte Logo" className="h-[64px] w-auto object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-[#9C772F] tracking-[0.2em] uppercase block mb-2">PILAR 3 — IMPACTO SOCIAL</span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1B33]">INSTITUTO NOVO HORIZONTE®</h3>
                    <div className="w-12 h-0.5 bg-[#DFC373] mt-3 mb-6" />
                  </div>
                  <div className="p-5 bg-gradient-to-br from-[#DFC373]/5 to-[#9C772F]/5 border-l-4 border-[#DFC373] rounded-r-xl">
                    <span className="text-[10px] uppercase font-mono tracking-widest font-black text-[#9C772F] block mb-1">FUNÇÃO</span>
                    <p className="font-serif italic text-[#0F213A]/90 font-medium text-sm leading-relaxed">
                      “Transformar cuidado em impacto aplicado.”
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-8 flex flex-col text-left space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl border border-[#DFC373]/15 bg-[#FCFCFB]/90 shadow-sm flex flex-col justify-between">
                      <div>
                        <h4 className="text-[#9C772F] font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#DFC373]" /> ATUA EM
                        </h4>
                        <ul className="space-y-2.5 text-xs sm:text-sm text-[#0F213A]/85 font-semibold">
                          <li className="flex items-center gap-2">
                            <span className="text-[#DFC373]">•</span>
                            <span>Fortalecimento feminino</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#DFC373]">•</span>
                            <span>Acolhimento qualificado</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#DFC373]">•</span>
                            <span>Pertencimento comunitário</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#DFC373]">•</span>
                            <span>Promoção de saúde integral</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#DFC373]">•</span>
                            <span>Autonomia produtiva</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-[#DFC373]">•</span>
                            <span>Reconstrução social aplicada</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-6 rounded-xl border border-[#DFC373]/15 bg-[#FCFCFB]/90 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 flex-wrap mb-4">
                          <span className="p-1 px-2.5 rounded bg-[#9C772F] text-white text-[10px] tracking-widest font-black uppercase">PROJETO ESTRUTURANTE</span>
                          <img src={LogoHorizonteMulher} alt="Horizonte Mulher Logo" className="h-14 sm:h-18 w-auto object-contain" referrerPolicy="no-referrer" />
                        </div>
                        <h4 className="font-serif font-bold text-lg text-[#0B1B33] mb-1">Horizonte Mulher®</h4>
                        <p className="text-xs sm:text-sm text-[#0F213A]/85 font-medium leading-relaxed mb-4">
                          Uma frente especializada que atua como vetor estruturante para restaurar núcleos familiares por meio da autonomia produtiva feminina.
                        </p>
                      </div>
                      <div className="flex justify-start">
                        <a
                          href="https://horizonte-mulher.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#0B1B33] to-[#122A4E] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all hover:shadow-md active:scale-[0.98] cursor-pointer"
                        >
                          Visitar Horizonte Mulher
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* FLUXO VISUAL */}
                  <div className="p-5 rounded-xl border border-[#DFC373]/20 bg-[#FCFAF5] shadow-[inset_0_2px_4px_rgba(156,119,47,0.02)]">
                    <span className="text-[10px] uppercase font-mono tracking-widest font-black text-[#9C772F] block mb-4 text-center">FLUXO VISUAL</span>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2 px-4 max-w-2xl mx-auto">
                      <div className="flex flex-col items-center bg-white border border-[#DFC373]/15 p-3 rounded-lg w-full md:w-auto text-center shadow-sm">
                        <span className="text-xs font-bold text-[#0B1B33]">1 mulher fortalecida</span>
                      </div>
                      <div className="text-[#DFC373] text-lg font-black shrink-0 rotate-90 md:rotate-0">→</div>
                      <div className="flex flex-col items-center bg-white border border-[#DFC373]/15 p-3 rounded-lg w-full md:w-auto text-center shadow-sm">
                        <span className="text-xs font-bold text-[#0B1B33]">2 ou mais filhos impactados</span>
                      </div>
                      <div className="text-[#DFC373] text-lg font-black shrink-0 rotate-90 md:rotate-0">→</div>
                      <div className="flex flex-col items-center bg-white border border-[#DFC373]/15 p-3 rounded-lg w-full md:w-auto text-center shadow-sm">
                        <span className="text-xs font-bold text-[#0B1B33]">1 família fortalecida</span>
                      </div>
                      <div className="text-[#DFC373] text-lg font-black shrink-0 rotate-90 md:rotate-0">→</div>
                      <div className="flex flex-col items-center bg-[#0B1B33] text-[#DFC373] p-3 rounded-lg w-full md:w-auto text-center shadow-[#0B1B33]/10 shadow-md">
                        <span className="text-xs font-black uppercase tracking-wider">comunidade fortalecida</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-r from-[#0B1B33]/5 to-[#0B1B33]/0 border border-[#0B1B33]/5 border-l-4 border-[#0B1B33]">
                    <span className="text-[10px] uppercase font-mono tracking-widest font-black text-[#9C772F] block mb-2">RESULTADO</span>
                    <p className="text-xs sm:text-sm text-[#0B1B33] font-bold tracking-normal leading-relaxed">
                      “Comunidades vivas.”
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PILLAR 4 */}
            {activePillarTab === 'p4' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white/75 backdrop-blur-md border border-[#DFC373]/20 p-8 sm:p-12 rounded-2xl shadow-[0_8px_32px_rgba(156,119,47,0.05)]"
              >
                <div className="lg:col-span-4 flex flex-col justify-between text-left space-y-6 lg:space-y-0">
                  <div>
                    <div className="h-24 flex items-center mb-4">
                      <img src={LogoMundialBusiness} alt="Mundial Business Logo" className="h-[84px] w-auto object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-[#9C772F] tracking-[0.2em] uppercase block mb-2">PILAR 4 — TERRITÓRIO</span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1B33]">MUNDIAL BUSINESS®</h3>
                    <div className="w-12 h-0.5 bg-[#DFC373] mt-3 mb-6" />
                  </div>
                  <div className="p-5 bg-gradient-to-br from-[#DFC373]/5 to-[#9C772F]/5 border-l-4 border-[#DFC373] rounded-r-xl">
                    <span className="text-[10px] uppercase font-mono tracking-widest font-black text-[#9C772F] block mb-1">FUNÇÃO</span>
                    <p className="font-serif italic text-[#0F213A]/90 font-medium text-sm leading-relaxed">
                      “Transformar regeneração em sustentabilidade econômica e territorial.”
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-8 flex flex-col text-left space-y-6">
                  <div className="p-6 rounded-xl border border-[#DFC373]/15 bg-[#FCFCFB]/90 shadow-sm">
                    <h4 className="text-[#9C772F] font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#DFC373]" /> FRENTES DE ATUAÇÃO
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 font-semibold text-xs text-[#0F213A]/85">
                      <div className="flex items-center gap-2.5 p-2 bg-[#DFC373]/5 rounded border border-[#DFC373]/10 h-11">
                        <span className="text-[#9C772F] font-black text-[10px]">01</span>
                        <span>Consultoria ESG</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2 bg-[#DFC373]/5 rounded border border-[#DFC373]/10 h-11">
                        <span className="text-[#9C772F] font-black text-[10px]">02</span>
                        <span>Gestão da Qualidade</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2 bg-[#DFC373]/5 rounded border border-[#DFC373]/10 h-11">
                        <span className="text-[#9C772F] font-black text-[10px]">03</span>
                        <span>Treinamentos</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2 bg-[#DFC373]/5 rounded border border-[#DFC373]/10 h-11">
                        <span className="text-[#9C772F] font-black text-[10px]">04</span>
                        <span>HUMAN AI</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2 bg-[#DFC373]/5 rounded border border-[#DFC373]/10 h-11">
                        <span className="text-[#9C772F] font-black text-[10px]">05</span>
                        <span>Contêineres Modulares</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2 bg-[#DFC373]/5 rounded border border-[#DFC373]/10 h-11">
                        <span className="text-[#9C772F] font-black text-[10px]">06</span>
                        <span>Bioprodutos Premium / Oluna</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2 bg-[#DFC373]/5 rounded border border-[#DFC373]/10 h-11 col-span-full">
                        <span className="text-[#9C772F] font-black text-[10px]">07</span>
                        <span>Projetos Territoriais</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl border border-[#DFC373]/15 bg-[#FCFCFB]/90 shadow-sm">
                    <h4 className="text-[#9C772F] font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#DFC373]" /> SERVIÇOS MB
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a
                        href="https://mundialb-mushroom.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-lg bg-gradient-to-r from-[#0B1B33] to-[#122A4E] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all hover:shadow-md active:scale-[0.98] cursor-pointer text-center"
                      >
                        1 - Agroprodução
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://mundialb.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-lg border border-[#DFC373] hover:bg-[#DFC373]/5 text-[#9C772F] text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all hover:shadow-md active:scale-[0.98] cursor-pointer text-center"
                      >
                        2 - Treinamento e Consultoria
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-r from-[#0B1B33]/5 to-[#0B1B33]/0 border border-[#0B1B33]/5 border-l-4 border-[#0B1B33]">
                    <span className="text-[10px] uppercase font-mono tracking-widest font-black text-[#9C772F] block mb-2">RESULTADO</span>
                    <p className="text-xs sm:text-sm text-[#0B1B33] font-bold tracking-normal leading-relaxed">
                      “Territórios regenerados.”
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */
      /*                         DIFERENCIAL SISTÊMICO                              */
      /* -------------------------------------------------------------------------- */}
      <section id="diferencial" className="relative w-full py-24 px-6 sm:px-12 bg-white z-10 border-b border-[#DFC373]/15">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs tracking-[0.25em] text-[#9C772F] font-bold uppercase block mb-2">
              CONTRAPONTO METODOLÓGICO
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#0B1B33] leading-tight mb-3">
              O que nos torna <span className="font-bold text-[#9C772F]">diferentes</span>
            </h2>
            <span className="text-[11px] tracking-[0.15em] text-[#0F213A]/55 font-bold uppercase block">
              COMPARATIVO
            </span>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-50 border border-[#DFC373]/15 rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-2 bg-[#0B1B33] text-white p-6 border-b border-[#DFC373]/20 font-bold tracking-widest text-xs uppercase">
              <div className="text-center border-r border-[#DFC373]/20 pr-4">MODELOS TRADICIONAIS</div>
              <div className="text-center pl-4 text-[#DFC373]">NOVO HORIZONTE</div>
            </div>

            <div className="divide-y divide-[#DFC373]/10 text-sm font-medium">
              <div className="grid grid-cols-2 p-6 hover:bg-[#DFC373]/5 transition-colors">
                <div className="text-center border-r border-slate-200 pr-4 text-[#0F213A]/60 font-medium">atua no sintoma</div>
                <div className="text-center pl-4 text-[#0B1B33] font-bold uppercase tracking-wide">atua na raiz</div>
              </div>

              <div className="grid grid-cols-2 p-6 hover:bg-[#DFC373]/5 transition-colors">
                <div className="text-center border-r border-slate-200 pr-4 text-[#0F213A]/60 font-medium">fragmentado</div>
                <div className="text-center pl-4 text-[#0B1B33] font-bold uppercase tracking-wide">integrado</div>
              </div>

              <div className="grid grid-cols-2 p-6 hover:bg-[#DFC373]/5 transition-colors">
                <div className="text-center border-r border-slate-200 pr-4 text-[#0F213A]/60 font-medium">assistencialismo</div>
                <div className="text-center pl-4 text-[#0B1B33] font-bold uppercase tracking-wide">regeneração</div>
              </div>

              <div className="grid grid-cols-2 p-6 hover:bg-[#DFC373]/5 transition-colors">
                <div className="text-center border-r border-slate-200 pr-4 text-[#0F213A]/60 font-medium">dependência</div>
                <div className="text-center pl-4 text-[#0B1B33] font-bold uppercase tracking-wide">autonomia</div>
              </div>

              <div className="grid grid-cols-2 p-6 hover:bg-[#DFC373]/5 transition-colors">
                <div className="text-center border-r border-slate-200 pr-4 text-[#0F213A]/60 font-medium">curto prazo</div>
                <div className="text-center pl-4 text-[#0B1B33] font-bold uppercase tracking-wide">legado</div>
              </div>

              <div className="grid grid-cols-2 p-6 hover:bg-[#DFC373]/5 transition-colors">
                <div className="text-center border-r border-slate-200 pr-4 text-[#0F213A]/60 font-medium">isolado</div>
                <div className="text-center pl-4 text-[#0B1B33] font-bold uppercase tracking-wide">sistêmico</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/*                       DETALHAMENTO DE PERFIS DE INVESTIDORES               */}
      {/* -------------------------------------------------------------------------- */}
      <section className="relative w-full py-24 px-6 sm:px-12 bg-[#F5F5F3] text-[#0F213A] z-10 border-b border-[#DFC373]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs tracking-[0.25em] text-[#9C772F] font-semibold uppercase block mb-3">FORMAS DE ALIANÇA</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#0B1B33] leading-tight">
              Existem diferentes formas de<br />
              <span className="font-bold text-[#9C772F]">construir legado conosco</span>
            </h2>
            <div className="w-12 h-1 bg-[#DFC373] mx-auto mt-6 mb-4" />
            <p className="text-xs sm:text-sm text-[#0F213A]/70 leading-relaxed max-w-2xl mx-auto uppercase tracking-wider font-medium">
              Escolha a sua forma de atuação. Cada perfil possui um papel chave no fomento de autonomia, governança e transformação real.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CARD 1: PADRINHO / MADRINHA DE IMPACTO */}
            <div className="bg-white rounded-2xl p-8 border border-[#DFC373]/15 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-6 h-6" />
                </div>
                
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#9C772F] font-bold block mb-2">Opção 01 • Legado</span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B1B33] mb-4">Padrinho / Madrinha de Impacto</h3>
                
                <p className="text-xs text-[#0F213A]/70 mb-6 leading-relaxed">
                  Para pessoas comprometidas com transformação humana e social.
                </p>

                <div className="border-t border-[#DFC373]/10 pt-4 mb-6">
                  <span className="text-[9px] uppercase font-bold text-[#0F213A]/50 tracking-wider block mb-2">FORTALECE:</span>
                  <ul className="space-y-2 text-xs font-semibold text-[#0F213A]/80">
                    <li className="flex items-start gap-2">
                      <span className="text-[#DFC373]">✔</span>
                      <span>mulheres</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#DFC373]">✔</span>
                      <span>famílias</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#DFC373]">✔</span>
                      <span>acolhimento</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#DFC373]">✔</span>
                      <span>saúde</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#DFC373]">✔</span>
                      <span>comunidade</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-[#DFC373]/10 pt-4 mb-6">
                  <span className="text-[9px] uppercase font-bold text-[#0F213A]/50 tracking-wider block mb-1">MOTIVAÇÃO:</span>
                  <p className="text-xs font-bold text-[#9C772F] tracking-wide">
                    Legado humano.
                  </p>
                </div>
              </div>

              <button
                onClick={() => selectProfileAndScroll('Padrinho / Madrinha de Impacto')}
                className="w-full mt-4 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-all hover:shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                Conhecer possibilidades <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* CARD 2: INVESTIDOR(A) DE IMPACTO SISTÊMICO */}
            <div className="bg-white rounded-2xl p-8 border border-[#DFC373]/15 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B1B33]/15 to-[#DFC373]/10 flex items-center justify-center text-[#0B1B33] mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6" />
                </div>
                
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#9C772F] font-bold block mb-2">Opção 02 • Ativos Reais</span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B1B33] mb-4">Investidor(a) de Impacto Sistêmico</h3>
                
                <p className="text-xs text-[#0F213A]/70 mb-6 leading-relaxed">
                  Para quem deseja acelerar inovação, sustentabilidade e expansão.
                </p>

                <div className="border-t border-[#DFC373]/10 pt-4 mb-6">
                  <span className="text-[9px] uppercase font-bold text-[#0F213A]/50 tracking-wider block mb-2">FORTALECE:</span>
                  <ul className="space-y-2 text-xs font-semibold text-[#0F213A]/80">
                    <li className="flex items-start gap-2">
                      <span className="text-[#DFC373]">✔</span>
                      <span>HUMAN AI</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#DFC373]">✔</span>
                      <span>Mundial Business</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#DFC373]">✔</span>
                      <span>escalabilidade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#DFC373]">✔</span>
                      <span>expansão territorial</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#DFC373]">✔</span>
                      <span>inovação aplicada</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-[#DFC373]/10 pt-4 mb-6">
                  <span className="text-[9px] uppercase font-bold text-[#0F213A]/50 tracking-wider block mb-1">MOTIVAÇÃO:</span>
                  <p className="text-xs font-bold text-[#0B1B33] tracking-wide">
                    Impacto + sustentabilidade + retorno.
                  </p>
                </div>
              </div>

              <button
                onClick={() => selectProfileAndScroll('Investidor(a) de Impacto Sistêmico')}
                className="w-full mt-4 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-all hover:shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                Explorar oportunidades <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* CARD 3: PARCEIRO INSTITUCIONAL */}
            <div className="bg-white rounded-2xl p-8 border border-[#DFC373]/15 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DFC373]/20 to-[#9C772F]/10 flex items-center justify-center text-[#9C772F] mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6" />
                </div>
                
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#9C772F] font-bold block mb-2">Opção 03 • Conexão</span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B1B33] mb-4">Parceiro Institucional</h3>
                
                <p className="text-xs text-[#0F213A]/70 mb-6 leading-relaxed">
                  Para empresas, governos e organizações.
                </p>

                <div className="border-t border-[#DFC373]/10 pt-4 mb-6">
                  <span className="text-[9px] uppercase font-bold text-[#0F213A]/50 tracking-wider block mb-2">FORTALECE:</span>
                  <ul className="space-y-2 text-xs font-semibold text-[#0F213A]/80">
                    <li className="flex items-start gap-2">
                      <span className="text-[#DFC373]">✔</span>
                      <span>ESG</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#DFC373]">✔</span>
                      <span>desenvolvimento territorial</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#DFC373]">✔</span>
                      <span>políticas públicas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#DFC373]">✔</span>
                      <span>formação</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#DFC373]">✔</span>
                      <span>impacto coletivo</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-[#DFC373]/10 pt-4 mb-6">
                  <span className="text-[9px] uppercase font-bold text-[#0F213A]/50 tracking-wider block mb-1">MOTIVAÇÃO:</span>
                  <p className="text-xs font-bold text-[#9C772F] tracking-wide">
                    ESG e Sinergias Territoriais.
                  </p>
                </div>
              </div>

              <button
                onClick={() => selectProfileAndScroll('Parceiro Institucional')}
                className="w-full mt-4 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-all hover:shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                Tornar-se parceiro <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */
      /*                         ROADMAP/VISÃO DE FUTURO                            */
      /* -------------------------------------------------------------------------- */}
      <section className="relative w-full py-24 px-6 sm:px-12 bg-white z-10 border-b border-[#DFC373]/15">
        <div className="absolute inset-0 bg-[radial-gradient(#DFC37305_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] tracking-[0.25em] text-[#9C772F] font-bold uppercase block mb-3">
              VISÃO DE FUTURO
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#0B1B33] leading-tight mb-4">
              O futuro <span className="font-bold">já está sendo construído.</span>
            </h2>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#0F213A]/50 max-w-xl mx-auto">
              Um caminho sólido para a expansão e impacto contínuo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {[
              { 
                id: 'ecossistema-sede', 
                label: 'O Epicentro Físico', 
                icon: Building2, 
                title: 'Sede e Ecossistema Integrado',
                desc: 'Nossa base operacional, o local onde teoria vira prática, integrando e acolhendo todas as frentes de impacto social, saúde, bem-estar e desenvolvimento num único espaço colaborativo.' 
              },
              { 
                id: 'formacao-consciencia', 
                label: 'Desenvolvimento Contínuo', 
                icon: GraduationCap, 
                title: 'Instituto & Escola da Consciência',
                desc: 'Centros de formação e cuidado com foco nas famílias, mulheres e crianças. Promovemos acolhimento psicológico, letramento, profissionalização e expansão da consciência individual e coletiva.' 
              },
              { 
                id: 'tecnologia-expansao', 
                label: 'Inovação Estratégica', 
                icon: Brain, 
                title: 'HUMAN AI & Contêineres Modulares',
                desc: 'O futuro do crescimento escalável. Utilizamos dados e infraestruturas físicas ágeis e modulares para levar nossa engrenagem de regeneração e saúde a novos territórios de forma rápida e eficiente.' 
              },
              { 
                id: 'narrativas', 
                label: 'Voz e Expressão', 
                icon: Mic, 
                title: 'Estúdio Podcast & Rázga',
                desc: 'Para a consciência despertar também pela ruptura, criamos um canal de fala e escuta. Um instrumento moderno de comunicação e transformação da cultura, dando protagonismo às histórias reais.' 
              },
              { 
                id: 'bioprodutos', 
                label: 'Sustentabilidade Financeira', 
                icon: Sprout, 
                title: 'Bioeconomia & Geração de Valor',
                desc: 'Garantimos a sustentabilidade do nosso ecossistema integrando o desenvolvimento humano ao respeito pelo meio ambiente, gerando recursos fundamentais através de iniciativas corporativas e parceiros.' 
              },
              { 
                id: 'territorio', 
                label: 'Legado e Propósito', 
                icon: Globe, 
                title: 'Territórios Regenerados',
                desc: 'O objetivo final do nosso roadmap estratégico: ver os indivíduos assumirem suas histórias, famílias mais conectadas e comunidades autônomas prosperando pelo mundo.' 
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="bg-white border border-[#DFC373]/30 rounded-2xl p-8 flex flex-col items-start text-left hover:bg-slate-50 transition-all duration-300 group shadow-[0_4px_20px_rgba(11,27,51,0.03)] hover:shadow-[0_15px_40px_rgba(11,27,51,0.08)] hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#DFC373]/10 to-transparent rounded-bl-full pointer-events-none" />
                  <div className="w-14 h-14 bg-[#0B1B33]/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0B1B33] transition-colors duration-500">
                    <Icon className="w-7 h-7 text-[#9C772F] group-hover:text-[#DFC373] transition-colors duration-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9C772F] mb-3">
                    {item.label}
                  </span>
                  <h3 className="text-xl font-serif text-[#0B1B33] font-bold mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#0F213A]/70 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm sm:text-base md:text-lg text-[#0F213A]/80 font-medium leading-relaxed">
              Cada espaço e iniciativa foi pensada para acolher, desenvolver e potencializar o ser humano, garantindo que o impacto gerado hoje se transforme em um legado sustentável e duradouro para nossa sociedade.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */
      /*                               SEÇÃO CTA                                    */
      /* -------------------------------------------------------------------------- */}
      <section id="aliancas" className="relative w-full py-24 px-6 sm:px-12 text-white z-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={ImgGnh1} 
            alt="Fundo Pantanal MS" 
            className="w-full h-full object-cover grayscale-[20%] opacity-40 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#0B1B33]/80 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-[radial-gradient(#DFC3730a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-6 text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-[10px] sm:text-xs font-semibold tracking-widest text-[#DFC373] uppercase mb-6">
              CONVITE SOCIAL ESTRATÉGICO
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white mb-6 leading-tight">
              O futuro <span className="font-bold italic">não se constrói sozinho.</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed mb-4 max-w-xl">
              Buscamos padrinhos, madrinhas, investidores e parceiros institucionais comprometidos com transformação real.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-[#DFC373] font-medium leading-relaxed mb-4 max-w-xl">
              Não para sustentar dependência.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed mb-10 max-w-xl">
              Mas para ativar uma engrenagem capaz de fortalecer pessoas, manter comunidades vivas e regenerar territórios.
            </p>

            <div className="border border-[#DFC373]/20 rounded-xl p-6 bg-[#0F213A]/60 backdrop-blur-sm shadow-xl mb-8 relative border-l-4 border-l-[#DFC373]">
              <p className="text-lg md:text-xl font-serif text-[#FFF2C3] font-bold italic leading-relaxed">
                Tudo se conecta.<br/>
                Tudo se regenera.<br/>
                Tudo se transforma.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#FBFBFA]/95 backdrop-blur-xl text-[#0F213A] rounded-2xl p-6 sm:p-10 border border-[#DFC373]/30 shadow-2xl relative">
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                <h3 className="font-serif font-bold text-xl text-[#0B1B33]">Registrar Aliança</h3>
                <div className="w-8 h-0.5 bg-[#DFC373] mb-4" />
                <p className="text-xs text-[#0F213A]/70 mb-4 leading-relaxed">
                  Inscreva-se no conselho de aliados estratégicos e aguarde a aprovação do comitê executivo do ecossistema.
                </p>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider block mb-1.5 text-[#0F213A]/70">Seu Perfil Principal</label>
                  <select
                    value={formData.profile}
                    onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                    className="w-full bg-[#F5F5F3] border border-[#DFC373]/20 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-[#DFC373] outline-none"
                  >
                    <option value="Padrinho / Madrinha de Impacto">Padrinho / Madrinha de Impacto</option>
                    <option value="Investidor(a) de Impacto Sistêmico">Investidor(a) de Impacto Sistêmico</option>
                    <option value="Parceiro Institucional">Parceiro Institucional</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider block mb-1.5 text-[#0F213A]/70">Nome Completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Dr. Mariano Santos"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#F5F5F3] border border-[#DFC373]/20 rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-[#DFC373]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider block mb-1.5 text-[#0F213A]/70">E-mail Corporativo</label>
                    <input
                      type="email"
                      required
                      placeholder="Ex: mariano@instituto.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#F5F5F3] border border-[#DFC373]/20 rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-[#DFC373]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider block mb-1.5 text-[#0F213A]/70">Organização ou Fundo</label>
                  <input
                    type="text"
                    placeholder="Ex: Fundação Novo Mundo"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full bg-[#F5F5F3] border border-[#DFC373]/20 rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-[#DFC373]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider block mb-1.5 text-[#0F213A]/70">Proposta de Atuação / Mensagem</label>
                  <textarea
                    rows={3}
                    placeholder="Descreva seu alinhamento com a nossa engrenagem sistêmica de transformação..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#F5F5F3] border border-[#DFC373]/20 rounded-lg p-2.5 text-xs outline-none focus:ring-1 focus:ring-[#DFC373] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold p-3 rounded-lg text-xs uppercase tracking-widest transition-all mt-4 hover:shadow-md active:scale-[0.99]"
                >
                  Submeter Intenção de Aliança
                </button>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 text-emerald-600">
                  <Check className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <h4 className="font-serif font-bold text-xl text-[#0B1B33] mb-2">Pedido Registrado</h4>
                <p className="text-xs text-[#0F213A]/70 max-w-sm mx-auto mb-6">
                  Sua proposta foi registrada em nosso ecossistema e passará pela avaliação ética do conselho de liderança integrada do Grupo.
                </p>

                <div className="bg-[#F5F5F3] rounded-xl p-5 border border-[#DFC373]/20 text-left max-w-sm mx-auto space-y-2 mb-8">
                  <div className="text-[10px] uppercase tracking-widest font-mono text-[#9C772F] font-bold">PROTOCOLO DE SEGURANÇA</div>
                  <div className="text-base font-bold font-mono tracking-wider text-[#0B1B33]">
                    {submissionProtocol}
                  </div>
                  <div className="border-t border-[#DFC373]/10 pt-2 text-[10px] text-[#0F213A]/70 leading-relaxed font-sans">
                    <strong>Perfil:</strong> {formData.profile} <br />
                    <strong>Aliado:</strong> {formData.name} <br />
                    <strong>WhatsApp:</strong> +55 67 9667-1390
                  </div>
                </div>

                <a
                  href={getWhatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3 rounded-lg text-xs uppercase tracking-widest transition-all mb-4 hover:shadow-md active:scale-[0.99] cursor-pointer"
                >
                  <MessageSquare className="w-4.5 h-4.5" /> Enviar Mensagem no WhatsApp
                </a>

                <button
                  onClick={() => {
                    setFormData({ name: '', email: '', organization: '', profile: 'Padrinho / Madrinha de Impacto', message: '' });
                    setFormSubmitted(false);
                  }}
                  className="border border-slate-300 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  Registrar Nova Proposta
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */
      /*                                RODAPÉ                                      */
      /* -------------------------------------------------------------------------- */}
      <footer className="relative w-full py-12 px-6 sm:px-12 bg-[#F5F5F3] text-[#0F213A]/70 z-10 border-t border-[#DFC373]/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left flex flex-col">
            <span className="text-xs tracking-widest font-bold uppercase text-[#9C772F]">GRUPO NOVO HORIZONTE</span>
            <span className="text-[10px] text-[#0F213A]/50 mt-1">
              &copy; {new Date().getFullYear()} Grupo Novo Horizonte&reg;. Todos os direitos reservados de propriedade sistêmica.
            </span>
          </div>


        </div>
      </footer>
    </div>
  );
}
