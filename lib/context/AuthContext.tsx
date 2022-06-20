import { useToast } from "@chakra-ui/react";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { SupabaseAuthPayload } from "lib/types";
import { supabase } from "lib/utils/supabaseClient";
import { useRouter } from "next/router";
import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface AuthContextProps {
  user: User | null;
  signUp: (payload: SupabaseAuthPayload) => void;
  signIn: (payload: SupabaseAuthPayload) => void;
  signOut: () => void;
  loggedIn: boolean;
  loading: boolean;
  userLoading: boolean;
}
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const toast = useToast({ duration: 5000, isClosable: true, position: "top" });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<AuthContextProps["user"]>(null);
  const [userLoading, setUserLoading] = useState(true);
  // Although user object should be enough here, we're creating a boolean loggedIn state for checking logged-in condition a bit more simply.
  const [loggedIn, setLoggedIn] = useState(false);

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

  const signOut = async () => await supabase.auth.signOut();

  const setServerSession = async (event: AuthChangeEvent, session: Session | null) => {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  useEffect(() => {
    const user = supabase.auth.user();

    if (user) {
      setUser(user);
      setUserLoading(false);
      setLoggedIn(true);
      router.push("/addProduct");
    } else {
      setUserLoading(false);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user! ?? null;
        setUserLoading(false);
        await setServerSession(event, session);
        if (user) {
          setUser(user);
          setLoggedIn(true);
          router.push("/addProduct");
        } else {
          setUser(null);
          router.push("/");
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, signUp, signOut, loading, loggedIn, userLoading }}
    >
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
