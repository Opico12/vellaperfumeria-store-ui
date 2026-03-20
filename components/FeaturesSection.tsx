

import React from 'react';

// SVG Icons
const TruckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M9 17a2 2 0 10-4 0 2 2 0 004 0zM19 17a2 2 0 10-4 0 2 2 0 004 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h2a1 1 0 001-1V7.572a1 1 0 00-.218-.671l-1.5-2.25a1 1 0 00-.868-.451H13v11z" />
    </svg>
);

const GiftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6m-6 0a2 2 0 00-2 2v11a2 2 0 002 2h6a2 2 0 002-2V10a2 2 0 00-2-2h-6z" />
    </svg>
);

const UserGroupIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const FeaturesSection: React.FC = () => {
    const features = [
        {
            icon: <TruckIcon />,
            title: 'Envío Prioritario',
            description: 'Disfruta de envíos gratuitos y prioritarios en todos tus pedidos superiores a 35€ como miembro de nuestra boutique.',
        },
        {
            icon: <GiftIcon />,
            title: 'Cortesía Exclusiva',
            description: 'Recibe muestras de nuestras últimas fragancias de autor y lanzamientos científicos con cada una de tus compras.',
        },
        {
            icon: <UserGroupIcon />,
            title: 'Asesoría de Autor',
            description: 'Nuestros expertos en belleza están a tu disposición para crear una rutina personalizada que resalte tu esencia única.',
        }
    ];

    return (
        <section className="py-24 bg-neutral-50 border-y border-black/5 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-3 gap-16">
                    {features.map((feature, index) => (
                        <div key={index} className="space-y-6 text-center lg:text-left group">
                            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto lg:mx-0 shadow-xl group-hover:bg-[#E7B5D5] transition-colors duration-500">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-serif italic text-black">{feature.title}</h3>
                            <p className="text-gray-500 text-sm font-medium italic leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
