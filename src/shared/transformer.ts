function transformerKey<T>(obj: { [key: string]: any }, keys: string[]): T {
    const _obj: { [key: string]: any } = {}
    keys.forEach(key => {
        _obj[key] = obj[key]
    })
    return _obj as T
}

export default transformerKey
