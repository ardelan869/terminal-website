import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function NotFoundPage() {
	return (
		<main className="w-screen h-screen absolute top-0 left-0 flex items-center justify-center">
			<h1 className="w-44 text-right text-7xl font-mono">404</h1>
			<Separator orientation="vertical" className="h-24 mx-12" />
			<span className="w-44 text-left text-xl text-foreground font-sans">
				Page could not be found.{' '}
				<Link
					href="/"
					className={cn(
						'relative font-bold active:text-background transition-colors duration-300 z-10',
						'before:absolute before:bottom-0 before:w-0 before:h-0.5 before:bg-foreground hover:before:w-full before:transition-all before:duration-300 before:active:h-full before:-z-10',
					)}
				>
					Go Home
				</Link>
			</span>
		</main>
	);
}
