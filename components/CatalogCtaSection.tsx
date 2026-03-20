import React from 'react';
import type { View } from '../types';

interface CatalogCtaSectionProps {
    onNavigate: (view: View, payload?: any) => void;
}

const CatalogCtaSection: React.FC<CatalogCtaSectionProps> = ({ onNavigate }) => {
    return (
        <section className="py-20">
            <div className="text-center mb-16 space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[1em] block opacity-60">EDICIÓN LIMITADA</span>
                <h2 className="text-4xl md:text-6xl font-serif italic text-black uppercase tracking-tighter leading-none">Catálogo <span className="text-[#E7B5D5]">04 · 2026</span></h2>
                <div className="w-20 h-0.5 bg-[#E7B5D5] mx-auto opacity-40"></div>
                <p className="mt-6 text-lg text-gray-500 font-medium italic max-w-2xl mx-auto">Explora las últimas tendencias en alta perfumería y cosmética de lujo.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div 
                    onClick={() => onNavigate('catalog')}
                    className="relative aspect-[3/4] bg-neutral-100 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] overflow-hidden border border-black/5 w-full max-w-md mx-auto group cursor-pointer" 
                    role="button" 
                    aria-label="Ver catálogo"
                >
                    <img 
                        alt="Portada del Catálogo 04 2026" 
                        className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-[10s]" 
                        src="https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47511%2F47511_1.png" 
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-700 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-md text-black text-[10px] font-black uppercase tracking-[0.5em] px-8 py-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110 shadow-2xl">ABRIR EDICIÓN</div>
                    </div>
                    <div className="absolute top-8 right-8 bg-black text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-xl">NUEVO</div>
                </div>
                <div className="text-center lg:text-left space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-3xl font-serif italic text-black leading-tight">Una Experiencia <br /><span className="text-2xl not-italic font-black tracking-widest uppercase opacity-80">Inmersiva</span></h3>
                        <p className="text-gray-500 text-lg leading-relaxed font-medium italic max-w-md mx-auto lg:mx-0">Nuestro catálogo interactivo te permite descubrir cada detalle de nuestras colecciones exclusivas. Haz clic en los productos para añadirlos directamente a tu cesta.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                        <button 
                            onClick={() => onNavigate('catalog')}
                            className="bg-black text-white font-black py-4 px-12 text-[10px] uppercase tracking-[0.6em] hover:bg-[#E7B5D5] hover:text-white transition-all shadow-2xl transform hover:scale-105 active:scale-95"
                        >
                            VER CATÁLOGO
                        </button>
                        <div className="flex items-center gap-3 opacity-40">
                            <div className="w-12 h-px bg-black"></div>
                            <span className="text-[9px] font-black uppercase tracking-widest">Digital Experience</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CatalogCtaSection;
