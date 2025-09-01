
import configs from './config.main.json'
import solanaConfigs  from './config.solana.main.json'

export default {
    ...configs,
    solana: {
        ...solanaConfigs
    }
}