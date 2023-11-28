import classNames from 'classnames'
import s from './Candidate.module.css'
import Icon from '../Icon'
import languageOptions from '../../data/languageOptions'
import experienceOptions from '../../data/experienceOptions'
import positionOptions from '../../data/positionOptions'
import { arrayIncludesArray } from '../../utils/array.util'

const Candidate = ({ name, languages, experience, position, salaryFrom, salaryTo, createdAt, subscription, className, style }) => {
    return (
        <div className={classNames(s.candidate, className)} style={style}>
            {/* 5 minutes */}
            {Date.now() - createdAt < 5 * 60 * 1000 && <div className={s.new}>New</div>}
            <div className={s.row}>
                <div className={s.profile}>
                    <Icon name={'user'} />
                </div>
                <div className={s.name}>
                    {name}
                </div>
            </div>
            <div className={s.section}>
                <div className={s.title}>Tech Languages</div>
                <div className={s.tags} style={{ minHeight: 58 }}>
                    {languages.map((key) => ({ key, value: languageOptions.find(option => option.key === key).value })).map((language, index) => (
                        <div key={index} className={classNames(s.tag, { [s.selected]: arrayIncludesArray(subscription.languages, [language.key]) })}>
                            {language.value}
                        </div>
                    ))}
                </div>
            </div>
            <div className={s.section}>
                <div className={s.title}>Experience</div>
                <div className={s.tags}>
                    <div className={classNames(s.tag, s.selected)}>
                        {experienceOptions.find(option => option.key === experience).value}
                    </div>
                </div>
            </div>
            <div className={s.section}>
                <div className={s.title}>Salary Range</div>
                <div className={s.tags}>
                    <div className={classNames(s.tag, s.selected)}>
                        {salaryFrom} - {salaryTo} AMD
                    </div>
                </div>
            </div>
            <div className={s.section}>
                <div className={s.title}>Position</div>
                <div className={s.tags}>
                    <div className={classNames(s.tag, s.selected)}>
                        {positionOptions.find(option => option.key === position).value}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Candidate