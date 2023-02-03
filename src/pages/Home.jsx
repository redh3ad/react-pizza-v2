import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useRef } from 'react';

export default function Home() {
  const { currentPage, categoryId, sort } = useSelector(
    (state) => state.filter,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { searchValue } = useContext(SearchContext);

  const onClickCategory = useCallback((id) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://630fb35336e6a2a04ee0239b.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        const allPizzas = res.data;
        setItems(allPizzas);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        currentPage,
        categoryId,
        sortProperty: sort.sortProperty,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty,
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
