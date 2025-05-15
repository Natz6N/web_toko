import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { useToast } from '@/contexts/ToastContext';

type FlashTypes = 'success' | 'error' | 'warning' | 'info';

export const FlashMessages: React.FC = () => {
  const { props } = usePage();
  const { addToast } = useToast();

  useEffect(() => {
    // Cast flash to a Record with string keys and string or undefined values
    const flash = props.flash as Record<string, string | undefined>;

    const flashTypes: FlashTypes[] = ['success', 'error', 'warning', 'info'];

    flashTypes.forEach(type => {
      if (flash && flash[type]) {
        addToast(flash[type] as string, type);
      }
    });
  }, [props.flash, addToast]);

  // This component doesn't render anything
  return null;
};
