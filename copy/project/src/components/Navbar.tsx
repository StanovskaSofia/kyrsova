import { Link, useLocation } from 'react-router-dom';
import { Library, Heart, LogIn, LogOut, User, BookOpen } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Navbar = () => {
  const { user, signOut } = useAuthStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-pink-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Library className="h-8 w-8 text-pink-600" aria-label="Логотип Бібліотеки" />
              <span className="text-xl font-bold text-gray-900">Бібліотека</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center space-x-1 ${
                    isActive('/profile') ? 'text-pink-600 font-semibold' : 'text-gray-700'
                  } hover:text-pink-600`}
                  aria-label="Профіль"
                >
                  <User className="h-5 w-5" />
                  <span>Профіль</span>
                </Link>
                <Link
                  to="/wishlist"
                  className={`flex items-center space-x-1 ${
                    isActive('/wishlist') ? 'text-pink-600 font-semibold' : 'text-gray-700'
                  } hover:text-pink-600`}
                  aria-label="Список бажань"
                >
                  <Heart className="h-5 w-5" />
                  <span>Список бажань</span>
                </Link>
                <Link
                  to="/read-list"
                  className={`flex items-center space-x-1 ${
                    isActive('/read-list') ? 'text-pink-600 font-semibold' : 'text-gray-700'
                  } hover:text-pink-600`}
                  aria-label="Прочитані книги"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Прочитані</span>
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center space-x-1 text-gray-700 hover:text-pink-600"
                  aria-label="Вийти"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Вийти</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`flex items-center space-x-1 ${
                  isActive('/login') ? 'text-pink-600 font-semibold' : 'text-gray-700'
                } hover:text-pink-600`}
                aria-label="Увійти"
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
