
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
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex(prevIndex => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, []);

    const prevSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 6000);
        return () => clearInterval(slideInterval);
    }, [nextSlide]);
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="w-full h-[70vh] max-h-[600px] m-auto relative group overflow-hidden bg-black">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                        style={{ backgroundImage: `url(${slide.imageUrl})` }}
                    >
                        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center text-white p-8">
                            <div className="max-w-3xl space-y-6">
                                <p className="text-xs lg:text-sm font-sans font-bold uppercase tracking-[0.4em] mb-2 animate-fadeIn">{slide.title}</p>
                                <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-8 tracking-tight leading-tight drop-shadow-xl animate-slideUp">{slide.subtitle}</h2>
                                <div className="w-12 h-px bg-white mx-auto mb-10"></div>
                                <button
                                    onClick={() => onNavigate(slide.view, slide.payload)}
                                    className="bg-white text-black font-sans font-bold py-4 px-12 rounded-none hover:bg-[var(--color-accent)] hover:text-white transition-all duration-500 uppercase text-[10px] tracking-[0.25em] shadow-2xl"
                                >
                                    {slide.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* Navigation Buttons */}
                <button onClick={prevSlide} className="absolute left-8 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/90 p-4 text-white hover:text-black transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100" aria-label="Anterior">
                    <ChevronLeftIcon />
                </button>
                <button onClick={nextSlide} className="absolute right-8 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/90 p-4 text-white hover:text-black transition-all duration-300 backdrop-blur-sm opacity-0 group-hover:opacity-100" aria-label="Siguiente">
                    <ChevronRightIcon />
                </button>

                {/* Dots */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-4">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-0.5 transition-all duration-500 ${index === currentIndex ? 'w-12 bg-white' : 'w-6 bg-white/30 hover:bg-white/60'}`}
                            aria-label={`Ir a diapositiva ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroCarousel;
