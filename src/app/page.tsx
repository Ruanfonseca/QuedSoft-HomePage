import Footer from "./pages/components/Footer/Footer";
import Hero from "./pages/components/Hero/Hero";
import Navbar from "./pages/components/Navbar/Navbar";
import Application from "./pages/components/Section/application/application";
import Contato from "./pages/components/Section/contato/Contato";
import Servicos from "./pages/components/Section/servicos/Servicos";
import Vantagens from "./pages/components/Section/vantagens/Vantagens";

export default function Home() {
  return (
   <>
      <Navbar/>
      <Hero/>
      <Vantagens/>
      <Servicos/>
      <Application/>
      <Contato/>
      <Footer/>
   </>
  );
}
