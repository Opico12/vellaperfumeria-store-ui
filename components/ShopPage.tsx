
import React, { useState, useMemo, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from './types';
import type { Currency } from './currency';
import { allProducts } from './products';

const categories = [
    { key: 'all', name: 'Todos los productos' },
    { key: 'skincare', name: 'Cuidado Facial' },
    { key: 'makeup', name: 'Maquillaje' },
    { key: 'perfume', name: 'Fragancias' },
    { key: 'wellness', name: 'Wellness' },
    { key: 'hair', name: 'Cuidado del Cabello' },
    { key: 'personal-care', name: 'Cuidado Personal' },
    { key: 'men', name: 'Hombre' },
    { key: 'accessories', name: 'Accesorios' },
];

const ITEMS_PER_PAGE = 12;

const ShopPage: React.FC<{
    currency: Currency;
    initialCategory: string;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onQuickAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onBuyNow: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
}> = ({ currency, initialCategory, onAddToCart, onQuickAddToCart, onBuyNow, onProductSelect, onQuickView }) => {
    
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [sortOrder, setSortOrder] = useState('menu_order');
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        setActiveCategory(initialCategory);
    }, [initialCategory]);

    // Reset page to 1 when category or sort changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, sortOrder]);

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = activeCategory === 'all'
            ? [...allProducts]
            : allProducts.filter(p => p.category === activeCategory);

        switch (sortOrder) {
            case 'popularity':
                filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
                break;
            case 'rating':
                filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'price':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'menu_order':
            default:
                break;
        }
        return filtered;
    }, [activeCategory, sortOrder]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value);
    };

    // Pagination Logic
    const totalItems = filteredAndSortedProducts.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
    const currentProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage, filteredAndSortedProducts]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const currentCategoryName = categories.find(c => c.key === activeCategory)?.name || 'Tienda';

    const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-1/4 lg:w-1/5">
                    <h2 className="text-xl font-serif font-bold mb-8 border-b border-gray-100 pb-4 tracking-wide uppercase text-xs">Colecciones</h2>
                    <ul className="space-y-4">
                        {categories.map(cat => (
                            <li key={cat.key}>
                                <button
                                    onClick={() => setActiveCategory(cat.key)}
                                    className={`w-full text-left py-2 transition-all duration-300 text-sm tracking-wide ${
                                        activeCategory === cat.key
                                            ? 'text-black font-bold border-l-2 border-[var(--color-accent)] pl-4'
                                            : 'text-gray-500 hover:text-black hover:pl-2'
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="w-full md:w-3/4 lg:w-4/5">
                    <div className="flex flex-col sm:flex-row justify-between items-baseline mb-12 gap-6 border-b border-gray-100 pb-8">
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-black tracking-tight">{currentCategoryName}</h1>
                        <div className="flex items-center gap-8">
                            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-sans">
                               {totalItems > 0 
                                 ? `${totalItems} Productos encontrados`
                                 : 'Sin resultados'
                               }
                            </p>
                            <form className="woocommerce-ordering">
                                <select 
                                    name="orderby" 
                                    className="orderby border-none bg-transparent py-2 pr-8 pl-0 text-[10px] uppercase tracking-[0.2em] font-bold focus:ring-0 cursor-pointer"
                                    aria-label="Pedido de la tienda"
                                    value={sortOrder}
                                    onChange={handleSortChange}
                                >
                                    <option value="menu_order">Orden Predeterminado</option>
                                    <option value="popularity">Popularidad</option>
                                    <option value="rating">Mejor Valorados</option>
                                    <option value="price">Precio: Menor a Mayor</option>
                                    <option value="price-desc">Precio: Mayor a Menor</option>
                                </select>
                            </form>
                        </div>
                    </div>

                    {currentProducts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
                                {currentProducts.map(product => (
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

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="mt-20 flex justify-center items-center gap-4">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="text-[10px] uppercase tracking-[0.2em] font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:text-[var(--color-accent)] transition-colors"
                                    >
                                        Anterior
                                    </button>
                                    
                                    <div className="flex gap-4">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`text-sm font-serif transition-all duration-300 ${
                                                    currentPage === page
                                                        ? 'text-black font-bold border-b border-black px-1'
                                                        : 'text-gray-400 hover:text-black'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="text-[10px] uppercase tracking-[0.2em] font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:text-[var(--color-accent)] transition-colors"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16 border rounded-lg">
                            <p className="text-xl text-gray-600">No se encontraron productos en esta categoría.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ShopPage;
