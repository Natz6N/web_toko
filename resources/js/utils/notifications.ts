import { toast, ToastOptions } from 'react-toastify';

// Default configuration for toasts
const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Toast Types
export type ToastType = 'success' | 'error' | 'info' | 'warning';

/**
 * Show a notification toast
 * @param message The message to display
 * @param type The type of notification (success, error, info, warning)
 * @param options Optional toast configuration
 */
export const notify = (
  message: string,
  type: ToastType = 'info',
  options: Partial<ToastOptions> = {}
) => {
  const toastOptions = { ...defaultOptions, ...options };

  switch (type) {
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    case 'warning':
      toast.warning(message, toastOptions);
      break;
    case 'info':
    default:
      toast.info(message, toastOptions);
      break;
  }
};

/**
 * Helper for success notifications
 */
export const notifySuccess = (message: string, options: Partial<ToastOptions> = {}) => {
  notify(message, 'success', options);
};

/**
 * Helper for error notifications
 */
export const notifyError = (message: string, options: Partial<ToastOptions> = {}) => {
  notify(message, 'error', options);
};

/**
 * Helper for warning notifications
 */
export const notifyWarning = (message: string, options: Partial<ToastOptions> = {}) => {
  notify(message, 'warning', options);
};

/**
 * Helper for info notifications
 */
export const notifyInfo = (message: string, options: Partial<ToastOptions> = {}) => {
  notify(message, 'info', options);
};
