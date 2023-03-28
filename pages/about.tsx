import { NextPageContext, GetServerSideProps } from 'next';
import React from 'react';
const About = () => {
  return <>about page 11111</>;
};

const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      data: ''
    }
  };
};
export default About;
