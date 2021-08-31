import React, {useEffect, useState} from 'react';
import {useRef} from 'react';
import {
  AppRegistry,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {SelectVideo} from '@src/components/SelesctVideo';
import {CaptureVideo} from '@src/components/CaptureVideo';
import firestore from '@react-native-firebase/firestore';
import {AppSpinner} from '@src/components';
import Video from 'react-native-video';

export function RecordVideo() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  let data = useRef<[]>([]);

  function onResult(QuerySnapshot: any) {
    const snapShot = QuerySnapshot.docs;
    console.log('Got Users collection result.', snapShot);
    setList(snapShot);

    data.current = snapShot;
  }

  function onError(error: any) {
    console.error(error);
  }
  useEffect(() => {
    const getVideos = async () => {
      const videos = await (await firestore().collection('videos').get()).docs;
    };
    getVideos();
    const subscriber = firestore()
      .collection('videos')
      .onSnapshot(onResult, onError);

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  useEffect(() => {
    if (data.current) {
      setLoading(false);
    }
  }, [loading]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Video List</Text>
      </View>
      <View style={styles.row}>
        <SelectVideo />
        <View style={styles.seperator} />
        <CaptureVideo />
      </View>
      <VideoList data={list} isLoading={loading} />
    </View>
  );
}
interface Props {
  video: string;
  thumbnail: string;
  onSelect: (data: string) => void;
}
const VideoList = ({data, isLoading}: {data: []; isLoading: boolean}) => {
  let videoRef = useRef();

  const dataToList: Props[] = data.map(item => {
    return {
      ...item._data,
    };
  });

  console.log('videoREf', videoRef);

  const [currentSelectUrl, setSelected] = useState<string>('');
  useEffect(() => {
    videoRef.current?.presentFullscreenPlayer();
  }, []);

  return (
    <>
      <FlatList
        data={dataToList}
        renderItem={({item}) => (
          <VideoCard {...item} onSelect={(uri: string) => setSelected(uri)} />
        )}
        style={[styles.list]}
        contentContainerStyle={{paddingBottom: currentSelectUrl ? 180 : 0}}
        ListEmptyComponent={
          <View style={styles.noData}>
            <Text>No Data</Text>
          </View>
        }
        ListFooterComponent={
          isLoading ? (
            <View style={styles.sppinner}>
              <AppSpinner active={true} />
            </View>
          ) : null
        }
      />
      {currentSelectUrl !== '' ? (
        <Video
          source={{uri: currentSelectUrl}}
          ref={videoRef} // Store reference
          style={styles.backgroundVideo}
          onEnd={() => {
            setSelected('');
          }}
          resizeMode="contain"
          controls={true}
        />
      ) : null}
    </>
  );
};

const VideoCard = ({thumbnail, video, onSelect}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onSelect(video);
      }}>
      <View style={styles.thumbnail}>
        <Image
          source={{uri: thumbnail}}
          style={styles.image}
          resizeMode="stretch"
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    // top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1000,
    height: 180,

    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 120,
  },
  list: {flex: 1, alignSelf: 'stretch', paddingHorizontal: 20},
  sppinner: {alignSelf: 'stretch', height: 120, alignItems: 'center'},
  noData: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 10,
  },
  image: {flex: 1, height: 210},
  thumbnail: {
    alignSelf: 'stretch',
    height: 210,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  header: {
    elevation: 2,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: 67,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  preview: {
    width: '100%',
    height: 55,
  },
  seperator: {
    width: 25,
  },
});
