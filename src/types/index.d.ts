declare global {
    interface Window {
        MathJax: any;
    }
}

export type PageType = (pageProps: PageProps) => React.ReactElement
type PageProps = Record<string, unknown>

// https://vike.dev/pageContext#typescript
declare global {
namespace Vike {
    interface PageContext {
        Page: PageType
        pageProps?: PageProps
        urlPathname: string
        exports: {
            documentProps?: {
                title?: string
                description?: string
            }
        }
    }
}
}

export type {
    PageContextServer,
    /*
    // When using Client Routing https://vike.dev/clientRouting
    PageContextClient,
    PageContext,
    /*/
    // When using Server Routing
    PageContextClientWithServerRouting as PageContextClient,
    PageContextWithServerRouting as PageContext
    //*/
} from 'vike/types'
export type { PageProps }

export {};