import React, { useEffect } from 'react'
import { PageContextProvider } from '../../scripts/customHooks/usePageContext'
import type { PageContext } from '../../index'
import '../../styles/global.css'

export { PageShell }

function PageShell({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  useEffect(() => {
    if(typeof window?.MathJax !== "undefined"){
      window.MathJax.typeset()
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