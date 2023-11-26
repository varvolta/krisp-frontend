import classNames from 'classnames'
import Icon from '../Icon'
import s from './Subscription.module.css'

const Subscription = ({ languages, experiences, positions, salaryFrom, salaryTo, totalCandidates, newCandidates, className, style, selected, onClick }) => {

    return (
        <div className={classNames(s.subscription, { [s.selected]: selected }, className)} style={style} onClick={onClick}>
            {selected && <div className={s.icon}>
                <Icon name={'check'} />
            </div>}
            <div className={s.candidates}>
                Total candidates {totalCandidates} | New candidates {newCandidates}
            </div>
            <div className={s.section}>
                <div className={s.title}>Tech Languages</div>
                <div className={s.tags}>
                    {languages.map((language, index) => (
                        <div key={index} className={s.tag}>
                            {language.value}
                        </div>
                    ))}
                </div>
            </div>
            <div className={s.section}>
                <div className={s.title}>Experience</div>
                <div className={s.tags}>
                    {experiences.map((experience, index) => (
                        <div key={index} className={s.tag}>
                            {experience.value}
                        </div>
                    ))}
                </div>
            </div>
            <div className={s.section}>
                <div className={s.title}>Salary Range</div>
                <div className={s.tags}>
                    <div className={s.tag}>
                        {salaryFrom} - {salaryTo} AMD
                    </div>
                </div>
            </div>
            <div className={s.section}>
                <div className={s.title}>Position</div>
                <div className={s.tags}>
                    {positions.map((position, index) => (
                        <div key={index} className={s.tag}>
                            {position.value}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Subscription