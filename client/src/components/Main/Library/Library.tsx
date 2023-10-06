import { FC } from 'react';

import MainLayout from '../MainLayout';
import BooksList from './BooksList';

const Library: FC = () => {
  return (
    <MainLayout>
      <BooksList/>
    </MainLayout>
  );
};

export default Library;
