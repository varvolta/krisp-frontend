import { useCallback, useEffect, useMemo, useState } from 'react'
import s from './Main.module.css'
import Intro from '../../components/Intro'
import Header from '../../components/Header'
import Button from '../../components/button'
import CreateSubscription from '../../features/CreateSubscription'
import CandidatesApi from '../../api/candidatesApi'
import SubscriptionsApi from '../../api/subscriptionsApi'
import logo from '../../assets/images/logo.svg'
import Subscriptions from '../../features/Subscriptions'
import Input from '../../components/Input'
import { randomArrayFromArray, randomItemFromArray } from '../../utils/array.util'
import languageOptions from '../../data/languageOptions'
import experienceOptions from '../../data/experienceOptions'
import positionOptions from '../../data/positionOptions'
import { randomMinMax } from '../../utils/random.util'
import names from '../../data/names.js'
import socket from '../../services/socket.js'
import Candidates from '../../features/Candidates/Candidates.jsx'

const Main = () => {
    const candidatesApi = useMemo(() => new CandidatesApi(), [])
    const subscriptionsApi = useMemo(() => new SubscriptionsApi(), [])
    const [subscriptions, setSubscriptions] = useState([])
    const [selectedSubscription, setSelectedSubscription] = useState()
    const [batchCount, setBatchCount] = useState(50)
    const [loadingCandidates, setLoadingCandidates] = useState(false)
    const [candidatesList, setCandidatesList] = useState({})
    const candidates = useMemo(() => candidatesList[selectedSubscription?._id], [candidatesList, selectedSubscription])

    useEffect(() => {
        subscriptionsApi.getAll().then(data => {
            setSubscriptions(data.result)
        })

        socket.on('fetch-candidates', getCandidatesList)

        return () => {
            socket.off('fetch-candidates')
        }
    }, [])

    useEffect(() => {
        getCandidatesList()
    }, [subscriptions])

    const getCandidatesList = useCallback(() => {
        subscriptions.forEach(({ _id }) => {
            candidatesApi.getBySubscriptionId(_id).then(response => {
                setCandidatesList(value => {
                    const copy = { ...value }
                    copy[_id] = [...response.result].reverse()
                    return copy
                })
            }).catch(() => {
                alert('Candidates fetch failed')
            })
        })
    }, [subscriptions])

    const handleSubscriptionCreate = (subscription) => {
        subscriptionsApi.create(subscription).then(response => {
            setSubscriptions(subscriptions => [...subscriptions, response.result])
        }).catch(() => {
            alert('Subscription creation failed')
        })
    }

    const handleKeyUp = useCallback((event) => {
        if (event.key === 'Delete') {
            subscriptionsApi.deleteById(selectedSubscription._id).then(() => {
                setSelectedSubscription(undefined)
                setSubscriptions(subscriptions => subscriptions.filter(subscription => subscription._id !== selectedSubscription._id))
            })
        }
    }, [selectedSubscription])

    const handleGenerateNewCandidates = useCallback(async () => {
        setLoadingCandidates(true)
        const candidates = []

        for (let i = 0; i < batchCount; i++) {
            const name = randomItemFromArray(names)
            const salaryFrom = randomMinMax(200, 1500) * 1000
            const salaryTo = salaryFrom + randomMinMax(200, 1500) * 1000

            const candidate = {
                name,
                languages: randomArrayFromArray(languageOptions).map(({ key }) => key),
                experience: randomItemFromArray(experienceOptions).key,
                position: randomItemFromArray(positionOptions).key,
                salaryFrom,
                salaryTo
            }

            candidates.push(candidate)
        }

        try {
            await candidatesApi.createMany(candidates)
        } catch (error) {
            alert(error.toString())
        }

        setLoadingCandidates(false)
        getCandidatesList()
    }, [batchCount])

    return (
        <div className={s.main} onKeyUp={handleKeyUp} tabIndex={0}>
            <Header
                title={'Welcome to Dev Hunter'}
                right={
                    <>
                        <Input placeholder={'Count'} type='number' value={batchCount} onChange={e => setBatchCount(Number(e.target.value))} />
                        <Button onClick={handleGenerateNewCandidates} disabled={loadingCandidates}>Generate new candidates</Button>
                    </>
                }
                logo={logo}
            />
            <div className={s.content}>
                <CreateSubscription onCreate={handleSubscriptionCreate} />
                <Subscriptions subscriptions={subscriptions} candidatesList={candidatesList} onSelect={setSelectedSubscription} />
            </div>
            <Candidates candidates={candidates} subscription={selectedSubscription} />
            <Intro />
        </div>
    )
}

export default Main