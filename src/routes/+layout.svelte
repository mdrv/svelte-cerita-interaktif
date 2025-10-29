<script lang="ts">
import favicon from '$lib/assets/favicon.svg'
import { MetaTags } from 'svelte-meta-tags'
let { children } = $props()
</script>

<MetaTags
	title="Bearcu Adventure"
	titleTemplate="%s | Bearcu Adventure"
	description="Petualangan seru bersama beruang lucu"
	canonical="https://bearcu.svelte.app"
	openGraph={{
		url: 'https://bearcu.svelte.app/',
		title: 'Bearcu Adventure',
		description: 'Petualangan seru bersama beruang lucu',
		images: [
			{
				url: 'https://bearcu.svelte.app/og.jpg',
				width: 1280,
				height: 720,
				alt: 'Bearcu Adventure',
			},
		],
		siteName: 'Bearcu Adventure',
	}}
	twitter={{
		creator: '@medrivia',
		site: '@medrivia',
		cardType: 'summary_large_image',
		title: 'Bearcu Adventure',
		description: 'Petualangan seru bersama beruang lucu',
		image: 'https://bearcu.svelte.app/og.jpg',
		imageAlt: 'Bearcu Adventure',
	}}
/>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
