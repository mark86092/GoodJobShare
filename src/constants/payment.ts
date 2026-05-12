export enum BuyStatus {
  successful = 'SUCCESSFUL',
  failed = 'FAILED',
  inProgress = 'IN_PROGRESS',
}

export enum PaymentRecordStatus {
  PENDING_AUTHORIZATION = 'PendingAuthorization',
  AUTHORIZED = 'Authorized',
  PAID = 'Paid',
  REFUNDED = 'Refunded',
  ERROR = 'Error',
}

export const recordStatusToBuyStatus: Record<PaymentRecordStatus, BuyStatus> = {
  [PaymentRecordStatus.PENDING_AUTHORIZATION]: BuyStatus.inProgress,
  [PaymentRecordStatus.AUTHORIZED]: BuyStatus.successful,
  [PaymentRecordStatus.PAID]: BuyStatus.successful,
  [PaymentRecordStatus.REFUNDED]: BuyStatus.successful,
  [PaymentRecordStatus.ERROR]: BuyStatus.failed,
};
