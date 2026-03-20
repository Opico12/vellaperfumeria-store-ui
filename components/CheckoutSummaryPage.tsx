
import React, { useMemo, useState } from 'react';
import type { CartItem, View } from './types';
import type { Currency } from './currency';
import { formatCurrency } from './currency';
import { createOrder } from './api';

interface CheckoutSummaryPageProps {
    cartItems: CartItem[];
    currency: Currency;
    onNavigate: (view: View) => void;
}

const FREE_SHIPPING_THRESHOLD = 35;
const SHIPPING_COST = 6.00;

// --- ICONS ---
const GooglePlayIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.609 1.814L13.792 12 3.61 22.186c-.18.18-.29.43-.29.707 0 .55.45 1 1 1 .28 0 .53-.11.71-.29L16.209 12 5.03 1.107c-.18-.18-.43-.29-.71-.29-.55 0-1 .45-1 1 0 .28.11.53.29.707zM17.622 10.586l-2.414-2.414 2.414-2.414 2.414 2.414-2.414 2.414z" />
    </svg>
);

const CreditCardIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

const VerifiedBadgeIcon = () => (
    <svg className="w-20 h-20 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CheckoutSummaryPage: React.FC<CheckoutSummaryPageProps> = ({ 
    cartItems, 
    currency, 
    onNavigate
}) => {
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'googleplay'>('googleplay');
    
    // Form State
    const [email, setEmail] = useState('');
    const [shipping, setShipping] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        phone: ''
    });
    const [promoCode, setPromoCode] = useState('');

    const subtotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }, [cartItems]);

    const shippingCost = useMemo(() => {
        return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    }, [subtotal]);

    const total = subtotal + shippingCost;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShipping(prev => ({ ...prev, [name]: value }));
    };

    const handleFinalizeOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !shipping.firstName || !shipping.address) {
            alert("Por favor, completa los campos obligatorios.");
            return;
        }

        setIsProcessing(true);

        // Simulate API call to WooCommerce
        const orderData = {
            payment_method: paymentMethod === 'googleplay' ? 'google_pay' : 'stripe',
            payment_method_title: paymentMethod === 'googleplay' ? 'Google Play' : 'Tarjeta de Crédito',
            set_paid: true,
            billing: {
                first_name: shipping.firstName,
                last_name: shipping.lastName,
                address_1: shipping.address,
                city: shipping.city,
                postcode: shipping.zip,
                country: 'ES',
                email: email,
                phone: shipping.phone
            },
            shipping: {
                first_name: shipping.firstName,
                last_name: shipping.lastName,
                address_1: shipping.address,
                city: shipping.city,
                postcode: shipping.zip,
                country: 'ES'
            },
            line_items: cartItems.map(item => ({
                product_id: item.product.id,
                quantity: item.quantity
            }))
        };

        try {
            const result = await createOrder(orderData);
            setOrderNumber(result.id.toString());
            
            // Artificial delay for "Native App" feel
            setTimeout(() => {
                setIsProcessing(false);
                setIsOrderComplete(true);
                window.scrollTo(0, 0);
            }, 2000);
        } catch (error) {
            console.error("Error creating order:", error);
            setIsProcessing(false);
            alert("Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.");
        }
    };

    if (isOrderComplete) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 animate-in fade-in duration-700">
                <div className="max-w-md w-full text-center space-y-8">
                    <div className="flex justify-center">
                        <VerifiedBadgeIcon />
                    </div>
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-black mb-2 uppercase tracking-widest">¡Pedido Realizado!</h1>
                        <p className="text-gray-600 font-sans">Tu pedido <span className="font-bold text-black">#{orderNumber}</span> ha sido enviado con éxito.</p>
                    </div>
                    <div className="bg-neutral-50 p-6 text-left space-y-4 border border-neutral-100">
                        <div className="flex justify-between text-xs uppercase tracking-widest font-bold text-neutral-400">
                            <span>Resumen</span>
                            <span>Total</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-sans">{cartItems.length} productos</span>
                            <span className="text-lg font-bold font-sans">{formatCurrency(total, currency)}</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => onNavigate('home')}
                        className="w-full bg-black text-white font-sans font-bold py-5 rounded-none hover:bg-neutral-800 transition-all tracking-[0.2em] uppercase text-xs"
                    >
                        Volver al Inicio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Google Wallet Style Header */}
            <div className="bg-black text-white py-6 px-4 sticky top-0 z-50 flex items-center justify-between shadow-xl">
                <button onClick={() => onNavigate('home')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">Vella Perfumería</span>
                    <span className="text-sm font-serif italic">Checkout Seguro</span>
                </div>
                <div className="w-10"></div> {/* Spacer */}
            </div>

            <div className="container mx-auto px-4 max-w-4xl py-12">
                <form onSubmit={handleFinalizeOrder} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    
                    {/* Left Column: Forms */}
                    <div className="space-y-10">
                        <section className="space-y-6">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black border-b border-neutral-100 pb-2">Información de Contacto</h2>
                            <input 
                                required 
                                type="email" 
                                placeholder="Correo electrónico" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border-b border-neutral-200 py-3 font-sans text-sm focus:border-black outline-none transition-all"
                            />
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black border-b border-neutral-100 pb-2">Dirección de Envío</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <input required name="firstName" placeholder="Nombre" onChange={handleInputChange} className="w-full border-b border-neutral-200 py-3 font-sans text-sm focus:border-black outline-none" />
                                <input required name="lastName" placeholder="Apellidos" onChange={handleInputChange} className="w-full border-b border-neutral-200 py-3 font-sans text-sm focus:border-black outline-none" />
                            </div>
                            <input required name="address" placeholder="Dirección completa" onChange={handleInputChange} className="w-full border-b border-neutral-200 py-3 font-sans text-sm focus:border-black outline-none" />
                            <div className="grid grid-cols-2 gap-4">
                                <input required name="city" placeholder="Ciudad" onChange={handleInputChange} className="w-full border-b border-neutral-200 py-3 font-sans text-sm focus:border-black outline-none" />
                                <input required name="zip" placeholder="Código Postal" onChange={handleInputChange} className="w-full border-b border-neutral-200 py-3 font-sans text-sm focus:border-black outline-none" />
                            </div>
                            <input required name="phone" placeholder="Teléfono" onChange={handleInputChange} className="w-full border-b border-neutral-200 py-3 font-sans text-sm focus:border-black outline-none" />
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black border-b border-neutral-100 pb-2">Método de Pago</h2>
                            <div className="space-y-3">
                                <button 
                                    type="button"
                                    onClick={() => setPaymentMethod('googleplay')}
                                    className={`w-full p-4 border flex items-center justify-between transition-all ${paymentMethod === 'googleplay' ? 'border-black bg-neutral-50' : 'border-neutral-100 hover:border-neutral-300'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <GooglePlayIcon />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Google Play</span>
                                    </div>
                                    {paymentMethod === 'googleplay' && <div className="w-2 h-2 bg-black rounded-full"></div>}
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setPaymentMethod('card')}
                                    className={`w-full p-4 border flex items-center justify-between transition-all ${paymentMethod === 'card' ? 'border-black bg-neutral-50' : 'border-neutral-100 hover:border-neutral-300'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <CreditCardIcon />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Tarjeta de Crédito</span>
                                    </div>
                                    {paymentMethod === 'card' && <div className="w-2 h-2 bg-black rounded-full"></div>}
                                </button>
                            </div>

                            {paymentMethod === 'card' && (
                                <div className="p-4 bg-neutral-50 space-y-4 animate-in slide-in-from-top-2 duration-300">
                                    <input placeholder="Número de tarjeta" className="w-full bg-white border border-neutral-200 p-3 text-sm font-mono" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input placeholder="MM/YY" className="w-full bg-white border border-neutral-200 p-3 text-sm font-mono" />
                                        <input placeholder="CVC" className="w-full bg-white border border-neutral-200 p-3 text-sm font-mono" />
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="space-y-8">
                        <div className="bg-neutral-50 p-8 sticky top-32 border border-neutral-100">
                            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black border-b border-neutral-200 pb-4 mb-6">Tu Pedido</h2>
                            
                            <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="w-12 h-12 bg-white border border-neutral-100 flex-shrink-0">
                                            <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <p className="text-[10px] font-bold uppercase truncate">{item.product.name}</p>
                                            <p className="text-[10px] text-neutral-400">Cant: {item.quantity}</p>
                                        </div>
                                        <span className="text-xs font-bold">{formatCurrency(item.product.price * item.quantity, currency)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 border-t border-neutral-200 pt-6">
                                <div className="flex gap-2">
                                    <input 
                                        placeholder="Código de descuento / Tarjeta Regalo" 
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        className="flex-grow bg-white border border-neutral-200 p-3 text-[10px] uppercase tracking-widest outline-none focus:border-black"
                                    />
                                    <button type="button" className="bg-black text-white px-4 text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-800">Aplicar</button>
                                </div>

                                <div className="flex justify-between text-xs pt-4">
                                    <span className="text-neutral-400 uppercase tracking-widest">Subtotal</span>
                                    <span className="font-bold">{formatCurrency(subtotal, currency)}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-neutral-400 uppercase tracking-widest">Envío</span>
                                    <span className="font-bold">{shippingCost === 0 ? 'GRATIS' : formatCurrency(shippingCost, currency)}</span>
                                </div>
                                <div className="flex justify-between text-lg pt-4 border-t border-neutral-200">
                                    <span className="font-bold uppercase tracking-[0.2em]">Total</span>
                                    <span className="font-bold">{formatCurrency(total, currency)}</span>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={isProcessing}
                                className={`w-full bg-black text-white font-sans font-bold py-5 mt-8 transition-all tracking-[0.2em] uppercase text-xs flex justify-center items-center gap-3 ${isProcessing ? 'opacity-70 cursor-wait' : 'hover:bg-neutral-800'}`}
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        Procesando...
                                    </>
                                ) : (
                                    paymentMethod === 'googleplay' ? 'Pagar con Google Play' : 'Finalizar Pedido'
                                )}
                            </button>
                            
                            <div className="mt-6 flex items-center justify-center gap-2 opacity-40 grayscale">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-2" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-4" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutSummaryPage;
