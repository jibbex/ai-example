import { DeviceProvider } from "@/contexts/DeviceContext";
import { Footer } from "@/page/components/Footer";
import { footer } from "content";

export function Profile(): JSX.Element {
    return (
        <DeviceProvider>
            <main className="section--bg relative z-[1] shadow-md">
            </main>
            <Footer content={footer} />
        </DeviceProvider>
    );
