import { FC , Dispatch } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface Props {
    goToFlatlistTop: () => void
}

const FlatListFooterContainer: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
        <View style={{flex: 2, justifyContent: 'flex-end', }}>
            <Text style={styles.signature}>All rights reserved ©</Text>  
        </View>

        <View style={{flex: 1}}>
            <TouchableOpacity onPress={props.goToFlatlistTop} style={styles.button}>
                <Text style={styles.buttonText}>Наверх</Text>
            </TouchableOpacity>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signature: {
    fontStyle: 'italic',
    color: '#666',
    fontSize: 11
  },
});

export default FlatListFooterContainer;
