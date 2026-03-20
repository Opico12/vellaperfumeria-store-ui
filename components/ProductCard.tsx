
import React, { useRef, useState, useEffect } from 'react';
import { type Currency, formatCurrency } from './currency';
import type { Product } from './types';

// --- ICONS ---
const HeartIcon: React.FC<{isFilled: boolean}> = ({ isFilled }) => (
    <svg className={`h-6 w-6 transition-colors duration-300 ${isFilled ? 'text-fuchsia-500 fill-current' : 'text-gray-400'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

const StarIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg className={`w-3 h-3 ${className}`} style={style} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

interface ProductCardProps {
    product: Product;
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onBuyNow?: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, currency, onAddToCart, onQuickAddToCart, onBuyNow, onProductSelect, onQuickView }) => {
    const [isWishlist, setIsWishlist] = useState(false);
    const [imgSrc, setImgSrc] = useState(product.imageUrl);
    const addToCartBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setImgSrc(product.imageUrl);
    }, [product.imageUrl]);

    const isDiscounted = product.regularPrice && product.regularPrice > product.price;
    const discountPercentage = isDiscounted
        ? Math.round(((product.regularPrice! - product.price) / product.regularPrice!) * 100)
        : 0;

    const hasManyVariants = product.variants && (Object.keys(product.variants).length > 1 || (product.variants['Color'] && product.variants['Color'].length > 4));

    const handleActionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (product.stock === 0) return;

        if (hasManyVariants) {
            onProductSelect(product);
        } else {
            let defaultVariant: Record<string, string> | null = null;
            if (product.variants) {
                defaultVariant = {};
                for (const key in product.variants) {
                     if (product.variants[key].length > 0) {
                        (defaultVariant as Record<string, string>)[key] = product.variants[key][0].value;
                     }
                }
            }
            onQuickAddToCart(product, addToCartBtnRef.current, defaultVariant);
        }
    };

    return (
        <div 
            className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            role="article"
            aria-label={`Producto: ${product.name}`}
        >
            {/* Badge Section */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {product.tag && (
                    <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                        {product.tag}
                    </span>
                )}
                {isDiscounted && (
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">
                        -{discountPercentage}%
                    </span>
                )}
            </div>

            {/* Wishlist Button */}
            <button 
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors text-gray-400 hover:text-red-500"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsWishlist(!isWishlist);
                }}
            >
                <HeartIcon isFilled={isWishlist} />
            </button>

            {/* Image Section */}
            <div 
                className="relative aspect-[3/4] overflow-hidden bg-white cursor-pointer"
                onClick={() => onProductSelect(product)}
            >
                <img
                    src={imgSrc}
                    alt={product.name}
                    onError={() => setImgSrc('https://via.placeholder.com/300x300?text=Imagen+No+Disponible')}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow bg-white">
                <div className="mb-2 flex justify-between items-center">
                    <span className="text-[10px] font-sans font-bold text-neutral-400 uppercase tracking-[0.2em]">{product.brand}</span>
                    {product.rating && (
                        <div className="flex items-center gap-1">
                            <StarIcon className="text-amber-400" />
                            <span className="text-[10px] font-bold text-neutral-500">{product.rating}</span>
                        </div>
                    )}
                </div>

                <h3 
                    className="text-sm md:text-base font-serif font-medium text-black mb-3 line-clamp-2 hover:text-neutral-600 transition-colors cursor-pointer leading-snug tracking-wide"
                    onClick={() => onProductSelect(product)}
                >
                    {product.name}
                </h3>

                {/* Price Section */}
                <div className="mt-auto pt-4 border-t border-neutral-50">
                     <div className="flex items-baseline gap-3 flex-wrap mb-5">
                        <span className={`text-lg md:text-xl font-sans font-bold tracking-tight ${isDiscounted ? 'text-red-600' : 'text-black'}`}>
                            {formatCurrency(product.price, currency)}
                        </span>
                        {isDiscounted && (
                            <span className="text-xs md:text-sm text-neutral-300 line-through font-medium">
                                {formatCurrency(product.regularPrice!, currency)}
                            </span>
                        )}
                    </div>

                    {/* Action Buttons Grid */}
                    <div className="space-y-2">
                         {/* Add to Cart */}
                        <button
                            ref={addToCartBtnRef}
                            onClick={handleActionClick}
                            disabled={product.stock === 0}
                            className={`w-full py-2.5 rounded-none font-sans font-medium text-[10px] uppercase tracking-[0.2em] transition-all border ${
                                product.stock === 0
                                    ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
                                    : 'bg-black text-white border-black hover:bg-white hover:text-black'
                            }`}
                        >
                            {product.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
