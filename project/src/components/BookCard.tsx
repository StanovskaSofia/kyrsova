import React from 'react';
import { Heart, BookOpen } from 'lucide-react';
import { useBookStore } from '../store/bookStore';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types/supabase';

interface BookCardProps extends Book {}

export const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  cover,
  description,
}) => {
  const {
    readList,
    wishlist,
    addToReadList,
    removeFromReadList,
    addToWishlist,
    removeFromWishlist,
    setSelectedBook,
  } = useBookStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Перевірка статусу у списках
  const isBookInReadList = readList.some((book) => book.id === id);
  const isBookInWishlist = wishlist.some((book) => book.id === id);

  const toggleReadStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;

    if (isBookInReadList) {
      removeFromReadList(id);
    } else {
      addToReadList({ id, title, author, cover, description });
    }
  };

  const toggleWishlistStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) return;

    if (isBookInWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, title, author, cover, description });
    }
  };

  const handleCardClick = () => {
    setSelectedBook({ id, title, author, cover, description });
    navigate(`/book/${id}`);
  };

  // Обрізати опис, якщо він довший за 100 символів
  const truncatedDescription =
    description.length > 100 ? `${description.slice(0, 100)}...` : description;

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
    >
      <img src={cover} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-600">{author}</p>
          </div>
          {user && (
            <div className="flex space-x-2">
              {/* Wishlist button */}
              <button
                onClick={toggleWishlistStatus}
                className={`p-2 rounded-full ${
                  isBookInWishlist
                    ? 'text-pink-500 hover:text-pink-600'
                    : 'text-gray-400 hover:text-pink-500'
                }`}
              >
                <Heart
                  className="h-5 w-5"
                  fill={isBookInWishlist ? 'currentColor' : 'none'}
                />
              </button>
              {/* Read list button */}
              <button
                onClick={toggleReadStatus}
                className={`p-2 rounded-full ${
                  isBookInReadList
                    ? 'text-pink-500 hover:text-pink-600'
                    : 'text-gray-400 hover:text-pink-500'
                }`}
              >
                <BookOpen
                  className="h-5 w-5"
                  fill={isBookInReadList ? 'currentColor' : 'none'}
                />
              </button>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">{truncatedDescription}</p>
      </div>
    </div>
  );
};
