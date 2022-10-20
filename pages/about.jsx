import React from 'react';
const About = () => {
  return <>about page 11111</>;
};

export async function getServerSideProps(ctx) {
  console.log(ctx);
  return {
    props: {
      data: ''
    }
  };
}
export default About;
