'use client';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box, Button, FormControl, FormHelperText, IconButton, InputAdornment,
  InputLabel, MenuItem, Select, TextField
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { z } from 'zod';

const clientSchema = z.object({
  salaoId: z.string(),
  nome: z.string().nonempty('Nome é obrigatório'),
  telefone: z.string().nonempty('Telefone é obrigatório'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  foto: z.string().nonempty('Foto é obrigatória'),
  dataNascimento: z.string(),
  sexo: z.enum(['M', 'F']),
  status: z.string().default('A'),
  contaBancaria: z.object({
    titular: z.string().nonempty('Titular da conta é obrigatório'),
    cpfCnpj: z.string().nonempty('CPF/CNPJ é obrigatório'),
    banco: z.string().nonempty('Banco é obrigatório'),
    tipo: z.string().default('Conta Corrente'),
    agencia: z.string().nonempty('Agência é obrigatória'),
    numero: z.string().nonempty('Número da conta é obrigatório'),
    dv: z.string().nonempty('Dígito Verificador é obrigatório'),
  }),
  dataCadastro: z.string(),
});

interface ClienteFormData extends z.infer<typeof clientSchema> {}

interface FormClientProps {
  salaoId: string;
  previousFormData?: Partial<ClienteFormData>;
}

const FormClient: React.FC<FormClientProps> = ({ salaoId, previousFormData = {} }) => {
  const [clientData, setClientData] = useState<ClienteFormData>({
    salaoId,
    nome: previousFormData.nome || '',
    telefone: previousFormData.telefone || '',
    email: previousFormData.email || '',
    senha: '',
    foto: '',
    dataNascimento: '',
    sexo: 'M' as 'M' | 'F',
    status: 'A',
    contaBancaria: {
      titular: '',
      cpfCnpj: '',
      banco: '',
      tipo: 'Conta Corrente',
      agencia: '',
      numero: '',
      dv: '',
    },
    dataCadastro: new Date().toISOString(),
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setClientData((prevData) => ({
        ...prevData,
        foto: reader.result as string,
      }));
    };
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      convertToBase64(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      clientSchema.parse(clientData);
      setErrors({});
      await axios.post(`http://localhost:5000/api/salon/${salaoId}/client`, clientData);
      alert('Cliente cadastrado com sucesso!');
    } catch (err) {
      if (err instanceof z.ZodError) {
        const validationErrors = err.errors.reduce((acc, error) => {
          const pathKey = error.path.join('.');
          acc[pathKey] = error.message;
          return acc;
        }, {} as { [key: string]: string });
        setErrors(validationErrors);
      } else {
        console.error('Erro ao cadastrar cliente', err);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto' }}>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Nome do Cliente"
          value={clientData.nome}
          onChange={(e) => setClientData({ ...clientData, nome: e.target.value })}
          required
        />
        {errors.nome && <FormHelperText error>{errors.nome}</FormHelperText>}
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Telefone"
          value={clientData.telefone}
          onChange={(e) => setClientData({ ...clientData, telefone: e.target.value })}
          required
        />
        {errors.telefone && <FormHelperText error>{errors.telefone}</FormHelperText>}
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Email"
          type="email"
          value={clientData.email}
          onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
          required
        />
        {errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          value={clientData.senha}
          onChange={(e) => setClientData({ ...clientData, senha: e.target.value })}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handlePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {errors.senha && <FormHelperText error>{errors.senha}</FormHelperText>}
      </FormControl>

      <FormControl fullWidth margin="normal">
        <input
          accept="image/*"
          type="file"
          onChange={handleImageChange}
          required
        />
        {errors.foto && <FormHelperText error>{errors.foto}</FormHelperText>}
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Data de Nascimento"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={clientData.dataNascimento}
          onChange={(e) => setClientData({ ...clientData, dataNascimento: e.target.value })}
          required
        />
        {errors.dataNascimento && <FormHelperText error>{errors.dataNascimento}</FormHelperText>}
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Sexo</InputLabel>
        <Select
          value={clientData.sexo}
          onChange={(e) => setClientData({ ...clientData, sexo: e.target.value as 'M' | 'F' })}
          required
        >
          <MenuItem value="M">Masculino</MenuItem>
          <MenuItem value="F">Feminino</MenuItem>
        </Select>

        {errors.sexo && <FormHelperText error>{errors.sexo}</FormHelperText>}
      </FormControl>

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Cadastrar Cliente
      </Button>
    </Box>
  );
};

export default FormClient;
