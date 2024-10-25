'use client'
import Footer from '../pages/components/Footer/Footer';
import Navbar from '../pages/components/Navbar/Navbar';
import { SaloonFormData } from '../types/types';

const QuedMark = () => {
  const handleAdvance = (data: SaloonFormData) => {
    console.log('Dados do salão:', data);
    {/* <FormSalon onAdvance={handleAdvance} />  */}
  };

  return (
    <>
      <Navbar/>
      <div className="quedMarkcontainer">
         
      </div>
      

      <Footer/>
    </>
  );
};

export default QuedMark;
