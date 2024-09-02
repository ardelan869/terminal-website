import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import * as SEO from '@/config/seo';
import { EMAIL, GUI_URL, SITE_TITLE, SITE_URL } from '@/config/constants';
import { socials } from '@/config/socials';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function setTextRange(node: Node, offset: number) {
	if (!node) return;

	const selection = window.getSelection();

	if (!selection) return;

	const range = document.createRange();

	range.setStart(node, offset);
	range.collapse(true);

	selection.removeAllRanges();
	selection.addRange(range);
}

export function escapeHTML(unsafe: string): string {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

export function generateKeywords() {
	const keywords: string[] = [];

	for (const keyword of [
		SITE_URL,
		SITE_TITLE,
		EMAIL,
		GUI_URL,
		SEO.description,
		SEO.firstName,
		SEO.lastName,
		SEO.fullName,
		...SEO.keywords,
	]) {
		keywords.push(keyword);
	}

	for (const social of socials) {
		keywords.push(`${social.label} ${social.userName}`);
		keywords.push(`${social.url} ${social.userName}`);
		keywords.push(`${social.url}/${social.userName}`);

		if (!keywords.includes(social.userName)) keywords.push(social.userName);
	}

	return keywords;
}
