export { render }
import ReactDOM from "react-dom/client";
import { PageShell } from './PageShell'
import type { PageContextClient } from '../../types/index';

async function render(pageContext: PageContextClient) {
  const { Page, pageProps, isHydration } = pageContext
  if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined')

  const rootElement = document.getElementById('react-root')
  if (!rootElement) throw new Error('DOM element #react-root not found')

  const page = <PageShell pageContext={pageContext}>
    <Page {...pageProps} />
  </PageShell>

  if(!isHydration || rootElement.innerHTML === ''){
    const root = await ReactDOM.createRoot(rootElement);
    await root.render(page);
  } else {
    await ReactDOM.hydrateRoot(rootElement, page);
  }
}

// To enable Client-side Routing:
//export const clientRouting = true
// Whether your UI framework allows the hydration to be aborted. (Allowing Vike
// to abort the hydration if the user clicks on a link before the hydration finished.)
// React users should set hydrationCanBeAborted to true. (Other frameworks,
// such as Vue, crash if the hydration is aborted.)
export const hydrationCanBeAborted = true