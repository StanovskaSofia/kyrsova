import { useNavigate, Navigate } from 'react-router-dom';
import { Heart, BookOpen, ArrowLeft } from 'lucide-react';
import { useBookStore } from '../store/bookStore';
import { useAuthStore } from '../store/authStore';
export const BookDetails = () => {
  const navigate = useNavigate();
  const { selectedBook, wishlist, readList, addToWishlist, removeFromWishlist, addToReadList, removeFromReadList } = useBookStore();
  const { user } = useAuthStore();
  if (!selectedBook) {
    return <Navigate to="/" replace />;
  }
  const isWishlisted = wishlist.some(book => book.id === selectedBook.id);
  const isRead = readList.some(book => book.id === selectedBook.id);
  const handleWishlist = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (isWishlisted) {
      removeFromWishlist(selectedBook.id);
    } else {
      addToWishlist(selectedBook);
    }
  };
  const handleReadList = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (isRead) {
      removeFromReadList(selectedBook.id);
    } else {
      addToReadList(selectedBook);
    }
  };
  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Назад</span>
        </button>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-96 w-full object-cover md:w-96"
                src={selectedBook.cover || '/placeholder-image.png'}
                alt={selectedBook.title || 'Book cover'}
              />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedBook.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">{selectedBook.author}</p>
                </div>
                {user && (
                  <div className="flex space-x-2">
                    <button
                      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                      onClick={handleWishlist}
                      className={`p-2 rounded-full ${
                        isWishlisted
                          ? 'text-pink-500 hover:text-pink-600'
                          : 'text-gray-400 hover:text-pink-500'
                      }`}
                    >
                      <Heart className="h-6 w-6" fill={isWishlisted ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      aria-label={isRead ? 'Remove from read list' : 'Add to read list'}
                      onClick={handleReadList}
                      className={`p-2 rounded-full ${
                        isRead
                          ? 'text-pink-500 hover:text-pink-600'
                          : 'text-gray-400 hover:text-pink-500'
                      }`}
                    >
                      <BookOpen className="h-6 w-6" fill={isRead ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-gray-700 leading-relaxed">{selectedBook.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};