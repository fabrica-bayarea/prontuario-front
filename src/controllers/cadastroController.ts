import axios from "axios";

//const userId: string; // Aqui utilizar contexto de usuario

export type criarCursoDto = {
  nome: string;
  idUsuario: number;
};

export type atualizarCursoDto = {
  idUsuario: number;
  id: number;
  nome: string;
};

const cadastrarCurso = async (url: string, body: criarCursoDto) => {
  try {
    const res = await axios.post(url, body);
    return res;
  } catch (error: any) {
    throw new Error(error?.response.data.message);
  }
};

const atualizaCurso = async (url: string, body: atualizarCursoDto) => {
  try {
    const res = await axios.post(url, body);
    return res;
  } catch (error: any) {
    throw new Error(error?.response.data.message);
  }
};

const filtrarCursoPorId = async (url: string, id: number) => {};
