import { useContext } from 'react';
import { HydrationContext } from '@/contexts/HydrationContext';

export default function useLocation() {
    const hydrated = useContext(HydrationContext);
    return hydrated ? window.location : {
        hash: '',
        host: 'michm.de',
        hostname: 'michm',
        href: 'https://michm.de/',
        pathname: '/',
    } as Location;
}