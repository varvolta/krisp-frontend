import { API_BASE_URL, API_CANDIDATES_ENDPOINT } from '../constants/api'
import Api from '../services/api'

class CandidatesApi extends Api {
    constructor() {
        super(API_BASE_URL, API_CANDIDATES_ENDPOINT)
    }

    createMany(candidates) {
        return this.post('', { candidates })
    }

    getBySubscriptionId(id) {
        return this.get(id)
    }
}

export default CandidatesApi