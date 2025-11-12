<script lang="ts">
import { cerita } from './data.ts'
let ruteSaatIni = $state(0)
let { judul, deskripsi, pilihan, ilustrasi, bg } = $derived(
	cerita[ruteSaatIni]!,
)

const menuju = (ruteBerikutnya: number) => {
	if (cerita.some((item) => item.rute === ruteBerikutnya)) {
		ruteSaatIni = ruteBerikutnya
	} else {
		alert('Rute tidak ditemukan!')
	}
}
</script>

<svelte:head>
	{#each cerita as { ilustrasi }}
		{#if ilustrasi}
			<link rel="preload" href={ilustrasi} as="image" fetchpriority="high">
		{/if}
	{/each}
</svelte:head>

<div class="bg" style:background-color={bg ?? 'white'}>
	<div class="allcenter">
		{#if ruteSaatIni !== 0}
			<button class="btn-home" onclick={() => menuju(0)}>🏠 Home</button>
		{:else}
			<a href="/new" class="editor-link">✏️ Buat Ceritamu Sendiri</a>
		{/if}
		<h2>{judul}</h2>
		{#if ilustrasi}
			<img src={ilustrasi} alt={ilustrasi} />
		{/if}
		<p>{deskripsi}</p>
		<div class="daftar-pilihan">
			{#each pilihan as { teks, rute }}
				<button onclick={() => menuju(rute)}>{teks}</button>
			{/each}
		</div>
	</div>
</div>

<style>
div.bg {
	width: 100%;
}

div.allcenter {
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	max-width: 720px;
	margin: 0 auto;
	min-height: 100dvh;
	font-family: sans-serif;

	& h2 {
		text-align: center;
	}

	& p {
		text-align: center;
		padding: 0 80px;
	}

	& img {
		width: 50%;
		margin: 0 auto;
		border-radius: 24px;
	}
}

button.btn-home {
	width: 320px;
	margin: 0 auto;
}

a.editor-link {
	display: block;
	width: 320px;
	margin: 0 auto;
	padding: 8px;
	text-align: center;
	background: #28a745;
	color: white;
	text-decoration: none;
	border-radius: 4px;
	font-weight: bold;
}

div.daftar-pilihan {
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 24px;
	width: 100%;

	& button {
		font-size: 16px;
		font-weight: bold;
		padding: 8px;
	}
}
</style>
