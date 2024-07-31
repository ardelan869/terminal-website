'use client';

import { cn } from '@/lib/utils';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { MonitorSmartphone, Moon, Sun } from 'lucide-react';

export default function ColorSchemeSwitcher({
	className,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	const { theme, setTheme } = useTheme();
	const [open, setOpen] = useState(false);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const setScheme = (scheme: string) => {
		setTheme(scheme);
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button
					suppressHydrationWarning
					aria-label="Color Scheme Switcher"
					className={cn(
						'border-l p-3 hover:bg-border transition-colors',
						className,
					)}
					onClick={() => setOpen((b) => !b)}
					{...props}
				>
					<div className="sr-only">Color Scheme Switcher</div>
					{isClient && theme === 'light' && <Sun size={20} />}
					{isClient && theme === 'dark' && <Moon size={20} />}
					{isClient && theme === 'system' && (
						<MonitorSmartphone size={20} />
					)}
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-28 p-0 rounded-none">
				{['light', 'dark', 'system'].map((scheme) => (
					<Button
						key={scheme}
						variant="ghost"
						size="sm"
						className="text-center w-full rounded-none"
						onClick={() => setScheme(scheme)}
					>
						{scheme[0].toUpperCase() + scheme.slice(1)}
					</Button>
				))}
			</PopoverContent>
		</Popover>
	);
}
