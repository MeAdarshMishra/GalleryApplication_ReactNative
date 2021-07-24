import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  View,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const CollectionImages = ({ navigation, route }) => {
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(
    (route && route.params && route.params.collectionIndex) || 0
  );

  useEffect(() => {
    axios
      .get(`https://picsum.photos/v2/list?page=${pageNumber}&limit=20`)
      .then((res) => {
        const data = res && res.data;
        setImages([...images, ...data]);
      });
  },
   [pageNumber]);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <View style={styles.collectionsComponent}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Images <Icon name={'image'} size={35} color={'white'} />
        </Text>
        <Pressable
          style={styles.goBack}
          android_ripple={{ color: 'gray', borderless: true }}
          onPress={() => {
            navigation.navigate('Collections');
          }}>
          <Icon name={'caret-left'} size={55} color={'white'} />
        </Pressable>
      </View>

      <View style={styles.body}>
        <ScrollView
          onScroll={(event) => {
            console.log('scrolling');
            if (isCloseToBottom(event.nativeEvent)) {
              setPageNumber(pageNumber + 1);
            }
          }}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContainerStyles}>
          {images.map((item, index) => {
            let imageUrl = item.download_url;
            imageUrl = imageUrl.substring(0, imageUrl.lastIndexOf('/')); 
            imageUrl = imageUrl.substring(0, imageUrl.lastIndexOf('/')); 
            imageUrl = imageUrl + '/200';
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate('PreviewImage', {
                    previewUrl: item.download_url,
                  });
                }}
                style={{ ...styles.collection }}
                android_ripple={{
                  color: 'lightgray',
                  borderless: true,
                }}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default CollectionImages;

const styles = StyleSheet.create({
  collectionsComponent: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
  },
  headerText: {
    flex: 1,
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  body: {
    flex: 9,
  },
  scroll: {
    flex: 1,
  },
  scrollContainerStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    flexWrap: 'wrap',
  },
  collection: {
    height: 150,
    width: '31.33%',
    borderRadius: 10,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
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
});
