import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {createThumbnail} from 'react-native-create-thumbnail';
import {ProcessingManager} from 'react-native-video-processing';
import firestore from '@react-native-firebase/firestore';

export const SelectVideo = () => {
  const [loading, setLoading] = useState(false);

  function upload(data: any) {
    firestore().collection('videos').doc().set(data);
    setLoading(false);
  }
  function compressVideo(path: string) {
    return async () => {
      const origin = await ProcessingManager.getVideoInfo(path);
      const result = await ProcessingManager.compress(path, {
        width: origin.size && origin.size.width / 5,
        height: origin.size && origin.size.height / 5,
        bitrateMultiplier: 7,
        // minimumBitrate: 10000,
      });

      return {path: result.source};
    };
  }

  const creatThumbnailImage = async (video: string) => {
    const compress = await compressVideo(video);

    const videoPath = (await compress()).path;

    createThumbnail({
      url: video,
      timeStamp: 10000,
    })
      .then(response => {
        console.log('response -->>>', response);

        const dataToServer = {
          video: videoPath,
          thumbnail: response.path,
        };

        upload(dataToServer);
      })
      .catch(err => console.log({err}));
  };
  const pickVideo = () => {
    if (loading) {
      return null;
    }

    ImagePicker.openPicker({mediaType: 'video'}).then(response => {
      setLoading(true);
      creatThumbnailImage(response.path);
    });
  };

  return (
    <>
      <TouchableOpacity style={styles.select} onPress={pickVideo}>
        {<Text style={styles.text}>{loading ? 'loading ...' : 'Select'}</Text>}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  select: {
    height: 55,
    borderRadius: 8,
    borderColor: '#FDE460',
    borderWidth: 2,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
  },
});
