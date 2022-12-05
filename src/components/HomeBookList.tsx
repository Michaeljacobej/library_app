import React from 'react';

import CardBook from '@/components/CardBook';
import {useAppSelector} from '@/store';
import {booksSelector} from '@/store/reducers/book';

interface Props {
  onBookClick: (id: number) => void;
}

const HomeBookList: React.FC<Props> = ({onBookClick}) => {
  const bookData = useAppSelector(booksSelector);

  return (
    <div className="mx-2 grid grid-cols-3 gap-4 transition-all md:mx-6 md:grid-cols-4 md:gap-6 lg:grid-cols-5 lg:gap-10">
      {bookData.map(book => (
        <CardBook
          key={book.id}
          title={book.title}
          description={book.description}
          imgUrl={book.imgUrl}
          onClick={() => onBookClick(book.id)}
        />
      ))}
    </div>
  );
};

export default HomeBookList;
