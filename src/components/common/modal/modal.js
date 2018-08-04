import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { Card } from '../card';
import { CloseCircle } from '../icons';

import './modal.scss';

const renderHeader = (onClose, title) => (
  <div className="modal__header">
    <h2>{title}</h2>
    <button type="button" className="modal__close" onClick={onClose}>
      <CloseCircle />
    </button>
  </div>
);

export const Modal = ({ children, onClose, title }) => (
  ReactDOM.createPortal([
    <div key="dialog" role="dialog" aria-modal="true" className="modal">
      <Card tabIndex="0">
        { renderHeader(onClose, title) }
        {children}
      </Card>
    </div>,
    <div className="modal__overlay" key="overlay" tabIndex="-1" />,
  ], document.body)
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

Modal.defaultProps = {
  title: '',
};
