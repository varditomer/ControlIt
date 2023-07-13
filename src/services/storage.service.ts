function saveToStorage(key: string, val: any) {
    sessionStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key: string) {
    var val: any = sessionStorage.getItem(key)
    return JSON.parse(val)
}

function removeFromStorage(key: string) {
    return sessionStorage.removeItem(key)
}

function clearStorage() {
    sessionStorage.clear()
}

export const storageService = {
    saveToStorage,
    loadFromStorage,
    removeFromStorage,
    clearStorage
}
