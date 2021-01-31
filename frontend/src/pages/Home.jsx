import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';

const { REACT_APP_CLOUDINARY_NAME } = process.env;
export default function Home() {
  const [imageIds, setImageIds] = useState();

  const loadImage = async () => {
    try {
      const res = await fetch('/api/images');
      const data = await res.json();
      setImageIds(data);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  // the callback will run anytime something change in the array function
  useEffect(() => {
    loadImage();
  }, []);

  console.log('imageIds :>> ', imageIds);

  return (
    <div>
      <h1 className="title">Cloudinary Gallery</h1>
      {imageIds?.map((imageId, index) => {
        <Image
          key={index}
          cloudName={REACT_APP_CLOUDINARY_NAME}
          publicId={imageId}
          width="300"
          crop="scale"
          angle="10"
        />;
      })}
    </div>
  );
}
