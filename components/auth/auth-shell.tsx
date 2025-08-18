import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  alternateHref: string;
  alternateText: string;
  alternateCta: string;
  children: ReactNode;
};

export function AuthShell({
  title,
  alternateHref,
  alternateText,
  alternateCta,
  children,
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          className="mx-auto h-12 w-auto"
          height={48}
          width={48}
          src="/logo-b.png"
          alt="GP Manch"
        />
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          {alternateText}{" "}
          <Link href={alternateHref} className="font-medium text-indigo-600 hover:text-indigo-500">
            {alternateCta}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}


