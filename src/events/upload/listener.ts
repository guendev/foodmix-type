import fs from 'fs'

const removeFile = (path: string) => {
    try {
        fs.unlinkSync(path)
    } catch (e) {}
}

export default {
    removeFile
} as const
