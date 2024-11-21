import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { AuthState } from '../types/supabase';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (user) => set({ user }),
  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      set({ user: data.user, error: null });
      return true; 
    } catch (error) {
      const errorMessage =
        (error as Error).message.includes("Invalid login credentials")
          ? "Неправильна електронна пошта або пароль"
          : "Сталася невідома помилка. Спробуйте пізніше.";
      set({ error: errorMessage });
      return false; 
    } finally {
      set({ loading: false });
    }
  },
  
  signUp: async (email, password) => {
  try {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    set({ user: data.user, error: null });
    return true; 
  } catch (error) {
    const errorMessage =
      (error as Error).message.includes("already registered")
        ? "Користувач із такою електронною поштою вже зареєстрований."
        : "Сталася помилка реєстрації. Спробуйте пізніше.";
    set({ error: errorMessage });
    return false; 
  } finally {
    set({ loading: false });
  }
},

  
  signOut: async () => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
  clearError: () => set({ error: null }),
}));
