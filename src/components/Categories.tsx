import React, { memo } from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
};

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

const Categories: React.FC<CategoriesProps> = memo(
  ({ value, onClickCategory }) => {
    return (
      <div className='categories'>
        <ul>
          {categories.map((categoryName, index) => (
            <li
              key={categoryName}
              onClick={() => onClickCategory(index)}
              className={value === index ? 'active' : ''}>
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

export default Categories;
