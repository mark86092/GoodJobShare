import React from 'react';

import OverallRating from 'common/OverallRating';
import Card from 'common/Card';

import styles from './styles.module.css';
import ScoreDistributionChart from './ScoreDistributionChart';
import { RatingDistribution } from 'apis/aspectRatingStatistics';

type SummaryProps = {
  averageRating: number;
  ratingDistribution: RatingDistribution[];
  ratingCount: number;
};

const Summary: React.FC<SummaryProps> = ({
  averageRating,
  ratingDistribution,
  ratingCount,
}) => {
  const distributionMap = new Map<number, number>(
    ratingDistribution.map((item: RatingDistribution) => [
      item.rating,
      item.count,
    ]),
  );

  const rows: RatingDistribution[] = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: distributionMap.get(rating) || 0,
  }));

  const totalCount =
    typeof ratingCount === 'number'
      ? ratingCount
      : rows.reduce((sum, { count }) => sum + count, 0);

  return (
    <Card className={styles.summary}>
      <div className={styles.header}>
        <div className={styles.scoreBlock}>
          <div className={styles.value}>{averageRating.toFixed(1)}</div>
          <OverallRating rating={averageRating} size="m" />
          <div className={styles.meta}>評分數：{totalCount}</div>
        </div>
        <div className={styles.distribution}>
          <div className={styles.scoreDistribution}>
            <ScoreDistributionChart data={rows} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Summary;
