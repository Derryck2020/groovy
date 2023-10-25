import sanityClient from '@sanity/client';

export const client = sanityClient({
	projectId: 'n2klw1fk',
	dataset: 'production',
	apiVersion: '2023-10-18',
	useCdn: false,
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
