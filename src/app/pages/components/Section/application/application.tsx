'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import barbeiro from '../../../../assets/BarbeiroQued.png';
import './application.css';

const Application = () => {
    const router = useRouter(); 

    const handleButtonClick = () => {
        router.push('/quedmark'); 
    };

    return (
        <>
            <div className="container-application">
                <div className='application'>
                    <div className='lado-esquerdo'>
                        <div className='texto-titulo-botao'>
                            <div className='titulo-application-container'>
                                <h1 className='titulo'>Organize sua agenda <span style={{color:'#21A84B'}}>com praticidade</span></h1>
                            </div>
                            <div className='paragrafo'>
                                <p><strong>Conheça a QuedMark</strong>, uma plataforma SaaS inovadora para a gestão de atendimentos, criada para atender profissionais do setor de beleza e autônomos em geral. Ideal para salões, barbearias, estúdios de estética e qualquer prestador de serviços com agendamento prévio, seja pessoa física ou jurídica. A QuedMark facilita o agendamento, organização e acompanhamento de serviços, proporcionando uma experiência prática e eficiente para todos.</p>
                            </div>
                            <div className='botao-saibamais'>
                                <button className='botaosaibamais' onClick={handleButtonClick}>Saiba Mais</button>
                            </div>
                        </div>
                    </div>

                    <div className='lado-direito'>
                        <div className="imagemBarbeiro">
                            <Image className='imagemBarbeiro' src={barbeiro} alt='' />
                        </div>
                    </div>
                </div>      
            </div>
        </>
    )
}

export default Application;
