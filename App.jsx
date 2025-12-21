import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import DatabaseErrorBanner from "@/components/DatabaseErrorBanner.jsx"

function App() {
  return (
    <>
      <DatabaseErrorBanner />
      <Pages />
      <Toaster />
    </>
  )
}

export default App
