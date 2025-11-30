# apps/users/permissions.py
from rest_framework.permissions import BasePermission

class IsMainAdmin(BasePermission):
    """Only main_admin role"""
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            hasattr(request.user, 'role') and
            request.user.role == 'main_admin'
        )

class IsSeniorSupportOrAbove(BasePermission):
    """main_admin + senior_support"""
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            hasattr(request.user, 'role') and
            request.user.role in ['main_admin', 'senior_support']
        )

class IsSupportStaff(BasePermission):
    """main_admin + senior_support + simple_support"""
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            hasattr(request.user, 'role') and
            request.user.role in ['main_admin', 'senior_support', 'simple_support']
        )