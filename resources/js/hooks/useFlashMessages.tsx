import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';

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

  useEffect(() => {
    const flashTypes: FlashType[] = ['success', 'error', 'warning', 'info'];

    flashTypes.forEach(type => {
      if (flash && flash[type]) {
        toast[type](flash[type] as string);
      }
    });
  }, [flash]);
}
