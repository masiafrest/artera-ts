// https://aalam.in/blog/supabase-auth-intro-setup-next

import { useToast } from "@chakra-ui/react";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import {
  ClientAddressAuthPayload,
  SignInOutOptions,
  SupabaseAuthPayload,
} from "lib/types";
import { supabase } from "lib/utils/supabaseClient";

import Router, { useRouter } from "next/router";
import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface AuthContextProps {
  isAdmin: boolean;
  user: User | null;
  signUp: (payload: SupabaseAuthPayload, options?: SignInOutOptions) => void;
  signIn: (payload: SupabaseAuthPayload, options?: SignInOutOptions) => void;
  signOut: () => void;
  toResetPassword: (email: string) => void;
  resetPassword: (newPassword: string, hash: string) => void;
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<AuthContextProps["user"]>(null);
  const [userLoading, setUserLoading] = useState(true);
  // Although user object should be enough here, we're creating a boolean loggedIn state for checking logged-in condition a bit more simply.
  const [loggedIn, setLoggedIn] = useState(false);

  const resetPassword = async (newPassword: string, hash: string) => {
    try {
      if (!hash) {
        throw new Error(
          "Hubo un problema con la recuperacion intentelo mas tarde, no hash"
        );
      }
      const query = new URLSearchParams(hash.substring(1));
      const isRecovery = query.get("type") === "recovery";
      const accessToken = query.get("access_token");
      if (!isRecovery || !accessToken) {
        throw new Error(
          "Hubo un problema con la recuperacion intentelo mas tarde, " +
            `recovery: ${isRecovery}, token: ${accessToken}`
        );
      }

      const { error } = await supabase.auth.api.updateUser(accessToken, {
        password: newPassword,
      });
      if (error) {
        throw new Error("error al actualizar, " + error.message);
      }
      toast({
        title: "Contraseña cambiada",
        status: "success",
      });
      router.push("/signin");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
    }
  };

  const toResetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/password-reset",
      });
      if (error) {
        throw new Error(error.message);
      }
      toast({
        title: "Enviado",
        description: "",
        status: "success",
      });
    } catch (error: any) {
      toast({
        title: "Error en la red, intentelo mas tarde",
        description: error.message,
        status: "error",
      });
    }
  };

  const signUp = async (
    payload: SupabaseAuthPayload | ClientAddressAuthPayload,
    options: SignInOutOptions = {
      redirect: "/signin",
      shouldredirect: true,
    }
  ) => {
    const { email, password } = payload;
    const payloadWithOutPassword: Partial<ClientAddressAuthPayload> = {
      ...payload,
    };
    delete payloadWithOutPassword.password;
    setLoading(true);
    try {
      const { error, user } = await supabase.auth.signUp(
        { email, password },
        {
          data: {
            ...payloadWithOutPassword,
          },
        }
      );

      if (error) {
        throw new Error(error.message);
      }
      toast({
        title: "signup exitoso",
        description: "Check your email for the confirmation link.",
        status: "success",
      });
      options.shouldredirect &&
        options.redirect &&
        Router.push(options.redirect);
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

  const signIn = async (
    payload: SupabaseAuthPayload,
    options: SignInOutOptions = {
      redirect: "/",
      shouldredirect: true,
    }
  ) => {
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
        options.shouldredirect &&
          options.redirect &&
          Router.push(options.redirect);
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

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const setServerSession = async (
    event: AuthChangeEvent,
    session: Session | null
  ) => {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setServerSession(event, session);
        if (event === "SIGNED_IN") {
          const user = session?.user! ?? null;

          setUserLoading(false);
          if (user) {
            setUser(user);
            setIsAdmin(user.user_metadata.isadmin);
            setLoggedIn(true);
          } else {
            setUser(null);
            setIsAdmin(false);
            setLoggedIn(false);
            router.push("/");
          }
        }
        if (event === "SIGNED_OUT") {
          setIsAdmin(false);
          setLoggedIn(false);
          router.push("/");
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        user,
        signIn,
        signUp,
        signOut,
        toResetPassword,
        resetPassword,
        loading,
        loggedIn,
        userLoading,
      }}
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
