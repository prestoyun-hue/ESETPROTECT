import React from 'react';
import { ShieldCheck, ArrowRight, Lock, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSolutions = () => {
    document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-slate-50 py-16">
      {/* Background Image with Light Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" 
          alt="Cyber Security Technology Background" 
          className="w-full h-full object-cover opacity-100"
        />
        {/* Bright Pastel Overlay to keep text readable and theme bright */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-blue-50/60"></div>
        
        {/* Tech Grid Pattern Overlay (Lighter) */}
        <div className="absolute inset-0 opacity-10 mix-blend-multiply" 
             style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-eset-teal font-semibold text-sm mb-6 animate-fade-in-up hover:bg-blue-100 transition-colors cursor-default shadow-sm">
          <ShieldCheck size={16} className="animate-pulse" />
          <span>Global Top-Tier Endpoint Security</span>
        </div>
        
        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-5">
          기업을 위한 최고의 디지털 보안<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-eset-teal via-teal-500 to-cyan-500">
            ESET PROTECT PLATFORM
          </span>
        </h1>
        
        {/* Subheading */}
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
          ESET의 멀티레이어 보호 기술은 랜섬웨어, 제로데이, 피싱 등 <br className="hidden md:block"/>
          고도화된 사이버 위협으로부터 기업의 자산을 빈틈없이 보호합니다.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={scrollToSolutions}
            className="group px-8 py-3.5 bg-eset-teal text-white rounded-full font-bold text-lg hover:bg-teal-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            솔루션 알아보기
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={scrollToContact}
            className="group px-8 py-3.5 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 rounded-full font-bold text-lg hover:bg-white hover:border-slate-300 transition-all flex items-center gap-2 shadow-sm"
          >
            <Lock size={18} className="text-slate-400 group-hover:text-eset-teal transition-colors"/>
            솔루션 상담 신청
            <ChevronRight size={18} className="text-slate-400 group-hover:text-slate-700 transition-colors opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300"/>
          </button>
        </div>

        {/* Trust Indicators / Stats */}
        <div className="mt-10 pt-8 border-t border-slate-200 flex flex-wrap justify-center gap-y-4 gap-x-10 text-slate-500 text-xs font-medium tracking-wider">
          <div className="flex items-center gap-3">
            <span className="text-slate-900 font-bold text-2xl">24/7</span>
            <span className="text-left max-w-[160px] leading-snug">PROTECTION WITHOUT COMPROMISE</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-900 font-bold text-2xl">850+</span>
            <span className="text-left max-w-[200px] leading-snug">GLOBAL RESEARCHERS & EXPERTS</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-900 font-bold text-2xl">6min</span>
            <span className="text-left max-w-[180px] leading-snug">FASTEST DETECTION & RESPONSE</span>
          </div>
        </div>
      </div>

      {/* Decorative Glow Effects - Made lighter */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-100/40 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
};

export default Hero;