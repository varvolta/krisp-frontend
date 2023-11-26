import classNames from 'classnames'
import s from './Header.module.css'

const Header = ({ title, logo, right, className, style }) => {
    return (
        <div className={classNames(s.header, className)} style={style}>
            <div className={s.row}>
                <img src={logo} alt={'logo'} className={s.logo} />
                <div className={s.right}>{right}</div>
            </div>
            <div className={s.row}>
                <div className={s.title}>{title}</div>
            </div>
        </div>
    )
}

export default Header