<script>
import cerita from './data.js'
let now = $state(cerita[0])
let { judul, deskripsi, pilihan } = $derived(now)

/**
 * @param {number} rute
 */
function menuju(rute) {
	let next = cerita.filter((item) => item.rute === rute)?.[0]
	if (!next) {
		alert("Rute tidak ditemukan!")
	} else {
		now = next
	}
}
</script>

<button onclick={() => menuju(0)}>🏠</button>
<h2>{judul}</h2>
<p>{deskripsi}</p>
{#each pilihan as { teks, rute }}
	<button onclick={() => menuju(rute)}>{teks}</button>
{/each}
