import React from 'react';
import { BookCard } from '../components/BookCard';
import { useBookStore } from '../store/bookStore';
import { useAuthStore } from '../store/authStore';
import { Navigate } from 'react-router-dom';

export const Wishlist = () => {
  const wishlist = useBookStore((state) => state.wishlist);
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Список бажань</h1>
        
        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Ваш список бажань порожній. Почніть додавати книги, які ви любите!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((book) => (
              <BookCard key={book.id} {...book} isWishlisted={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};