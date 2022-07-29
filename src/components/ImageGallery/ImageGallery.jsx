import PropTypes from 'prop-types';
import { ImageItem } from './ImageItem/ImageItem';
import { Container } from './ImageGallery.styled';

export const ImageGallery = ({ images, setActiveImage, onClickImage }) => {
  return (
    <Container>
      {images.map(image => (
        <ImageItem
          key={image.id}
          image={image}
          onClick={() => {
            setActiveImage(image.largeImageURL);
            onClickImage();
          }}
        />
      ))}
    </Container>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  setActiveImage: PropTypes.func.isRequired,
  onClickImage: PropTypes.func.isRequired,
};
