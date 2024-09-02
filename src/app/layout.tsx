import type { Metadata, Viewport } from 'next';

import { ThemeProvider } from 'next-themes';

import { Geiger } from '@/provider/Geiger';

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import * as SEO from '@/config/seo';
import { SITE_TITLE, SITE_URL } from '@/config/constants';
import { generateKeywords } from '@/lib/utils';

import '@/styles/globals.css';
import Header from '@/components/header';

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	alternates: {
		canonical: '/',
	},
	title: SITE_TITLE,
	keywords: generateKeywords(),
	openGraph: {
		title: SITE_TITLE,
		type: 'website',
		url: SITE_URL,
		siteName: SITE_TITLE,
		description: SEO.description,
	},
	twitter: {
		card: 'summary',
		site: SEO.twitter.username,
		creator: 'ardelan869',
		description: SEO.description,
	},
	description: SEO.description,
	creator: 'Ardelan Yamanel',
};

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${GeistSans.variable} ${GeistMono.variable} selection:bg-accent selection:text-foreground font-mono antialiased w-full h-full min-h-screen`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
				>
					<Geiger
						enabled={process.env.NODE_ENV === 'development'}
						renderTimeThreshold={5}
					>
						<Header />
						{children}
					</Geiger>
				</ThemeProvider>
			</body>
		</html>
	);
}
