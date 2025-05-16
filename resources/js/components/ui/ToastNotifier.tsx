import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useToast } from '@/contexts/ToastContext';

// Flash message types
type FlashType = 'success' | 'error' | 'warning' | 'info';

// Page props interface
interface PageProps {
  flash: {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
    [key: string]: string | undefined;
  };
}

const ToastNotifier: React.FC = () => {
  const { props } = usePage();
  const flash = props.flash as PageProps['flash'];
  const { toasts } = useToast();
  const [hasFlash, setHasFlash] = useState(false);
  const [flashCount, setFlashCount] = useState(0);

  // Handle flash messages from Laravel
  useEffect(() => {
    const flashTypes: FlashType[] = ['success', 'error', 'warning', 'info'];
    let hasAnyFlash = false;

    flashTypes.forEach(type => {
      if (flash && flash[type]) {
        // Display toast
        toast[type](flash[type] as string, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        hasAnyFlash = true;

        // Log for debugging
        if (process.env.NODE_ENV !== 'production') {
          console.log(`Flash ${type} message:`, flash[type]);
        }
      }
    });

    if (hasAnyFlash) {
      setHasFlash(true);
      setFlashCount(prev => prev + 1);

      // Reset flash indicator after 3 seconds
      const timer = setTimeout(() => {
        setHasFlash(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [flash]);

  // Handle toasts from context
  useEffect(() => {
    toasts.forEach(item => {
      toast[item.type](item.message, {
        position: "top-right",
        autoClose: item.duration || 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
  }, [toasts]);

  return (
    <>
      {/* Toast Container */}
      <ToastContainer />

      {/* Visual indicator that flash was received (helpful for debugging) */}
      {hasFlash && process.env.NODE_ENV !== 'production' && (
        <div
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-3 py-2 rounded-full shadow-lg z-50 flex items-center justify-center"
          style={{ minWidth: '24px', minHeight: '24px' }}
        >
          Flash #{flashCount}
        </div>
      )}
    </>
  );
};

export default ToastNotifier;
