
import React, { useState, useRef, useEffect } from 'react';
import type { View } from './types';
import type { Currency } from './currency';

// Social Icons
const ThreadsIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8.01 3.51c-1.35 0-2.45 1.1-2.45 2.45v.38c0 .28.22.5.5.5h1.5c.28 0 .5-.22.5-.5v-.38c0-.69.56-1.25 1.25-1.25h.19c.69 0 1.25.56 1.25 1.25v2.87c0 1.35-1.1 2.45-2.45 2.45h-.87c-.28 0-.5.22-.5.5v1.5c0 .28.22.5.5.5h.87c2.21 0 4-1.79 4-4V5.96c0-1.35-1.1-2.45-2.45-2.45h-2.12zm-3.09 3.1h-1.5c-.28 0-.5.22-.5.5v.38c0 1.35 1.1 2.45 2.45 2.45h.19c.69 0 1.25-.56 1.25-1.25V5.96c0-1.35-1.1-2.45-2.45-2.45H3.01c-1.35 0-2.45 1.1-2.45 2.45v2.12c0 2.21 1.79 4 4 4h.87c-.28 0-.5.22-.5.5v-1.5c0-.28-.22-.5-.5-.5h-.87c-.69 0-1.25-.56-1.25-1.25v-.38c0-.28-.22-.5-.5-.5z"/>
    </svg>
);

const InstagramIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919A118.663 118.663 0 0112 2.163zm0 1.442c-3.143 0-3.509.011-4.72.067-2.694.123-3.997 1.433-4.12 4.12C3.109 9.12 3.098 9.486 3.098 9.486 3.098 12c0 2.514.011 2.88.067 4.72.123 2.686 1.427 3.996 4.12 4.12 1.21.055 1.577.067 4.72.067 3.143 0 3.509-.011 4.72-.067 2.694-.123 3.997-1.433 4.12-4.12.056-1.84.067-2.206.067-4.72 0-2.514-.011-2.88-.067-4.72-.123-2.686-1.427-3.996-4.12-4.12-1.21-.055-1.577.067-4.72-.067zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm0 1.44a2.31 2.31 0 110 4.62 2.31 2.31 0 010-4.62zM18.88 6.54a1.32 1.32 0 100-2.64 1.32 1.32 0 000 2.64z" clipRule="evenodd" />
    </svg>
);

const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

const MenuIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const CartIcon = () => (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const NavLink: React.FC<{ onClick?: () => void, href?: string, children: React.ReactNode, className?: string }> = ({ onClick, href, children, className }) => {
    if (href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={`text-base font-medium text-black hover:text-[var(--color-primary-solid)] transition-colors duration-200 ${className}`}>
                <span className="hover-underline-effect">{children}</span>
            </a>
        );
    }
    return (
        <button onClick={onClick} className={`text-base font-medium text-black hover:text-[var(--color-primary-solid)] transition-colors duration-200 ${className}`}>
            <span className="hover-underline-effect">{children}</span>
        </button>
    );
};


