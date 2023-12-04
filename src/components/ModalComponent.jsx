import { Box, Fade, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  maxWidth: 480,
};

export default function ModalComponent({openModal, setOpenModal, children}) {
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
    >
      <Fade in={openModal}>
        <Box sx={style}>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
}
