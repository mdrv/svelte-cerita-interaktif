type Pilihan = Array<{
		teks: string
		rute: number
	}>

type Cerita = Array<{
	rute: number
	judul: string
	deskripsi: string
	ilustrasi?: string
	pilihan: Pilihan
}>

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
		judul: 'Bearcu Adventure',
		ilustrasi: '/res/keyvisual.jpg',
		deskripsi: 'Petualangan seru bersama beruang lucu',
		pilihan: [
			{
				teks: 'Mulai',
				rute: 1,
			},
		],
	},
	{
		rute: 1,
		judul: 'Awal Cerita',
		ilustrasi: '/res/cerita-rumah.jpg',
		deskripsi:
			'Bearcu tinggal di rumah sendirian. Apa yang harus Bearcu lakukan?',
		pilihan: [
			{
				teks: 'Makan mie',
				rute: 2,
			},
			{
				teks: 'Tidur siang',
				rute: 3,
			},
			{
				teks: 'Pergi ke luar',
				rute: 4,
			},
		],
	},
	{
		rute: 2,
		judul: judulGameOver,
		ilustrasi: '/res/cerita-mie.jpg',
		deskripsi: 'Mie-nya beracun! Tawat riwayat Bearcu.',
		pilihan: pilihanGameOver,
	},
	{
		rute: 3,
		judul: judulGameOver,
		ilustrasi: '/res/cerita-tidur.jpg',
		deskripsi: 'Tidak bisa keluar dari mimpi. Tawat riwayat Bearcu.',
		pilihan: pilihanGameOver,
	},
	{
		rute: 4,
		judul: 'Di Luar Rumah',
		ilustrasi: '/res/cerita-doraemon.jpg',
		deskripsi: 'Di luar, Bearcu ketemu Doraemon. Apa yang mesti dilakukan?',
		pilihan: [
			{
				teks: 'Berpelukan',
				rute: 5,
			},
			{
				teks: 'Mencuri kantong ajaib',
				rute: 6,
			},
			{
				teks: 'Tendang Doraemon',
				rute: 7,
			},
		],
	},
	{
		rute: 5,
		judul: judulGameOver,
		ilustrasi: '/res/cerita-konslet.jpg',
		deskripsi: 'Ternyata Doraemon-nya konslet. Tamat riwayat Bearcu.',
		pilihan: pilihanGameOver,
	},
	{
		rute: 6,
		judul: 'Dapat Kantong Ajaib!',
		ilustrasi: '/res/cerita-marah.jpg',
		deskripsi: 'Tapi kamu dikejar Doraemon yang marah. Bagaimana ini?',
		pilihan: [
			{
				teks: 'Minta maaf',
				rute: 8,
			},
			{
				teks: 'Terus berlari',
				rute: 9,
			},
			{
				teks: 'Panggil polisi',
				rute: 10,
			},
		],
	},
	{
		rute: 7,
		judul: judulGameOver,
		ilustrasi: '/res/cerita-patah.jpg',
		deskripsi:
			'Tubuh Doraemon terbuat dari besi, hingga kaki Bearcu patah tulang. Tamat riwayat Bearcu.',
		pilihan: pilihanGameOver,
	},
	{
		rute: 8,
		judul: 'HAPPY ENDING',
		ilustrasi: '/res/cerita-happyending.gif',
		deskripsi:
			'Karena terharu atas aksi Bearcu, Doraemon pun mengikhlaskan kantong ajaib itu. Hidup Bearcu semakin bahagia.',
		pilihan: pilihanGameOver,
	},
	{
		rute: 9,
		judul: judulGameOver,
		ilustrasi: '/res/cerita-ketangkap.jpg',
		deskripsi:
			'Karena Bearcu jarang olahraga, Doraemon dapat menangkap Bearcu. Tamat riwayat Bearcu.',
		pilihan: pilihanGameOver,
	},
	{
		rute: 10,
		judul: judulGameOver,
		ilustrasi: '/res/cerita-polisi.jpg',
		deskripsi:
			'Ironisnya yang ditangkap bukan Doraemon, tapi Bearcu sendiri. Tamat riwayat Bearcu.',
		pilihan: pilihanGameOver,
	},
]
