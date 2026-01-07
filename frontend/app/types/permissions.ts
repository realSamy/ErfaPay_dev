export const PERMISSIONS = [
  // User Management
  'view_users',
  'create_support_user',
  'update_user',
  'block_user',
  'unblock_user',
  'deactivate_user',

  // Service (Product/Category) Management
  'manage_services',           // Full access (create/update/delete/list)
  'create_service',
  'update_service',
  'delete_service',
  'view_services_admin',
  'create_category',
  'update_category',
  'delete_category',

  // Order Management
  'view_orders',
  'view_all_orders',           // Admin view all users' orders
  'process_order',             // Change status, add notes
  'reject_order',
  'approve_order',

  // Wallet & Charge Management
  'view_wallet',
  'view_charge_history',
  'view_all_wallets',          // Admin view others
  'approve_charge',            // Manual review for voucher/crypto

  // Ticket/Support System
  'view_tickets',
  'view_all_tickets',          // Support/Admin view all
  'reply_ticket',
  'assign_ticket',
  'update_ticket_status',
  'update_ticket_priority',
  'close_ticket',
  'send_bulk_emails',

  // Profile & Settings
  'view_profile',
  'update_own_profile',

  // Dashboard & Reports
  'view_dashboard',
  'view_reports',
  'export_reports',

  // Site Settings (tax, hours, etc.)
  'manage_site_settings',


  'view_financial_reports',
] as const

export type Permission = typeof PERMISSIONS[number]