'use client';

import { EMAIL, GUI_URL } from '@/config/constants';
import { socials } from './socials';

export const commands: Command[] = [
	{
		name: 'help',
		alias: ['h', '--h', '-h', '--help', '-help'],
		description: 'Display all commands',
		callback: ({ addMessage }) => {
			const length = Math.max(
				...commands.map((command) => command.name.length),
			);

			const message = commands
				.filter((c) => c.name !== 'help')
				.map(
					(c) =>
						`${c.name}${whiteSpaces(length - c.name.length)} - ${
							c.description
						}`,
				)
				.join('\n');

			addMessage(message);
		},
	},
	{
		name: 'about',
		description: 'About the Website',
		callback: ({ addMessage }) => {
			const message = `This is a website made with ${link(
				'https://nextjs.org/',
				'Next.js',
			)}, ${link('https://tailwindcss.com/', 'Tailwind CSS')} and ${link(
				'https://ui.shadcn.com/',
				'shadcn-ui',
			)}`;

			addMessage(message);
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
		callback: ({ args, addMessage }) => {
			addMessage(`${args.join(' ')}`);
		},
	},
	{
		name: 'email',
		alias: ['mail'],
		description: 'Send me an email',
		callback: ({ addMessage }) => {
			addMessage(link(`mailto:${EMAIL}`, EMAIL));
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
	{
		name: 'projects',
		description: 'My Projects',
		callback: async ({ addMessage }) => {
			const githubUserName = socials.find(
				(social) => social.label === 'GitHub',
			)?.userName;

			if (!githubUserName) return;

			const resp = await fetch(
				`https://pinned.berrysauce.me/get/${githubUserName}`,
			);

			if (!resp.ok) return;

			const data: PinnedRepo[] = await resp.json();

			const length = Math.max(
				...data.map((project) => project.name.length),
			);

			const message = data
				.map((project) => {
					return `${link(
						`https://github.com/${project.author}/${project.name}`,
						project.name,
					)}${whiteSpaces(length - project.name.length)} - ${
						project.description
					}`;
				})
				.join('\n');

			addMessage(message);
		},
	},
	{
		name: 'socials',
		alias: ['social'],
		description: 'Social Media Links',
		callback: ({ addMessage }) => {
			const length = Math.max(
				...socials.map((social) => social.label.length),
			);

			const message = socials
				.map((social) => {
					return `${social.label}${whiteSpaces(
						length - social.label.length,
					)} - ${link(
						`${social.url}${social.userName}`,
						social.userName,
					)}`;
				})
				.join('\n');

			addMessage(message);
		},
	},
] as const;

export function link(url: string, label: string) {
	return `<a href="${url}" target="_blank" class="underline text-blue-700">${label}</a>`;
}

export function whiteSpaces(amount: number) {
	return '&nbsp;'.repeat(amount);
}

export function getMatchingCommand(query: string): Command | undefined {
	return commands.find((c) => c.name === query || c.alias?.includes(query));
}

export default commands;
