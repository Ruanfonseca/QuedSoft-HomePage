export interface Endereco {
    cidade: string;
    uf: string;
    cep: string;
    logradouro: string;
    numero: string;
    pais: string;
  }
  
  export interface Geo {
    type: string;
    coordinates: [number, number];
  }
  
  export interface SaloonFormData {
    nome: string;
    foto: string;
    capa: string;
    email: string;

    telefone: string;
    recipientId: string;
    endereco: Endereco;
    geo: Geo;
    dataCadastro: string;
    status: string;
  }
  
  export interface ContaBancaria {
    titular: string;
    cpfCnpj: string;
    banco: string;
    tipo: string;
    agencia: string;
    numero: string;
    dv: string;
  }
  
  export interface ClienteFormData {
    salaoId: string;
    nome: string;
    telefone: string;
    email: string;
    senha: string;
    foto: string;
    dataNascimento: string;
    sexo: string;
    status: string;
    contaBancaria: ContaBancaria;
    dataCadastro: string;
  }
  