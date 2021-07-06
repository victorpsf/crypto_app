import { protocol } from 'electron'
import Default from '../privileges/default'

// Scheme must be registered before the app is ready
export default function(arg = protocol) {
    protocol.registerSchemesAsPrivileged([
        Default
    ])
}