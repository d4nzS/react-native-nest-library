import { FC, useEffect } from 'react';

import Library from '../../../components/Main/Library/Library';
import useAppDispatch from '../../../hooks/use-app-dispatch';
import { getAllBooksThunk } from '../../../store/book/book-thunk';

const LibraryScreen: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllBooksThunk());
  }, []);

  return <Library/>;
};

export default LibraryScreen;
