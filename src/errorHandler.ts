import Router from "@/router";

export function setupErrorHandler(router: typeof Router) {
 window.addEventListener('error',(evt) =>{
     router.push('/server-error')
 })

    window.addEventListener('unhandledrejection', (evt) =>{
        router.push('/server-error')
    })
}
