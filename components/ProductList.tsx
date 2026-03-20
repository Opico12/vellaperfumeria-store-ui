
import React from 'react';
import type { View, Product } from './types';
import { allProducts } from './products';
import { ProductCard } from './ProductCard';
// FIX: Changed import to use the actual component name. The error was due to HeroCarousel.tsx not having a default export, which will also be fixed.
import HeroCarousel from './HeroCarousel';
import type { Currency } from './currency';
import FeaturesSection from './FeaturesSection';
import InteractiveCatalogSection from './InteractiveCatalogSection';


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
    
    return (
        <div className="space-y-24 pb-20">
            
            <HeroCarousel onNavigate={onNavigate} />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <section>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-4 tracking-tight">Novedades Exclusivas</h2>
                        <div className="w-16 h-px bg-[var(--color-accent)] mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {newArrivals.map(product => (
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

            {/* Current Offers Section */}
            {currentOffers.length > 0 && (
                <div className="bg-gray-50 py-24 border-y border-gray-100">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <section>
                            <div className="text-center mb-16">
                                <span className="inline-block py-1 px-3 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Oportunidades</span>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-4 tracking-tight">Ofertas de Temporada</h2>
                                <div className="w-16 h-px bg-[var(--color-accent)] mx-auto"></div>
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
                                    className="inline-block border-b border-black text-black font-serif italic py-2 px-4 hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-300 text-lg"
                                >
                                    Descubrir todas las ofertas
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            )}

            <FeaturesSection />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <section>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-4 tracking-tight">Más Vendidos</h2>
                        <div className="w-16 h-px bg-[var(--color-accent)] mx-auto"></div>
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
                    <div className="text-center mt-20">
                        <button
                            onClick={() => onNavigate('products', 'all')}
                            className="bg-black text-white font-sans font-bold py-4 px-12 rounded-none uppercase text-xs tracking-[0.2em] hover:bg-[var(--color-accent)] transition-all duration-300 shadow-lg"
                        >
                            Explorar Colección Completa
                        </button>
                    </div>
                </section>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <InteractiveCatalogSection onNavigate={onNavigate} />
            </div>
        </div>
    );
};

export default ProductList;
