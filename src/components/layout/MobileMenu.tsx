
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onSignOut: () => void;
}

const MobileMenu = ({ isOpen, onClose, user, onSignOut }: MobileMenuProps) => {
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 pt-16">
      <div ref={mobileMenuRef} className="min-h-full">
        {/* Close button in top right */}
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-swimspot-blue-green"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <nav className="flex flex-col items-center gap-6 p-6 pt-12">
          <NavLinks isMobile={true} onLinkClick={onClose} />
          <div className="mt-4">
            <UserMenu isMobile={true} user={user} onSignOut={onSignOut} />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
