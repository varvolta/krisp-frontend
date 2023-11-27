import { useState } from 'react'
import Subscription from '../../components/Subscription'
import s from './Subscriptions.module.css'

const Subscriptions = ({ subscriptions, onSelect }) => {
    const [selectedIndex, setSelectedIndex] = useState()

    const handleSelect = (index) => {
        setSelectedIndex(index)
        onSelect?.(subscriptions[index])
    }

    return (
        <div className={s.subscriptions}>
            {subscriptions.length
                ? <>
                    <div className={s.title}>Your subscriptions</div>
                    <div className={s.content}>
                        {subscriptions.map((subscription, index) => (
                            <Subscription
                                key={index}
                                {...subscription}
                                totalCandidates={0}
                                newCandidates={0}
                                selected={selectedIndex === index}
                                onClick={() => handleSelect(index)}
                            />
                        ))}
                    </div>
                </>
                : <div className={s.noSubscriptions}>No active subscriptions</div>}
        </div>
    )
}

export default Subscriptions