class Api {
    constructor(...paths) {
        this.url = paths.join('/')
        console.log('API created for', this.url)
    }

    request(path, options) {
        options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            ...options
        }

        let url = this.url
        if (path?.length) url += '/' + path

        return new Promise((resolve, reject) => {
            fetch(this.url, options)
                .then(res => {
                    if (!res.ok) throw new Error(res.statusText)
                    return res.json()
                })
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    }

    get(path, options = {}) {
        return this.request(path, options)
    }

    post(path, data, options = {}) {
        return this.request(path, {
            method: 'POST',
            body: JSON.stringify(data),
            ...options
        })
    }

    put(path, data, options = {}) {
        return this.request(path, {
            method: 'PUT',
            body: JSON.stringify(data),
            ...options
        })
    }

    delete(path, data, options = {}) {
        return this.request(path, {
            method: 'DELETE',
            body: data ? JSON.stringify(data) : undefined,
            ...options
        })
    }
}

export default Api