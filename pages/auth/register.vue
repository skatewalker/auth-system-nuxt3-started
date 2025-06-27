<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Crear cuenta</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?
          <NuxtLink to="/auth/login" class="font-medium text-indigo-600 hover:text-indigo-500">
            Inicia sesión aquí
          </NuxtLink>
        </p>
        <div v-if="errorMessage" class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded relative" role="alert">
          <span class="block sm:inline">{{ errorMessage }}</span>
        </div>

        <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="name" class="sr-only">Nombre de usuario</label>
              <input
                id="name"
                v-model="username"
                type="text"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nombre de usuario"
              />
            </div>
            <div>
              <label for="email" class="sr-only">Email</label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Contraseña</label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
            <div>
              <label for="confirmPassword" class="sr-only">Confirmar contraseña</label>
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirmar contraseña"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="terms"
                v-model="acceptTerms"
                type="checkbox"
                required
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="terms" class="ml-2 block text-sm text-gray-900">
                Acepto los términos y condiciones
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore(); // Instanciar correctamente

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const acceptTerms = ref(false);

const handleRegister = async () => {
  errorMessage.value = ''; // Limpiar errores anteriores

  // Validaciones del lado del cliente
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Las contraseñas no coinciden';
    return;
  }

  if (!acceptTerms.value) {
    errorMessage.value = 'Debes aceptar los términos y condiciones';
    return;
  }

  try {
    // Llamar a la acción registerUser del store
    await userStore.registerUser(email.value, username.value, password.value);

    // Si el registro es exitoso, redirigir al login
    router.push('/auth/login');
  } catch (error) {
    // El error ya viene con el mensaje del backend o del store
    errorMessage.value = error.message || 'Ocurrió un error durante el registro, Inténtalo de nuevo.';
    console.error('Error en registro (componente):', error);
  }
};
</script>
