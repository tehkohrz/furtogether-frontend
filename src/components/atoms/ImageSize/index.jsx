import React from 'react'


const ImageSize = ({imageSrc, imageAlt, height, width}) => {

  return (
    <>
    <img src={imageSrc} alt={imageAlt} height={height} width={width}/>
    </>
  )
}

export default ImageSize