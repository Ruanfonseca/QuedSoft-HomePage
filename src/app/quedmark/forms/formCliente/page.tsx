'use client';

import React from 'react';
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


const FormClient: React.FC = ({ }) => {

  return (
    <>
    </>
      );
};

export default FormClient;
