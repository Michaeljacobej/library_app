import React from 'react';

import {getImageFromURL} from '@/util/helper';

interface Props {
  title: string;
  description: string;
  imgUrl: string;
  onClick: () => void;
}

const CardBook: React.FC<Props> = ({title, description, imgUrl, onClick}) => {
  return (
    <button type="button" onClick={onClick}>
      <div className="flex cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-lg dark:bg-little-dark-surface">
        <div
          className="aspect-square bg-cover bg-center"
          style={{backgroundImage: `url(${getImageFromURL(imgUrl)})`}}
        />
        <div className="bg-white px-4 pt-2 pb-4 dark:bg-little-dark-surface dark:text-white">
          <h2 className="truncate px-4 text-center font-bold">{title}</h2>
          <p className="max-h-[4.2em] overflow-hidden text-start text-sm">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
};

export default CardBook;