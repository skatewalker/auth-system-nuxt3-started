import { defineStore } from 'pinia';
import { ref, watch } from 'vue'; // Importar watch
import { useFetch } from '#app';
import { useAuth } from '#imports'; // Importar useAuth

export const useUserStore = defineStore('user', () => {
  const loading = ref(false);
  const error = ref(null);

  const { data: authData, status: authStatus } = useAuth(); // Obtener datos de autenticación

  const user = ref({
    id: null,
    name: '',
    username: '',
    email: '',
    role: '',
    profileImg: '',
    posts: [], // Esto podría ser parte de un store de posts, pero lo mantendremos aquí por ahora
    lastLogin: null,
    status: '',
    account: [], // Esto podría ser parte de un store de cuentas, pero lo mantendremos aquí por ahora
    session: [], // Esto podría ser parte de un store de sesiones, pero lo mantendremos aquí por ahora
    createdAt: null,
    updatedAt: null,
  });

  // Observar cambios en authData y authStatus para actualizar el store
  watch(authData, (newAuthData) => {
    if (newAuthData?.user) {
      // Mapear los datos del usuario de NextAuth a tu objeto user del store
      user.value = {
        ...user.value, // Mantener cualquier propiedad existente
        id: newAuthData.user.id || null,
        name: newAuthData.user.name || '',
        email: newAuthData.user.email || '',
        image: newAuthData.user.image || '', // Campo 'image' de NextAuth
        // Puedes mapear más campos si los añades a la sesión de NextAuth (callbacks en [...].ts)
        role: newAuthData.user.role || 'USER', // Asumiendo que el rol viene en la sesión
      };
    } else {
      // Limpiar el usuario si no hay sesión activa
      user.value = {
        id: null,
        name: '',
        username: '',
        email: '',
        role: '',
        profileImg: '',
        posts: [],
        lastLogin: null,
        status: '',
        account: [],
        session: [],
        createdAt: null,
        updatedAt: null,
      };
    }
  }, { immediate: true }); // Ejecutar inmediatamente al cargar el store

  // La propiedad isLoggedIn puede derivarse directamente de authStatus
  const isLoggedIn = computed(() => authStatus.value === 'authenticated');

  const registerUser = async (email, username, password) => {
    try {
      loading.value = true;
      error.value = null;

      const { data, error: fetchError } = await useFetch('/api/auth/register', {
        method: 'POST',
        body: {
          email,
          username,
          password,
        },
      });

      if (fetchError.value) {
        const backendError = fetchError.value.data?.body?.message || 'Error desconocido en el registro';
        throw new Error(backendError);
      }

      return data.value;
    } catch (err) {
      console.error('Error en el store (registerUser):', err.message);
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const registerWithProvider = async () => {}; // Mantener por si se usa en el futuro

  return {
    user,
    isLoggedIn, // Ahora es un computed property
    error,
    loading,
    registerUser,
    // Puedes añadir más acciones o getters aquí
  };
});
