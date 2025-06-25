import React, { Fragment, useEffect } from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'reducers';
import Loader from 'common/Loader';
import { Section } from 'common/base';
import { isUiNotFoundError } from 'utils/errors';
import NotFound from 'common/NotFound';
import CallToActionFolder from 'common/CallToAction/CallToActionFolder';
import FanPageBlock from 'common/FanPageBlock';
import { isFetching, isUnfetched, isError, isFetched } from 'utils/fetchBox';
import {
  queryMenuIfUnfetched,
  queryEntryIfUnfetched,
} from 'actions/laborRights';
import useEntry, { useNeighborEntry } from './useEntry';
import Body from './Body';
import Footer from './Footer';
import Helmet from './Helmet';
import styles from './LaborRightsSingle.module.css';

interface Store {
  dispatch: Dispatch<any>;
  getState(): RootState;
}

interface Match<Params> {
  params: Params;
}

interface ServerSideRender<Params> {
  fetchData: ({
    store,
    match,
  }: {
    store: Store;
    match: Match<Params>;
  }) => Promise<unknown>;
}

type Params = { id: string };

const LaborRightsSingle: React.FC & ServerSideRender<Params> = () => {
  const params = useParams<Params>();
  const entryId = params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryMenuIfUnfetched());
  }, [dispatch]);

  useEffect(() => {
    dispatch(queryEntryIfUnfetched(entryId));
  }, [dispatch, entryId]);

  const entryBox = useEntry(entryId);
  const [prevEntry, nextEntry] = useNeighborEntry(entryId);

  return (
    <Section>
      {(isFetching(entryBox) || isUnfetched(entryBox)) && <Loader />}
      {isError(entryBox) && isUiNotFoundError(entryBox.error) && <NotFound />}
      {isFetched(entryBox) && (
        <Fragment>
          <Helmet
            entryId={entryId}
            seoTitle={entryBox.data.seoTitle || entryBox.data.title}
            seoDescription={
              entryBox.data.seoDescription || entryBox.data.description
            }
            coverUrl={entryBox.data.coverUrl}
          />
          <div>
            <Body
              title={entryBox.data.title}
              seoText={entryBox.data.seoText}
              description={entryBox.data.description}
              content={entryBox.data.content}
            />
            <FanPageBlock className={styles.fanPageBlock} />
            {entryBox.data.nPublicPages < 0 && (
              <Section marginTop>
                <CallToActionFolder />
              </Section>
            )}
            <Footer id={entryId} prev={prevEntry} next={nextEntry} />
          </div>
        </Fragment>
      )}
    </Section>
  );
};

LaborRightsSingle.fetchData = ({
  store: { dispatch },
  match: { params },
}): Promise<unknown> => {
  const entryId = params.id;
  return Promise.all([
    dispatch(queryMenuIfUnfetched()),
    dispatch(queryEntryIfUnfetched(entryId)),
  ]);
};

export default LaborRightsSingle;
