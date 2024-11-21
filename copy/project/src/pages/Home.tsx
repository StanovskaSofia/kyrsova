import React, { useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { BookCard } from '../components/BookCard';
import { useBookStore } from '../store/bookStore';
import { ErrorAlert } from '../components/ErrorAlert';
export const Home = () => {
  const { books, wishlist, loading, error, clearError, fetchWishlist } = useBookStore();
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
         Знайдіть для себе наступну улюблену книгу!
        </h1>
        <p className="text-center text-gray-600 mb-8">
        Шукайте в нашій великій колекції книг і створюйте свій особистий список прочитаних книг та список бажань
        </p>
        <SearchBar />
        {error && <ErrorAlert message={error} onClose={clearError} />}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Шукаємо...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Поринь у чудовий світ книжок!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard
                key={book.id}
                {...book}
                isWishlisted={wishlist.some((w) => w.id === book.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};