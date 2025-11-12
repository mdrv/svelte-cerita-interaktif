<script lang="ts">
type Pilihan = Array<{
	teks: string
	rute: number
}>

type Cerita = Array<{
	rute: number
	judul: string
	deskripsi: string
	ilustrasi?: string
	bg?: string
	pilihan: Pilihan
}>

let mode = $state<'text' | 'visual'>('visual')
let textCode = $state(`[
  {
    "rute": 0,
    "judul": "Cerita Saya",
    "deskripsi": "Ini adalah cerita buatan saya",
    "pilihan": [
      {
        "teks": "Mulai",
        "rute": 1
      }
    ]
  },
  {
    "rute": 1,
    "judul": "Halaman Pertama",
    "deskripsi": "Apa yang akan kamu lakukan?",
    "bg": "#bfb",
    "pilihan": [
      {
        "teks": "Pilihan A",
        "rute": 2
      },
      {
        "teks": "Pilihan B",
        "rute": 3
      }
    ]
  },
  {
    "rute": 2,
    "judul": "Ending A",
    "deskripsi": "Kamu memilih A. Tamat!",
    "bg": "#ffa",
    "pilihan": [
      {
        "teks": "Kembali ke awal",
        "rute": 0
      }
    ]
  },
  {
    "rute": 3,
    "judul": "Ending B",
    "deskripsi": "Kamu memilih B. Tamat!",
    "bg": "#aff",
    "pilihan": [
      {
        "teks": "Kembali ke awal",
        "rute": 0
      }
    ]
  }
]`)

let cerita = $state<Cerita>([
	{
		rute: 0,
		judul: 'Cerita Saya',
		deskripsi: 'Ini adalah cerita buatan saya',
		pilihan: [{ teks: 'Mulai', rute: 1 }],
	},
	{
		rute: 1,
		judul: 'Halaman Pertama',
		deskripsi: 'Apa yang akan kamu lakukan?',
		bg: '#bfb',
		pilihan: [
			{ teks: 'Pilihan A', rute: 2 },
			{ teks: 'Pilihan B', rute: 3 },
		],
	},
	{
		rute: 2,
		judul: 'Ending A',
		deskripsi: 'Kamu memilih A. Tamat!',
		bg: '#ffa',
		pilihan: [{ teks: 'Kembali ke awal', rute: 0 }],
	},
	{
		rute: 3,
		judul: 'Ending B',
		deskripsi: 'Kamu memilih B. Tamat!',
		bg: '#aff',
		pilihan: [{ teks: 'Kembali ke awal', rute: 0 }],
	},
])

let selectedNodeIndex = $state(0)
let ruteSaatIni = $state(0)
let parseError = $state('')

let { judul, deskripsi, pilihan, ilustrasi, bg } = $derived(
	cerita.find((item) => item.rute === ruteSaatIni) ?? cerita[0]!,
)

const menuju = (ruteBerikutnya: number) => {
	if (cerita.some((item) => item.rute === ruteBerikutnya)) {
		ruteSaatIni = ruteBerikutnya
	} else {
		alert('Rute tidak ditemukan!')
	}
}

const syncFromText = () => {
	try {
		const parsed = JSON.parse(textCode)
		if (Array.isArray(parsed)) {
			cerita = parsed
			parseError = ''
		} else {
			parseError = 'Data harus berupa array'
		}
	} catch (e) {
		parseError = e instanceof Error ? e.message : 'Error parsing JSON'
	}
}

const syncToText = () => {
	textCode = JSON.stringify(cerita, null, 2)
	parseError = ''
}

const addNode = () => {
	const maxRute = Math.max(...cerita.map((c) => c.rute), 0)
	cerita.push({
		rute: maxRute + 1,
		judul: 'Halaman Baru',
		deskripsi: 'Deskripsi halaman',
		pilihan: [{ teks: 'Kembali', rute: 0 }],
	})
	selectedNodeIndex = cerita.length - 1
	syncToText()
}

const deleteNode = (index: number) => {
	if (cerita.length > 1 && confirm('Hapus halaman ini?')) {
		cerita.splice(index, 1)
		if (selectedNodeIndex >= cerita.length) {
			selectedNodeIndex = cerita.length - 1
		}
		syncToText()
	}
}

const addChoice = (nodeIndex: number) => {
	cerita[nodeIndex]!.pilihan.push({
		teks: 'Pilihan baru',
		rute: 0,
	})
	syncToText()
}

const deleteChoice = (nodeIndex: number, choiceIndex: number) => {
	cerita[nodeIndex]!.pilihan.splice(choiceIndex, 1)
	syncToText()
}

