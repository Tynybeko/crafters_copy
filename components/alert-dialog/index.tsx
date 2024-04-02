'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog"

export const CustomAlertDialog = ({ open, close, title, children } : any) => {
    
    return (
      <AlertDialog key="alert-dialog" open={ open } onOpenChange={ close }>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>{ title }</AlertDialogTitle>
                  <AlertDialogDescription>
                      { children }
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    );
};

