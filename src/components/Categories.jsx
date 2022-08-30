import React, { useState } from 'react';

export default function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const Categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  return (
    <div className='categories'>
      <ul>
        {Categories.map((category, index) => (
          <li
            key={category}
            onClick={() => setActiveIndex(index)}
            className={activeIndex === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
