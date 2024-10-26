'use client';
import Footer from '@/app/pages/components/Footer/Footer';
import Navbar from '@/app/pages/components/Navbar/Navbar';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
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

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') // Formata como (99) 99999-9999
      .substring(0, 15); // Limita ao comprimento correto
  };

  const formatCep = (value: string) => {
    return value
      .replace(/\D/g, '') // Remove caracteres não numéricos
      .replace(/(\d{5})(\d{3})/, '$1-$2') // Formata como 99999-999
      .substring(0, 9); // Limita ao comprimento correto
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(e.target.value);
    setFormData({ ...formData, telefone: formattedPhone });
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCep = formatCep(e.target.value);
    setFormData({ ...formData, endereco: { ...formData.endereco, cep: formattedCep } });

    if (formattedCep.length === 9) {
      try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${formattedCep.replace('-', '')}/json/`);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      salonSchema.parse(formData);
      setErrors({});
      // Lógica para enviar os dados do formulário
    } catch (err) {
      if (err instanceof z.ZodError) {
        const validationErrors = err.errors.reduce((acc, error) => {
          const pathKey = error.path.join('.');
          acc[pathKey] = error.message;
          return acc;
        }, {} as { [key: string]: string });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="imagemlogo">
        <Image className="logoquedImg" src={QuedMarkLogo2} alt="Logo QuedMark" />
      </div>
      <div className="tituloformulario">
        <h1>Preencha com dados do seu empreendimento</h1>
      </div>

      <form onSubmit={handleSubmit} className="formulario">
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
              <Image src={formData.foto} alt="Preview da imagem" width={60} height={60} objectFit="cover" />
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
        <input
          type="text"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handlePhoneChange}
          required
        />
        {errors.telefone && <p>{errors.telefone}</p>}

        <label>CEP</label>
        <input
          type="text"
          placeholder="CEP"
          value={formData.endereco.cep}
          onChange={handleCepChange}
          required
        />
        {errors['endereco.cep'] && <p>{errors['endereco.cep']}</p>}

        <button type="submit">Avançar</button>
      </form>
      <Footer />
    </>
  );
};

export default FormSalon;
