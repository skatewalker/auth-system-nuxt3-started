import { useAuth } from '#imports';

export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth();

  // Si el usuario no está autenticado y está intentando acceder a una ruta protegida
  // (en este caso, cualquier ruta que use este middleware)
  if (status.value === 'unauthenticated') {
    // Redirigir al usuario a la página de login
    return navigateTo('/auth/login');
  }
});
