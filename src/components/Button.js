import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {
  return (
    <button style={{ backgroundColor: color }} 
        className="btn"
        onClick={onClick}>
        {text}
    </button>
  )
}

Button.propTypes ={
    onClick: PropTypes.func,
}

export default Button