import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./Views/Home"
import Detail from "./Views/Detail"

function App() {


  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
