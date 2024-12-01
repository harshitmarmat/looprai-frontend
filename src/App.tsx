
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Layout from "./layout/Layout"
import DashBoard from "./dashboard/DashBoard"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/> }>
          <Route path="/dashboard" element={<DashBoard/>} />
          <Route path="*" element={<div>No Page found.</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
