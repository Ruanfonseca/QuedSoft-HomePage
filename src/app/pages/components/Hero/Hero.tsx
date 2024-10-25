'use client'
import Image from 'next/image';

import ladoesquerdo from '../../../assets/imagem_site.png';
import './Hero.css';

const Hero = () => {
  
  return (
    <div className="hero-container">
      <div className="left-side">
        <h1>Bem-vindo a <span>QuedSoft</span></h1>
        <p>
          Somos uma empresa de tecnologia que tem como objetivo oferecer recursos digitais
          para o crescimento do seu negócio. Através do <strong>design estratégico</strong> 
          voltado para mídias sociais e do <strong>desenvolvimento de sistemas</strong>, 
          queremos tornar sua empresa mais relevante no mercado.
        </p> 
      </div>
      <div className="right-side">
        <Image src={ladoesquerdo} alt="Imagem lateral" />
      
      </div>
    </div>
  );
};



export default Hero;
