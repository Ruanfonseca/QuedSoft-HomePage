import Image from 'next/image';
import maos from '../../../../assets/maos.png';
import './Vantagens.css';

const Vantagens = () => {
  return (
    <div className="vantagens-container">
      <div className="imgladoesquerdo">
        <ul>
          <li className='subtitle-vantagens'>Quais as vantagens de 
             <span className='subtitle-vantagens-2'>trabalhar conosco</span></li><br/>
             
          <li className='info-button'>Maior visibilidade</li><br/>
          <li className='info-button'>Fortalecimento e Padronização da sua Marca</li><br/>
          <li className='info-button'>Aumento da autoridade</li><br/>
          <li className='info-button'>Mais criatividade nas postagens</li><br/>
          <li className='info-button'>Mais profissionalismo</li><br/>
          <li className='info-button'>Mais vendas a curto e longo prazo</li><br/>
        </ul>
      </div>
      <div className="imgladodireito">
        <Image src={maos} alt="Imagem de Mãos" />
      </div>
    </div>
  );
};

export default Vantagens;
