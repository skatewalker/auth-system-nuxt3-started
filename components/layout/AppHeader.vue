<template>
  <nav class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex-shrink-0 flex items-center">
          <NuxtLink to="/" class="text-xl font-bold text-indigo-600">AuthApp</NuxtLink>
        </div>
        <div class="flex gap-4">
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NuxtLink
              to="/"
              class="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600"
            >
              Home
            </NuxtLink>

            <template v-if="status === 'unauthenticated'">
              <NuxtLink
                to="/auth/login"
                class="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600"
              >
                Login
              </NuxtLink>
              <NuxtLink
                to="/auth/register"
                class="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600"
              >
                Register
              </NuxtLink>
            </template>

            <template v-else>
              <NuxtLink
                to="/dashboard"
                class="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600"
              >
                Dashboard
              </NuxtLink>
              <button
                @click="handleLogout"
                class="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600"
              >
                Logout
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuth } from '#imports';

const { status, signOut } = useAuth();

const handleLogout = async () => {
  await signOut({ callbackUrl: '/auth/login' });
};
</script>
