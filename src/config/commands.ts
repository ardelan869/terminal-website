'use client';

import { EMAIL, GUI_URL } from '@/config/constants';

const link = (url: string, label: string) =>
	`<a href="${url}" target="_blank" class="underline text-blue-700">${label}</a>`;

export const commands: Command[] = [
	{
		name: 'help',
		alias: ['h', '--h', '-h', '--help', '-help'],
		description: 'Display all commands',
		callback: ({ setMessages }) => {
			const length = Math.max(
				...commands.map((command) => command.name.length),
			);

			const message = commands
				.filter((c) => c.name !== 'help')
				.map(
					(c) =>
						`${c.name}${'&nbsp;'.repeat(
							length - c.name.length,
						)} - ${c.description}`,
				)
				.join('\n');

			setMessages((messages) => [...messages, message]);
		},
	},
	{
		name: 'about',
		description: 'About the Website',
		callback: ({ setMessages }) => {
			setMessages((messages) => [
				...messages,
				`This is a website made with ${link(
					'https://nextjs.org/',
					'Next.js',
				)}, ${link(
					'https://tailwindcss.com/',
					'Tailwind CSS',
				)} and ${link('https://ui.shadcn.com/', 'shadcn-ui')}`,
			]);
		},
	},
	{
		name: 'clear',
		alias: ['cls'],
		description: 'Clear the terminal',
		callback: ({ setMessages }) => {
			setMessages([]);
		},
	},
	{
		name: 'echo',
		description: 'Echo the arguments',
		callback: ({ args, setMessages }) => {
			setMessages((messages) => [...messages, `${args.join(' ')}`]);
		},
	},
	{
		name: 'email',
		alias: ['mail'],
		description: 'Send me an email',
		callback: ({ setMessages }) => {
			setMessages((messages) => [...messages, EMAIL]);
			window.open(`mailto:${EMAIL}`, '_self');
		},
	},
	{
		name: 'gui',
		description: 'Go to the normal homepage',
		callback: () => {
			window.open(GUI_URL, '_blank');
		},
	},
] as const;

export const getMatchingCommand = (query: string) => {
	return commands.find((c) => c.name === query || c.alias?.includes(query));
};

export default commands;
