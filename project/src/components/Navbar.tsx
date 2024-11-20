import { Link } from 'react-router-dom';
import { Library, Heart, LogIn, LogOut, User, BookOpen } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Navbar = () => {
  const { user, signOut } = useAuthStore();

  return (
    <nav className="bg-pink-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Логотип */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Library className="h-8 w-8 text-pink-600" />
              <span className="text-xl font-bold text-gray-900">Бібліотека</span>
            </Link>
          </div>

          {/* Меню */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 text-gray-700 hover:text-pink-600"
                >
                  <User className="h-5 w-5" />
                  <span>Профіль</span>
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center space-x-1 text-gray-700 hover:text-pink-600"
                >
                  <Heart className="h-5 w-5" />
                  <span>Список бажань</span>
                </Link>
                <Link
                  to="/read-list"
                  className="flex items-center space-x-1 text-gray-700 hover:text-pink-600"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Прочитані</span>
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center space-x-1 text-gray-700 hover:text-pink-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Вийти</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-gray-700 hover:text-pink-600"
              >
                <LogIn className="h-5 w-5" />
                <span>Увійти</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
