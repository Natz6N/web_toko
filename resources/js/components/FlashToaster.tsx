import { useFlashMessages } from '@/hooks/useFlashMessages';

export default function FlashToaster() {
  // This component just triggers the hook
  useFlashMessages();

  // It doesn't render anything visible
  return null;
}
