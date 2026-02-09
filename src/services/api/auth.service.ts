import { API_URLS } from "@/constants/apiUrls";

type LoginCredentials = {
  email: string;
  password: string;
};

export const loginService = async (credentials: LoginCredentials) => {
  const payload = {
    identifier: credentials.email,
    password: credentials.password,
  };

  const response = await fetch(API_URLS.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorJson = await response.json();
    throw errorJson;
  }

  return response.json();
};

export const registerService = async (userData: any) => {
  const response = await fetch(API_URLS.REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorJson = await response.json();
    throw errorJson;
  }

  return response.json();
};
