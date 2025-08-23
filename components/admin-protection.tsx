"use client";

import { ReactNode } from 'react';
import { isUserAdmin } from '@/lib/auth-client';

interface AdminProtectionProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AdminProtection({ children, fallback }: AdminProtectionProps) {
  const isAdmin = isUserAdmin();

  if (!isAdmin) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}

export function withAdminProtection<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function AdminProtectedComponent(props: P) {
    const isAdmin = isUserAdmin();

    if (!isAdmin) {
      return fallback ? <>{fallback}</> : null;
    }

    return <Component {...props} />;
  };
}
