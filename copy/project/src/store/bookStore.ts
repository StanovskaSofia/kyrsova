import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { useAuthStore } from './authStore';
import { BookState, Book } from '../types/supabase';

export const useBookStore = create<BookState>((set, get) => ({
  books: [],
  wishlist: [],
  readList: [],
  selectedBook: null,
  loading: false,
  error: null,

  setBooks: (books) => set({ books }),

  setSelectedBook: (book) => set({ selectedBook: book }),

  fetchWishlist: async () => {
    try {
      set({ loading: true, error: null });
      const user = useAuthStore.getState().user;
      if (!user) return;

      const { data, error } = await supabase
        .from('wishlist')
        .select('book_id, books (*)')
        .eq('user_id', user.id);

      if (error) throw error;
      const wishlistBooks = data.map((item) => item.books).filter(Boolean) as unknown as Book[];
      set({ wishlist: wishlistBooks });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchReadList: async () => {
    try {
      set({ loading: true, error: null });
      const user = useAuthStore.getState().user;
      if (!user) return;

      const { data, error } = await supabase
        .from('read_list')
        .select('book_id, books (*)')
        .eq('user_id', user.id);

      if (error) throw error;
      const readBooks = data.map((item) => item.books).filter(Boolean) as unknown as Book[];
      set({ readList: readBooks });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  addToWishlist: async (book) => {
    try {
      set({ loading: true, error: null });
      const user = useAuthStore.getState().user;
      if (!user) throw new Error('User not authenticated');

      const { data: existingBook } = await supabase
        .from('books')
        .select('id')
        .eq('id', book.id)
        .single();

      if (!existingBook) {
        const { error: bookError } = await supabase
          .from('books')
          .upsert([book]);

        if (bookError) throw bookError;
      }

      const { error } = await supabase
        .from('wishlist')
        .insert([{ book_id: book.id, user_id: user.id }]);

      if (error) throw error;
      set({ wishlist: [...get().wishlist, book] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  addToReadList: async (book) => {
    try {
      set({ loading: true, error: null });
      const user = useAuthStore.getState().user;
      if (!user) throw new Error('User not authenticated');

      const { data: existingBook } = await supabase
        .from('books')
        .select('id')
        .eq('id', book.id)
        .single();

      if (!existingBook) {
        const { error: bookError } = await supabase
          .from('books')
          .upsert([book]);

        if (bookError) throw bookError;
      }

      const { error } = await supabase
        .from('read_list')
        .insert([{ book_id: book.id, user_id: user.id }]);

      if (error) throw error;
      set({ readList: [...get().readList, book] });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  removeFromWishlist: async (bookId) => {
    try {
      set({ loading: true, error: null });
      const user = useAuthStore.getState().user;
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('wishlist')
        .delete()
        .match({ book_id: bookId, user_id: user.id });

      if (error) throw error;
      set({ wishlist: get().wishlist.filter((book) => book.id !== bookId) });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  removeFromReadList: async (bookId) => {
    try {
      set({ loading: true, error: null });
      const user = useAuthStore.getState().user;
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('read_list')
        .delete()
        .match({ book_id: bookId, user_id: user.id });

      if (error) throw error;
      set({ readList: get().readList.filter((book) => book.id !== bookId) });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

searchBooks: async (query) => {
  try {
    if (!query.trim()) {
      set({ books: [] });
      return;
    }
    set({ loading: true, error: null });
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .or(`title.ilike.%${query}%,author.ilike.%${query}%`) 
      .order('title', { ascending: true });
    if (error) throw error;
    set({ books: data || [] });
  } catch (error) {
    set({ error: (error as Error).message });
  } finally {
    set({ loading: false });
  }
},


  clearError: () => set({ error: null }),
}));
