import { compose, withState, withHandlers } from 'recompose';

/*
  EnhanceWithModal is a hoc that remembers the state for modal is open / close.
  It also sets a state 'modalContext',
  which allows the wrapped component to grab context from a user's interaction
    e.g. clicks on a Review in a list of Reviews, a modal opens
        'modalContext' is set to the Review object that has been clicked on.
*/
export const enhanceWithModal = compose(
  withState('isModalOpen', 'setIsModalOpen', false),
  withState('modalContext', 'setModalContext', null),
  withHandlers({
    openModal: ({ setIsModalOpen, setModalContext }) => (context) => {
      setModalContext(context);
      setIsModalOpen(true);
    },
    closeModal: ({ setIsModalOpen, setModalContext }) => () => {
      setModalContext(null);
      setIsModalOpen(false);
    },
  }),
);

export const withError = compose(
  withState('hasError', 'setHasError', false),
  withHandlers({
    showError: ({ setHasError }) => (focusElement) => {
      setHasError(true);
      if (focusElement) { focusElement.focus(); }
    },
  }),
);
