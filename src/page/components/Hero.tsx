import CryptBackground from "@/page/components/CryptoBackground";

interface HeroProps {
    title: string
}

const Hero = (props: HeroProps): JSX.Element => (
    <section id="hero">
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

export type { HeroProps };
export default Hero;