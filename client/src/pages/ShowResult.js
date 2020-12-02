import React, { useState, useEffect, useCallback } from 'react';
import Card from '../components/common/Card';
import GlobalLayout from '../components/base/GlobalLayout';
import { MOBILE_MAX_WIDTH } from '../domain/constants';
import styled from '@emotion/styled';
import Pagination from '../components/common/Pagination';
import stocksApi from '../api/stock';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  padding: 0 20%;
  max-width: ${MOBILE_MAX_WIDTH};
  margin: 2rem;
`;

const ShowResult = () => {
  const filters = useSelector((state) => state.filters);
  const [resultStocks, setResultStocks] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
  ]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const STOCK_PER_PAGE = 5;

  useEffect(() => {
    const result =
      filters.length &&
      stocksApi.filterStocks(filters).then((res) => {
        const { data } = res;
        console.log(res);
        return data;
      });
  }, [filters]);

  const indexOfLastPost = currentPage * STOCK_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - STOCK_PER_PAGE;
  const currentStocks = resultStocks.slice(indexOfFirstPost, indexOfLastPost);

  const onRemove = (id) => {
    const filteredStocks = resultStocks.filter((stock) => stock !== id);
    setResultStocks(filteredStocks);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <GlobalLayout>
      <Layout>
        {currentStocks.map((stock) => (
          <Card index={stock} id={stock} onRemove={onRemove} />
        ))}
        <Pagination
          stockPerPage={STOCK_PER_PAGE}
          totalStocks={10}
          paginate={paginate}
        />
      </Layout>
    </GlobalLayout>
  );
};

export default ShowResult;
