import nav from '@/config/nav';

import { cn } from '@/lib/utils';

import Link from 'next/link';
import ColorSchemeSwitcher from '@/components/color-scheme-switcher';
import { Github } from 'lucide-react';

export default function Header() {
	return (
		<header className="sticky top-0 flex items-center border-b text-lg bg-muted/15 backdrop-blur-xl">
			<h1 className="py-2 px-4 border-r">terminal</h1>
			<ul className="flex items-center">
				{nav.map((navItem) => (
					<Link key={navItem.label} href={navItem.href}>
						<li
							className={cn(
								'relative py-2 px-4 border-r hover:bg-border active:text-secondary transition-all z-10',
								'before:inset-0 before:absolute before:bg-primary before:-z-10 before:h-0 before:b-0 before:transition-all active:before:h-full',
							)}
						>
							{navItem.label}
						</li>
					</Link>
				))}
			</ul>
			<button className="border-l p-3 hover:bg-border transition-colors ml-auto">
				<Link
					href="https://github.com/ardelan869/terminal-website"
					target="_blank"
				>
					<Github size={20} />
				</Link>
			</button>
			<ColorSchemeSwitcher />
		</header>
	);
}
