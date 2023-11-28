import { useCallback, useState } from 'react'
import Subscription from '../../components/Subscription'
import s from './Subscriptions.module.css'
import languageOptions from '../../data/languageOptions'
import experienceOptions from '../../data/experienceOptions'
import positionOptions from '../../data/positionOptions'

const parseSubscription = ({ _id, languages, experiences, positions, salaryFrom, salaryTo }) => {
    return {
        _id,
        languages: languages.map((key) => ({ key, value: languageOptions.find(option => option.key === key).value })),
        experiences: experiences.map((key) => ({ key, value: experienceOptions.find(option => option.key === key).value })),
        positions: positions.map((key) => ({ key, value: positionOptions.find(option => option.key === key).value })),
        salaryFrom,
        salaryTo
    }
}

const Subscriptions = ({ subscriptions, candidatesList, onSelect }) => {
    const [selectedId, setSelectedId] = useState()

    const handleSelect = (index, id) => {
        setSelectedId(id)
        onSelect?.(subscriptions[index])
    }

    const getTotalCandidates = useCallback((id) => {
        const candidates = candidatesList[id]
        return candidates?.length ?? 0
    }, [candidatesList])

    const getNewCandidates = useCallback((id) => {
        const candidates = candidatesList[id]
        if (candidates?.length) {
            // 5 minutes = 5 * 60 * 1000
            return candidates.filter(({ createdAt }) => Date.now() - createdAt < 5 * 60 * 1000).length
        } else {
            return 0
        }
    }, [candidatesList])

    return (
        <div className={s.subscriptions}>
            {subscriptions?.length
                ? <>
                    <div className={s.title}>Your subscriptions</div>
                    <div className={s.content}>
                        {subscriptions.map((subscription, index) => (
                            <Subscription
                                key={subscription._id}
                                {...parseSubscription(subscription)}
                                totalCandidates={getTotalCandidates(subscription._id)}
                                newCandidates={getNewCandidates(subscription._id)}
                                selected={selectedId === subscription._id}
                                onClick={() => handleSelect(index, subscription._id)}
                            />
                        ))}
                    </div>
                </>
                : <div className={s.noSubscriptions}>No active subscriptions</div>}
        </div>
    )
}

export default Subscriptions