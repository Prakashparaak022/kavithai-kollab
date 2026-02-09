import { useModal } from "@/context/ModalContext";
import { selectPlayerDetails } from "@/store/selectors";
import { useSelector } from "react-redux";

const useRequireAuth = () => {
  const { openLogin } = useModal();

  const playerDetails = useSelector(selectPlayerDetails);

  const requireAuth = (e: React.MouseEvent) => {
    if (!playerDetails) {
      e.preventDefault();
      e.stopPropagation();
      openLogin();
      return false;
    }
    return true;
  };

  const withAuth = (action: () => void) => (e?: React.MouseEvent) => {
    if (!playerDetails) {
      e?.preventDefault();
      e?.stopPropagation();
      openLogin();
      return;
    }
    action();
  };

  return { requireAuth, withAuth };
};

export default useRequireAuth;
