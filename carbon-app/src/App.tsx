import { useEffect, useState } from 'react'
import PageShell from './PageShell'
import HomePage from './pages/HomePage'
import ReadinessPage from './pages/ReadinessPage'
import GalleryPage from './pages/GalleryPage'
import PageRenderer from './PageRenderer'
import { standardPages } from './content'
import './App.scss'

// Hash routing — fixed pages, no react-router. `#/setup` → 'setup', `#/` → home.
function readRoute(): string {
  return window.location.hash.replace(/^#\/?/, '')
}

function App() {
  const [route, setRoute] = useState(readRoute())

  useEffect(() => {
    const onHash = () => {
      setRoute(readRoute())
      window.scrollTo(0, 0)
      // Move focus to the main region so keyboard/screen-reader users land on
      // the new page content instead of staying on the clicked nav link.
      document.getElementById('main-content')?.focus()
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const stdPage = standardPages[route]
  const known = route === '' || route === 'readiness' || !!stdPage
  const active = known ? route : '' // unknown route falls back to home

  let body
  if (active === 'readiness') body = <ReadinessPage />
  else if (active === 'gallery') body = <GalleryPage />
  else if (stdPage) body = <PageRenderer page={stdPage} routeKey={active} />
  else body = <HomePage />

  return <PageShell active={active}>{body}</PageShell>
}

export default App
