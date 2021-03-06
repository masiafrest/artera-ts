// https://aalam.in/blog/supabase-auth-intro-setup-next

import { useToast } from "@chakra-ui/react";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { ClientAddressAuthPayload, SupabaseAuthPayload } from "lib/types";
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<AuthContextProps["user"]>(null);
  const [userLoading, setUserLoading] = useState(true);
  // Although user object should be enough here, we're creating a boolean loggedIn state for checking logged-in condition a bit more simply.
  const [loggedIn, setLoggedIn] = useState(false);

  const signUp = async (
    payload: SupabaseAuthPayload | ClientAddressAuthPayload
  ) => {
    const { email, password } = payload;
    setLoading(true);
    try {
      const { error, user } = await supabase.auth.signUp(payload, {
        data: {
          ...payload,
        },
      });
      console.log({ user });

      if (error) {
        throw new Error(error.message);
      } else {
        toast({
          title: "signup exitoso",
          description: "Check your email for the confirmation link.",
          status: "success",
        });
      }
    } catch (error) {
      toast({
        title: "signup con error (??????????????????? ????????? ",
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
          description: "redireccionando a ??????.(???? ?????? ????????????)?????",
          status: "success",
        });
        Router.push("/");
      }
    } catch (error) {
      toast({
        title: "signin con error (??????????????????? ????????? ",
        description: error instanceof Error ? error.message : String(error),
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => await supabase.auth.signOut();

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
    const user = supabase.auth.user();

    if (user) {
      setUser(user);
      setIsAdmin(user.user_metadata.isadmin);
      setLoggedIn(true);
    }
    setUserLoading(false);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user! ?? null;

        setUserLoading(false);
        await setServerSession(event, session);
        if (user) {
          setUser(user);
          setIsAdmin(user.user_metadata.isadmin);
          setLoggedIn(true);
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
      value={{
        isAdmin,
        user,
        signIn,
        signUp,
        signOut,
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
