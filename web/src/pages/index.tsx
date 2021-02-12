import { Header } from '../components/sections/Header'
import React from 'react'
import HomeLayout from '../components/layouts/HomeLayout';


const Index = ({
  title,
  subtitle,
  image,
  ctaLink,
  ctaText,
  ...rest
}): JSX.Element => {
  return (
    <>
    {/* @ts-ignore */}
      <HomeLayout/>
    </>
  )

}

export default Index;
