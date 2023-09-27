import { RootState } from '../store';

const authSelectors = {
  isLoadingSelector: (state: RootState) => state.auth.isLoading,
  errorCodeSelector: (state: RootState) => state.auth.errorCode
};

export default authSelectors;
