import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types/index';
import { Head, usePage } from '@inertiajs/react';

interface Stats {
    categoryCount: number;
    productCount: number;
    testimonialCount: number;
    userCount: number;
    activeCategories: number;
    pendingTestimonials: number;
}

interface Product {
    id: number;
    name: string;
    price: number;
    image?: string;
}

interface Testimonial {
    id: number;
    name: string;
    content: string;
    is_approved: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { props } = usePage();
    const stats = props.stats as Stats;
    const recentProducts = props.recentProducts as Product[];
    const recentTestimonials = props.recentTestimonials as Testimonial[];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
                        <h3 className="text-lg font-semibold">Products</h3>
                        <p className="text-3xl font-bold mt-2">{stats.productCount}</p>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
                        <h3 className="text-lg font-semibold">Categories</h3>
                        <p className="text-3xl font-bold mt-2">{stats.categoryCount}</p>
                        <p className="text-sm text-gray-500">{stats.activeCategories} active</p>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
                        <h3 className="text-lg font-semibold">Testimonials</h3>
                        <p className="text-3xl font-bold mt-2">{stats.testimonialCount}</p>
                        <p className="text-sm text-gray-500">{stats.pendingTestimonials} pending</p>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
                        <h3 className="text-lg font-semibold">Users</h3>
                        <p className="text-3xl font-bold mt-2">{stats.userCount}</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
                        <h3 className="text-lg font-semibold mb-4">Recent Products</h3>
                        {recentProducts.length > 0 ? (
                            <div className="space-y-3">
                                {recentProducts.map((product: Product) => (
                                    <div key={product.id} className="flex items-center gap-3 border-b pb-3">
                                        {product.image ? (
                                            <img src={'/storage/' + product.image} alt={product.name} className="h-10 w-10 rounded object-cover" />
                                        ) : (
                                            <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                                                <PlaceholderPattern className="h-8 w-8 stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="font-medium">{product.name}</h4>
                                            <p className="text-sm text-gray-500">${product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No recent products</p>
                        )}
                    </div>

                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-4">
                        <h3 className="text-lg font-semibold mb-4">Recent Testimonials</h3>
                        {recentTestimonials.length > 0 ? (
                            <div className="space-y-3">
                                {recentTestimonials.map((testimonial: Testimonial) => (
                                    <div key={testimonial.id} className="border-b pb-3">
                                        <div className="flex items-center gap-2">
                                            <span className={`h-2 w-2 rounded-full ${testimonial.is_approved ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                            <h4 className="font-medium">{testimonial.name}</h4>
                                        </div>
                                        <p className="text-sm mt-1 line-clamp-2">{testimonial.content}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No recent testimonials</p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
