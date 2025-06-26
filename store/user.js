import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetch } from 'nuxt/app'


export const useUserStore = defineStore('user', () => {
    const loading = ref(false)
    const error = ref(null)

    const user = ref({
        id:null,
        name: '',
        username: '',
        email: '',
        role: '',
        profileImg: '',
        posts: [],
        lastLogin: Datetime,
        status: '',
        account: [],
        session: [],
        createdAt: Datetime,
        updatedAt: Datetime,
    })
    const users = ref([])
    const isLoggedIn = ref(false)

    const validatePassword = (password) => {
        const minLength = 8
        return {
            isValid: password.length >= minLength,
            errors: {
                length: password.length < minLength
            }
        }
    }

    const registerUser = async (email, username, password, confirmPassword) => {
        try {
            loading.value = true
            error.value = ''

            // Validaciones del lado del cliente
            if (password !== confirmPassword) {
                throw new Error('Las contraseñas no coinciden')
            }

            const passwordValidation = validatePassword(password)
            if (!passwordValidation.isValid) {
              throw new Error('La contraseña no cumple con los requisitos mínimos')
            }

            const response = await fetch("/api/auth/register", {
                method: 'POST',
                body: {
                    email,
                    username,
                    password
                }
            })
            if (response.error) {
                return response.error
            }
            return response.data
        } catch (error) {
            console.error("Error en el store")
        }
    }

    const registerWithProvider = async () => {
        
    }

    return {
        user,
        isLoggedIn,
        error,
        loading,
        registerUser
    }

})
