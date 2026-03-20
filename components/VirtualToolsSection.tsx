import React from 'react';

const VirtualToolsSection: React.FC = () => {
    return (
        <section className="py-20 bg-neutral-50 border-y border-black/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[1em] block opacity-60">TECNOLOGÍA</span>
                    <h2 className="text-4xl md:text-6xl font-serif italic text-black uppercase tracking-tighter leading-none">Herramientas <span className="text-[#E7B5D5]">Virtuales</span></h2>
                    <div className="w-20 h-0.5 bg-[#E7B5D5] mx-auto opacity-40"></div>
                    <p className="mt-6 text-lg text-gray-500 font-medium italic max-w-2xl mx-auto">Prueba nuestros productos desde la comodidad de tu hogar con realidad aumentada.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="group relative overflow-hidden rounded-[2rem] aspect-video cursor-pointer shadow-xl">
                        <img 
                            alt="Virtual Make-up" 
                            className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" 
                            src="https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47511%2F47511_1.png" 
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10 space-y-4">
                            <h3 className="text-2xl font-serif italic text-white">Probador de Maquillaje</h3>
                            <p className="text-white/70 text-sm font-medium italic">Encuentra tu tono ideal de labial o base en segundos.</p>
                            <button className="w-fit bg-white text-black text-[9px] font-black uppercase tracking-widest px-8 py-3 rounded-full hover:bg-[#E7B5D5] hover:text-white transition-all">PROBAR AHORA</button>
                        </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-[2rem] aspect-video cursor-pointer shadow-xl">
                        <img 
                            alt="Skin Analysis" 
                            className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" 
                            src="https://media-cdn.oriflame.com/productImage?externalMediaId=product-management-media%2FProducts%2F47511%2F47511_1.png" 
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10 space-y-4">
                            <h3 className="text-2xl font-serif italic text-white">Análisis de Piel AI</h3>
                            <p className="text-white/70 text-sm font-medium italic">Rutina personalizada basada en las necesidades de tu piel.</p>
                            <button className="w-fit bg-white text-black text-[9px] font-black uppercase tracking-widest px-8 py-3 rounded-full hover:bg-[#E7B5D5] hover:text-white transition-all">ANALIZAR MI PIEL</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VirtualToolsSection;
