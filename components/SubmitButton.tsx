import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

interface SubmitButtonProps {
  label: string;
  pendingLabel: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, pendingLabel }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-primary text-white hover:bg-primary/90 transition cursor-pointer"
    >
      {pending ? pendingLabel : label}
    </Button>
  );
};

export default SubmitButton;
