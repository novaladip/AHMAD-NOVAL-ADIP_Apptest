import {Platform} from 'react-native';

interface Response {
  secure_url: string;
}

export const uploadImageService = async (
  filePath: string,
): Promise<Response> => {
  const formData = new FormData();

  formData.append('file', {
    // @ts-ignore
    uri: Platform.OS === 'android' ? filePath : filePath.replace('file://', ''),
    name: 'image.jpg',
    type: 'image/jpg',
  });
  formData.append('upload_preset', 'sickfits');

  const res = await fetch(
    'https://api.cloudinary.com/v1_1/dwxrp75d0/image/upload',
    {
      method: 'POST',
      body: formData,
    },
  );

  if (res.status !== 200) {
    throw new Error('Upload failed');
  }

  return res.json();
};
