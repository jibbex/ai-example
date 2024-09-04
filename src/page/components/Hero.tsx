import React from "react";
import { Crypto } from "./CryptoBackground.tsx";
import useAos from "@/hooks/useAos";

interface HeroProps {
    title: string
}

const Hero = (props: HeroProps): JSX.Element => {
    const aso = useAos({
        mirror: true,
    });

    React.useEffect(() => {
        aso?.init();
        if (aso) {
            aso.refresh();
        }
    }, [aso])

    return (
        <section id="hero">
            <div>
                <h1 id="vault-title"
                    className="absolute top-[40%] left-[2vw] text-5xl font-bold min-h-[80lvh]" 
                    data-aos="zoom-out-right"
                    data-aos-offset={0}
                    data-aos-delay={200}
                    data-aos-duration={1200}
                    data-aos-anchor-placement="top-bottom"
                    data-aos-mirror={true}
                    style={{
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: 100,                        
                    }}
                >
                    {props.title}
                </h1>
                <Crypto />
            </div>
        </section>
    );
};

export type { HeroProps };
export { Hero };