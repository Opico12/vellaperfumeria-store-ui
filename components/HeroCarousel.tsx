
import React, { useState, useEffect, useCallback } from 'react';
import type { View } from './types';

interface HeroCarouselProps {
    onNavigate: (view: View, payload?: string) => void;
}

const slides = [
    {
        imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfad450516?auto=format&fit=crop&q=80&w=1920',
        title: 'Lujo en cada Detalle',
        subtitle: 'NUEVA COLECCIÓN PREMIUM 2026',
        buttonText: 'VER NOVEDADES',
        view: 'products' as View,
        payload: 'perfume',
    },
    {
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1920',
        title: 'Elegancia Atemporal',
        subtitle: 'DESCUBRE LA BELLEZA EN LA LUZ',
        buttonText: 'EXPLORAR SELECCIÓN',
        view: 'products' as View,
        payload: 'skincare',
    },
    {
        imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=1920',
        title: 'Bienestar Holístico',
        subtitle: 'TU PLAN PERSONALIZADO WELLOSOPHY',
        buttonText: 'SABER MÁS',
        view: 'products' as View,
        payload: 'wellness',
    },
];

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
    </svg>
);


const HeroCarousel: React.FC<HeroCarouselProps> = ({ onNavigate }) => {
    return (
        <section className="relative w-full h-[65vh] md:h-[92vh] overflow-hidden bg-white">
            <div className="absolute inset-0">
                <img 
                    alt="Vella Boutique Luxe Editorial" 
                    className="w-full h-full object-cover object-[85%_center] transition-transform duration-[30s] scale-105 animate-slow-zoom" 
                    referrerPolicy="no-referrer" 
                    src="https://vellaperfumeria.com/wp-content/uploads/2025/12/crear-una-imagen-de-el-cosmetico-de-oriflame-para-pelo-2.png" 
                />
                <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
            </div>
            <div className="relative h-full w-full flex items-center justify-start px-6 md:px-12 lg:px-24">
                <div className="bg-white/[0.01] backdrop-blur-[8px] border border-white/10 p-8 md:p-14 lg:p-20 rounded-[3rem] md:rounded-[5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] max-w-sm md:max-w-lg w-full text-center space-y-8 animate-slide-in-left">
                    <div className="space-y-4 md:space-y-6">
                        <span className="text-white text-[9px] md:text-[13px] font-black uppercase tracking-[1.2em] block drop-shadow-xl opacity-90">ONIN LUXE 2026</span>
                        <div className="inline-block bg-pink-500 text-white text-[12px] md:text-[14px] font-black px-6 py-2 rounded-full tracking-[0.2em] animate-bounce shadow-lg">OFERTAS HASTA EL 27 DE MARZO</div>
                        <h1 className="text-5xl md:text-8xl lg:text-[9.5rem] font-serif italic text-white uppercase tracking-tighter leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)] cursor-pointer hover:text-[#E7B5D5] transition-colors">
                            TU <span className="text-[#E7B5D5]">TONO</span>
                        </h1>
                        <div className="w-24 h-0.5 bg-[#E7B5D5] mx-auto opacity-40"></div>
                        <p className="text-white/95 text-[8px] md:text-[11px] font-bold uppercase tracking-[0.7em] max-w-md mx-auto leading-relaxed pt-2 italic drop-shadow-lg">
                            FRAGANCIAS DE AUTOR Y <br />ALTA COSMÉTICA CIENTÍFICA
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => onNavigate('products', 'all')}
                            className="bg-white/90 text-black px-12 md:px-16 py-4 md:py-6 text-[10px] md:text-[12px] font-black uppercase tracking-[0.8em] hover:bg-[#E7B5D5] hover:text-white transition-all shadow-[0_20px_40px_rgba(0,0,0,0.2)] inline-block transform hover:scale-105 active:scale-95 rounded-none backdrop-blur-md"
                        >
                            EXPLORAR
                        </button>
                        <button 
                            onClick={() => onNavigate('ia')}
                            className="bg-black/80 text-white px-12 md:px-16 py-4 md:py-6 text-[10px] md:text-[12px] font-black uppercase tracking-[0.8em] hover:bg-white hover:text-black transition-all shadow-[0_20px_40px_rgba(0,0,0,0.2)] inline-block transform hover:scale-105 active:scale-95 rounded-none backdrop-blur-md border border-white/20"
                        >
                            EMPECEMOS
                        </button>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-16 right-16 text-white/40 text-[11px] font-black uppercase tracking-[1.8em] vertical-text hidden lg:block select-none">
                EDITORIAL · 2026 · VELLA BOUTIQUE
            </div>
            <style>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    transform: rotate(180deg);
                }
                @keyframes slide-in-left {
                    from { opacity: 0; transform: translateX(-120px); filter: blur(30px); }
                    to { opacity: 1; transform: translateX(0); filter: blur(0); }
                }
                @keyframes slow-zoom {
                    from { transform: scale(1); }
                    to { transform: scale(1.1); }
                }
                .animate-slide-in-left { animation: slide-in-left 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-slow-zoom { animation: slow-zoom 40s ease-in-out infinite alternate; }
            `}</style>
        </section>
    );
};

export default HeroCarousel;
