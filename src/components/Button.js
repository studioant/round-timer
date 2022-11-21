import PropTypes from 'prop-types'

const Button = ({ color, text, onClick, state }) => {
  return (
    <button style={{ backgroundColor: color }} 
        className="btn"
        onClick={onClick}
        disabled={state}>
        {text}
    </button>
  )
}

Button.propTypes ={
    onClick: PropTypes.func,
}

export default Button