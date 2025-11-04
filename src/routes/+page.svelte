<script lang="ts">
import { cerita } from './data.ts'
let ruteSaatIni = $state(0)
let { judul, deskripsi, pilihan, ilustrasi } = $derived(cerita[ruteSaatIni]!)

const menuju = (ruteBerikutnya: number) => {
	if (cerita.some((item) => item.rute === ruteBerikutnya)) {
		ruteSaatIni = ruteBerikutnya
	} else {
		alert('Rute tidak ditemukan!')
	}
}
</script>

<div class="allcenter">
	{#if ruteSaatIni !== 0}
		<button class="btn-home" onclick={() => menuju(0)}>🏠 Home</button>
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

<style>
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
