import axios from "axios";

//const userId: string; // Aqui utilizar contexto de usuario

export type criarCursoDto = {
  nome: string;
};

export type atualizarCursoDto = {
  nome: string;
};

export const criarCurso = async (
  url: string,
  body: criarCursoDto,
  config: any,
) => {
  try {
    const res = await axios.post(url, body, config);
    return res;
  } catch (error: any) {
    throw error?.response.data.message;
  }
};

export const listarCursos = async (url: string, config: any) => {
  try {
    const res = await axios.get(url, config);
    if (res) return res;
  } catch (error: any) {
    throw error?.response.data.message;
  }
};

export const filtrarCursosPorId = async (url: string, id: number) => {
  try {
    const res = await axios.get(url, {
      params: {
        ID: id,
      },
    });
    if (res) return res;
  } catch (error: any) {
    throw error?.response.data.message;
  }
};

export const filtrarCursoPorNome = async (
  url: string,
  nome: string,
  config: any,
) => {
  try {
    const res = axios.get(url, {
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

export const atualizarCurso = async (
  url: string,
  body: atualizarCursoDto,
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

export const removerCurso = async (url: string, config: any) => {
  try {
    await axios.delete(url, config);
  } catch (error: any) {
    throw error?.response.data.message;
  }
};
