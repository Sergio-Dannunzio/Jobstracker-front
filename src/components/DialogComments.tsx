import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog";
  
  type DialogCommentsProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: string;
  };

  const DialogComments = ({ open, onOpenChange, id }: DialogCommentsProps) => {

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hola!</DialogTitle>
            <DialogDescription>Este es un diálogo de prueba.</DialogDescription>
            <DialogDescription>{id}</DialogDescription>
          </DialogHeader>
          {/* Contenido adicional */}
        </DialogContent>
      </Dialog>
    );
  };
  
  export default DialogComments;