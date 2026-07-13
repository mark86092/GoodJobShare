export enum BuyStatus {
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED',
  IN_PROGRESS = 'IN_PROGRESS',
}

export enum PaymentRecordStatus {
  PENDING_AUTHORIZATION = 'PendingAuthorization',
  AUTHORIZED = 'Authorized',
  PAID = 'Paid',
  REFUNDED = 'Refunded',
  ERROR = 'Error',
}

export const recordStatusToBuyStatus: Record<PaymentRecordStatus, BuyStatus> = {
  [PaymentRecordStatus.PENDING_AUTHORIZATION]: BuyStatus.IN_PROGRESS,
  [PaymentRecordStatus.AUTHORIZED]: BuyStatus.SUCCESSFUL,
  [PaymentRecordStatus.PAID]: BuyStatus.SUCCESSFUL,
  [PaymentRecordStatus.REFUNDED]: BuyStatus.SUCCESSFUL,
  [PaymentRecordStatus.ERROR]: BuyStatus.FAILED,
};
