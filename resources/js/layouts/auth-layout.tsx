import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import ToastNotifier from '@/components/ui/ToastNotifier';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <AuthLayoutTemplate title={title} description={description} {...props}>
            <ToastNotifier />
            {children}
        </AuthLayoutTemplate>
    );
}
