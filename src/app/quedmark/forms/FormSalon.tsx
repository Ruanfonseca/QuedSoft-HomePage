import axios from 'axios';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import '../css/style.css';
import FormClient from './formCliente/FormClient';

const salonSchema = z.object({
  nome: z.string().nonempty("Nome é obrigatório"),
  foto: z.string().nonempty("Foto é obrigatória"),
  capa: z.string().nonempty("Capa é obrigatória"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().nonempty("Telefone é obrigatório"),
  recipientId: z.string(),
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

interface FormSalonProps {
  onAdvance: (data: SaloonFormData) => void;
}

const FormSalon: React.FC<FormSalonProps> = ({ onAdvance }) => {
  const [formData, setFormData] = useState<SaloonFormData>({
    nome: '',
    foto: '',
    capa: '',
    email: '',
    telefone: '',
    recipientId: '',
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
        setFormData({ ...formData, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCepChange = async (cep: string) => {
    setFormData({ ...formData, endereco: { ...formData.endereco, cep } });

    if (cep.length === 8) {
      try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
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
      // Valida os dados com Zod
      salonSchema.parse(formData);
      setErrors({});  // Limpa erros
      onAdvance(formData);  // Avança para o próximo formulário
      setShowClientForm(true); // Mostra o formulário de cliente
    } catch (err) {
      if (err instanceof z.ZodError) {
        const validationErrors = err.errors.reduce((acc, error) => {
          const pathKey = error.path.join('.'); // Acessa corretamente campos aninhados
          acc[pathKey] = error.message;
          return acc;
        }, {} as { [key: string]: string });
        setErrors(validationErrors);
      }
    }
  };

  if (showClientForm) {
    return <FormClient salaoId={formData.recipientId} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do Salão"
        value={formData.nome}
        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
        required
      />
      {errors.nome && <p>{errors.nome}</p>}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, 'foto')}
        required
      />
      {errors.foto && <p>{errors.foto}</p>}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, 'capa')}
        required
      />
      {errors.capa && <p>{errors.capa}</p>}

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      {errors.email && <p>{errors.email}</p>}

      <input
        type="text"
        placeholder="Telefone"
        value={formData.telefone}
        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
        required
      />
      {errors.telefone && <p>{errors.telefone}</p>}

      <input
        type="text"
        placeholder="CEP"
        value={formData.endereco.cep}
        onChange={(e) => handleCepChange(e.target.value)}
        required
      />
      {errors['endereco.cep'] && <p>{errors['endereco.cep']}</p>} {/* Corrigido */}

      <button type="submit">Avançar</button>
    </form>
  );
};

export default FormSalon;
