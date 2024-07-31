interface NavItem {
	label: string;
	href: string;
}

const nav: NavItem[] = [
	// {
	// 	label: 'home',
	// 	href: '/',
	// },
	// {
	// 	label: 'about',
	// 	href: '/about',
	// },
] as const;

export { nav, type NavItem };
export default nav;
