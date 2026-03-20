
import React from 'react';
import { ProductCard } from './ProductCard';
import type { Product, View } from './types';
import type { Currency } from './currency';
import { allProducts } from './products';

// Update data structure to support internal navigation
interface BannerData {
    id: string;
    imageUrl: string;
    title: string;
    buttonText: string;
    action?: string; // Internal scroll action
    view?: View;     // Internal view navigation
    payload?: any;   // Payload for view
}

const banners: BannerData[] = [
    {
        id: 'black-friday',
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=b4f0fbe7-2786-457d-b0d1-2fcf05e82f5b&name=1_Promo_split_Week1_600x450&inputFormat=jpg',
        title: 'Esta semana: Compra 2 con un 60% dto',
        buttonText: 'SOLO HASTA 25.11',
        action: 'scroll-black-friday'
    },
    {
        id: 'magical-midnights',
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=10eada9f-b5ef-4854-911a-34f17f58b371&name=2_Promo_split_NewCollection_600x450&inputFormat=jpg',
        title: 'Nueva Colección especial Navidad',
        buttonText: 'COMPRA PARA BRILLAR',
        view: 'products',
        payload: 'makeup' // Mapping to makeup category
    },
    {
        id: 'wellosophy-pack',
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=e12555ba-0c42-4991-9821-7327bc9eae12&name=focus_banner_PWP&inputFormat=png',
        title: '¡Tu plan personalizado de nutrición!',
        buttonText: 'Ver más',
        view: 'products',
        payload: 'wellness'
    },
    {
        id: 'wellosophy-sub',
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=b7da6e77-1fb1-46be-80cb-7bd1157cc06a&name=focus_banner_WS_bis&inputFormat=png',
        title: '¡Suscríbete a Wellosophy!',
        buttonText: 'Ver más',
        view: 'products',
        payload: 'wellness'
    },
    {
        id: 'gift-sets',
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=e6a950aa-3fef-457c-bcbf-1058993497d0&name=3_Promo_split_GiftSets_600x450&inputFormat=jpg',
        title: 'NUEVOS Sets perfectos para regalar',
        buttonText: 'COMPRAR REGALOS',
        view: 'ofertas',
        payload: undefined // Stays on offers page
    },
    {
        id: 'novage',
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=6efc6ae1-0a1d-4df6-97f8-d785fa0c0476&name=5_Promo_split_Novage_600x450&inputFormat=jpg',
        title: 'Contorno de Ojos con 40% dto',
        buttonText: 'ELIGE EL TUYO',
        view: 'products',
        payload: 'skincare'
    },
    {
        id: 'duologi',
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=df88458d-0b4f-4f26-80a4-bc41f7aade2b&name=6_Promo_split_Duologi_600x450&inputFormat=jpg',
        title: 'Pide tu Acondicionador (rico o ligero) Duologi por solo 6,99€ comprando un producto de la lista',
        buttonText: 'VER MÁS',
        action: 'scroll-duologi'
    },
    {
        id: 'deodorants',
        imageUrl: 'https://media-cdn.oriflame.com/contentImage?externalMediaId=ff411183-8497-4756-bad2-c5de537fc1be&name=7_Promo_split_Backcover_600x450&inputFormat=jpg',
        title: 'Cada Roll On por solo 3,99€',
        buttonText: 'VER LA COLECCIÓN',
        view: 'products',
        payload: 'personal-care'
    }
];

// Acondicionadores y Tratamientos Duologi (La Oferta)
const conditionerIds = [44960, 44961, 44968];
const conditionerProducts = allProducts.filter(p => conditionerIds.includes(p.id));

// Productos Selección (Trigger Products)
const triggerProductIds = [
    47440, 46987, 47009, // Love Nature Simple Joys
    46642, 46643, 46731, 45799, 45800, 47450, // Essense & Co
    46801, // Divine Dark Velvet
    46968, 46969, 46970, 46971, // Milk & Honey
    36151, // Tender Care
    47878, // Esponja
    47677, // Cepillo
    47202, // Crema Manos Pasión
    46982, // Feet Up Spray
];
const triggerProducts = allProducts.filter(p => triggerProductIds.includes(p.id));

// Ofertas de la Semana (Semana 2: 18 al 24 de Marzo)
const weeklyOfferIds = [
    38883, // Lip balm
    42785, 40809, 42520, 42495, // Women Fragrances
    42864, 38527, 45357, 45967, // Men Fragrances
    13659, // Diamond Day Cream
    46901, // Giordani Pearls
];
const weeklyOfferProducts = allProducts.filter(p => weeklyOfferIds.includes(p.id));

// Premios Especiales (Elige tu Premio)
const specialRewardIds = [150838, 41039, 46792, 46795, 47514];
const specialRewardProducts = allProducts.filter(p => specialRewardIds.includes(p.id));

// Black Friday / Seasonal Products
const blackFridayProductIds = [38557, 42236, 38556, 42255, 41059, 47104, 47006];
const blackFridayProducts = allProducts.filter(p => blackFridayProductIds.includes(p.id));


