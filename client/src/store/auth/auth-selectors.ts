import { RootState } from '../store';

const authSelectors = {
  isLoadingSelector: (state: RootState) => state.auth.isLoading,
  isSucceedSelector: (state: RootState) => state.auth.isSucceed,
  errorCodeSelector: (state: RootState) => state.auth.errorCode
};

export default authSelectors;
