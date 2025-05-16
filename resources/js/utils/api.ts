import { router } from '@inertiajs/react';
import { notifyError } from './notifications';

/**
 * Shared error handler for Inertia.js requests
 */
export const handleInertiaError = (errors: Record<string, string>) => {
  // Get the first error message to display as a toast
  const firstError = Object.values(errors)[0];
  if (firstError) {
    notifyError(firstError);
  } else {
    notifyError('An error occurred. Please check the form for errors.');
  }
};

/**
 * Post data to the server using Inertia.js
 * @param url The URL to post to
 * @param data The data to send
 * @param options Configuration options
 */
export const postWithInertia = (
  url: string,
  data: Record<string, any> | FormData,
  options: {
    onSuccess?: () => void;
    onError?: (errors: Record<string, string>) => void;
    forceFormData?: boolean;
    preserveScroll?: boolean;
    preserveState?: boolean;
  } = {}
) => {
  router.post(url, data, {
    forceFormData: options.forceFormData || false,
    preserveScroll: options.preserveScroll || false,
    preserveState: options.preserveState || false,
    onSuccess: options.onSuccess,
    onError: (errors) => {
      if (options.onError) {
        options.onError(errors);
      } else {
        handleInertiaError(errors);
      }
    }
  });
};

/**
 * Put data to the server using Inertia.js
 * @param url The URL to put to
 * @param data The data to send
 * @param options Configuration options
 */
export const putWithInertia = (
  url: string,
  data: Record<string, any> | FormData,
  options: {
    onSuccess?: () => void;
    onError?: (errors: Record<string, string>) => void;
    forceFormData?: boolean;
    preserveScroll?: boolean;
    preserveState?: boolean;
  } = {}
) => {
  router.put(url, data, {
    forceFormData: options.forceFormData || false,
    preserveScroll: options.preserveScroll || false,
    preserveState: options.preserveState || false,
    onSuccess: options.onSuccess,
    onError: (errors) => {
      if (options.onError) {
        options.onError(errors);
      } else {
        handleInertiaError(errors);
      }
    }
  });
};

/**
 * Delete resource using Inertia.js
 * @param url The URL to delete
 * @param options Configuration options
 */
export const deleteWithInertia = (
  url: string,
  options: {
    onSuccess?: () => void;
    onError?: (errors: Record<string, string>) => void;
    preserveScroll?: boolean;
    preserveState?: boolean;
  } = {}
) => {
  router.delete(url, {
    preserveScroll: options.preserveScroll || false,
    preserveState: options.preserveState || false,
    onSuccess: options.onSuccess,
    onError: (errors) => {
      if (options.onError) {
        options.onError(errors);
      } else {
        handleInertiaError(errors);
      }
    }
  });
};

/**
 * Navigate to a page with Inertia.js
 */
export const visitPage = (
  url: string,
  options: {
    preserveScroll?: boolean;
    preserveState?: boolean;
  } = {}
) => {
  router.visit(url, {
    preserveScroll: options.preserveScroll || false,
    preserveState: options.preserveState || true
  });
};