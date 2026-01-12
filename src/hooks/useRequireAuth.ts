import { useModal } from "@/context/ModalContext";
import { usePlayerDetails } from "@/utils/UserSession";

const useRequireAuth = () => {
  const { openLogin } = useModal();
  const { playerDetails } = usePlayerDetails();

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
