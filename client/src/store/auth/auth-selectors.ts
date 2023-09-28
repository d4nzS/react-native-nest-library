import { RootState } from '../store';

const authSelectors = {
  isLoadingSelector: (state: RootState) => state.auth.isLoading,
  isSucceedSelector: (state: RootState) => state.auth.isSucceed,
  errorSelector: (state: RootState) => state.auth.error
};

export default authSelectors;
