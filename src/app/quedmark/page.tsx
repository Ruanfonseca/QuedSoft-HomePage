'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import QuedMarkLogo2 from '../assets/QuedMarkLogo2.png';
import Footer from '../pages/components/Footer/Footer';
import Navbar from '../pages/components/Navbar/Navbar';
import '../quedmark/css/page.css';

const QuedMark = () => {
  const router = useRouter(); 

  const handleButtonClick = () => {
      router.push('/quedmark/forms/formEmpreendimento'); 
  };

  return (
    <>
      <Navbar />
      <div className="quedMarkContainer">
        
        <div className="quedMarkLogo">
          <Image className="logoquedImg" src={QuedMarkLogo2} alt="Logo QuedMark" />
        </div>

        <div className="quedMarkDescricao">
          <h1 className="titulo">Sobre</h1>
          <p className='textosobre'>
            A QuedMark nasceu para ajudar salões de beleza , studio de estética, barbearias e profissionais autônomos a ter mais tranquilidade na hora de organizar seus atendimentos.<br/>
             Com uma plataforma simples e prática, você consegue marcar, gerenciar e ajustar seus compromissos de forma eficiente, tudo em um só lugar. Esqueça a dor de cabeça com desencontros de horários e atrasos: 
             com a QuedMark, você ganha controle total sobre sua agenda e pode focar no que realmente importa, 
             que é atender bem os seus clientes.<br/> 

            Hoje em dia, com a correria do dia a dia, é fundamental contar com uma ferramenta que simplifique o agendamento de horários e facilite a comunicação com os clientes.<br/>
             A QuedMark cuida disso para você, enviando lembretes automáticos, permitindo o acesso fácil ao histórico de atendimentos e trazendo relatórios para você acompanhar o desempenho do seu negócio.<br/> 

            Afinal, tempo é dinheiro, e a QuedMark está aqui para ajudar você a economizar os dois, deixando a gestão dos atendimentos mais leve e organizada.<br/>
          </p>
        
          <h1 className="titulo">Conheça nossos planos </h1>
        </div>

        <div className="cardContainer">
          <div className="card">
            <div className="card-title">Plano Bronze</div>
            <div className="descricao">
              <p>
                <span>R$ 59,90</span><br/>
                 Licença completa/mês<br/>
                 40 agendamentos  
              </p>
            </div>
            <button className="botao-selecao" onClick={handleButtonClick}>Escolher Plano</button>
          </div>

          <div className="card">
            <div className="card-title">Plano Prata</div>
            <div className="descricao">
              <p>
                <span>R$ 79,90</span><br/>
                Licença completa/mês<br/>
                80 agendamentos  
              </p>
            </div>
            <button className="botao-selecao" onClick={handleButtonClick}>Escolher Plano</button>
          </div>

          <div className="card">
            <div className="card-title">Plano Gold</div>
            <div className="descricao">
              <p>
                <span>R$ 119,90</span><br/>
                 Licença completa/mês<br/>
                 Números de agendamentos ilimitado 
              </p>
            </div>
            <button className="botao-selecao" onClick={handleButtonClick}>Escolher Plano</button>
          </div>

          <div className="card">
            <div className="card-title">Plano Premium</div>
            <div className="descricao">
              <p>
                <span>A partir de<br/> R$ 199,90</span><br/>
                 Condições combinadas de acordo com a demanda do empreendedor<br/>
              </p>
            </div>
            <button className="botao-selecao" onClick={handleButtonClick}>Escolher Plano</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuedMark;
