// Component for displaying the Section Header.
import React, { Component } from 'react'
import RichText from './Richtext';


const PrimitiveTextContent = ({body}) => {
  return (
    <RichText content={body.content} />
  )
}


export default PrimitiveTextContent;