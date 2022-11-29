import create from 'zustand';
import {persist} from 'zustand/middleware';

interface Book {
  id: number;
  title: string;
  author: string;
  imgUrl: string;
  description: string;
}

interface BookStore {
  bookData: Book[];
  carouselData: number[];
  getCarouselData: () => Book[];
  addBook: (book: Book) => void;
  removeBook: (id: number) => void;
  editBook: (book: Book) => void;
  addToCarousel: (id: number) => void;
  isInCarousel: (id: number) => boolean;
  removeFromCarousel: (id: number) => void;
}

const useBookStore = create<BookStore>()(
  persist(
    (set, get) => ({
      bookData: [
        {
          id: 1,
          title: 'Dilan 1990',
          author: 'Pidi Baiq',
          imgUrl:
            'https://4.bp.blogspot.com/-B7xdHP4MB8A/WjNTC4pX6MI/AAAAAAAABAs/ddiTCRLvCgcqIzyJBRhF7eGfLXhBSE9FQCK4BGAYYCw/s1600/covernya.jpg',
          description:
            'Dilan : Dia Adalah Dilanku Tahun 1990” bercerita tentang kisah cinta dua remaja Bandung pada tahun 90an. Berawal dari seorang siswa bernama Dilan yang jatuh cinta dengan siswi pindahan dari SMA di Jakarta bernama Milea. Dilan memiliki beragam cara untuk mendekati dan mencuri perhatian Milea.',
        },
        {
          id: 2,
          title: 'Ubur-ubur Lembur',
          author: 'Raditya Dika',
          imgUrl:
            'https://2.bp.blogspot.com/-XuT1Gj7eSp0/Wn1_0fPNdRI/AAAAAAAAB7E/9CS-81idECIxxZfYxPGie10vi3JzjjUrACLcBGAs/s1600/d96eff85-ae75-4f56-bdfc-dd7a055e7400.jpeg',
          description:
            'Hal kedua yang gue nggak sempat kasih tahu Iman: jadi orang yang dikenal publik harus tahan dengan asumsi-asumsi orang. Misalnya, orang-orang penuh dengan asumsi yang salah. Gue kurusan dikit, dikomentarin orang yang baru ketemu, "Bang Radit, kurusan, deh. Buat film baru, ya?" Gue geleng, "Enggak." Gue bilang, "Emang lagi diet aja." Dia malah balas bilang, "Ah, bohong! Paling abis putus cinta, kan?"',
        },
        {
          id: 3,
          title: 'Laskar Pelangi',
          author: 'Andrea Hirata',
          imgUrl:
            'http://assets.kompasiana.com/items/album/2021/03/09/laskar-pelangi-sampul-1-6046c93cd541df56264661b2.jpg',
          description:
            'Bangunan itu nyaris rubuh. Dindingnya miring bersangga sebalok kayu. Atapnya bocor di mana-mana. Tetapi, berpasang-pasang mata mungil menatap penuh harap. Hendak ke mana lagikah mereka harus bersekolah selain tempat itu? Tak peduli seberat apa pun kondisi sekolah itu, sepuluh anak dari keluarga miskin itu tetap bergeming. Di dada mereka, telah menggumpal tekad untuk maju.',
        },
        {
          id: 4,
          title: 'Sebuah Seni Untuk Bersikap Bodo Amat',
          author: 'Mark Manson',
          imgUrl:
            'https://upload.wikimedia.org/wikipedia/commons/4/4b/Sebuah-seni-untuk-bersikap-bodoh-amat.jpg',
          description:
            'Baginya cuek dan masa bodoh adalah cara sederhana untuk mengrahkan kembali ekspetasi hidup dalam memilih apa yang penting karna pada intinya hidup hanyalah rentetan masalah yang tidak ada ujungnya. Novel ini adalah kisah nyata dari hidupnya yang selalu di terpa oleh kencangnya badai dan karena itulah ia menjadi semakin kuat dalam meraih cita-cita',
        },
        {
          id: 5,
          title: 'React Native Cookbook',
          author: 'Dan Ward',
          imgUrl:
            'https://miro.medium.com/max/766/1*5WF74Gp_XP3I3mmbG3RAzQ.png',
          description:
            "If you are a developer looking to create mobile applications with maximized code reusability and minimized cost, React Native is what you need. With this practical guide, you'll be able to build attractive UIs, tackle common problems in mobile development, and achieve improved performance in mobile environments.",
        },
      ],
      carouselData: [1, 2, 3],
      getCarouselData: () =>
        get()
          .carouselData.map(
            id => get().bookData.find(book => book.id === id) ?? null
          )
          .filter((val): val is Book => val !== null),
      addBook: ({id = 0, ...rest}) =>
        set(state => {
          if (id) {
            return {
              bookData: [...state.bookData, {id, ...rest}],
            };
          }
          const maxId = Math.max(...state.bookData.map(val => val?.id ?? 0));
          return {
            bookData: [...state.bookData, {...rest, id: maxId + 1}],
          };
        }),
      removeBook: (id: number) =>
        set(state => ({
          bookData: state.bookData.filter(book => book.id !== id),
        })),
      editBook: (book: Book) =>
        set(state => ({
          bookData: state.bookData.map(val =>
            val.id === book.id ? book : val
          ),
        })),
      addToCarousel: (id: number) =>
        set(state => ({
          carouselData: [...state.carouselData, id],
        })),
      isInCarousel: (id: number) =>
        get().carouselData.find(carouselId => carouselId === id) !== undefined,
      removeFromCarousel: (id: number) =>
        set(state => ({
          carouselData: state.carouselData.filter(
            carouselId => carouselId !== id
          ),
        })),
    }),
    {
      name: 'book-storage',
    }
  )
);

export default useBookStore;
