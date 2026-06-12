import cn from 'classnames';
<<<<<<<< HEAD:src/components/SearchBar/SearchBar.js
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import SearchTextInput from 'common/form/TextInput/SearchTextInput';
import Magnifiner from 'common/icons/Magnifiner';
import { useQuery } from 'hooks/routing';
import { queryFromQuerySelector } from 'selectors/routing';
========
import React, { useCallback } from 'react';

import SearchTextInput from 'common/form/TextInput/SearchTextInput';
import Magnifiner from 'common/icons/Magnifiner';

import styles from './SearchBar.module.css';
import useSearchQuery from './useSearchQuery';
>>>>>>>> upstream/master:src/components/common/SearchBar/SearchBar.js

import styles from './SearchBar.module.css';

const SearchBar = () => {
  const [searchText, setSearchText, gotoSearchResult] = useSearchQuery();

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      gotoSearchResult(searchText);
    },
    [gotoSearchResult, searchText],
  );

  return (
    <form
      className={cn(styles.section, styles.searchbar)}
      onSubmit={handleSubmit}
    >
      <SearchTextInput
        wrapperClassName={styles.textInputWrapper}
        className={styles.textInput}
        value={searchText}
        onChange={setSearchText}
        placeholder="搜全站薪水/面試/評價"
        onSelected={gotoSearchResult}
      />
      <button type="submit" className={styles.searchBtn}>
        <Magnifiner />
        搜尋
      </button>
    </form>
  );
};

export default SearchBar;
