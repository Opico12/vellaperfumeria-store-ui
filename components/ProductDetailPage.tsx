
import React, { useRef, useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import type { Product, VariantOption } from './types';
import { type Currency, formatCurrency } from './currency';
import { allProducts } from './products';
import ImageLightbox from './ImageLightbox';

interface ProductDetailPageProps {
    product: Product;
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onBuyNow: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}

// SVG Icons
const CloseIcon = () => (
    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const TruckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 17a2 2 0 10-4 0 2 2 0 004 0zM19 17a2 2 0 10-4 0 2 2 0 004 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h2a1 1 0 001-1V7.572a1 1 0 00-.218-.671l-1.5-2.25a1 1 0 00-.868-.451H13v11z" />
    </svg>
);

const SparklesIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m1-9l2-2 2 2m-2 4v6m2-6l2 2-2 2M15 3l2 2-2 2m-2-4v4m2 4l2 2-2 2m-8 4h12" />
    </svg>
);

const StarIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const getDefaultVariant = (product: Product): Record<string, string> | null => {
    if (!product.variants) return null;
    const defaultVariant: Record<string, string> = {};
    for (const key in product.variants) {
        if (product.variants[key].length > 0) {
           defaultVariant[key] = product.variants[key][0].value;
        }
    }
    return defaultVariant;
};

