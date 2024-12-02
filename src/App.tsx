
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Layout from "./layout/Layout"
import DashBoard from "./dashboard/DashBoard.tsx"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/> }>
          <Route />
          <Route path="/dashboard" element={<DashBoard/>} />
          <Route path="*" element={<div>Page is in maintenance</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
