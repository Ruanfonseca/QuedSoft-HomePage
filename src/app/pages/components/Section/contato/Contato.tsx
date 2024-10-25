'use client'
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import { useState } from 'react';
import foguete from '../../../../assets/foguete.png';
import instagram from '../../../../assets/instagramqued.png';
import linkedin from '../../../../assets/linkedin.png';
import X from "../../../../assets/twitter.png";
import whatssapp from '../../../../assets/whatsappqued.png';
import './Contato.css';

const Contato = () => {

  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  
  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  return (
    <>
      <div className="contato-container">
        <div className="left-side-contato">
          <h1>Vamos <span>alavancar</span> o seu negócio juntos?</h1>
          <Image src={foguete} alt=''/>  
          <div className='redesocial'>
            <Image src={instagram} alt=''/>
            <Image src={whatssapp}  alt=''/>
            <Image src={linkedin}  alt=''/>
            <Image src={X}  alt=''/>
          </div>
        </div>

        <div className="right-side-contato">
          <div className="card-form">
            <p>Estou interessado(a) em...</p>
            <div className='botoes'>
              <button
                className={selectedButton === 'sistemas' ? 'selected' : ''}
                onClick={() => handleButtonClick('sistemas')}
              >
                <span >Desenvolvimento de Sistemas</span>
              </button>
              <button
                className={selectedButton === 'design' ? 'selected' : ''}
                onClick={() => handleButtonClick('design')}
              >
             
                <span>Design Estratégico</span>
                
              </button>
            </div>
            <TextField
              id="outlined-multiline-flexible"
              label="Nome"
              multiline
              maxRows={4}
              className='card-form-input'
            />
            
            <TextField
              id="outlined-multiline-flexible"
              label="Email"
              multiline
              maxRows={4}
              className='card-form-input'
            />
            <TextField
              id="outlined-multiline-static"
              label="Mensagem"
              multiline
              rows={4}
              defaultValue="Mensagem"
              className='card-form-input'
            />
           <button className='botao-enviar'>
                <span style={{ color: 'white' }}>Enviar Mensagem</span>
                </button>

          </div>
        </div>
      </div>
    </>
  );
}

export default Contato;
