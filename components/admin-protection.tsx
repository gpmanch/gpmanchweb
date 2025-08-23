"use client";

import { ReactNode } from 'react';
import { useAuth } from '@/components/context/auth-context';

interface AdminProtectionProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AdminProtection({ children, fallback }: AdminProtectionProps) {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin;

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
    const { user } = useAuth();
    const isAdmin = user?.isAdmin;

    if (!isAdmin) {
      return fallback ? <>{fallback}</> : null;
    }

    return <Component {...props} />;
  };
}
