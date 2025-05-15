import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { useToast } from '@/contexts/ToastContext';

type FlashType = 'success' | 'error' | 'warning' | 'info';

interface PageProps {
  flash: {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
    [key: string]: string | undefined;
  };
}

export function useFlashMessages() {
  const { props } = usePage();
  const flash = props.flash as PageProps['flash'];
  const { addToast } = useToast();

  useEffect(() => {
    const flashTypes: FlashType[] = ['success', 'error', 'warning', 'info'];

    flashTypes.forEach(type => {
      if (flash && flash[type]) {
        addToast(flash[type] as string, type);
      }
    });
  }, [flash, addToast]);
}
