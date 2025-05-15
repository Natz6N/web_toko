import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { useFlashMessages } from '@/hooks/useFlashMessages';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    // Add flash message handling
    useFlashMessages();

    return (
        <AuthLayoutTemplate title={title} description={description} {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}
