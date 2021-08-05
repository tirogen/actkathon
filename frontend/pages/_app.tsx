import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { noRequiredAuthenticatedPath } from '../src/constants';
import { authStore } from '../src/stores';
import '../src/styles/index.css';

export default function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const isRequiredAuthenticated = !noRequiredAuthenticatedPath.some((path) => path === router.pathname);
    if (typeof window !== 'undefined' && isRequiredAuthenticated && !authStore.isAuthenticated) router.push('/signin');

    return <Component {...pageProps} />;
}
