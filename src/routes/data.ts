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

const bgGameOver = '#faa'
const judulGameOver = '՞߹ - ߹՞ GAME OVER'
const pilihanGameOver: Pilihan = [
	{
		teks: '🏠 Kembali ke rumah',
		rute: 0,
	},
	{
		teks: '🚀 Mulai lagi',
		rute: 1,
	},
]

export const cerita: Cerita = [
	{
		rute: 0,
		judul: 'Alex Adventure',
		ilustrasi: '/res/keyvisual.jpg',
		deskripsi: 'Petualangan bersama Alex di Pribadi Bandung.',
		pilihan: [
			{
				teks: 'Letssss go!',
				rute: 1,
			},
		],
	},
]
