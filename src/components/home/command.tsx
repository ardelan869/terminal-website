import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

const CommandLine = forwardRef<
	HTMLSpanElement,
	React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
	<span
		ref={ref}
		className={cn('px-4 text-left w-16 text-muted-foreground', className)}
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
			'text-primary outline-none border-none caret-transparent',
			className,
		)}
		{...props}
	/>
));
CommandContent.displayName = 'CommandContent';

const Command = forwardRef<
	HTMLDivElement,
	{
		line?: React.ReactNode;
		message?: React.ReactNode;
	} & React.HTMLAttributes<HTMLSpanElement>
>(({ line, className, message, children, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('flex items-center py-1 h-9', className)}
		{...props}
	>
		{!children && (
			<>
				<CommandLine>{line}</CommandLine>
				<CommandContent>{message}</CommandContent>
			</>
		)}
		{children}
	</div>
));
Command.displayName = 'Command';

export { Command, CommandLine, CommandContent };
export default Command;
