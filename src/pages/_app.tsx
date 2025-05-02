import "@/style/index.css"
/* import { Component } from "react"
 */import type { AppProps } from "next/app"
/* import { MeshProvider } from "@meshsdk/react";
 */
function myApp({Component, pageProps}: AppProps){
    return(
        
            <Component {...pageProps}/>
    )
}

export default myApp