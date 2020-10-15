import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';
import themeApp, { pxToRem } from 'theme';
import { Box, Button, useThemeUI } from 'theme-ui';

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  children?: ReactNode;
}

const customStyles = (themeUI: typeof themeApp): ReactModal.Styles => ({
  overlay: {
    zIndex: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: `${pxToRem(50)} ${pxToRem(20)}`,
    overflow: 'auto',
  },
  content: {
    top: 'auto',
    left: 'auto',
    bottom: 'auto',
    right: 'auto',
    minWidth: '80%',
    minHeight: pxToRem(100),
    border: '1px solid',
    borderColor: themeUI.colors.primaryEmphasis,
    position: 'relative',
    height: 'auto',
    borderRadius: 0,
    display: 'flex',
    justifyContent: 'center',
    background: themeUI.colors.surface,
  },
});

const Modal = ({ onClose, isOpen, children }: ModalProps) => {
  const theme = useThemeUI().theme as typeof themeApp;

  return (
    <ReactModal
      role="presentation"
      isOpen={isOpen}
      contentLabel="Modal"
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
      style={customStyles(theme)}
    >
      <Button
        onClick={onClose}
        variant="closeModal"
        sx={{ position: 'absolute', top: pxToRem(10), right: pxToRem(10) }}
      >
        X
      </Button>
      <Box>{children}</Box>
    </ReactModal>
  );
};

export default Modal;
