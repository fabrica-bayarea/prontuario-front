import axios from "axios";

export type programaDto = {
  nome: string;
  curso: string;
};

export type atualizarProgramaDto = {
  nome: string;
  curso?: string;
};

const criarPrograma = async (url: string, body: programaDto, config: any) => {
  try {
    const res = await axios.post(url, body, config);
  } catch (error: any) {
    throw error?.response.data.message;
  }
};

const listarProgramas = async (url: string, config: any) => {
  try {
    const res = await axios.get(url, config);
    if (res) return res;
    return res;
  } catch (error: any) {
    throw error?.response.data.message;
  }
};

const listarProgramaPorId = async (url: string, id: number) => {
  try {
    const res = await axios.get(url, { params: { ID: id } });

    return res;
  } catch (error: any) {
    throw error?.response.data.message;
  }
};

const filtrarProgramaPorNome = async (
  url: string,
  nome: string,
  config: any,
) => {
  try {
    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${config.token}` },
      params: {
        nome,
      },
    });
    return res;
  } catch (error: any) {
    throw error?.response.data.message;
  }
};

const atualizarPrograma = async (
  url: string,
  body: atualizarProgramaDto,
  id: number,
) => {
  try {
    const res = await axios.put(url, body, {
      params: {
        ID: id,
      },
    });
  } catch (error: any) {
    throw error?.response.data.message;
  }
};

const adicionarCursoPrograma = async (
  url: string,
  curso: string,
  id: number,
) => {
  try {
    const res = await axios.put(url, curso, {
      params: {
        ID: id,
      },
    });
  } catch (error: any) {
    throw error?.response.data.message;
  }
};

const removerCursoPrograma = async (url: string, curso: string, id: number) => {
  try {
    const res = await axios.put(url, curso, {
      params: {
        ID: id,
      },
    });
  } catch (error: any) {
    throw error?.response.data.message;
  }
};
const removerPrograma = async (url: string, id: number) => {
  try {
    await axios.delete(url, { params: { ID: id } });
  } catch (error: any) {
    throw error?.response.data.message;
  }
};

export {
  criarPrograma,
  listarProgramas,
  listarProgramaPorId,
  filtrarProgramaPorNome,
  atualizarPrograma,
  adicionarCursoPrograma,
  removerCursoPrograma,
  removerPrograma,
};