interface HeaderProps {
    onNavigate: (view: View, payload?: any) => void;
    currency: Currency;
    onCurrencyChange: (currency: Currency) => void;
    cartCount: number;
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, cartCount, onCartClick }) => {
    const [cartPulse, setCartPulse] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cartCount > 0) {
            setCartPulse(true);
            const timer = setTimeout(() => setCartPulse(false), 500);
            return () => clearTimeout(timer);
        }
    }, [cartCount]);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMobileNav = (view: View, payload?: any) => {
        onNavigate(view, payload);
        setIsMobileMenuOpen(false);
    }

    return (
        <header className="sticky top-0 z-50 transition-all duration-500 font-sans shadow-md">
            {/* Top Bar */}
            <div className="bg-white text-black text-[10px] sm:text-[11px] font-bold tracking-[0.2em] border-b border-pink-100 text-center uppercase py-2">
                <div className="container mx-auto px-4 flex items-center justify-center gap-4 md:gap-8 flex-wrap">
                    <div className="flex items-center gap-2 text-pink-700">
                        <span className="animate-pulse">✨</span>
                        <span>OFERTAS HASTA EL 27 DE MARZO</span>
                        <span className="animate-pulse">✨</span>
                    </div>
                    <div className="hidden sm:block h-3 w-[1px] bg-pink-300"></div>
                    <a href="https://instagram.com/beautieshopvella" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-pink-600 transition-colors">
                        <div className="bg-white p-1 rounded-full shadow-sm">
                            <InstagramIcon />
                        </div>
                        <span className="hidden sm:inline">@beautieshopvella</span>
                    </a>
                    <div className="hidden sm:block h-3 w-[1px] bg-pink-300"></div>
                    <a href="tel:+34661202616" className="flex items-center gap-2 hover:text-pink-600 transition-colors">
                        <div className="bg-white p-1 rounded-full shadow-sm">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg>
                        </div>
                        <span>661 202 616</span>
                    </a>
                </div>
            </div>

            {/* Main Header */}
            <div className="bg-white/90 backdrop-blur-md py-2 w-full relative z-20 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16 md:h-24">
                        <div className="w-10 md:w-1/3">
                            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-black p-2">
                                <MenuIcon />
                            </button>
                        </div>
                        <div className="flex-grow flex justify-center md:w-1/3">
                            <button onClick={() => onNavigate('home')} className="block hover:opacity-80 transition-opacity">
                                <img 
                                    alt="Vellaperfumeria" 
                                    className="transition-all duration-500 h-12 md:h-16 w-auto object-contain" 
                                    src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" 
                                />
                            </button>
                        </div>
                        <div className="flex items-center justify-end w-10 md:w-1/3 gap-4">
                            <div className="relative hidden md:block">
                                <button className="text-black hover:text-pink-600 transition-colors" aria-label="Buscar">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search" aria-hidden="true"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
                                </button>
                            </div>
                            <button 
                                className={`relative text-black hover:text-pink-600 transition-colors group ${cartPulse ? 'animate-pop' : ''}`} 
                                aria-label="Carrito"
                                onClick={onCartClick}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center group-hover:bg-pink-600 transition-colors">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="w-full bg-black text-white shadow-md relative z-40 transition-all duration-500 h-10 hidden md:block">
                <div className="container mx-auto px-4 h-full">
                    <nav className="flex justify-center items-center h-full text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase overflow-x-auto no-scrollbar whitespace-nowrap">
                        <button onClick={() => onNavigate('home')} className="h-full px-5 flex items-center hover:bg-gray-900 hover:text-pink-400 transition-colors uppercase">Inicio</button>
                        <div className="relative group h-full">
                            <button onClick={() => onNavigate('products', 'all')} className="h-full px-4 flex items-center gap-1 hover:text-pink-400 transition-colors">
                                Boutique Onin
                                <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-64 bg-black border border-gray-800 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                <div className="py-4">
                                    <button onClick={() => onNavigate('ofertas')} className="w-full text-left px-6 py-3 text-[10px] hover:bg-white/10 transition-colors uppercase tracking-widest">Día de la Mujer</button>
                                    <button onClick={() => onNavigate('products', 'skincare')} className="w-full text-left px-6 py-3 text-[10px] hover:bg-white/10 transition-colors uppercase tracking-widest">Cuidado Facial</button>
                                    <button onClick={() => onNavigate('products', 'makeup')} className="w-full text-left px-6 py-3 text-[10px] hover:bg-white/10 transition-colors uppercase tracking-widest">Maquillaje</button>
                                    <button onClick={() => onNavigate('products', 'perfume')} className="w-full text-left px-6 py-3 text-[10px] hover:bg-white/10 transition-colors uppercase tracking-widest">Fragancias</button>
                                    <button onClick={() => onNavigate('products', 'wellness')} className="w-full text-left px-6 py-3 text-[10px] hover:bg-white/10 transition-colors uppercase tracking-widest">Wellness</button>
                                    <button onClick={() => onNavigate('products', 'hair')} className="w-full text-left px-6 py-3 text-[10px] hover:bg-white/10 transition-colors uppercase tracking-widest">Cuidado del Cabello</button>
                                    <button onClick={() => onNavigate('products', 'personal-care')} className="w-full text-left px-6 py-3 text-[10px] hover:bg-white/10 transition-colors uppercase tracking-widest">Cuidado Personal</button>
                                    <button onClick={() => onNavigate('products', 'men')} className="w-full text-left px-6 py-3 text-[10px] hover:bg-white/10 transition-colors uppercase tracking-widest">Hombre</button>
                                    <button onClick={() => onNavigate('products', 'accessories')} className="w-full text-left px-6 py-3 text-[10px] hover:bg-white/10 transition-colors uppercase tracking-widest">Accesorios</button>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => onNavigate('ia')} className="h-full px-5 flex items-center hover:bg-gray-900 hover:text-pink-400 transition-colors uppercase">
                            <span className="text-[#D4AF37] font-black italic">Beauty AI</span>
                        </button>
                        <button onClick={() => onNavigate('products', 'makeup')} className="h-full px-5 flex items-center hover:bg-gray-900 hover:text-pink-400 transition-colors uppercase">Encuentra tu Tono</button>
                        <button onClick={() => onNavigate('blog')} className="h-full px-5 flex items-center hover:bg-gray-900 hover:text-pink-400 transition-colors uppercase">Editorial</button>
                        <button onClick={() => onNavigate('products', 'wellness')} className="h-full px-5 flex items-center hover:bg-gray-900 hover:text-pink-400 transition-colors uppercase">Salud y Belleza</button>
                        <button onClick={() => onNavigate('blog')} className="h-full px-5 flex items-center hover:bg-gray-900 hover:text-pink-400 transition-colors uppercase">Dormir Bien</button>
                        <button onClick={() => onNavigate('products', 'all')} className="h-full px-5 flex items-center hover:bg-gray-900 hover:text-pink-400 transition-colors uppercase">Bestsellers</button>
                        <button onClick={() => onNavigate('ofertas')} className="h-full px-5 flex items-center hover:bg-gray-900 hover:text-pink-400 transition-colors uppercase">Ofertas</button>
                    </nav>
                </div>
            </div>
            
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div ref={navRef} className="absolute top-0 left-0 w-4/5 max-w-xs h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
                        <div className="p-6 flex justify-between items-center border-b">
                            <span className="font-serif italic text-xl text-black">Menú</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="flex-grow overflow-y-auto py-6">
                             <button onClick={() => handleMobileNav('home')} className="block w-full text-left px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-gray-900 hover:bg-gray-50">Inicio</button>
                             <button onClick={() => handleMobileNav('products', 'all')} className="block w-full text-left px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-gray-900 hover:bg-gray-50">Tienda</button>
                             <button onClick={() => handleMobileNav('ofertas')} className="block w-full text-left px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-gray-900 hover:bg-gray-50">Ideas Regalo</button>
                             <button onClick={() => handleMobileNav('catalog')} className="block w-full text-left px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-gray-900 hover:bg-gray-50">Catálogo</button>
                             <button onClick={() => handleMobileNav('ia')} className="block w-full text-left px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-gray-900 hover:bg-gray-50">Asistente IA</button>
                             <button onClick={() => handleMobileNav('blog')} className="block w-full text-left px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-gray-900 hover:bg-gray-50">Blog</button>
                             <button onClick={() => handleMobileNav('contact')} className="block w-full text-left px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-gray-900 hover:bg-gray-50">Ayuda / Contacto</button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
