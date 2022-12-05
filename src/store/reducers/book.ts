/* eslint-disable no-param-reassign */
import {createSelector} from '@reduxjs/toolkit';
import * as toolkit from '@reduxjs/toolkit';

import type {RootState} from '@/store';

export interface Category {
  id: number;
  name: string;
}

export type DatePickerState = 'year' | 'month' | 'date';

export interface PublishedDate {
  type: DatePickerState;
  date: Date;
}

interface Book {
  id: number;
  title: string;
  datePublished: PublishedDate;
  category: number[];
  author: string;
  imgUrl: string;
  description: string;
}

interface BookState {
  bookData: Book[];
  categories: Category[];
  carouselData: number[];
}

export interface DatePickerOptions {
  value: DatePickerState;
  label: string;
}

export const datePickerOptions: DatePickerOptions[] = [
  {value: 'year', label: 'Tahun'},
  {value: 'month', label: 'Bulan & Tahun'},
  {value: 'date', label: 'Tanggal, Bulan & Tahun'},
];

export interface CategoryPickerOptions {
  value: number;
  label: string;
}

const initialState: BookState = {
  bookData: [
    {
      id: 1,
      title: 'Dilan 1990',
      datePublished: {type: 'year', date: new Date('2014')},
      category: [11],
      author: 'Pidi Baiq',
      imgUrl:
        'https://4.bp.blogspot.com/-B7xdHP4MB8A/WjNTC4pX6MI/AAAAAAAABAs/ddiTCRLvCgcqIzyJBRhF7eGfLXhBSE9FQCK4BGAYYCw/s1600/covernya.jpg',
      description:
        'Dilan : Dia Adalah Dilanku Tahun 1990” bercerita tentang kisah cinta dua remaja Bandung pada tahun 90an. Berawal dari seorang siswa bernama Dilan yang jatuh cinta dengan siswi pindahan dari SMA di Jakarta bernama Milea. Dilan memiliki beragam cara untuk mendekati dan mencuri perhatian Milea.',
    },
    {
      id: 2,
      title: 'Ubur-ubur Lembur',
      datePublished: {type: 'date', date: new Date('2018/02/07')},
      category: [17],
      author: 'Raditya Dika',
      imgUrl: 'https://iili.io/HCkmurG.md.jpg',
      description:
        'Hal kedua yang gue nggak sempat kasih tahu Iman: jadi orang yang dikenal publik harus tahan dengan asumsi-asumsi orang. Misalnya, orang-orang penuh dengan asumsi yang salah. Gue kurusan dikit, dikomentarin orang yang baru ketemu, "Bang Radit, kurusan, deh. Buat film baru, ya?" Gue geleng, "Enggak." Gue bilang, "Emang lagi diet aja." Dia malah balas bilang, "Ah, bohong! Paling abis putus cinta, kan?"',
    },
    {
      id: 3,
      title: 'Laskar Pelangi',
      datePublished: {type: 'year', date: new Date('2005')},
      category: [14],
      author: 'Andrea Hirata',
      imgUrl: 'https://iili.io/HCkm8Eg.md.jpg',
      description:
        'Bangunan itu nyaris rubuh. Dindingnya miring bersangga sebalok kayu. Atapnya bocor di mana-mana. Tetapi, berpasang-pasang mata mungil menatap penuh harap. Hendak ke mana lagikah mereka harus bersekolah selain tempat itu? Tak peduli seberat apa pun kondisi sekolah itu, sepuluh anak dari keluarga miskin itu tetap bergeming. Di dada mereka, telah menggumpal tekad untuk maju.',
    },
    {
      id: 4,
      title: 'Sebuah Seni Untuk Bersikap Bodo Amat',
      datePublished: {type: 'date', date: new Date('2016/09/13')},
      category: [8],
      author: 'Mark Manson',
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/4/4b/Sebuah-seni-untuk-bersikap-bodoh-amat.jpg',
      description:
        'Baginya cuek dan masa bodoh adalah cara sederhana untuk mengrahkan kembali ekspetasi hidup dalam memilih apa yang penting karna pada intinya hidup hanyalah rentetan masalah yang tidak ada ujungnya. Novel ini adalah kisah nyata dari hidupnya yang selalu di terpa oleh kencangnya badai dan karena itulah ia menjadi semakin kuat dalam meraih cita-cita',
    },
    {
      id: 5,
      title: 'React Native Cookbook',
      datePublished: {type: 'date', date: new Date('2016/12/22')},
      category: [3],
      author: 'Dan Ward',
      imgUrl: 'https://miro.medium.com/max/766/1*5WF74Gp_XP3I3mmbG3RAzQ.png',
      description:
        "If you are a developer looking to create mobile applications with maximized code reusability and minimized cost, React Native is what you need. With this practical guide, you'll be able to build attractive UIs, tackle common problems in mobile development, and achieve improved performance in mobile environments.",
    },
  ],
  carouselData: [1, 2, 3],
  categories: [
    {id: 1, name: 'Biografi'},
    {id: 2, name: 'Autobiografi'},
    {id: 3, name: 'Ensiklopedia'},
    {id: 4, name: 'Kamus'},
    {id: 5, name: 'Jurnal'},
    {id: 6, name: 'Sejarah'},
    {id: 7, name: 'Sains'},
    {id: 8, name: 'Motivasi'},
    {id: 9, name: 'Filsafat'},
    {id: 10, name: 'Fantasi'},
    {id: 11, name: 'Romance'},
    {id: 12, name: 'Fiksi Ilmiah'},
    {id: 13, name: 'Horor'},
    {id: 14, name: 'Petualangan'},
    {id: 15, name: 'Misteri'},
    {id: 16, name: 'Komedi'},
    {id: 17, name: 'Drama'},
  ],
};

