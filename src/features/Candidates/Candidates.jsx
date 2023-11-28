import Candidate from '../../components/Candidate'
import s from './Candidates.module.css'

const Candidates = ({ candidates, subscription }) => {
    return (
        <div className={s.candidates}>
            {candidates?.length
                ? <>
                    <div className={s.title}>Candidates</div>
                    <div className={s.content}>
                        {candidates.map((candidate, index) => (
                            <Candidate key={index} {...candidate} subscription={subscription} />
                        ))}
                    </div>
                </>
                : <div className={s.noCandidates}>No matchings</div>}
        </div>
    )
}

export default Candidates