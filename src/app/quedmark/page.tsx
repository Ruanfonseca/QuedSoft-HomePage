'use client'
import Image from 'next/image';
import QuedMarkLogo2 from '../assets/QuedMarkLogo2.png';
import Footer from '../pages/components/Footer/Footer';
import Navbar from '../pages/components/Navbar/Navbar';
import '../quedmark/css/page.css';
import { SaloonFormData } from '../types/types';

const QuedMark = () => {
  const handleAdvance = (data: SaloonFormData) => {
    console.log('Dados do salão:', data);
    {/* <FormSalon onAdvance={handleAdvance} /> */}
  };

  return (
    <>
      <Navbar />
      <div className="quedMarkContainer">
        <div className="quedMarkLogo">
          <Image className="logoquedImg" src={QuedMarkLogo2} alt="Logo QuedMark" />
        </div>
        <div className="quedMarkDescricao">
          <h1 className="titulo">Escolha um plano para você!</h1>
        </div>

        <div className="cardContainer">
          <div className="card">
            <div className="card-title">Plano Bronze</div>
            <div className="descricao">
              <p>
                <span>R$ 59,90</span>/licença completa/mês<br/>
                 40 agendamentos  
              </p>
            </div>
            <div className="botao-selecao">Escolher Plano</div>
          </div>

         
          <div className="card">
            <div className="card-title">Plano Prata</div>
            <div className="descricao">
              <p>
                <span>R$ 79,90</span>/licença completa/mês<br/>
                  80 agendamentos  
              </p>
            </div>
            <div className="botao-selecao">Escolher Plano</div>
          </div>

          
          <div className="card">
            <div className="card-title">Plano Gold</div>
            <div className="descricao">
              <p>
                <span>R$ 119,90</span>/licença completa/mês<br/>
                  Números de agendamentos ilimitado 
              </p>
            </div>
            <div className="botao-selecao">Escolher Plano</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuedMark;
