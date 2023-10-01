import { RootState } from '../store';

const authSelectors = {
  isLoggedInSelector: ({ auth }: RootState) => auth.isLoggedIn,
  isLoadingSelector: ({ auth }: RootState) => auth.isLoading,
  isSucceedSelector: ({ auth }: RootState) => auth.isSucceed,
  errorSelector: ({ auth }: RootState) => auth.error
};

export default authSelectors;
