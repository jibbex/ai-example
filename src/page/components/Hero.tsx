import React from "react";
import CryptBackground from "@/page/components/CryptoBackground";
import useAos from "@/hooks/useAos";

interface HeroProps {
    title: string
}

const Hero = (props: HeroProps): JSX.Element => {
    const aso = useAos();

    React.useEffect(() => {
        aso?.init();
        if (aso) {
            aso.refresh();
        }
    }, [aso])

    return (
        <section id="hero" style={{ minHeight: '110lvh', paddingBottom: '10em' }}>
            <h1 id="vault-title"
                className="absolute top-[100px] left-[2vw]" 
                data-aos="zoom-out-right"
                data-aos-offset={0}
                data-aos-delay={200}
                data-aos-duration={1200}
                data-aos-anchor-placement="top-bottom"
                data-aos-mirror={true}
            >
                {props.title}
            </h1>
            <CryptBackground />
        </section>
    );
};

export type { HeroProps };
export default Hero;