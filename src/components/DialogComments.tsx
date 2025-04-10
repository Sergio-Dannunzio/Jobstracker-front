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
  };
  
  const DialogComments = ({ open, onOpenChange }: DialogCommentsProps) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hola!</DialogTitle>
            <DialogDescription>Este es un diálogo de prueba.</DialogDescription>
          </DialogHeader>
          {/* Contenido adicional */}
        </DialogContent>
      </Dialog>
    );
  };
  
  export default DialogComments;