import React from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { searchPictures } from 'servises/api';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Container } from 'components/Container/Container.styled';

export class App extends React.Component {
  state = {
    search: '',
    page: 1,
    error: null,
    pictures: [],
    showModal: false,
    activeImage: null,
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;

    if (prevState.page !== page || prevState.search !== search) {
      this.setState({ isLoading: true });
      searchPictures(search, page)
        .then(res => {
          console.log(res.hits);
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...res.hits],
          }));
          this.setState({ isLoading: false });
        })
        .catch(error => this.setState({ error }));
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSubmit = event => {
    this.setState({
      page: 1,
      search: event.target.elements.search.value,
      pictures: [],
    });
    event.target.reset();
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  setActiveImage = imageUrl => {
    this.setState({ activeImage: imageUrl });
  };

  handleSearchFormSubmit = search => {
    this.setState({ search });
  };
  render() {
    const { pictures, isLoading, activeImage } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        <ImageGallery
          images={pictures}
          setActiveImage={this.setActiveImage}
          onClickImage={this.toggleModal}
        />
        <ToastContainer autoClose={3000} />
        <Button onClick={this.loadMore} />

        {isLoading && <Loader />}
        {/*  {pictures.length !== 0 && <Button onClick={this.loadMore} />}
        {Button.disable = true; } */}

        {this.state.showModal && (
          <Modal onClose={this.toggleModal} activeImage={activeImage} />
        )}
      </Container>
    );
  }
}
