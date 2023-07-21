import Router from '@/router';

export function setupErrorHandler(router: typeof Router) {
    window.addEventListener('error', () => {
        router.push('/server-error');
    });
}
