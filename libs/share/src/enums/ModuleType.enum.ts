export enum ModuleTypes {
  CRM = 'crm',
  CRM_ENGINEER_PROJECT = 'crm:engineerproject',
  CRM_SALE_PROJECT = 'crm:saleproject',
  HR = 'hr',
  INTRANET = 'intranet',
  INTRANET_APPROVE_BOOKING_CAR = 'intranet:approvebookingcar',
  INTRANET_APPROVE_BOOKING_ROOM = 'intranet:approvebookingroom',
  INTRANET_APPROVE_LEAVE = 'intranet:approveleave',
  /** สำรองไว้ — ปัจจุบัน OT ใช้ INTRANET_APPROVE_LEAVE ร่วมกันโดยตั้งใจ เพราะเป็นผู้อนุมัติชุดเดียวกัน */
  INTRANET_APPROVE_OT = 'intranet:approveot',
  VENDER = 'vender',
  USER = 'user',
}
