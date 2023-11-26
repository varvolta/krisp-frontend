import FeatherIcon from 'feather-icons-react'

const Icon = ({ name, size = 14 }) => {
    return (
        <FeatherIcon icon={name} size={size} />
    )
}

export default Icon