import Link from 'next/link';

export default function BreadcrumbNav({ items }: { items: { name: string; item: string }[] }) {
    return (
        <nav className="flex text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link href="/" className="hover:text-blue-600 transition-colors">
                        Home
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={item.item}>
                        <div className="flex items-center">
                            <span className="mx-2 text-gray-400">/</span>
                            <Link href={item.item} className="hover:text-blue-600 transition-colors">
                                {item.name}
                            </Link>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
