export enum BuyStatus {
  successful = 'SUCCESSFUL',
  failed = 'FAILED',
  inProgress = 'IN_PROGRESS',
}

export enum PaymentRecordStatus {
  pendingAuthorization = 'PendingAuthorization',
  authorized = 'Authorized',
  paid = 'Paid',
  refunded = 'Refunded',
  error = 'Error',
}

export const recordStatusToBuyStatus: Record<PaymentRecordStatus, BuyStatus> = {
  [PaymentRecordStatus.pendingAuthorization]: BuyStatus.inProgress,
  [PaymentRecordStatus.authorized]: BuyStatus.successful,
  [PaymentRecordStatus.paid]: BuyStatus.successful,
  [PaymentRecordStatus.refunded]: BuyStatus.successful,
  [PaymentRecordStatus.error]: BuyStatus.failed,
};
