import Welcome from "./pages/Welcome.jsx"
import Login from "./pages/Auth/LogIn.jsx";
import Register from "./pages/Auth/Register.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
