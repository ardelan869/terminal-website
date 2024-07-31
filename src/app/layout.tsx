import { ThemeProvider } from 'next-themes';

import { Geiger } from '@/provider/Geiger';

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import '@/styles/globals.css';
import Header from '@/components/header';

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
					disableTransitionOnChange
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
