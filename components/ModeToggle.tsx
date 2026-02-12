import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger } from "./ui/dropdown-menu";

type Mode = "pacient" | "doctor";

const ModeToggle = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-3/6 flex justify-center items-center">label</div>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default ModeToggle;
