//Verifica se o token está presente antes de acessar determinada rota
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin/usuario', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/programas', '/cursos', '/agenda'],
};
