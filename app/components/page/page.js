import { createApp } from 'vue'

import ConfigurationPage from './configuration/configuration.vue'
import DecryptPage from './decrypt/decrypt.vue'
import EncryptPage from './encrypt/encrypt.vue'
import HashPage from './hash/hash.vue'
import KeysPage from './keys/keys.vue' 

export default function (app = createApp()) {
  app.component('configuration-page', ConfigurationPage)
  app.component('decrypt-page', DecryptPage)
  app.component('encrypt-page', EncryptPage)
  app.component('hash-page', HashPage)
  app.component('keys-page', KeysPage)
}