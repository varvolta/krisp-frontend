import { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.svg'
import s from './Intro.module.css'

const Intro = () => {
    const [animated, setAnimated] = useState(false)

    useEffect(() => {
        setTimeout(setAnimated, 2300, true)
    }, [])

    return (
        !animated && <div className={s.intro}>
            <img src={logo} alt={'logo'} className={s.logo} />
        </div>
    )
}

export default Intro