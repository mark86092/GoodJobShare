import cn from 'classnames';
import React from 'react';

import { P } from 'common/base';
import ButtonImpl from 'common/button/Button';
import editorStyles from 'common/Editor.module.css';
import Question from 'common/icons/Question';
import Modal from 'common/Modal';

import styles from './InfoModal.module.css';

// Button 還是 JS，TS 會把它解構到的每個參數都當成必填。比照
// common/FormBuilder 的 OptionPill 用 cast 收斂成實際會用到的那幾個
type ButtonProps = {
  btnStyle?: string;
  circleSize?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};
const Button = ButtonImpl as React.FC<ButtonProps>;

type InfoModalOwnProps = {
  isOpen: boolean;
  close: () => void;
};

type InfoModalProps = React.PropsWithChildren<
  InfoModalOwnProps & {
    title: string;
  }
>;

const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  close,
  title,
  children,
}) => (
  <Modal
    isOpen={isOpen}
    hasClose
    close={close}
    closableOnClickOutside
    contentClassName={styles.content}
  >
    <div>
      <Question
        style={{
          fill: '#FCD406',
          height: '82px',
          width: '82px',
          marginBottom: '32px',
        }}
      />
    </div>
    <P
      style={{
        fontSize: '2rem',
        marginBottom: '47px',
      }}
    >
      {title}
    </P>
    <div className={cn(editorStyles.editor, 'alignLeft')}>
      {children}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '40px',
        }}
      >
        <Button btnStyle="black" circleSize="md" onClick={close}>
          OK，我瞭解了
        </Button>
      </div>
    </div>
  </Modal>
);

export const InfoTimeModal: React.FC<InfoModalOwnProps> = props => (
  <InfoModal title="參考時間" {...props}>
    若分享該筆資料的使用者已離職，則參考時間為
    <strong>離職年、月</strong>。<br />
    若尚在職，則為
    <strong>分享資料的年、月</strong>。
  </InfoModal>
);

export const InfoSalaryModal: React.FC<InfoModalOwnProps> = props => (
  <InfoModal title="時薪估計方式" {...props}>
    <ul>
      <li>當薪資種類為「時薪」：無需估算</li>
      <li>
        當薪資種類為「日薪」：以 <strong>日薪 ÷ 工作日實際工時</strong> 估算
      </li>
      <li>
        當薪資種類為「月薪」：以{' '}
        <strong>
          (月薪 × 12) ÷ (52 × 每週平均工時 - (12天國假 + 7天特休) ×
          工作日實際工時)
        </strong>{' '}
        估算
      </li>
      <li>
        當薪資種類為「年薪」：以{' '}
        <strong>
          年薪 ÷ (52 × 每週平均工時 - (12天國假+7天特休) × 工作日實際工時)
        </strong>{' '}
        估算
      </li>
    </ul>
  </InfoModal>
);
