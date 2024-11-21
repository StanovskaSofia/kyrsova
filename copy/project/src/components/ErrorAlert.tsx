import { XCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onClose: () => void;
}

export const ErrorAlert = ({ message, onClose }: ErrorAlertProps) => {
  return (
    <div className="rounded-md bg-red-50 p-4 mb-4">
      <div className="flex items-center">
        <div className="ml-3">
          <p className="text-sm font-medium text-red-800">{message}</p>
        </div>

        <div className="ml-auto">
          <button
            onClick={onClose}
            className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100"
          >
            <span className="sr-only">Закрити</span>
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
