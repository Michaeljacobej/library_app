import React from 'react';

import {getRandomSeededColor} from '@/util/helper';

interface Props {
  value: string;
}

const Chip: React.FC<Props> = ({value}) => {
  const randColor = React.useMemo(() => getRandomSeededColor(value), []);

  return (
    <div
      className="rounded-full px-3 py-1 text-white"
      style={{backgroundColor: randColor}}>
      {value}
    </div>
  );
};

export default Chip;
