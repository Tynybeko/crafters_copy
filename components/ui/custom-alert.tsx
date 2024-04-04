import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import React from "react";
import { Button } from "@/components/ui/button";

export function AlertThanks({isActiveAlert, setIsActiveAlert}: any) {
    return (
      <AlertDialog open={isActiveAlert} >
          <AlertDialogContent className={'px-[60px] py-[40px] max-w-[720px] w-full'}>
              <AlertDialogHeader >
                  <AlertDialogTitle className={'text-center text-[24px] md:text-[36px]'}>Thank you!</AlertDialogTitle>
                  <AlertDialogDescription className={'text-center text-[14px] md:text-[16px]'}>
                      We are already processing your item and we will give you an answer very soon.
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className={'gap-[12px]'}>
                  <Button className={'w-full'} variant={'destructive'} onClick={() => setIsActiveAlert(false)}>Cancel</Button>
                  <Button className={'w-full'} onClick={() => setIsActiveAlert(false)}>Continue</Button>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    )
}