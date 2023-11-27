import { useMemo, useState } from 'react'
import s from './Main.module.css'
import Intro from '../../components/Intro'
import Header from '../../components/Header'
import Button from '../../components/button'
import CreateSubscription from '../../features/CreateSubscription'
import CandidatesApi from '../../api/candidatesApi'
import SubscriptionsApi from '../../api/subscriptionsApi'
import logo from '../../assets/images/logo.svg'
import Subscription from '../../components/Subscription'
import Subscriptions from '../../features/Subscriptions'

const Main = () => {
    const candidatesApi = useMemo(() => new CandidatesApi(), [])
    const subscriptionsApi = useMemo(() => new SubscriptionsApi(), [])
    const [subscriptions, setSubscriptions] = useState([])

    const handleSubscriptionSelect = ({ languages, experiences, positions, salaryFrom, salaryTo }) => {
        const data = {
            languages: languages.map(({ key }) => key),
            experiences: experiences.map(({ key }) => key),
            positions: positions.map(({ key }) => key),
            salaryFrom,
            salaryTo
        }
    }

    return (
        <div className={s.main}>
            <Header title={'Welcome to Dev Hunter'} right={<Button>Generate new candidates</Button>} logo={logo} />
            <div className={s.content}>
                <CreateSubscription onCreate={subscription => setSubscriptions(value => [...value, subscription])} />
                <Subscriptions subscriptions={subscriptions} onSelect={handleSubscriptionSelect} />
            </div>
            {/* <Intro /> */}
        </div>
    )
}

export default Main