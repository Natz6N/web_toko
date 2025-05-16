import { router } from '@inertiajs/react';

// Type for product form data
export interface ProductFormData {
  name: string;
  price: string | number;
  stock: string | number;
  category_id: string | number;
  description?: string;
  image?: File | null;
}

/**
 * Prepare form data from product data
 */
function prepareFormData(productData: ProductFormData): FormData {
  const formData = new FormData();

  formData.append('name', String(productData.name));
  formData.append('price', String(productData.price));
  formData.append('stock', String(productData.stock));
  formData.append('category_id', String(productData.category_id));

  if (productData.description) {
    formData.append('description', productData.description);
  }

  if (productData.image) {
    formData.append('image', productData.image);
  }

  return formData;
}

/**
 * Create a new product
 */
export function createProduct(
  productData: ProductFormData,
  callbacks: {
    onSuccess?: () => void,
    onError?: (errors: Record<string, string>) => void
  } = {}
) {
  const formData = prepareFormData(productData);

  router.post(route('products.store.dashboard'), formData, {
    forceFormData: true,
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => {
      if (callbacks.onSuccess) {
        callbacks.onSuccess();
      }
    },
    onError: (errors) => {
      if (callbacks.onError) {
        callbacks.onError(errors);
      }
    }
  });
}

/**
 * Update an existing product
 */
export function updateProduct(
  id: number | string,
  productData: ProductFormData,
  callbacks: {
    onSuccess?: () => void,
    onError?: (errors: Record<string, string>) => void
  } = {}
) {
  const formData = prepareFormData(productData);
  // Add _method field for Laravel to handle PUT/PATCH request
  formData.append('_method', 'PUT');

  router.post(route('products.update.dashboard', { id }), formData, {
    forceFormData: true,
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => {
      if (callbacks.onSuccess) {
        callbacks.onSuccess();
      }
    },
    onError: (errors) => {
      if (callbacks.onError) {
        callbacks.onError(errors);
      }
    }
  });
}

/**
 * Delete a product
 */
export function deleteProduct(
  id: number | string,
  callbacks: {
    onSuccess?: () => void,
    onError?: (error: string) => void
  } = {}
) {
  router.delete(route('products.destroy.dashboard', { id }), {
    preserveScroll: true,
    onSuccess: () => {
      if (callbacks.onSuccess) {
        callbacks.onSuccess();
      }
    },
    onError: (errors) => {
      if (callbacks.onError && errors) {
        callbacks.onError(Object.values(errors)[0] as string);
      }
    }
  });
}

/**
 * Navigate to products index page
 */
export function goToProductsIndex(preserveState = true) {
  router.visit(route('products.index.dashboard'), {
    preserveScroll: true,
    preserveState
  });
}
