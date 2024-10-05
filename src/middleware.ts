import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin/usuario', request.url));
  }
  
  try {
    const decodedToken: any = jwtDecode(token.value);

    if (decodedToken.tipo === 'BENEFICIARIO') {

      if (request.nextUrl.pathname !== '/home') {
        return NextResponse.redirect(new URL('/home', request.url));
      }
    } else if (decodedToken.tipo === 'ADMINISTRADOR') {

      if (request.nextUrl.pathname !== '/Administrador/dashboard') {
        return NextResponse.redirect(new URL('Administrador/dashboard', request.url));
      }

    }

  } catch (error) {
    return NextResponse.redirect(new URL('/auth/signin/usuario', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home', '/programas', '/cursos', '/agenda', '/Administrador/dashboard'],
};
