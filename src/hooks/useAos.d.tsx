import { AosOptions } from 'aos';

interface UseAos {
    useAos(
        options?: AosOptions
    ): Aos.Aos;
}

export type { UseAos, AosOptions };