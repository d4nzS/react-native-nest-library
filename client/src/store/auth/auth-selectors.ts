import { RootState } from '../store';

const authSelectors = {
  isLoadingSelector: ({ auth }: RootState) => auth.isLoading,
  isSucceedSelector: ({ auth }: RootState) => auth.isSucceed,
  errorSelector: ({ auth }: RootState) => auth.error
};

export default authSelectors;
