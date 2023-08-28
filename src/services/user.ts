
import { API_ENDPOINTS } from '@/utils/api/api-endpoints';
import { HttpClient } from '@/utils/api/http';
import { TLogin, TSignup, loginResponseSchema,mutationActivationResponse, mutationResponseSchema } from '@/validations/auth';
import { IUser } from '@/types';

export const userClient = {
  me: () => {
    return HttpClient.get<IUser>( `/users/${API_ENDPOINTS.ME}`);
  },
  login: (variables: TLogin) => {
    return HttpClient.post<loginResponseSchema>(
      `/auth/${API_ENDPOINTS.LOGIN}`,
      variables
    );
  },
  emailVerify: (variables: any) => {
    return HttpClient.post<mutationActivationResponse>(
      API_ENDPOINTS.ACTIVATE,
      variables
    );
  },
  logout: () => {
    return HttpClient.delete<any>(`/auth/${API_ENDPOINTS.LOGOUT}`);
  },
  register: (variables: TSignup) => {
    return HttpClient.post<mutationResponseSchema>(`/auth/${API_ENDPOINTS.REGISTER}`, variables);
  },
};