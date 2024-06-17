import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/libs/axios";
import { LoginInputProps } from "./types";

const loginFn = async (param: LoginInputProps): Promise<any> => {
  const response = await axios.post("/login", param);
  return response.data;
};

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["login"] });
    },
  });
};

export default useLogin;
