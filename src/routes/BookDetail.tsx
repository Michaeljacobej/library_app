import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {Helmet} from 'react-helmet';
import toast from 'react-hot-toast';
import {useNavigate, useParams} from 'react-router-dom';

import ModalAddEditBook from '@/components/ModalAddEditBook';
import ModalConfirmDelete from '@/components/ModalConfirmDelete';
import useBookStore from '@/store/useBookStore';
import {getImageFromURL} from '@/util/helper';

const BookDetail = () => {
  const navigate = useNavigate();
  const {bookId} = useParams<{bookId: string}>();
  const {bookData, isInCarousel, addToCarousel, removeFromCarousel} =
    useBookStore();
  const book = React.useMemo(
    () => bookData.find(val => val.id === parseInt(bookId ?? '0', 10)),
    [bookData]
  );

  React.useEffect(() => {
    if (!book) {
      navigate('/404', {replace: true});
    }
  }, []);

  const [showModalEditBook, setShowModalEditBook] = React.useState(false);
  const [showModalDeleteBook, setShowModalDeleteBook] = React.useState(false);

  const addRemoveFromCarousel = React.useCallback(() => {
    if (isInCarousel(book?.id ?? 0)) {
      removeFromCarousel(book?.id ?? 0);
      return;
    }
    addToCarousel(book?.id ?? 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{book?.title ?? ''} - Library App</title>
      </Helmet>
      <div className="flex h-screen flex-col">
        <header
          className="flex w-screen flex-[2] flex-col justify-between bg-cover bg-center"
          style={{backgroundImage: `url(${getImageFromURL(book?.imgUrl)})`}}>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="m-4 aspect-square h-10 rounded-full bg-white shadow-md transition-all hover:scale-125 dark:bg-dark-surface dark:text-white"
              onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon="arrow-left" />
            </button>
            <div className="mx-4 flex gap-6 font-bold text-white dark:text-black">
              <button
                type="button"
                className="group flex aspect-square h-10 items-center overflow-hidden rounded-lg bg-black/60 px-4 py-2 transition-all hover:bg-white/60 hover:text-black dark:bg-white/60 dark:hover:bg-black/60 dark:hover:text-white min-[320px]:aspect-auto min-[320px]:hover:px-6"
                onClick={() => setShowModalEditBook(true)}>
                <FontAwesomeIcon icon="pencil" />
                <span className="text-[0] transition-all duration-700 group-hover:ml-2 group-hover:text-base">
                  Edit
                </span>
              </button>
              <button
                type="button"
                className="group flex aspect-square h-10 items-center overflow-hidden rounded-lg bg-black/60 px-4 py-2 transition-all hover:bg-white/60 hover:text-black dark:bg-white/60 dark:hover:bg-black/60 dark:hover:text-white min-[320px]:aspect-auto min-[320px]:hover:px-6"
                onClick={() => setShowModalDeleteBook(true)}>
                <FontAwesomeIcon icon="trash" />
                <span className="text-[0] transition-all duration-700 group-hover:ml-2 group-hover:text-base">
                  Delete
                </span>
              </button>
              <button
                type="button"
                className="group flex aspect-square h-10 items-center overflow-hidden rounded-lg bg-black/60 px-4 py-2 transition-all hover:bg-white/60 hover:text-black dark:bg-white/60 dark:hover:bg-black/60 dark:hover:text-white min-[320px]:aspect-auto min-[320px]:hover:px-6"
                onClick={addRemoveFromCarousel}>
                <FontAwesomeIcon
                  icon={
                    (isInCarousel(book?.id ?? 0)
                      ? 'fa-solid fa-star'
                      : 'fa-regular fa-star') as IconProp
                  }
                />
                <span className="text-[0] transition-all duration-700 group-hover:ml-2 group-hover:text-base">
                  {isInCarousel(book?.id ?? 0) ? 'Remove' : 'Add'} to Gallery
                </span>
              </button>
            </div>
          </div>
          <div
            className="mx-2 aspect-[calc(2/3)] w-40 translate-y-[16%] self-end overflow-hidden rounded-md bg-cover bg-center shadow-lg md:mx-10 md:translate-y-[50%]"
            style={{backgroundImage: `url(${getImageFromURL(book?.imgUrl)})`}}
          />
        </header>
        <main className="flex flex-[3] flex-col dark:bg-dark-surface md:flex-row">
          <div className="flex-1 py-3 px-3 dark:text-white md:flex-[4] md:px-12">
            <div className="flex flex-col items-start md:flex-row md:items-center">
              <div className="flex flex-1 flex-col items-start gap-1">
                <h3 className="rounded-full bg-yellow-400 px-4 py-1 text-sm font-semibold text-white">
                  Novel
                </h3>
                <h1 className="text-3xl font-bold">{book?.title}</h1>
                <h2 className="font-bold">30 Juni 2019</h2>
              </div>
              <h2 className="font-bold text-green-500">Available</h2>
            </div>
            <p className="py-4 text-sm">{book?.description}</p>
          </div>
          <div className="flex flex-col items-center justify-end px-2 py-3 md:flex-1 md:self-end md:px-14 md:py-12">
            <button
              type="button"
              className="w-full rounded-lg bg-yellow-400 px-6 py-2 text-2xl font-bold text-white shadow-lg">
              Borrow
            </button>
          </div>
        </main>
      </div>
      <ModalAddEditBook
        mode="edit"
        bookDetail={book}
        isVisible={showModalEditBook}
        onClose={() => setShowModalEditBook(false)}
      />
      <ModalConfirmDelete
        isVisible={showModalDeleteBook}
        bookId={book?.id ?? 0}
        bookTitle={book?.title ?? ''}
        onAfterDelete={() => {
          navigate(-1);
          toast.success('Success deleting book', {
            position: 'top-right',
            className:
              'bg-green-200 dark:bg-green-700 text-black dark:text-white',
          });
        }}
        onClose={() => setShowModalDeleteBook(false)}
      />
    </>
  );
};

export default BookDetail;
