import { SITE_TITLE } from '@/config/constants';

import { Github } from 'lucide-react';
import Link from 'next/link';

import NavBar from '@/components/nav-bar';
import ColorSchemeSwitcher from '@/components/color-scheme-switcher';

export default function Header() {
	return (
		<header className="sticky top-0 flex items-center border-b text-lg bg-muted/15 backdrop-blur-xl z-50">
			<h1 className="py-2 px-4 border-r">{SITE_TITLE}</h1>
			<NavBar />
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
