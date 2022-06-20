import { useToast } from "@chakra-ui/react";
import { SupabaseAuthPayload } from "lib/types";
import { supabase } from "lib/utils/supabaseClient";
import { type ReactNode, createContext, useContext, useState } from "react";

interface AuthContextProps {
  signUp: (payload: SupabaseAuthPayload) => void;
  signIn: (payload: SupabaseAuthPayload) => void;
  loading: boolean;
}
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const toast = useToast({ duration: 5000, isClosable: true, position: "top" });
  const [loading, setLoading] = useState(false);

  const signUp = async (payload: SupabaseAuthPayload) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp(payload);

      if (error) {
        throw new Error(error.message);
      } else {
        toast({
          title: "signup exitoso",
          description: "redireccionando a ⁺✧.(˃̶ ॣ⌣ ॣ˂̶∗̀)ɞ⁾",
          status: "success",
        });
      }
    } catch (error) {
      toast({
        title: "signup con error (╯°□°）╯︵ ┻━┻ ",
        description: error instanceof Error ? error.message : String(error),
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (payload: SupabaseAuthPayload) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signIn(payload);

      if (error) {
        throw new Error(error.message);
      } else {
        toast({
          title: "signin exitoso",
          description: "redireccionando a ⁺✧.(˃̶ ॣ⌣ ॣ˂̶∗̀)ɞ⁾",
          status: "success",
        });
      }
    } catch (error) {
      toast({
        title: "signin con error (╯°□°）╯︵ ┻━┻ ",
        description: error instanceof Error ? error.message : String(error),
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signUp, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado en un AuthProvider");
  }
  return context;
}
