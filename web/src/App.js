import Navbar from "./components/Navbar";
import "./app.css";
import { AppProvider } from "./context/context";
import Hero from "./pages/Hero";
import { AppContainer } from "./styles/app";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Product from "./pages/Product";
import Contact from "./pages/Contact";

function App() {
  return (
    <AppProvider>
      <AppContainer>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </AppContainer>
    </AppProvider>
  );
}

export default App;
