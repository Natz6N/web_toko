import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import ToastNotifier from '@/components/ui/ToastNotifier';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <ToastNotifier />
            {children}
        </AppLayoutTemplate>
    );
}
