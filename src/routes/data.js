export default [
	{
		rute: 0,
		judul: 'Bearcu Adventure',
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
		judul: 'GAME OVER',
		deskripsi: 'Mie-nya beracun! Tawat riwayat Bearcu.',
	},
	{
		rute: 3,
		judul: 'GAME OVER',
		deskripsi: 'Tidak bisa keluar dari mimpi. Tawat riwayat Bearcu.',
	},
	{
		rute: 4,
		judul: 'Di Luar Rumah',
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
		judul: 'GAME OVER',
		deskripsi: 'Ternyata Doraemon-nya konslet. Tamat riwayat Bearcu.',
	},
	{
		rute: 6,
		judul: 'Dapat Kantong Ajaib!',
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
		judul: 'GAME OVER',
		deskripsi: 'Tubuh Doraemon terbuat dari besi, hingga kaki Bearcu patah tulang. Tamat riwayat Bearcu.',
	},
	{
		rute: 8,
		judul: 'HAPPY ENDING',
		deskripsi: 'Karena terharu atas aksi Bearcu, Doraemon pun mengikhlaskan kantong ajaib itu. Hidup Bearcu semakin bahagia.',
	},
	{
		rute: 9,
		judul: 'GAME OVER',
		deskripsi: 'Karena Bearcu jarang olahraga, Doraemon dapat menangkap Bearcu. Tamat riwayat Bearcu.',
	},
	{
		rute: 10,
		judul: 'GAME OVER',
		deskripsi: 'Ironisnya yang ditangkap bukan Doraemon, tapi Bearcu sendiri. Tamat riwayat Bearcu.',
	},
]
