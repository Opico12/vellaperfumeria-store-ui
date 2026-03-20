
import React, { useMemo, useState } from 'react';
import type { CartItem, View } from './types';
import type { Currency } from './currency';
import { formatCurrency } from './currency';

interface CheckoutSummaryPageProps {
    cartItems: CartItem[];
    currency: Currency;
    onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
    onRemoveItem: (cartItemId: string) => void;
    onNavigate: (view: View) => void;
}

const FREE_SHIPPING_THRESHOLD = 35;
const SHIPPING_COST = 6.00;

// --- ICONOS INTEGRADOS ---

const VerifiedBadgeIcon = () => (
    <svg className="w-24 h-24 text-green-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CreditCardIcon = () => (
    <svg className="w-8 h-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

const CheckoutSummaryPage: React.FC<CheckoutSummaryPageProps> = ({ 
    cartItems, 
    currency, 
    onNavigate
}) => {
    // --- STATE MANAGEMENT ---
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    
    // Customer Info
    const [email, setEmail] = useState('');
    
    // Shipping Form State
    const [shipping, setShipping] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        phone: ''
    });

    // --- CALCULATIONS ---
    const subtotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }, [cartItems]);

    const shippingCost = useMemo(() => {
        const hasShippingSaver = cartItems.some(item => item.product.isShippingSaver);
        return (hasShippingSaver || subtotal >= FREE_SHIPPING_THRESHOLD) ? 0 : SHIPPING_COST;
    }, [subtotal, cartItems]);

    const total = subtotal + shippingCost;

    // --- HANDLERS ---
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShipping(prev => ({ ...prev, [name]: value }));
    };

    const handleFinalizeOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Simple Validation
        if (!email || !shipping.firstName || !shipping.address || !shipping.phone) {
            alert("Por favor, completa los datos de contacto y envío.");
            return;
        }

        setIsProcessing(true);

        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: cartItems.map(item => ({
                        name: item.product.name,
                        price: item.product.price,
                        quantity: item.quantity,
                        imageUrl: item.product.imageUrl
                    })),
                    success_url: `${window.location.origin}?view=checkoutSummary&status=success`,
                    cancel_url: `${window.location.origin}?view=checkoutSummary&status=cancel`,
                }),
            });

            const session = await response.json();

            if (session.url) {
                window.location.href = session.url;
            } else {
                throw new Error(session.error || 'Error al crear la sesión de pago');
            }

        } catch (error: unknown) {
            const err = error as Error;
            console.error("Stripe Checkout error", err);
            alert("Error al procesar el pago: " + err.message);
        } finally {
            setIsProcessing(false);
        }
    };

    // Check for success/cancel status from URL
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const status = params.get('status');
        if (status === 'success') {
            setOrderNumber("VP-" + Math.floor(Math.random() * 1000000).toString());
            setIsOrderComplete(true);
            // Clear cart could be handled here or in App.tsx
        } else if (status === 'cancel') {
            alert("El pago fue cancelado. Puedes intentarlo de nuevo.");
        }
    }, []);

    // --- SUCCESS VIEW (INTERNAL - NO REDIRECT) ---
    if (isOrderComplete) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 animate-fade-in">
                <style>{`
                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in {
                        animation: fade-in 0.5s ease-out forwards;
                    }
                `}</style>
                <div className="max-w-lg w-full text-center space-y-8">
                    <div className="flex justify-center">
                        <div className="bg-green-50 rounded-full p-6">
                            <VerifiedBadgeIcon />
                        </div>
                    </div>
                    
                    <div>
                        <h1 className="text-4xl font-serif font-light text-black mb-2 uppercase tracking-widest">Pedido Recibido</h1>
                        <p className="text-lg font-sans text-gray-600">Gracias por tu compra en Vella Perfumería.</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-none p-8 text-left space-y-6 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-6">
                            <span className="text-gray-400 uppercase text-[10px] font-sans font-bold tracking-[0.2em]">ID PEDIDO</span>
                            <span className="text-xl font-mono font-medium text-black">#{orderNumber}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-8 text-sm font-sans">
                            <div>
                                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Estado</p>
                                <p className="font-medium text-black flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                    Confirmado
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Fecha</p>
                                <p className="font-medium text-black">{new Date().toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Método</p>
                                <p className="font-medium text-black">Tarjeta</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">Total</p>
                                <p className="font-bold text-lg text-black">{formatCurrency(total, currency)}</p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 font-sans">
                             <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-2">Dirección de Envío</p>
                             <p className="font-bold text-black mb-1">{shipping.firstName} {shipping.lastName}</p>
                             <p className="text-gray-500 text-sm leading-relaxed">{shipping.address}, {shipping.zip} {shipping.city}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <p className="text-sm font-sans text-gray-500">Hemos enviado un email de confirmación a <span className="font-bold text-black">{email}</span></p>
                        <button 
                            onClick={() => onNavigate('home')}
                            className="w-full bg-black text-white font-sans font-bold py-5 rounded-none hover:bg-neutral-800 transition-all tracking-[0.2em] uppercase text-xs"
                        >
                            Volver a la Tienda
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- EMPTY CART VIEW ---
    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <div className="max-w-xl mx-auto space-y-8">
                    <h2 className="text-3xl font-serif font-light text-black uppercase tracking-widest">Tu carrito está vacío</h2>
                    <p className="text-gray-500 font-sans">Parece que aún no has añadido ningún producto de nuestra colección.</p>
                    <button 
                        onClick={() => onNavigate('products')}
                        className="bg-black text-white font-sans font-bold py-5 px-12 rounded-none hover:bg-neutral-800 transition-all tracking-[0.2em] uppercase text-xs"
                    >
                        Explorar Colección
                    </button>
                </div>
            </div>
        );
    }

    // --- CHECKOUT FORM VIEW ---
    return (
        <div className="bg-white min-h-screen pb-24">
            <div className="container mx-auto px-4 max-w-5xl mt-12">
                
                <h1 className="text-4xl font-serif font-light text-black mb-16 text-center uppercase tracking-[0.3em]">Finalizar Compra</h1>

                <form onSubmit={handleFinalizeOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    <div className="lg:col-span-7 space-y-12">
                        {/* 1. CONTACT & SHIPPING */}
                        <div className="space-y-8">
                            <h2 className="text-xs font-sans font-bold text-black uppercase tracking-[0.2em] border-b border-gray-100 pb-4">Datos de Envío</h2>
                            <div className="space-y-6">
                                <div className="group">
                                    <label className="block text-[10px] font-sans font-bold text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-black transition-colors">Email</label>
                                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-b border-gray-200 py-3 font-sans text-sm focus:border-black outline-none transition-all placeholder:text-gray-300" placeholder="tu@email.com" />
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="group">
                                        <label className="block text-[10px] font-sans font-bold text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-black transition-colors">Nombre</label>
                                        <input required type="text" name="firstName" value={shipping.firstName} onChange={handleInputChange} className="w-full border-b border-gray-200 py-3 font-sans text-sm focus:border-black outline-none transition-all" />
                                    </div>
                                    <div className="group">
                                        <label className="block text-[10px] font-sans font-bold text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-black transition-colors">Apellidos</label>
                                        <input required type="text" name="lastName" value={shipping.lastName} onChange={handleInputChange} className="w-full border-b border-gray-200 py-3 font-sans text-sm focus:border-black outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-[10px] font-sans font-bold text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-black transition-colors">Dirección</label>
                                    <input required type="text" name="address" value={shipping.address} onChange={handleInputChange} className="w-full border-b border-gray-200 py-3 font-sans text-sm focus:border-black outline-none transition-all placeholder:text-gray-300" placeholder="Calle, número, piso..." />
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="group">
                                        <label className="block text-[10px] font-sans font-bold text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-black transition-colors">Ciudad</label>
                                        <input required type="text" name="city" value={shipping.city} onChange={handleInputChange} className="w-full border-b border-gray-200 py-3 font-sans text-sm focus:border-black outline-none transition-all" />
                                    </div>
                                    <div className="group">
                                        <label className="block text-[10px] font-sans font-bold text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-black transition-colors">Código Postal</label>
                                        <input required type="text" name="zip" value={shipping.zip} onChange={handleInputChange} className="w-full border-b border-gray-200 py-3 font-sans text-sm focus:border-black outline-none transition-all" />
                                    </div>
                                </div>
                                <div className="group">
                                    <label className="block text-[10px] font-sans font-bold text-gray-400 uppercase tracking-widest mb-2 group-focus-within:text-black transition-colors">Teléfono</label>
                                    <input required type="tel" name="phone" value={shipping.phone} onChange={handleInputChange} className="w-full border-b border-gray-200 py-3 font-sans text-sm focus:border-black outline-none transition-all" />
                                </div>
                            </div>
                        </div>

                        {/* 2. PAYMENT METHOD SELECTION */}
                        <div className="space-y-8 pt-8">
                            <h2 className="text-xs font-sans font-bold text-black uppercase tracking-[0.2em] border-b border-gray-100 pb-4">Método de Pago</h2>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-5 border border-black bg-neutral-50">
                                    <div className="flex items-center gap-4">
                                        <CreditCardIcon />
                                        <span className="font-sans font-bold text-[10px] uppercase tracking-[0.2em] text-black">Tarjeta de Crédito / Débito</span>
                                    </div>
                                    <div className="flex gap-2 opacity-60">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 w-auto" />
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 w-auto" />
                                    </div>
                                </div>

                                <div className="bg-neutral-50/50 p-4 border border-neutral-100 flex items-center gap-3">
                                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <p className="text-[9px] font-sans font-bold uppercase tracking-widest text-neutral-500">Transacción Segura Encriptada SSL</p>
                                </div>

                                <div className="p-6 border border-gray-100 bg-white space-y-4">
                                    <p className="text-xs font-sans text-gray-600 leading-relaxed">
                                        Serás redirigido a la pasarela de pago segura de **Stripe** para completar tu compra de forma protegida.
                                    </p>
                                    <div className="flex gap-4 items-center">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6 w-auto opacity-70" />
                                        <div className="flex gap-2 opacity-40">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-2 w-auto" />
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 w-auto" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ORDER SUMMARY SIDEBAR */}
                    <div className="lg:col-span-5">
                        <div className="bg-neutral-50 p-8 sticky top-24">
                            <h2 className="text-xs font-sans font-bold text-black uppercase tracking-[0.2em] border-b border-gray-200 pb-4 mb-8">Resumen del Pedido</h2>
                            
                            <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 bg-white border border-gray-100 flex-shrink-0">
                                            <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <h3 className="text-[10px] font-sans font-bold uppercase tracking-wider text-black truncate">{item.product.name}</h3>
                                            <p className="text-[10px] font-sans text-gray-500 mt-1">Cantidad: {item.quantity}</p>
                                            <p className="text-xs font-sans font-bold text-black mt-1">{formatCurrency(item.product.price * item.quantity, currency)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 border-t border-gray-200 pt-8 font-sans">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-500 uppercase tracking-widest">Subtotal</span>
                                    <span className="text-black font-bold">{formatCurrency(subtotal, currency)}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-500 uppercase tracking-widest">Envío</span>
                                    <span className="text-black font-bold">{shippingCost === 0 ? 'GRATIS' : formatCurrency(shippingCost, currency)}</span>
                                </div>
                                <div className="flex justify-between text-base pt-4 border-t border-gray-200">
                                    <span className="text-black font-bold uppercase tracking-[0.2em]">Total</span>
                                    <span className="text-black font-bold">{formatCurrency(total, currency)}</span>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={isProcessing}
                                className={`w-full bg-black text-white font-sans font-bold py-5 mt-12 transition-all tracking-[0.2em] uppercase text-xs flex justify-center items-center gap-3 ${isProcessing ? 'opacity-70 cursor-wait' : 'hover:bg-neutral-800'}`}
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        Procesando...
                                    </>
                                ) : (
                                    `Confirmar Pago`
                                )}
                            </button>
                            
                            <p className="text-center text-[10px] font-sans text-gray-400 uppercase tracking-widest mt-6">
                                Pago 100% Seguro
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutSummaryPage;
