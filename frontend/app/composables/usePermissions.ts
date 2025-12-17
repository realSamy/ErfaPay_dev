import type {UserRole} from '~/types/users'
import type {Permission} from "~/types/permissions";

export const usePermissions = () => {
  const {user} = useAuth()

  const hasRole = (requiredRole: UserRole): boolean => {
    const roleOrder: Record<UserRole, number> = {
      main_admin: 4,
      senior_support: 3,
      simple_support: 2,
      regular: 1,
    }
    return roleOrder[user.value?.role || 'regular'] >= roleOrder[requiredRole]
  }

  const hasPermission = (permission: Permission): boolean => {
    const permissionsMap: Record<UserRole, Permission[]> = {
      main_admin: [
        'view_users', 'create_support_user', 'update_user', 'block_user', 'unblock_user', 'deactivate_user',
        'manage_services', 'create_service', 'update_service', 'delete_service', 'view_services_admin',
        'create_category', 'update_category', 'delete_category',
        'view_all_orders', 'process_order', 'reject_order', 'approve_order',
        'view_all_wallets', 'approve_charge',
        'view_all_tickets', 'reply_ticket', 'assign_ticket', 'update_ticket_status', 'update_ticket_priority', 'close_ticket',
        'view_dashboard', 'view_reports', 'export_reports',
        'manage_site_settings',
      ],
      senior_support: [
        'view_users', 'update_user', 'block_user', 'unblock_user',
        'manage_services', 'create_service', 'update_service', 'delete_service', 'view_services_admin',
        'create_category', 'update_category', 'delete_category',
        'view_all_orders', 'process_order', 'reject_order', 'approve_order',
        'view_all_wallets', 'approve_charge',
        'view_all_tickets', 'reply_ticket', 'assign_ticket', 'update_ticket_status', 'update_ticket_priority', 'close_ticket',
        'view_dashboard', 'view_reports',
      ],
      simple_support: [
        'view_all_tickets', 'reply_ticket', 'assign_ticket', 'update_ticket_status', 'close_ticket',
      ],
      regular: [
        'view_profile', 'update_own_profile',
        'view_wallet', 'view_charge_history',
        'view_orders',
        'view_tickets',
      ],
    }
    return permissionsMap[user.value?.role || 'regular'].includes(permission)
  }

  return {
    hasRole,
    hasPermission,
    isRegular: computed(() => user.value?.role === 'regular'),
    isSimpleSupport: computed(() => user.value?.role === 'simple_support'),
    isSeniorSupport: computed(() => user.value?.role === 'senior_support'),
    isMainAdmin: computed(() => user.value?.role === 'main_admin'),
  }
}