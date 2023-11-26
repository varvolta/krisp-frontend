import { useEffect, useState } from 'react'
import s from './Select.module.css'
import Icon from '../Icon'
import classNames from 'classnames'

const Select = ({ options = [], values = [], onSelect, className, style }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState(values)

    useEffect(() => {
        setSelectedOptions(values)
    }, [values])

    const handleOptionSelect = (event, option) => {
        event.stopPropagation()
        const _selectedOptions = [...selectedOptions]
        if (_selectedOptions.includes(option)) {
            _selectedOptions.splice(_selectedOptions.indexOf(option), 1)
        } else {
            _selectedOptions.push(option)
        }
        setSelectedOptions(_selectedOptions)
        onSelect?.(_selectedOptions)
    }

    return (
        <>
            {dropdownOpen && <div className={s.background} onClick={() => setDropdownOpen(false)} />}
            <div className={classNames(s.select, className)} style={style}>
                <div className={s.options} onClick={() => setDropdownOpen(true)}>
                    {selectedOptions.length
                        ? selectedOptions.map((option, index) => (
                            <div
                                key={index}
                                className={s.option}
                                onClick={e => handleOptionSelect(e, option)}
                            >
                                {option.value}
                            </div>
                        ))
                        : <div className={s.title}>Select</div>
                    }
                </div>
                <div className={s.arrow} onClick={() => setDropdownOpen(true)}>
                    <Icon name={dropdownOpen ? 'chevron-up' : 'chevron-down'} />
                </div>
                {dropdownOpen && <div className={s.dropdown}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={s.row}
                            onClick={(e) => handleOptionSelect(e, option)}
                        >
                            <div className={s.check}>
                                <Icon name={selectedOptions.includes(option) ? 'check-square' : 'square'} />
                            </div>
                            {option.value}
                        </div>
                    ))}
                </div>}
            </div>
        </>
    )
}

export default Select