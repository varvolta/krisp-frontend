import { API_BASE_URL, API_CANDIDATES_ENDPOINT } from '../constants/api'
import Api from '../services/api'

class CandidatesApi extends Api {
    constructor() {
        super(API_BASE_URL, API_CANDIDATES_ENDPOINT)
    }
}

export default CandidatesApi