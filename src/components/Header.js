import PropTypes from 'prop-types'

const Header = ({ title }) => {
  return (
    <header className='header'>
        <h1>{title}</h1>
    </header>
  )
}

// set default prop type if not passed in
Header.defaultProps = {
    title: 'Round',
}

// set the prop type for validation
Header.propTypes = {
    title: PropTypes.string,
}

export default Header