import { RootState } from '../store';

const userSelectors = {
  currentUserSelector: ({ user }: RootState) => user.currentUser,
  isLoadingSelector: ({ user }: RootState) => user.isLoading
};

export default userSelectors;
