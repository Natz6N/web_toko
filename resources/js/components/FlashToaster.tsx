import { useFlashMessages } from '@/hooks/useFlashMessages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function FlashToaster() {
  // This component triggers the hook to show flash messages
  useFlashMessages();

  // Debug flash messages
  const { props } = usePage();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (props.flash) {
        console.log('Flash messages received:', props.flash);
      }
    }
  }, [props.flash]);

  return (
    // Add ToastContainer inside this component to ensure it's always present
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
}
