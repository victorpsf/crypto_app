import ConfigurationPage from './configuration/configuration.vue'
import DecryptPage       from './decrypt/decrypt.vue'
import EncryptPage       from './encrypt/encrypt.vue'
import HashPage          from './hash/hash.vue'

export default [
  { name: 'configuration-page', el: ConfigurationPage},
  { name: 'decrypt-page',       el: DecryptPage},
  { name: 'encrypt-page',       el: EncryptPage},
  { name: 'hash-page',          el: HashPage}
]