const downloadJSON = () => {
	const blob = new Blob([JSON.stringify(cerita, null, 2)], {
		type: 'application/json',
	})
	const url = URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = 'cerita.json'
	a.click()
	URL.revokeObjectURL(url)
}

const loadFile = (e: Event) => {
	const input = e.target as HTMLInputElement
	const file = input.files?.[0]
	if (file) {
		const reader = new FileReader()
		reader.onload = (e) => {
			try {
				const text = e.target?.result as string
				textCode = text
				syncFromText()
			} catch (err) {
				alert('Error membaca file')
			}
		}
		reader.readAsText(file)
	}
}

$effect(() => {
	if (mode === 'text') {
		syncToText()
	}
})
</script>

<div class="editor-container">
	<div class="editor-pane">
		<div class="toolbar">
			<h2>✏️ Editor Cerita</h2>
			<div class="mode-switch">
				<button
					class:active={mode === 'visual'}
					onclick={() => {
						mode = 'visual'
						syncFromText()
					}}
				>
					👁️ Visual
				</button>
				<button
					class:active={mode === 'text'}
					onclick={() => {
						mode = 'text'
						syncToText()
					}}
				>
					📝 Teks/JSON
				</button>
			</div>
			<div class="file-actions">
				<button onclick={downloadJSON}>💾 Download JSON</button>
				<label class="upload-btn">
					📂 Load JSON
					<input type="file" accept=".json" onchange={loadFile} />
				</label>
			</div>
		</div>

		{#if mode === 'visual'}
			<div class="visual-editor">
				<div class="nodes-list">
					<div class="list-header">
						<h3>Halaman Cerita</h3>
						<button onclick={addNode}>➕ Tambah</button>
					</div>
					{#each cerita as node, i}
						<div
							class="node-item"
							class:selected={i === selectedNodeIndex}
							onclick={() => (selectedNodeIndex = i)}
							onkeydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									selectedNodeIndex = i
								}
							}}
							role="button"
							tabindex="0"
						>
							<strong>Rute {node.rute}:</strong> {node.judul}
							{#if cerita.length > 1}
								<button
									class="delete-btn"
									onclick={(e) => {
										e.stopPropagation()
										deleteNode(i)
									}}
								>
									🗑️
								</button>
							{/if}
						</div>
					{/each}
				</div>

				<div class="node-editor">
					{#if cerita[selectedNodeIndex]}
						{@const node = cerita[selectedNodeIndex]!}
						<h3>Edit Halaman</h3>
						<label>
							Nomor Rute:
							<input
								type="number"
								bind:value={node.rute}
								oninput={syncToText}
							/>
						</label>
						<label>
							Judul:
							<input
								type="text"
								bind:value={node.judul}
								oninput={syncToText}
							/>
						</label>
						<label>
							Deskripsi:
							<textarea
								bind:value={node.deskripsi}
								oninput={syncToText}
								rows="3"
							></textarea>
						</label>
						<label>
							URL Ilustrasi (opsional):
							<input
								type="text"
								bind:value={node.ilustrasi}
								oninput={syncToText}
							/>
						</label>
						<label>
							Warna Background (contoh: #bfb):
							<input
								type="text"
								bind:value={node.bg}
								oninput={syncToText}
							/>
						</label>

						<h4>
							Pilihan
							<button onclick={() => addChoice(selectedNodeIndex)}>
								➕ Tambah Pilihan
							</button>
						</h4>
						{#each node.pilihan as choice, ci}
							<div class="choice-item">
								<label>
									Teks:
									<input
										type="text"
										bind:value={choice.teks}
										oninput={syncToText}
									/>
								</label>
								<label>
									Ke Rute:
									<input
										type="number"
										bind:value={choice.rute}
										oninput={syncToText}
									/>
								</label>
								<button onclick={() => deleteChoice(selectedNodeIndex, ci)}>
									🗑️
								</button>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		{:else}
			<div class="text-editor">
				<div class="text-toolbar">
					<button onclick={syncFromText}>🔄 Sync ke Preview</button>
					{#if parseError}
						<span class="error">{parseError}</span>
					{/if}
				</div>
				<textarea bind:value={textCode} spellcheck="false"></textarea>
			</div>
		{/if}
	</div>

	<div class="preview-pane">
		<div class="toolbar">
			<h2>👁️ Preview</h2>
			<button onclick={() => (ruteSaatIni = 0)}>🔄 Reset</button>
		</div>
		<div class="preview-content">
			<div class="bg" style:background-color={bg ?? 'white'}>
				<div class="allcenter">
					{#if ruteSaatIni !== 0}
						<button class="btn-home" onclick={() => menuju(0)}>
							🏠 Home
						</button>
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
		</div>
	</div>
</div>

<style>
.editor-container {
	display: flex;
	height: 100vh;
	overflow: hidden;
}

.editor-pane,
.preview-pane {
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

.editor-pane {
	border-right: 2px solid #ccc;
}

.toolbar {
	display: flex;
	align-items: center;
	gap: 16px;
	padding: 12px 16px;
	background: #f5f5f5;
	border-bottom: 1px solid #ddd;
	flex-wrap: wrap;

	& h2 {
		margin: 0;
		font-size: 18px;
	}
}

.mode-switch {
	display: flex;
	gap: 4px;
	margin-left: auto;

	& button {
		padding: 6px 12px;
		background: white;
		border: 1px solid #ccc;
		cursor: pointer;
		border-radius: 4px;

		&.active {
			background: #007bff;
			color: white;
			border-color: #007bff;
		}
	}
}

.file-actions {
	display: flex;
	gap: 8px;

	& button,
	& .upload-btn {
		padding: 6px 12px;
		background: #28a745;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;

		&:hover {
			background: #218838;
		}
	}

	& .upload-btn {
		display: inline-block;
		position: relative;

		& input {
			display: none;
		}
	}
}

.visual-editor {
	display: flex;
	flex: 1;
	overflow: hidden;
}

.nodes-list {
	width: 250px;
	border-right: 1px solid #ddd;
	overflow-y: auto;
	padding: 12px;

	& .list-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;

		& h3 {
			margin: 0;
			font-size: 16px;
		}

		& button {
			padding: 4px 8px;
			font-size: 12px;
			background: #007bff;
			color: white;
			border: none;
			border-radius: 4px;
			cursor: pointer;
		}
	}
}

.node-item {
	padding: 8px;
	margin-bottom: 6px;
	background: white;
	border: 1px solid #ddd;
	border-radius: 4px;
	cursor: pointer;
	position: relative;
	font-size: 14px;

	&.selected {
		background: #e3f2fd;
		border-color: #007bff;
	}

	& .delete-btn {
		position: absolute;
		top: 4px;
		right: 4px;
		padding: 2px 6px;
		background: #dc3545;
		color: white;
		border: none;
		border-radius: 3px;
		font-size: 12px;
		cursor: pointer;
	}
}

.node-editor {
	flex: 1;
	overflow-y: auto;
	padding: 16px;

	& h3 {
		margin-top: 0;
	}

	& h4 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 24px;

		& button {
			padding: 4px 8px;
			font-size: 12px;
			background: #28a745;
			color: white;
			border: none;
			border-radius: 4px;
			cursor: pointer;
		}
	}

	& label {
		display: block;
		margin-bottom: 12px;
		font-weight: bold;
		font-size: 14px;

		& input,
		& textarea {
			display: block;
			width: 100%;
			padding: 8px;
			margin-top: 4px;
			border: 1px solid #ccc;
			border-radius: 4px;
			font-family: inherit;
			font-size: 14px;
		}

		& textarea {
			resize: vertical;
		}
	}
}

.choice-item {
	display: flex;
	gap: 8px;
	align-items: flex-end;
	margin-bottom: 8px;
	padding: 8px;
	background: #f9f9f9;
	border: 1px solid #e0e0e0;
	border-radius: 4px;

	& label {
		flex: 1;
		margin: 0;
		font-size: 12px;
	}

	& button {
		padding: 6px 10px;
		background: #dc3545;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 14px;
	}
}

.text-editor {
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: hidden;

	& .text-toolbar {
		padding: 12px;
		background: #f9f9f9;
		border-bottom: 1px solid #ddd;
		display: flex;
		gap: 12px;
		align-items: center;

		& button {
			padding: 6px 12px;
			background: #007bff;
			color: white;
			border: none;
			border-radius: 4px;
			cursor: pointer;
		}

		& .error {
			color: #dc3545;
			font-size: 14px;
		}
	}

	& textarea {
		flex: 1;
		padding: 12px;
		border: none;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 13px;
		line-height: 1.5;
		resize: none;
		outline: none;
	}
}

.preview-pane {
	& .toolbar {
		justify-content: space-between;
	}
}

.preview-content {
	flex: 1;
	overflow-y: auto;
}

.bg {
	width: 100%;
	min-height: 100%;
}

.allcenter {
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	max-width: 720px;
	margin: 0 auto;
	min-height: 100%;
	font-family: sans-serif;
	padding: 40px 0;

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

.daftar-pilihan {
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 24px;
	width: 100%;
	flex-wrap: wrap;

	& button {
		font-size: 16px;
		font-weight: bold;
		padding: 8px 16px;
		background: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;

		&:hover {
			background: #0056b3;
		}
	}
}
</style>
