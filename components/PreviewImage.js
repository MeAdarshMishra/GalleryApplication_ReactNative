import React from 'react';
import { Text, StyleSheet, View, Pressable, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PreviewImage = (props) => {
  return (
    <View style={styles.previewImage}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Preview <Icon name={'image'} size={35} color={'white'} />
        </Text>
        <Pressable
          style={styles.goBack}
          android_ripple={{ color: 'gray', borderless: true }}
          onPress={() => {
            props.navigation.navigate('CollectionImages');
          }}>
          <Icon name={'caret-left'} size={55} color={'white'} />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Image
          source={{
            uri:
              (props.route &&
                props.route.params &&
                props.route.params.previewUrl) ||
              'https://picsum.photos/id/1000/600/900',
          }}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default PreviewImage;

const styles = StyleSheet.create({
  previewImage: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
  },
  body: {
    flex: 9,
  },
  headerText: {
    flex: 1,
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  goBack: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '20%',
    padding: 20,
    justifyContent: 'center',
    fontSize: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
