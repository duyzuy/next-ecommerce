import React from 'react';
const About = () => {
  return <>about page</>;
};

export async function getStaticProps(ctx) {
  return {
    props: {
      data: ''
    }
  };
}
export default About;
