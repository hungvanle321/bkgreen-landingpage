"use client"

import { useTranslations } from 'next-intl'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface DeleteConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  titleKey?: string
  descriptionKey: string
  isLoading?: boolean
}

/**
 * Reusable delete confirmation dialog component with i18n support
 */
export function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  titleKey = 'confirmDelete',
  descriptionKey,
  isLoading = false,
}: DeleteConfirmDialogProps) {
  const t = useTranslations('admin')
  const tActions = useTranslations('admin.actions')

  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{tActions(titleKey)}</AlertDialogTitle>
          <AlertDialogDescription>
            {t(descriptionKey)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            {tActions('cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? tActions('saving') : tActions('confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
