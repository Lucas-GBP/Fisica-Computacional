import React, { useEffect } from 'react'
import { PageContextProvider } from '../../scripts/customHooks/usePageContext'
import type { PageContext } from '../../types/index'
import '../../styles/global.css'

export { PageShell }

function PageShell({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  useEffect(() => {
    if(typeof window?.MathJax !== "undefined"){
      window.MathJax.typesetPromise().then(() => {
        window.MathJax.startup.document.clear();
        window.MathJax.startup.document.updateDocument();
      }).catch((error:any) => {
        console.error('Erro durante o tiposetting:', error);
      });
    }
  }, [])

  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <main>{children}</main>
      </PageContextProvider>
    </React.StrictMode>
  )
}