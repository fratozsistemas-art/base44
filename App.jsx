import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "@/components/ui/toaster"
import DatabaseErrorBanner from "@/components/DatabaseErrorBanner.jsx"
import { BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <DatabaseErrorBanner />
      <Pages />
      <Toaster />
    </BrowserRouter>
  )
}

export default App
