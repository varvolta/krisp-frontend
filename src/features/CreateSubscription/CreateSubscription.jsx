import { useCallback, useState } from 'react'
import Input from '../../components/Input'
import Select from '../../components/Select'
import Button from '../../components/button'
import experienceOptions from '../../data/experienceOptions'
import languageOptions from '../../data/languageOptions'
import positionOptions from '../../data/positionOptions'
import s from './CreateSubscription.module.css'

const CreateSubscription = ({ onCreate }) => {
    const [languages, setLanguages] = useState([])
    const [experiences, setExperiences] = useState([])
    const [positions, setPositions] = useState([])
    const [salaryFrom, setSalaryFrom] = useState('')
    const [salaryTo, setSalaryTo] = useState('')

    const handleCreate = useCallback(() => {
        onCreate?.({
            languages,
            experiences,
            positions,
            salaryFrom,
            salaryTo
        })

        setLanguages([])
        setExperiences([])
        setPositions([])
        setSalaryFrom('')
        setSalaryTo('')
    }, [languages, experiences, positions, salaryFrom, salaryTo])

    return (
        <div className={s.container}>
            <div className={s.column}>
                <div className={s.label}>Tech Languages</div>
                <Select options={languageOptions} values={languages} onSelect={setLanguages} />
            </div>

            <div className={s.column}>
                <div className={s.label}>Experience</div>
                <Select options={experienceOptions} values={experiences} onSelect={setExperiences} />
            </div>

            <div className={s.column}>
                <div className={s.label}>Salary Range</div>
                <div className={s.row}>
                    <Input
                        type='number'
                        placeholder={'e.g. 50000'}
                        value={salaryFrom}
                        onChange={e => setSalaryFrom(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    -
                    <Input
                        type='number'
                        placeholder={'e.g. 50000'}
                        value={salaryTo}
                        onChange={e => setSalaryTo(e.target.value)}
                        style={{ flex: 1 }}
                    />
                </div>
            </div>

            <div className={s.column}>
                <div className={s.label}>Position</div>
                <Select options={positionOptions} values={positions} onSelect={setPositions} />
            </div>

            <Button
                onClick={handleCreate}
                disabled={!languages.length || !experiences.length || !positions.length || !salaryFrom.length || !salaryTo.length}
            >
                Create subscription
            </Button>
        </div>
    )
}

export default CreateSubscription