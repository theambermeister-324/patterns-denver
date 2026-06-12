import { useEffect, useState } from 'react'
import PageShell from './PageShell'
import HomePage from './pages/HomePage'
import PageRenderer from './PageRenderer'
import { standardPages } from './content'
import './App.scss'

// Hash routing — 7 fixed pages, no react-router. `#/setup` → 'setup', `#/` → home.
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

  const page = standardPages[route]
  const active = page ? route : '' // unknown route falls back to home

  return (
    <PageShell active={active}>
      {page ? <PageRenderer page={page} /> : <HomePage />}
    </PageShell>
  )
}

export default App
