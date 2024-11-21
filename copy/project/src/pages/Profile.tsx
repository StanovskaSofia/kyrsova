import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Heart, BookOpen } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useBookStore } from '../store/bookStore';

export const Profile = () => {
  const { user } = useAuthStore();
  const { wishlist, readList, fetchWishlist, fetchReadList } = useBookStore();

  useEffect(() => {
    if (user) {
      fetchWishlist();
      fetchReadList();
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Мій профіль</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            to="/wishlist"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <Heart className="h-8 w-8 text-pink-500" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Список бажань</h2>
                <p className="text-gray-600">{wishlist.length} книг</p>
              </div>
            </div>
          </Link>

          <Link
            to="/read-list"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-pink-500" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Прочитані книги</h2>
                <p className="text-gray-600">{readList.length} книг</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};