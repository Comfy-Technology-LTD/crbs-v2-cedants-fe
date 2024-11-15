import { createContext, useContext, useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import apiInstance from "../util";
import { AuthContextProps, User } from "../interfaces";
import { z } from "zod";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);


const tokenSchema = z.string().min(1);
let accessToken: string | null = null;

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const loginMutation = useMutation({
    mutationKey: ["loginMutation"],
    mutationFn:  async (credentials: { email: string; password: string }) => {
      const response = await apiInstance.post("/v1/api/login", credentials);
      const parsedToken = tokenSchema.parse(response.data.access_token);
      accessToken = parsedToken;
      apiInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const userResponse = response.data.user;
      setUser(userResponse.data);
    }
  });

  const logout = useCallback(() => {
    accessToken = null;
    setUser(null);
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