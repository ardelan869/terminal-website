import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/constants';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: SITE_URL,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
	];
}
