import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';

export function useRequireAuth(redirectTo = '/auth/signin/usuario') {
  const router = useRouter();

  useEffect(() => {
    const { access_token } = parseCookies();

    if (!access_token) {
      router.push(redirectTo);
    }
  }, [router, redirectTo]);
}
