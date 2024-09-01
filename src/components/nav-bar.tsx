'use client';

import nav from '@/config/nav';
import { cn } from '@/lib/utils';

import { usePathname } from 'next/navigation';

import Link from 'next/link';

export default function NavBar() {
	const pathname = usePathname();

	return (
		<ul className="flex items-center">
			{nav.map((navItem) => (
				<Link key={navItem.label} href={navItem.href}>
					<li
						className={cn(
							'relative py-2 px-4 border-r hover:bg-border active:text-secondary transition-all z-10',
							'before:inset-0 before:absolute before:bg-primary before:-z-10 before:h-0 before:b-0 before:transition-all active:before:h-full',
							pathname === navItem.href &&
								'before:h-full text-secondary',
						)}
					>
						{navItem.label}
					</li>
				</Link>
			))}
		</ul>
	);
}
