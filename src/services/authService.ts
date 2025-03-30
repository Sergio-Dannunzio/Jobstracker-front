/*import axios, { AxiosResponse } from "axios";

const API_URL = import.meta.env.VITE_API_URL;



export const loginUser = async (
  email: string,

): Promise<{ token: string }> => {
  try {
    const response: AxiosResponse<{ token: string }> = await axios.post(
      `${API_URL}/auth/login`,
      {
        mail: values.mail,
        password: values.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const token = response.data.token;
    localStorage.setItem("token", token);
    return { token };
  } catch (error) {
    const typedError = error as RegisterUserError;
    const message =
      typedError.response?.data.message || "Error durante el inicio de sesión";
    console.error("Error durante el inicio de sesión:", message);
    throw new Error(message);
  }
};


export const registerUser = async (
  email: string,
  password: string,
): Promise<RegisterUserResponse | null> => {
  try {
    const response: AxiosResponse<> = await axios.post(
      `${API_URL}/auth/register`,
      {
        name: values.name,
        mail: values.mail,
        role: values.role,
        password: values.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Registration successful:", response.data);
    return response.data;
  } catch (error) {
    const typedError = error as RegisterUserError;
    console.error(
      "Error during registration:",
      typedError.response?.data.message || error
    );
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getToken = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token no disponible");
  }
  return token;
};
*/

