import React from 'react';
import ContentLoader from 'react-content-loader';

const FullPizzaSkeleton: React.FC = () => (
  <ContentLoader
    speed={0}
    width={1100}
    height={450}
    viewBox='0 0 1100 450'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    className='pizza-block-full-wrapper'>
    <circle cx='232' cy='227' r='215' />
    <rect x='600' y='39' rx='10' ry='10' width='255' height='35' />
    <rect x='495' y='154' rx='12' ry='12' width='457' height='135' />
    <rect x='494' y='345' rx='10' ry='10' width='116' height='35' />
    <rect x='850' y='336' rx='10' ry='10' width='116' height='35' />
  </ContentLoader>
);

export default FullPizzaSkeleton;
