import axios from "axios";

export type atendimentoDto = {
  data: Date;
  nome: string;
  curso: string;
};

export type atendimentoDataDto = {
  dataInicio: Date;
  dataFim: Date;
};

export type dataUpdateDto = {
  data: Date;
};

export const criarAtendimento = async (
  url: string,
  body: atendimentoDto,
  config: any,
) => {
  try {
    const res = await axios.post(url, body, config);
    if (res) return res;
  } catch (error: any) {
    throw error?.response.data.message;
  }
};

export const listarAtendimentos = async (url: string) => {
  try {
    const res = await axios.get(url);
    if (res) return res;
  } catch (error: any) {
    throw error?.response.data.message;
  }
};

export const filtarAtendimentoPorData = async (
  url: string,
  body: atendimentoDataDto,
) => {
  try {
    const res = await axios.get(url, {
      params: { dataInicio: body.dataInicio, dataFim: body.dataFim },
    });
    if (res) return res;
  } catch (error: any) {
    throw error?.response.data.message;
  }
};

export const listarAtendimentoPorCPF = async (url: string, cpf: string) => {
  try {
    const res = await axios.get(url, { params: { cpf: cpf } });
    if (res) return res;
  } catch (error: any) {
    throw error?.response.data.message;
  }
};

export const atualizarAtendimento = async (
  url: string,
  body: atendimentoDto,
  config: any,
) => {
  try {
    const res = await axios.put(url, body, config);
    return res;
  } catch (error: any) {
    throw error?.response.data.message;
  }
};

export const atualizarDataAtendimento = async (
  url: string,
  body: dataUpdateDto,
  id: number,
) => {
  try {
    const res = await axios.put(url, body, {
      params: {
        ID: id,
      },
    });
    if (res) return res;
  } catch (error: any) {
    throw error?.response.data.message;
  }
};

export const removerAtendimento = async (url: string, id: number) => {
  try {
    await axios.delete(url, { params: { ID: id } });
  } catch (error: any) {
    throw error?.response.data.message;
  }
};
