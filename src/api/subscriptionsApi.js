import { API_BASE_URL, API_SUBSCRIPTIONS_ENDPOINT } from '../constants/api'
import Api from '../services/api'

class SubscriptionsApi extends Api {
    constructor() {
        super(API_BASE_URL, API_SUBSCRIPTIONS_ENDPOINT)
    }
}

export default SubscriptionsApi