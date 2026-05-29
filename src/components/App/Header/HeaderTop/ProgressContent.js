import React from 'react';

import { Wrapper } from 'common/base';
import ProgressBarWithDataCount from 'common/ProgressBarWithDataCount';

import styles from './ProgressContent.module.css';

const ProgressContent = () => (
  <Wrapper size="l" className={styles.wrapper}>
    <div className={styles.heading}>\ 「職場透明化運動」進行中 /</div>
    <ProgressBarWithDataCount size="s" theme="black" />
    <div className={styles.subheading}>
      匿名分享你的面試經驗，一起建立台灣最大面試資料庫！
    </div>
    <div className={styles.button}>GO !</div>
  </Wrapper>
);

export default ProgressContent;
