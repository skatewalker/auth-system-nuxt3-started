<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Bienvenido al Dashboard</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Solo los usuarios autenticados pueden ver esta página.
      </p>
      <p v-if="userStore.user.name" class="text-lg font-medium text-gray-800">Hola, {{ userStore.user.name }}!</p>
      <p v-else-if="userStore.user.email" class="text-lg font-medium text-gray-800">Hola, {{ userStore.user.email }}!</p>
      <p v-if="userStore.user.role" class="text-sm text-gray-600">Tu rol: {{ userStore.user.role }}</p>
      <div>
        <button
          @click="handleLogout"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
});

import { useAuth } from '#imports';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';

const { signOut } = useAuth();
const router = useRouter();
const userStore = useUserStore();

const handleLogout = async () => {
  await signOut({ callbackUrl: '/auth/login' });
};
</script>
