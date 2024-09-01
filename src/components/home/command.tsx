import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const CommandLine = forwardRef<
	HTMLSpanElement,
	React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
	<span
		ref={ref}
		className={cn('px-4 text-left w-12 text-muted-foreground', className)}
		{...props}
	/>
));
CommandLine.displayName = 'CommandLine';

const CommandContent = forwardRef<
	HTMLSpanElement,
	React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
	<span
		ref={ref}
		className={cn(
			'text-primary outline-none border-none caret-transparent whitespace-pre-line',
			className,
		)}
		{...props}
	/>
));
CommandContent.displayName = 'CommandContent';

const Command = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('flex items-start py-0.5 min-h-9', className)}
		{...props}
	>
		{children}
	</div>
));
Command.displayName = 'Command';

export { Command, CommandLine, CommandContent };
export default Command;
