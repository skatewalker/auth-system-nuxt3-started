import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  // your authentication configuration here!
  providers: [
    
  ]
})