import { useState } from "react"
import Landing from "./pages/Landing"
import Analyze from "./pages/Analyze"

function App() {
  const [page, setPage] = useState("landing")

  return (
    <>
      {page === "landing" && <Landing setPage={setPage} />}
      {page === "analyze" && <Analyze setPage={setPage} />}
    </>
  )
}

export default App