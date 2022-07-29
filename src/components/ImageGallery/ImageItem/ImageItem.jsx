import PropTypes from 'prop-types';
import { ImageContainer, Image } from './ImageItem.styled';

export const ImageItem = ({ image, onClick }) => {
  return (
    <ImageContainer>
      <Image src={image.webformatURL} alt={image.tags} onClick={onClick} />
    </ImageContainer>
  );
};

ImageItem.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
