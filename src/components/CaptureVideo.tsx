import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {createThumbnail} from 'react-native-create-thumbnail';
import {ProcessingManager} from 'react-native-video-processing';
import firestore from '@react-native-firebase/firestore';
export const CaptureVideo = () => {
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
        const dataToServer = {
          video: videoPath,
          thumbnail: response.path,
        };

        upload(dataToServer);
      })
      .catch(err => console.log({err}));
  };

  const recordVideo = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
    }).then(image => {
      setLoading(true);
      creatThumbnailImage(image.path);
    });
  };

  return (
    <TouchableOpacity style={styles.select} onPress={recordVideo}>
      <Text style={styles.text}>{loading ? 'uploading...' : 'Capture'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  select: {
    height: 55,
    borderRadius: 8,
    borderColor: '#FDE460',
    borderWidth: 2,
    backgroundColor: '#FDE460',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
});
