'use client'
import Footer from '@/app/pages/components/Footer/Footer';
import Navbar from '@/app/pages/components/Navbar/Navbar';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { z } from 'zod';
import QuedMarkLogo2 from '../../../assets/QuedMarkLogo2.png';
import '../../css/formEmpreendimento.css';

const salonSchema = z.object({
  nome: z.string().nonempty("Nome é obrigatório"),
  foto: z.string().nonempty("Foto é obrigatória"),
  capa: z.string().nonempty("Capa é obrigatória"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().nonempty("Telefone é obrigatório"),
  recipientId: z.string(),
  tipo: z.string().nonempty("Tipo é obrigatório"),
  endereco: z.object({
    cidade: z.string(),
    uf: z.string(),
    cep: z.string().min(8, "CEP deve ter 8 dígitos"),
    logradouro: z.string(),
    numero: z.string(),
    pais: z.string().default('Brasil'),
  }),
  geo: z.object({
    type: z.literal("Point"),
    coordinates: z.tuple([z.number(), z.number()]),
  }),
  dataCadastro: z.string(),
  status: z.string(),
});

interface SaloonFormData extends z.infer<typeof salonSchema> {}

const FormSalon: React.FC = () => {
  const [formData, setFormData] = useState<SaloonFormData>({
    nome: '',
    foto: '',
    capa: '',
    email: '',
    telefone: '',
    recipientId: '',
    tipo: '',
    endereco: {
      cidade: '',
      uf: '',
      cep: '',
      logradouro: '',
      numero: '',
      pais: 'Brasil',
    },
    geo: {
      type: 'Point',
      coordinates: [0, 0],
    },
    dataCadastro: new Date().toISOString(),
    status: 'A',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showClientForm, setShowClientForm] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prevData) => ({
          ...prevData,
          geo: {
            ...prevData.geo,
            coordinates: [longitude, latitude],
          },
        }));
      },
      (error) => console.error('Erro ao obter geolocalização:', error),
    );
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'foto' | 'capa') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          [field]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCepChange = async (cep: string) => {
    const cepFormatted = cep.replace(/\D/g, '');
    setFormData({ ...formData, endereco: { ...formData.endereco, cep: cepFormatted } });

    if (cepFormatted.length === 8) {
      try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cepFormatted}/json/`);
        setFormData((prevData) => ({
          ...prevData,
          endereco: {
            ...prevData.endereco,
            cidade: data.localidade,
            uf: data.uf,
            logradouro: data.logradouro,
          },
        }));
      } catch (error) {
        console.error('Erro ao buscar endereço:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      salonSchema.parse(formData); // Valida os dados
      setErrors({});
      setShowClientForm(true); // Define que os dados estão prontos para exibição no FormClient
    } catch (err) {
      if (err instanceof z.ZodError) {
        const validationErrors = err.errors.reduce((acc, error) => {
          const pathKey = error.path.join('.');
          acc[pathKey] = error.message;
          return acc;
        }, {});
        setErrors(validationErrors);
      }
    }
  };

  if (showClientForm) {
   // Passa o formData como props para o FormClient
  }

  return (
    <>
      <Navbar />
      <div className="imagemlogo">
        <Image className="logoquedImg" src={QuedMarkLogo2} alt="Logo QuedMark" />
      </div> 
      <div className="tituloformulario">
        <h1>Preencha com dados do seu empreendimento</h1>
      </div>

      <form onSubmit={handleSubmit} className='formulario'>
        <label>Nome do Empreendimento</label>
        <input
          type="text"
          placeholder="Nome do Empreendimento"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
        />
        {errors.nome && <p>{errors.nome}</p>}

        <select
          value={formData.tipo}
          onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
          required
        >
          <option value="">Selecione o tipo</option>
          <option value="Salão">Salão</option>
          <option value="Designer de Sobrancelha">Designer de Sobrancelha</option>
          <option value="Manicure">Manicure</option>
          <option value="Professor">Professor</option>
          <option value="Psicólogo">Psicólogo</option>
        </select>
        {errors.tipo && <p>{errors.tipo}</p>}

        <label className="upload-label">Foto ou logo da Empresa</label>
            <div className="upload-container">
              <div className="image-preview">
                {formData.foto && (
                  <Image
                    src={formData.foto}
                    alt="Preview da imagem"
                    width={60} // Largura da imagem
                    height={60} // Altura da imagem
                    objectFit="cover" // Cobre a área do componente
                  />
                )}
              </div>
              <div className="upload-wrapper">
                <label htmlFor="fotoUpload" className="upload-button">
                  Escolher arquivo
                </label>
                <input
                  id="fotoUpload"
                  className="upload-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'foto')}
                  required
                />
                <span className="upload-filename">{formData.foto ? 'Imagem selecionada' : 'Nenhum arquivo selecionado'}</span>
              </div>
              {errors.foto && <p>{errors.foto}</p>}
            </div>

            <label className="upload-label">Foto da fachada ou do empreendimento</label>
            <div className="upload-container">
              <div className="image-preview">
                {formData.capa && (
                  <Image
                    src={formData.capa}
                    alt="Preview da imagem"
                    width={60} // Largura da imagem
                    height={60} // Altura da imagem
                    objectFit="cover" // Cobre a área do componente
                  />
                )}
              </div>
              <div className="upload-wrapper">
                <label htmlFor="capaUpload" className="upload-button">
                  Escolher arquivo
                </label>
                <input
                  id="capaUpload"
                  className="upload-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'capa')}
                  required
                />
                <span className="upload-filename">{formData.capa ? 'Imagem selecionada' : 'Nenhum arquivo selecionado'}</span>
              </div>
              {errors.capa && <p>{errors.capa}</p>}
            </div>

        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        {errors.email && <p>{errors.email}</p>}

        <label>Telefone</label>
        <InputMask
          mask="(99) 99999-9999"
          value={formData.telefone}
          onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
        >
          {(inputProps) => <input {...inputProps} type="text" placeholder="Telefone" required />}
        </InputMask>
        {errors.telefone && <p>{errors.telefone}</p>}

        <label>CEP</label>
        <InputMask
          mask="99999-999"
          value={formData.endereco.cep}
          onChange={(e) => handleCepChange(e.target.value)}
        >
          {(inputProps) => <input {...inputProps} type="text" placeholder="CEP" required />}
        </InputMask>
        {errors['endereco.cep'] && <p>{errors['endereco.cep']}</p>}

        <button type="submit">Avançar</button>
      </form>
      <Footer />
    </>
  );
};

export default FormSalon;
