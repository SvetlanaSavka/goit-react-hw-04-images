import { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { searchPictures } from 'servises/api';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Container } from 'components/Container/Container.styled';

export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [pictures, setPictures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, settotalPages] = useState(null);

  useEffect(() => {
    if (search === '') {
      return;
    }
    const getPictures = () => {
      setIsLoading(true);
      searchPictures(search, page)
        .then(res => {
          settotalPages(Math.ceil(res.total / 12));
          setPictures(prevState => [...prevState, ...res.hits]);
          setIsLoading(false);
        })
        .catch(error => setError(error));
    };
    getPictures();
  }, [search, page]);

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const handleSubmit = search => {
    setPage(1);
    setSearch(search);
    setPictures([]);
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />
      {error && <p>{error.message}</p>}
      <ImageGallery
        images={pictures}
        setActiveImage={setActiveImage}
        onClickImage={toggleModal}
      />
      <ToastContainer autoClose={3000} />

      {isLoading && <Loader />}

      {pictures.length >= 12 && page < totalPages && (
        <Button onClick={loadMore} />
      )}

      {showModal && <Modal onClose={toggleModal} activeImage={activeImage} />}
    </Container>
  );
};
