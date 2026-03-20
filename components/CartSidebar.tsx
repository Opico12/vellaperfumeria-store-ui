
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { CartItem, View } from './types';
import type { Currency } from './currency';
import { formatCurrency } from './currency';

interface CartSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    currency: Currency;
    onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
    onRemoveItem: (cartItemId: string) => void;
    onCheckout: () => void; 
    isCheckingOut: boolean;
    checkoutError: string | null;
    onNavigate: (view: View, payload?: any) => void;
    onClearCart?: () => void;
}

const FREE_SHIPPING_THRESHOLD = 35;
const DISCOUNT_THRESHOLD = 35; 
const DISCOUNT_PERCENTAGE = 0.15; 
const SHIPPING_COST = 6.00;
const GIFT_THRESHOLD = 35;

const CloseIcon = () => (
    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const GiftBoxIcon = ({ color = "black" }: { color?: string }) => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 12V22H4V12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 7H2V12H22V7Z" fill={color} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22V7" stroke={color === 'white' ? 'black' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, cartItems, currency, onUpdateQuantity, onRemoveItem, onNavigate, onClearCart }) => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const subtotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }, [cartItems]);

    const discountAmount = useMemo(() => {
        if (subtotal >= DISCOUNT_THRESHOLD) {
            return subtotal * DISCOUNT_PERCENTAGE;
        }
        return 0;
    }, [subtotal]);

    const hasShippingSaver = useMemo(() => {
        return cartItems.some(item => item.product.isShippingSaver);
    }, [cartItems]);

    const shippingCost = useMemo(() => {
        if (hasShippingSaver || subtotal >= FREE_SHIPPING_THRESHOLD) {
            return 0;
        }
        return SHIPPING_COST;
    }, [subtotal, hasShippingSaver]);

    const total = subtotal - discountAmount + shippingCost;
    const amountForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
    const hasGift = subtotal > GIFT_THRESHOLD;

    // --- MAIN ACTION: GO TO SUMMARY ---
    // Instead of redirecting to external site immediately (which causes issues with multiple items),
    // we take the user to the internal Checkout Summary page.
    const handleGoToSummary = () => {
        onNavigate('checkoutSummary');
        onClose();
    };

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-heading"
            className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

            <div
                ref={sidebarRef}
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-8 border-b border-gray-100 flex-shrink-0 bg-white">
                    <h2 id="cart-heading" className="text-xl font-serif font-bold tracking-tight text-black uppercase text-xs">Tu Selección</h2>
                    <button onClick={onClose} className="p-2 text-black hover:opacity-50 transition-opacity" aria-label="Cerrar carrito">
                        <CloseIcon />
                    </button>
                </div>

                {cartItems.length > 0 ? (
                    <>
                        {/* Items List */}
                        <div className="flex-grow overflow-y-auto p-8 space-y-8 bg-white">
                            {/* Free Gift Item Logic */}
                            {hasGift && (
                                <div className="flex gap-6 items-center bg-black text-white p-6 border border-black shadow-sm transition-shadow animate-pop">
                                    <div className="w-20 h-24 flex items-center justify-center bg-white p-2">
                                        <GiftBoxIcon color="black" />
                                    </div>
                                    <div className="flex-grow flex flex-col">
                                        <h3 className="font-serif font-bold text-sm leading-tight text-white uppercase tracking-wide">Caja de Regalo Mediana</h3>
                                        <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">Obsequio Exclusivo</p>
                                        <div className="flex items-center justify-between mt-4">
                                             <p className="font-bold text-[10px] tracking-widest text-[var(--color-accent)] uppercase">Cortesía</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {cartItems.map(item => (
                                <div key={item.id} className="flex gap-6 items-start bg-white border-b border-gray-50 pb-8 last:border-0">
                                    <div className="w-24 h-32 bg-gray-50 flex-shrink-0 overflow-hidden">
                                        <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow flex flex-col">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-serif font-bold text-sm leading-tight text-black uppercase tracking-wide">{item.product.name}</h3>
                                            <button onClick={() => onRemoveItem(item.id)} className="text-gray-300 hover:text-black p-1 transition-colors" aria-label={`Eliminar ${item.product.name}`}>
                                                <TrashIcon />
                                            </button>
                                        </div>
                                        {item.selectedVariant && (
                                            <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">
                                                {Object.entries(item.selectedVariant).map(([key, value]) => `${key}: ${value}`).join(' | ')}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between mt-6">
                                             <p className="font-sans font-medium text-sm text-black">{formatCurrency(item.product.price * item.quantity, currency)}</p>
                                             <div className="flex items-center border border-gray-100 bg-white">
                                                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-xs text-gray-400 hover:text-black transition-colors" aria-label="Reducir cantidad">-</button>
                                                <span className="px-2 text-[10px] font-bold text-black">{item.quantity}</span>
                                                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-xs text-gray-400 hover:text-black transition-colors" aria-label="Aumentar cantidad">+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer / Summary */}
                        <div className="p-8 border-t border-gray-100 bg-white space-y-6 z-10">
                             {/* Promo Messages */}
                             {discountAmount > 0 ? (
                                <div className="text-center text-[10px] font-bold text-black p-4 bg-gray-50 uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                                    <span>Beneficio Premium: 15% Descuento Aplicado</span>
                                </div>
                            ) : amountForFreeShipping > 0 ? (
                                <div className="text-center">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">Faltan <span className="text-black font-bold">{formatCurrency(amountForFreeShipping, currency, { decimals: 2 })}</span> para Envío de Cortesía</p>
                                    <div className="w-full bg-gray-50 h-1 overflow-hidden">
                                        <div className="bg-black h-full transition-all duration-700 ease-out" style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center text-[10px] font-bold text-black p-4 bg-gray-50 uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path></svg>
                                    <span>Envío de Cortesía Activado</span>
                                </div>
                            )}

                            <div className="space-y-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 pt-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="text-black">{formatCurrency(subtotal, currency)}</span>
                                </div>
                                {discountAmount > 0 && (
                                     <div className="flex justify-between text-black">
                                        <span>Descuento Especial (15%)</span>
                                        <span className="font-bold">-{formatCurrency(discountAmount, currency)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span>Gastos de Envío</span>
                                    <span className={`font-bold ${shippingCost === 0 ? 'text-black' : ''}`}>{shippingCost === 0 ? 'Cortesía' : formatCurrency(shippingCost, currency)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-baseline pt-6 border-t border-gray-100 text-black">
                                <span className="text-xs font-bold uppercase tracking-[0.3em]">Total</span>
                                <span className="text-3xl font-sans font-medium">{formatCurrency(total, currency)}</span>
                            </div>
                            
                            <div className="flex flex-col gap-4 pt-4">
                                {/* MAIN CHECKOUT BUTTON: GO TO SUMMARY */}
                                <button 
                                    onClick={handleGoToSummary}
                                    className="w-full bg-black text-white font-bold text-xs uppercase tracking-[0.3em] py-5 px-8 transition-all duration-300 hover:bg-white hover:text-black border border-black"
                                >
                                     Finalizar Pedido
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center p-12 text-center bg-white">
                        <div className="mb-8 opacity-20">
                            <svg className="h-16 w-16 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <p className="text-xl font-serif italic text-black mb-4">Su selección está vacía</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-12">Descubra nuestras colecciones exclusivas</p>
                        <button 
                            onClick={onClose}
                            className="bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-gray-800 transition-colors"
                        >
                            Explorar Tienda
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartSidebar;