export const bookSlice = toolkit.createSlice({
  name: 'book',
  initialState,
  reducers: {
    addBook: (
      state,
      {payload: {id = 0, ...rest}}: toolkit.PayloadAction<Book>
    ) => {
      if (id) {
        state.bookData.push({id, ...rest});
      } else {
        const maxId = Math.max(...state.bookData.map(val => val?.id ?? 0));
        state.bookData.push({id: maxId + 1, ...rest});
      }
    },
    removeBook: (state, {payload: id}: toolkit.PayloadAction<number>) => {
      state.bookData = state.bookData.filter(book => book.id !== id);
      state.carouselData = state.carouselData.filter(
        carousel => carousel !== id
      );
    },
    editBook: (state, {payload: book}: toolkit.PayloadAction<Book>) => {
      state.bookData = state.bookData.map(val =>
        val.id === book.id ? book : val
      );
    },
    addToCarousel: (state, {payload: id}: toolkit.PayloadAction<number>) => {
      state.carouselData.push(id);
    },
    removeFromCarousel: (
      state,
      {payload: id}: toolkit.PayloadAction<number>
    ) => {
      state.carouselData = state.carouselData.filter(
        carouselId => carouselId !== id
      );
    },
  },
});

export const booksSelector = createSelector(
  (state: RootState) => state.book.bookData,
  (state: RootState) => state.book.categories,
  (books, category) =>
    books.map(val => ({
      ...val,
      category: val.category
        .map(cat => category.find(catVal => catVal.id === cat))
        .filter(cat => cat !== undefined),
    }))
);

export const bookDetailSelector = createSelector(
  (state: RootState) => state.book.bookData,
  (state: RootState) => state.book.categories,
  (state: RootState, bookId: number) => bookId,
  (books, categories, bookId) => {
    const book = books.find(val => val.id === bookId);
    if (book) {
      return {
        ...book,
        category: book.category
          .map(cat => categories.find(catVal => catVal.id === cat))
          .filter((cat): cat is Category => cat !== undefined),
      };
    }
    return null;
  }
);

export const carouselSelector = createSelector(
  (state: RootState) => state.book.bookData,
  (state: RootState) => state.book.carouselData,
  (books, carousels) =>
    carousels
      .map(id => books.find(book => book.id === id))
      .filter((val): val is Book => val !== undefined)
);
export const isInCarouselSelector = createSelector(
  (state: RootState) => state.book.carouselData,
  (state: RootState, bookId: number) => bookId,
  (carousels, bookId) =>
    carousels.find(carouselId => carouselId === bookId) !== undefined
);

export const categoriesPickerSelector = createSelector(
  (state: RootState) => state.book.categories,
  categories => categories.map(cat => ({value: cat.id, label: cat.name}))
);

export const {
  addBook,
  addToCarousel,
  editBook,
  removeBook,
  removeFromCarousel,
} = bookSlice.actions;

export default bookSlice.reducer;
