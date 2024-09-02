interface NavItem {
	label: string;
	href: string;
}

const nav: NavItem[] = [
	{
		label: 'home',
		href: '/',
	},
] as const;

export { nav, type NavItem };
export default nav;
