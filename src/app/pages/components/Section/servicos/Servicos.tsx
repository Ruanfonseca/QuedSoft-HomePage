import Image from 'next/image';
import celular from '../../../../assets/celular.png';
import computador from '../../../../assets/computador.png';
import docs from '../../../../assets/docs.png';
import pontacaneta from '../../../../assets/ponta-caneta.png';
import './Servicos.css';


const Servicos = () => {

   return (
     <>
       <div className="servicos-container">
         <div>
           <h1>Conheça os nossos <strong>serviços</strong></h1>
         </div>
 
         <div className="cards-wrapper">
           <div className="card">
             <div className="imagem-card">
               <Image src={computador} className='img' alt="Imagem de computador" />
             </div>
             <div className="text-card">
               <p>Desenvolvimento de sites e sistemas online</p>
             </div>
           </div>
 
           <div className="card">
             <div className="imagem-card">
               <Image src={celular} className='img' alt="Imagem de celular" />
             </div>
             <div className="text-card">
               <p>Criação de posts para redes sociais</p>
             </div>
           </div>
 
           <div className="card">
             <div className="imagem-card">
               <Image src={docs} alt="Imagem de computador" />
             </div>
             <div className="text-card">
               <p>Criação de artes para mídias offline</p>
             </div>
           </div>
 
           <div className="card">
             <div className="imagem-card">
               <Image src={pontacaneta}  alt="Imagem de computador" />
             </div>
             <div className="text-card">
               <p>Desenvolvimento de identidade visual</p>
             </div>
           </div>
         </div>
       </div>
     </>
   );
 };
 
 export default Servicos;