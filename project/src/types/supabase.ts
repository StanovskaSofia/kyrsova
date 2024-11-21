import { User } from '@supabase/supabase-js';

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
}

export interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
  setUser: (user: any | null) => void;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export interface BookState {
  books: Book[];
  wishlist: Book[];
  readList: Book[];
  selectedBook: Book | null;
  loading: boolean;
  error: string | null;
  setBooks: (books: Book[]) => void;
  setSelectedBook: (book: Book | null) => void;
  addToWishlist: (book: Book) => Promise<void>;
  addToReadList: (book: Book) => Promise<void>;
  removeFromWishlist: (bookId: string) => Promise<void>;
  removeFromReadList: (bookId: string) => Promise<void>;
  searchBooks: (query: string) => Promise<void>;
  fetchWishlist: () => Promise<void>;
  fetchReadList: () => Promise<void>;
  clearError: () => void;
}