import {Button} from '@/components/ui/button';
import {Dialog, DialogHeader, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {ReactNode} from 'react';

interface FormDialogProps {
  icon: ReactNode,
  onClose?: (close: boolean) => void,
  children: ReactNode
}

export default ({icon, children, onClose = () => {}}: FormDialogProps) => {

  return (
    <Dialog onOpenChange={(open) => onClose(!open)}>
      <DialogTrigger asChild>
        <Button
          className="absolute bottom-0 right-0 w-12 h-12 rounded-full "
        >
          {icon}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Add Station
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );};

