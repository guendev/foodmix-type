import events from 'events'
const eventEmitter = new events.EventEmitter()

import listen from './listener'

function removeFile(path: string) {
    eventEmitter.once('REMOVE_FILE', listen.removeFile)
    eventEmitter.emit('REMOVE_FILE', path)
}

export default {
    removeFile
}
