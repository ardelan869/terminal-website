export const SITE_TITLE = 'terminal';

export const SITE_URL = (() => {
	const url = (
		process?.env?.NEXT_PUBLIC_SITE_URL &&
		process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
			? process.env.NEXT_PUBLIC_SITE_URL
			: // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
			process?.env?.NEXT_PUBLIC_VERCEL_URL &&
			  process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
			? process.env.NEXT_PUBLIC_VERCEL_URL
			: // If neither is set, default to localhost for local development.
			  'http://localhost:3000/'
	).replace(/\/+$/, '');

	return url.includes('http') ? url : `https://${url}`;
})();

export const EMAIL = 'ardelanyamanel@outlook.de';

export const GUI_URL = 'https://ardelanyamanel.com/';