const getStockInfo = (stock: number): { text: string; color: string } => {
    if (stock === 0) {
        return { text: 'Agotado', color: 'text-orange-600' };
    }
    if (stock <= 10) {
        return { text: '¡Date prisa! Pocas unidades', color: 'text-amber-600' };
    }
    return { text: 'En stock', color: 'text-green-600' };
};

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, currency, onAddToCart, onQuickAddToCart, onBuyNow, onProductSelect, onQuickView }) => {
    const [selectedVariant, setSelectedVariant] = useState<Record<string, string> | null>(getDefaultVariant(product));
    const [currentImageUrl, setCurrentImageUrl] = useState(product.imageUrl);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const addToCartBtnRef = useRef<HTMLButtonElement>(null);
    const buyNowBtnRef = useRef<HTMLButtonElement>(null);

    // Reset state when product changes
    useEffect(() => {
        setSelectedVariant(getDefaultVariant(product));
        setCurrentImageUrl(product.imageUrl);
        window.scrollTo(0,0);
    }, [product]);

    // Update image when variant changes
    useEffect(() => {
        let variantImageUrl: string | null = null;

        if (product.variants && selectedVariant) {
            for (const variantType in product.variants) {
                const selectedValue = selectedVariant[variantType];
                if (selectedValue) {
                    const variantOption = product.variants[variantType].find(
                        v => v.value === selectedValue
                    );
                    if (variantOption?.imageUrl) {
                        variantImageUrl = variantOption.imageUrl;
                        break;
                    }
                }
            }
        }
        setCurrentImageUrl(variantImageUrl || product.imageUrl);
    }, [selectedVariant, product.variants, product.imageUrl]);

    const handleVariantChange = (variantType: string, value: string) => {
        setSelectedVariant(prev => ({ ...(prev || {}), [variantType]: value }));
    };

    const stockInfo = getStockInfo(product.stock);
    const isOutOfStock = product.stock === 0;
    const isDiscounted = product.regularPrice && product.regularPrice > product.price;
    const discountPercentage = isDiscounted
        ? Math.round(((product.regularPrice! - product.price) / product.regularPrice!) * 100)
        : 0;

    const relatedProducts = allProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white overflow-hidden">
                <div className="md:flex gap-20">
                    {/* Product Image Gallery */}
                    <div className="md:w-[55%] relative group">
                        <div className="relative aspect-[4/5] bg-neutral-50 overflow-hidden cursor-zoom-in" onClick={() => setIsLightboxOpen(true)}>
                            <img 
                                src={currentImageUrl} 
                                alt={product.name} 
                                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" 
                            />
                            {isDiscounted && (
                                <div className="absolute top-8 left-8 bg-black text-white text-[11px] font-bold px-5 py-2.5 tracking-[0.25em] uppercase shadow-2xl">
                                    Oferta Especial
                                </div>
                            )}
                             <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-md p-4 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                            </div>
                        </div>
                        
                        {/* Thumbnail Gallery */}
                        {product.variants && Object.values(product.variants).some((opts: VariantOption[]) => opts.some(o => o.imageUrl)) && (
                             <div className="flex gap-4 mt-8 overflow-x-auto pb-4 scrollbar-hide">
                                {Object.values(product.variants).flat().filter((opt: VariantOption) => opt.imageUrl).map((opt: VariantOption, idx: number) => (
                                    <button 
                                        key={idx}
                                        onClick={() => {
                                            const type = Object.keys(product.variants!).find(key => product.variants![key].includes(opt));
                                            if (type) handleVariantChange(type, opt.value);
                                        }}
                                        className={`w-24 h-32 border transition-all duration-500 flex-shrink-0 ${currentImageUrl === opt.imageUrl ? 'border-black scale-105 shadow-md' : 'border-neutral-100 hover:border-neutral-300'}`}
                                    >
                                        <img src={opt.imageUrl!} alt={opt.value} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                             </div>
                        )}
                    </div>
 
                    {/* Product Info */}
                    <div className="md:w-[45%] py-6 flex flex-col">
                        <div className="mb-6">
                            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.4em]">{product.brand}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-medium text-black mb-8 leading-[1.1] tracking-tight">{product.name}</h1>
                        
                        <div className="flex items-center gap-8 mb-12">
                            {product.rating && (
                                <div className="flex items-center">
                                    <div className="flex text-black gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} className={i < Math.floor(product.rating!) ? "w-3.5 h-3.5" : "w-3.5 h-3.5 text-neutral-100"} />
                                        ))}
                                    </div>
                                    <span className="ml-4 text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">{product.reviewCount} Opiniones</span>
                                </div>
                            )}
                            {stockInfo.text === 'En stock' && (
                                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2.5">
                                    <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
                                    En Existencia
                                </span>
                            )}
                        </div>
 
                        <div className="mb-14">
                            <div className="flex items-baseline gap-6">
                                <span className="text-5xl font-sans font-bold text-black tracking-tighter">{formatCurrency(product.price, currency)}</span>
                                {isDiscounted && (
                                    <span className="text-2xl text-neutral-200 line-through font-sans font-medium">{formatCurrency(product.regularPrice!, currency)}</span>
                                )}
                            </div>
                            {product.isShippingSaver && (
                                <div className="inline-block mt-6 text-[11px] text-neutral-500 font-bold tracking-[0.25em] uppercase border-b border-neutral-100 pb-1.5">
                                    Envío de Cortesía Incluido
                                </div>
                            )}
                        </div>

                        <p className="text-gray-600 text-lg leading-relaxed mb-12 font-sans font-light">{product.description}</p>

                        {/* Variants Selection */}
                        {product.variants && (
                            <div className="space-y-10 mb-12">
                                {Object.keys(product.variants).map((type) => {
                                    const options = product.variants![type];
                                    if (!Array.isArray(options)) return null;
                                    
                                    return (
                                        <div key={type}>
                                            <h3 className="text-[10px] font-bold text-black mb-4 uppercase tracking-[0.2em]">
                                                {type}: <span className="text-gray-400 ml-2">{selectedVariant?.[type]}</span>
                                            </h3>
                                            <div className="flex flex-wrap gap-4">
                                                {options.map(option => {
                                                    const isSelected = selectedVariant?.[type] === option.value;
                                                    if (option.colorCode) {
                                                        return (
                                                            <button
                                                                key={option.value}
                                                                onClick={() => handleVariantChange(type, option.value)}
                                                                className={`w-8 h-8 rounded-full border transition-all duration-300 transform hover:scale-110 ${isSelected ? 'border-black ring-1 ring-offset-4 ring-black' : 'border-gray-100'}`}
                                                                style={{ backgroundColor: option.colorCode }}
                                                                aria-label={`Seleccionar color ${option.value}`}
                                                                title={option.value}
                                                            />
                                                        );
                                                    }
                                                    return (
                                                        <button
                                                            key={option.value}
                                                            onClick={() => handleVariantChange(type, option.value)}
                                                            className={`px-6 py-2 text-[10px] uppercase tracking-widest font-bold border transition-all duration-300 ${isSelected ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100 hover:border-black hover:text-black'}`}
                                                        >
                                                            {option.value}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="mt-auto space-y-6">
                            <div className="flex flex-col gap-4">
                                <button
                                    ref={addToCartBtnRef}
                                    onClick={() => onAddToCart(product, addToCartBtnRef.current, selectedVariant)}
                                    disabled={isOutOfStock}
                                    className={`w-full bg-black text-white font-bold text-xs uppercase tracking-[0.3em] py-5 px-8 transition-all duration-300 hover:bg-white hover:text-black border border-black ${isOutOfStock ? 'bg-gray-100 text-gray-300 cursor-not-allowed border-gray-100' : ''}`}
                                >
                                    {isOutOfStock ? 'Agotado' : 'Añadir a la cesta'}
                                </button>
                                
                                {!isOutOfStock && (
                                    <button
                                        ref={buyNowBtnRef}
                                        onClick={() => onBuyNow(product, buyNowBtnRef.current, selectedVariant)}
                                        className="w-full bg-white text-black font-bold text-xs uppercase tracking-[0.3em] py-5 px-8 transition-all duration-300 hover:bg-black hover:text-white border border-black"
                                    >
                                        Comprar Ahora
                                    </button>
                                )}
                            </div>
                            
                            {/* Value Props */}
                            <div className="flex gap-12 pt-8 border-t border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                <div className="flex items-center gap-3">
                                    <TruckIcon className="w-4 h-4" />
                                    <span>Envío Express</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <SparklesIcon className="w-4 h-4" />
                                    <span>Garantía Vella</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How To Use Section */}
            {product.howToUse && (
                <div className="mt-24 border-t border-gray-100 pt-16 max-w-3xl">
                    <h2 className="text-xs font-bold text-black mb-8 uppercase tracking-[0.3em]">Modo de Uso</h2>
                    <p className="text-gray-600 text-lg leading-relaxed font-serif italic">{product.howToUse}</p>
                </div>
            )}

            {/* Reviews Mockup */}
            <div className="mt-24 border-t border-gray-100 pt-16">
                <div className="flex justify-between items-baseline mb-12">
                    <h2 className="text-xs font-bold text-black uppercase tracking-[0.3em]">Reseñas ({product.reviewCount})</h2>
                    <button className="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-1">Escribir opinión</button>
                </div>
                <div className="grid md:grid-cols-2 gap-16">
                    <div className="pb-8">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-black">María G.</span>
                            <div className="flex text-black"><StarIcon className="w-2.5 h-2.5"/><StarIcon className="w-2.5 h-2.5"/><StarIcon className="w-2.5 h-2.5"/><StarIcon className="w-2.5 h-2.5"/><StarIcon className="w-2.5 h-2.5"/></div>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed font-sans font-light">"¡Me encanta este producto! La calidad es increíble y el envío fue super rápido. Definitivamente volveré a comprar."</p>
                    </div>
                     <div className="pb-8">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-black">Laura P.</span>
                            <div className="flex text-black"><StarIcon className="w-2.5 h-2.5"/><StarIcon className="w-2.5 h-2.5"/><StarIcon className="w-2.5 h-2.5"/><StarIcon className="w-2.5 h-2.5"/><StarIcon className="w-2.5 h-2.5 text-gray-200"/></div>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed font-sans font-light">"Muy buen producto, cumple con lo que promete. El packaging es precioso."</p>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mt-32 border-t border-gray-100 pt-24">
                    <h2 className="text-2xl font-serif font-bold text-black mb-12 text-center">También te podría gustar</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {relatedProducts.map(related => (
                            <ProductCard
                                key={related.id}
                                product={related}
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
            )}

            {/* Lightbox */}
            {isLightboxOpen && (
                <ImageLightbox 
                    imageUrl={currentImageUrl} 
                    altText={product.name} 
                    onClose={() => setIsLightboxOpen(false)} 
                />
            )}
        </div>
    );
};

export default ProductDetailPage;
