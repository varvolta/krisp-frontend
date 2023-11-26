import classNames from 'classnames'
import s from './Button.module.css'
import Icon from '../Icon'

const Button = ({ icon, hint, children, onClick, className, style, disabled }) => {
    return (
        <button className={classNames(s.button, className)} style={style} onClick={onClick} title={hint} disabled={disabled}>
            {icon?.length > 0 && <Icon name={icon} />}
            <div className={s.title}>
                {children}
            </div>
        </button>
    )
}

export default Button