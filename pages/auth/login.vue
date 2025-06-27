<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          ¿No tienes cuenta?
          <NuxtLink to="/auth/register" class="font-medium text-indigo-600 hover:text-indigo-500">
            Regístrate aquí
          </NuxtLink>
        </p>
        <div v-if="errorMessage" class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded relative" role="alert">
          <span class="block sm:inline">{{ errorMessage }}</span>
        </div>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email"
            >
          </div>
          <div>
            <label for="password" class="sr-only">Contraseña</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Contraseña"
            >
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="rememberMe"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            >
            <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Recordarme </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Iniciar sesión
          </button>
        </div>

        <div class="mt-6">
          <button
            type="button"
            @click="handleGoogleLogin"
            class="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <img src="/img/svg/google-icon.svg" alt="Google icon" class="w-5 h-5 mr-2" />
            Iniciar sesión con Google
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const errorMessage = ref('');

const { signIn } = useAuth();
const router = useRouter();

const handleLogin = async () => {
  errorMessage.value = ''; // Limpiar errores anteriores
  try {
    const { error } = await signIn('credentials', {
      email: email.value,
      password: password.value,
      redirect: true,
      callbackUrl: '/', // Redirigir a la página principal después del login
    });

    if (error) {
      errorMessage.value = 'Credenciales inválidas. Por favor, verifica tu email y contraseña.';
      console.error('Error en login:', error);
    } else {
      // Si no hay error, el login fue exitoso y el usuario será redirigido por callbackUrl
      // No necesitamos hacer router.push aquí si callbackUrl está configurado
    }
  } catch (error) {
    errorMessage.value = 'Ocurrió un error inesperado. Inténtalo de nuevo.';
    console.error('Error en login (catch):', error);
  }
};

const handleGoogleLogin = async () => {
  errorMessage.value = '';
  try {
    await signIn('google', { callbackUrl: '/' });
  } catch (error) {
    errorMessage.value = 'Error al iniciar sesión con Google.';
    console.error('Error en Google login:', error);
  }
};
</script>
