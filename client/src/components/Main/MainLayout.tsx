import { FC, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import Loader from '../UI/Loader';
import Blur from '../UI/Blur';
import useAppSelector from '../../hooks/use-app-selector';
import userSelectors from '../../store/user/user-selectors';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const isUserLoading = useAppSelector(userSelectors.isLoadingSelector);

  return (
    <>
      <View style={styles.mainLayout}>
        {children}
      </View>
      {isUserLoading && (
        <Blur>
          <Loader size={20}/>
        </Blur>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainLayout: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 24
  }
});

export default MainLayout;
