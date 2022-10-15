import React from 'react';

const MultipleFileUpload = ({handleChange}) => {



  return (
    <>
    <input type= "file" id="multiple" name="multiple" accept="image/*" multiple onChange={handleChange}/>
    </>
  )
}

export default MultipleFileUpload