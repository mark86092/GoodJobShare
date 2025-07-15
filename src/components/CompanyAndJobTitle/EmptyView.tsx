import React from 'react';
import { Section, P } from 'common/base';
import styles from './EmptyView.module.css';
import { TabType, tabTypeTranslation } from 'constants/companyJobTitle';

type EmptyViewProps = {
  pageName: string;
  tabType?: TabType;
};

const EmptyView: React.FC<EmptyViewProps> = ({ pageName, tabType }) => (
  <Section Tag="main" paddingBottom>
    <P size="l" bold className={styles.searchNoResult}>
      尚未有「
      {pageName}
      」的
      {tabType ? tabTypeTranslation[tabType] : '資料'}
      <br />
      搜尋看看其他？
    </P>
  </Section>
);

export default EmptyView;
