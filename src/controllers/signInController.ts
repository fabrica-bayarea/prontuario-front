import axios from "axios";

export type usuarioLogin = {
  email: string;
  senha: string;
};
const signInUsuario = async (url: string, body: usuarioLogin) => {
  await axios
    .post(url, body)
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => {
      console.log("error", err);
      throw err;
    });
};

export { signInUsuario };
