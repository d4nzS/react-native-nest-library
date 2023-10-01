import { FC, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import Library from '../../../components/Main/Library/Library';
import useAppDispatch from '../../../hooks/use-app-dispatch';
import { getAllBooksThunk } from '../../../store/book/book-thunk';

const LibraryScreen: FC = () => {
  const dispatch = useAppDispatch();

  useFocusEffect(useCallback(() => {
    dispatch(getAllBooksThunk());
  }, []));

  return <Library/>;
};

export default LibraryScreen;