const OfertasPage: React.FC<{
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onBuyNow: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
    onNavigate: (view: View, payload?: any) => void;
}> = ({ currency, onAddToCart, onQuickAddToCart, onBuyNow, onProductSelect, onQuickView, onNavigate }) => {

    const handleBannerClick = (banner: BannerData) => {
        if (banner.action === 'scroll-duologi') {
            const element = document.getElementById('duologi-section');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (banner.action === 'scroll-black-friday') {
            const element = document.getElementById('black-friday-section');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (banner.view) {
            onNavigate(banner.view, banner.payload);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="bg-white min-h-screen">
             {/* Header Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-5xl font-serif italic text-black mb-6 tracking-tight">Selección Exclusiva</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm font-sans tracking-wide uppercase">
                        Descubre las mejores propuestas y ofertas de la temporada
                    </p>
                </div>
                
                {/* Tabs / Navigation Visual */}
                <div className="border-b border-gray-100 mb-10">
                    <div className="flex justify-center space-x-12 overflow-x-auto scrollbar-hide">
                        <button className="border-b border-black text-black font-sans font-semibold py-3 px-2 whitespace-nowrap text-[10px] uppercase tracking-[0.2em]">
                            Ofertas Destacadas
                        </button>
                    </div>
                </div>
            </div>

            {/* Banners Grid */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {banners.map((banner) => (
                         <div 
                            key={banner.id} 
                            className="group relative cursor-pointer overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500"
                            onClick={() => handleBannerClick(banner)}
                         >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img 
                                    src={banner.imageUrl} 
                                    alt={banner.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 flex flex-col justify-end p-8 text-white">
                                <h3 className="text-2xl font-serif italic mb-6 leading-tight drop-shadow-lg">
                                    {banner.title}
                                </h3>
                                <button className="w-fit bg-white text-black font-sans font-bold py-3 px-8 rounded-none uppercase text-[10px] tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300 border border-white">
                                    {banner.buttonText}
                                </button>
                            </div>
                         </div>
                    ))}
                </div>
            </div>

            {/* Weekly Offers Section */}
            <div className="bg-white py-20 border-t border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block py-1.5 px-4 bg-[var(--color-accent)] text-white text-[9px] font-bold uppercase tracking-[0.3em] mb-6">Semana 2: 18 al 24 de Marzo</span>
                        <h2 className="text-3xl md:text-4xl font-serif italic text-black mb-6">Ofertas de la Semana</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-sm font-sans leading-relaxed tracking-wide">
                            Aprovecha estos precios exclusivos disponibles solo por tiempo limitado.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {weeklyOfferProducts.map(product => (
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
                </div>
            </div>

            {/* Black Friday Section */}
            <div id="black-friday-section" className="bg-gray-50 py-20 border-t border-gray-100 scroll-mt-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block py-1.5 px-4 bg-black text-white text-[9px] font-bold uppercase tracking-[0.3em] mb-6">Promoción Especial</span>
                        <h2 className="text-3xl md:text-4xl font-serif italic text-black mb-6">Venta de Temporada</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-sm font-sans leading-relaxed tracking-wide">
                            Combina tus favoritos de esta selección y disfruta de condiciones exclusivas.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {blackFridayProducts.map(product => (
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
                </div>
            </div>

            {/* Special Rewards Section */}
            <div className="bg-neutral-50 py-20 border-t border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-12 border border-gray-100 shadow-sm text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl font-serif italic text-black mb-6">¡Elige tu Premio!</h2>
                        <p className="text-gray-600 font-sans text-sm tracking-wide mb-10 leading-relaxed">
                            Realiza un pedido de 59€ o superior en este catálogo y elige uno de estos productos a un precio especial de <span className="font-bold text-black">3,00€</span>.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {specialRewardProducts.map(product => (
                                <div key={product.id} className="group cursor-pointer" onClick={() => onProductSelect(product)}>
                                    <div className="aspect-square overflow-hidden mb-3 bg-gray-50 border border-gray-100">
                                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <p className="text-[8px] font-sans font-bold uppercase tracking-widest text-gray-400 truncate px-1">{product.name}</p>
                                    <p className="text-xs font-sans font-bold text-black mt-1">3,00€</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Duologi Interactive Section */}
            <div id="duologi-section" className="bg-white py-20 border-t border-gray-100 scroll-mt-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-6">Configura tu Ritual Duologi</h2>
                        <div className="w-16 h-px bg-[var(--color-accent)] mx-auto mb-6"></div>
                        <p className="text-gray-500 max-w-2xl mx-auto text-sm font-sans tracking-wide leading-relaxed">
                            1. Selecciona un producto de nuestra colección exclusiva.<br/>
                            2. Adquiere tu tratamiento capilar Duologi por solo 6,99€.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* Step 1: The Trigger Products */}
                        <div className="lg:col-span-8">
                             <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
                                <div className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center font-serif italic text-lg shrink-0">1</div>
                                <h3 className="text-xl font-serif font-bold text-gray-900 tracking-wide">Colección de Selección</h3>
                             </div>
                             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {triggerProducts.slice(0, 6).map(product => (
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
                        </div>

                        {/* Step 2: The Reward */}
                        <div className="lg:col-span-4 bg-gray-50 rounded-none p-8 border border-gray-100 h-fit sticky top-24 shadow-sm">
                             <div className="flex items-center gap-4 mb-8 border-b border-gray-200 pb-6">
                                <div className="bg-[var(--color-accent)] text-white rounded-full w-10 h-10 flex items-center justify-center font-serif italic text-lg shrink-0">2</div>
                                <h3 className="text-xl font-serif font-bold text-gray-900 tracking-wide">Tratamiento Duologi</h3>
                             </div>
                             <div className="space-y-8">
                                {conditionerProducts.map(product => (
                                    <div key={product.id} className="relative">
                                         <div className="absolute top-4 right-4 z-10 bg-black text-white text-[9px] font-bold px-3 py-1.5 uppercase tracking-[0.15em] shadow-lg">
                                            PRECIO ESPECIAL 6,99€
                                        </div>
                                        <ProductCard
                                            product={product}
                                            currency={currency}
                                            onAddToCart={onAddToCart}
                                            onQuickAddToCart={onQuickAddToCart}
                                            onBuyNow={onBuyNow}
                                            onProductSelect={onProductSelect}
                                            onQuickView={onQuickView}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfertasPage;
