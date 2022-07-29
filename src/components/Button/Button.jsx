import PropTypes from 'prop-types';
import { ButtonClick } from './Button.styled';

const Button = ({ onClick, children }) => {
  return (
    <ButtonClick type="button" onClick={onClick}>
      {children}
    </ButtonClick>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
