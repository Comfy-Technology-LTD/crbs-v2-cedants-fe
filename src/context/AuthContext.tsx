import { createContext, useContext, useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import apiInstance from "../util";
import { AuthContextProps, User } from "../interfaces";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userStored = JSON.parse(localStorage?.getItem("__u") ?? "null")
  const [user, setUser] = useState<User | null>(userStored);

  const loginMutation = useMutation({
    mutationKey: ["loginMutation"],
    mutationFn:  async (credentials: { email: string; password: string }) => {
      const response = await apiInstance.post("/v1/api/login", credentials);
      localStorage.setItem("__u", JSON.stringify(response.data.user))
      localStorage.setItem("__u_access_token", response.data.access_token)

      const userResponse = response.data.user;
      setUser(userResponse.data);
    }
  });

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('__u');
    localStorage.removeItem('__u_access_token');
    delete apiInstance.defaults.headers.common["Authorization"];
  }, []);

  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth }