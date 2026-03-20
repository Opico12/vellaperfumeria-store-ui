
import React from 'react';
import type { View, Product } from './types';
import { allProducts } from './products';
import { ProductCard } from './ProductCard';
import HeroCarousel from './HeroCarousel';
import type { Currency } from './currency';
import FeaturesSection from './FeaturesSection';
import CatalogCtaSection from './CatalogCtaSection';
import VirtualToolsSection from './VirtualToolsSection';

const ProductList: React.FC<{
    onNavigate: (view: View, payload?: any) => void;
    onProductSelect: (product: Product) => void;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onBuyNow: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    currency: Currency;
    onQuickView: (product: Product) => void;
}> = ({ onNavigate, onProductSelect, onAddToCart, onQuickAddToCart, onBuyNow, currency, onQuickView }) => {
    const newArrivals = allProducts.filter(p => p.tag === 'NOVEDAD').slice(0, 4);
    const bestSellers = allProducts.filter(p => p.rating && p.rating >= 4.9).slice(0, 4);
    const currentOffers = allProducts.filter(p => p.tag === 'OFERTA').slice(0, 4);
    const womensDay = allProducts.filter(p => p.category === 'Set' || p.category === 'Fragancias').slice(0, 4);
    
    return (
        <div className="space-y-32 pb-20">
            <HeroCarousel onNavigate={onNavigate} />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Offers Section */}
                <section className="py-20">
                    <div className="text-center mb-16 space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[1em] block opacity-60">EDICIÓN ESPECIAL</span>
                        <h2 className="text-4xl md:text-6xl font-serif italic text-black uppercase tracking-tighter leading-none">Ofertas <span className="text-[#E7B5D5]">Marzo</span></h2>
                        <div className="w-20 h-0.5 bg-[#E7B5D5] mx-auto opacity-40"></div>
                        <p className="mt-6 text-lg text-gray-500 font-medium italic max-w-2xl mx-auto">Válido hasta el 27 de marzo de 2026. Unidades limitadas.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {currentOffers.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                currency={currency}
                                onAddToCart={onAddToCart}
                                onQuickAddToCart={onQuickAddToCart}
                                onBuyNow={onBuyNow}
                                onProductSelect={onProductSelect}
                                onQuickView={onQuickView}
                            />
                        ))}
                    </div>
                    <div className="text-center mt-16">
                        <button
                            onClick={() => onNavigate('ofertas')}
                            className="bg-black text-white font-black py-4 px-12 text-[10px] uppercase tracking-[0.6em] hover:bg-[#E7B5D5] hover:text-white transition-all shadow-2xl transform hover:scale-105 active:scale-95"
                        >
                            VER TODAS LAS OFERTAS
                        </button>
                    </div>
                </section>

                {/* Women's Day Section */}
                <section className="py-20 border-t border-black/5">
                    <div className="text-center mb-16 space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[1em] block opacity-60">CELEBRACIÓN</span>
                        <h2 className="text-4xl md:text-6xl font-serif italic text-black uppercase tracking-tighter leading-none">Día de la <span className="text-[#E7B5D5]">Mujer</span></h2>
                        <div className="w-20 h-0.5 bg-[#E7B5D5] mx-auto opacity-40"></div>
                        <p className="mt-6 text-lg text-gray-500 font-medium italic max-w-2xl mx-auto">Regala exclusividad y sofisticación en su día especial.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {womensDay.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                currency={currency}
                                onAddToCart={onAddToCart}
                                onQuickAddToCart={onQuickAddToCart}
                                onBuyNow={onBuyNow}
                                onProductSelect={onProductSelect}
                                onQuickView={onQuickView}
                            />
                        ))}
                    </div>
                </section>
            </div>

            <CatalogCtaSection onNavigate={onNavigate} />

            <VirtualToolsSection />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Sleep Well Section */}
                <section className="py-20">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <span className="text-[10px] font-black uppercase tracking-[1em] block opacity-60">BIENESTAR</span>
                                <h2 className="text-4xl md:text-6xl font-serif italic text-black uppercase tracking-tighter leading-none">Duerme <span className="text-[#E7B5D5]">Bien</span></h2>
                                <div className="w-20 h-0.5 bg-[#E7B5D5] opacity-40"></div>
                            </div>
                            <p className="text-gray-500 text-lg leading-relaxed font-medium italic max-w-md">Descubre nuestra colección diseñada para mejorar tu descanso y despertar con una piel radiante.</p>
                            <button 
                                onClick={() => onNavigate('products', 'bienestar')}
                                className="bg-black text-white font-black py-4 px-12 text-[10px] uppercase tracking-[0.6em] hover:bg-[#E7B5D5] hover:text-white transition-all shadow-2xl transform hover:scale-105 active:scale-95"
                            >
                                VER COLECCIÓN
                            </button>
                        </div>
                        <div className="relative group overflow-hidden rounded-[3rem] shadow-2xl aspect-[16/9]">
                            <img 
                                alt="Sleep Well Collection" 
                                className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" 
                                src="https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47511%2F47511_1.png" 
                                referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-700"></div>
                        </div>
                    </div>
                </section>

                {/* Best Sellers Section */}
                <section className="py-20 border-t border-black/5">
                    <div className="text-center mb-16 space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-[1em] block opacity-60">IMPRESCINDIBLES</span>
                        <h2 className="text-4xl md:text-6xl font-serif italic text-black uppercase tracking-tighter leading-none">Nuestros <span className="text-[#E7B5D5]">Favoritos</span></h2>
                        <div className="w-20 h-0.5 bg-[#E7B5D5] mx-auto opacity-40"></div>
                        <p className="mt-6 text-lg text-gray-500 font-medium italic max-w-2xl mx-auto">Los productos más deseados por nuestra comunidad exclusiva.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {bestSellers.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                currency={currency}
                                onAddToCart={onAddToCart}
                                onQuickAddToCart={onQuickAddToCart}
                                onBuyNow={onBuyNow}
                                onProductSelect={onProductSelect}
                                onQuickView={onQuickView}
                            />
                        ))}
                    </div>
                </section>
            </div>

            <FeaturesSection />

            {/* Manifesto Section */}
            <section className="py-32 bg-black text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="text-[20vw] font-serif italic absolute -top-20 -left-20 whitespace-nowrap">BOUTIQUE ONIN</div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        <span className="text-[10px] font-black uppercase tracking-[1.5em] block opacity-40">NUESTRO MANIFIESTO</span>
                        <h2 className="text-3xl md:text-5xl font-serif italic leading-tight">"Creemos en la belleza que nace de la ciencia y se expresa a través del arte de la perfumería."</h2>
                        <div className="w-20 h-px bg-white/20 mx-auto"></div>
                        <p className="text-white/60 text-lg font-medium italic leading-relaxed">Cada fragancia en nuestra boutique es seleccionada por su carácter único y su capacidad para evocar emociones profundas. No vendemos productos, ofrecemos experiencias sensoriales inolvidables.</p>
                        <div className="pt-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">EST. 2026 · BOUTIQUE ONIN</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductList;

