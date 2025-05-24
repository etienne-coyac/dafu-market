import { Modal, Sheet } from "@mui/joy";
import LoginForm from "../login/LoginForm";
type LoginModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  next?: () => void;
};

const LoginModal = (props: LoginModalProps) => {
  const { open, setOpen, next } = props;
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Sheet sx={{ borderRadius: "1rem", p: 2 }}>
        <LoginForm
          onCancelCustom={() => setOpen(false)}
          onSubmitCustom={() => {
            setOpen(false);
            next?.();
          }}
        />
      </Sheet>
    </Modal>
  );
};

export default LoginModal;
