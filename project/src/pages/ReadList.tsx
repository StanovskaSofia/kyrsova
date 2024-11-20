import React, { useEffect } from 'react';
import { BookCard } from '../components/BookCard';
import { useBookStore } from '../store/bookStore';
import { useAuthStore } from '../store/authStore';
import { Navigate } from 'react-router-dom';

export const ReadList = () => {
  const { readList, loading, error, fetchReadList } = useBookStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      fetchReadList();
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Прочитані книги</h1>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Завантаження...</p>
          </div>
        ) : readList.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Ви ще не додали жодної прочитаної книги.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {readList.map((book) => (
              <BookCard key={book.id} {...book} isRead={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};