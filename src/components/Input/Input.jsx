import classNames from 'classnames'
import s from './Input.module.css'

const Input = ({ className, style, type = 'text', value, onChange, placeholder }) => {
    return (
        <div className={classNames(s.input, className)} style={style}>
            <input type={type} value={value} onChange={onChange} placeholder={placeholder} size={1} />
        </div>
    )
}

export default Input