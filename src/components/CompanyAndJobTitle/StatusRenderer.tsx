import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import PropTypes from 'prop-types';
import Redirect from 'common/routing/Redirect';
import Loader from 'common/Loader';
import NotFoundStatus from 'common/routing/NotFound';
import { generateTabURL, PageType, TabType } from 'constants/companyJobTitle';
import FetchBox, { isFetching, isFetched } from 'utils/fetchBox';
import EmptyView from './EmptyView';

type BoxRendererProps<T> = {
  box: FetchBox<T>;
  render: (data: T) => ReturnType<React.FC>;
};

function BoxRenderer<T>({
  box,
  render,
}: BoxRendererProps<T>): ReturnType<React.FC> {
  if (isFetching(box)) {
    return <Loader size="s" />;
  }
  if (isFetched(box)) {
    return render(box.data);
  }
  return null;
}

export default BoxRenderer;

interface DataWithName {
  name: string;
}

function PageBoxRenderer<T extends DataWithName | null>({
  pageName,
  pageType,
  tabType,
  boxSelector,
  render,
}: {
  pageName: string;
  pageType: PageType;
  tabType: TabType;
  boxSelector: (state: RootState) => FetchBox<T>;
  render: (data: NonNullable<T>) => ReturnType<React.FC>;
}): ReturnType<React.FC> {
  /* 處理
   * 1. 當 fetching                   --> 應顯示 Loading (目前由 BoxRenderer 處理)
   * 2. 當 box.data === null          --> 應顯示 NotFoundStatus (後端無公司)
   * 3. 當 box.data.name !== pageName --> 應 Redirect (done)
   * 4. 當 box.data.dataCount === 0   --> 應顯示 NotFoundStatus (後端無資料)
   * 5. 當 box.data.資料 === []       --> 應顯示 NotFoundStatus (通常是 pagination 超出範圍) (交給 render 處理)
   */
  const box = useSelector(boxSelector);
  return (
    <BoxRenderer
      box={box}
      render={(data): ReturnType<React.FC> => {
        if (!data) {
          return (
            <NotFoundStatus status={404}>
              <EmptyView pageName={pageName} />
            </NotFoundStatus>
          );
        }
        if (data.name !== pageName) {
          const path = generateTabURL({
            pageType,
            pageName: data.name,
            tabType,
          });
          return <Redirect to={path} />;
        }
        return render(data);
      }}
    />
  );
}

PageBoxRenderer.propTypes = {
  boxSelector: PropTypes.func.isRequired,
  pageName: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  tabType: PropTypes.string.isRequired,
};

export { PageBoxRenderer };
