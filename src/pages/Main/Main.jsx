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

const Main = () => {
    const candidatesApi = useMemo(() => new CandidatesApi(), [])
    const subscriptionsApi = useMemo(() => new SubscriptionsApi(), [])
    const [subscriptions, setSubscriptions] = useState([])
    const [selectedSubscriptionIndex, setSelectedSubscriptionIndex] = useState()

    const renderSubscriptions = (subscriptions) => {
        if (subscriptions.length) {
            return (
                <>
                    <div className={s.title}>Your subscriptions</div>
                    <div className={s.subscriptions}>
                        {subscriptions.map((subscription, index) => (
                            <Subscription
                                key={index}
                                {...subscription}
                                totalCandidates={0}
                                newCandidates={0}
                                selected={selectedSubscriptionIndex === index}
                                onClick={() => setSelectedSubscriptionIndex(index)}
                            />
                        ))}
                    </div>
                </>
            )
        } else {
            return (
                <div className={s.no_subscriptions}>No active subscriptions</div>
            )
        }
    }

    return (
        <div className={s.main}>
            <Header title={'Welcome to Dev Hunter'} right={<Button>Generate new candidates</Button>} logo={logo} />
            <div className={s.row} style={{ gap: 80 }}>
                <CreateSubscription onCreate={subscription => setSubscriptions(value => [...value, subscription])} />
                <div className={s.column}>
                    {renderSubscriptions(subscriptions)}
                </div>
            </div>
            {/* <Intro /> */}
        </div>
    )
}

export default Main