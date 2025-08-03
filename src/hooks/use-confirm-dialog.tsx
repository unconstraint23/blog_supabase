'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { useRef, useState, useCallback } from 'react'

type ConfirmOptions = {
  title: string
  description?: string
  cancelText?: string
  okText?: string
}

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>

export function useConfirmDialog(): [React.ReactNode, ConfirmFn] {
  const [visible, setVisible] = useState(false)
  const [options, setOptions] = useState<ConfirmOptions | null>(null)
  const resolver = useRef<any>(null)

  const confirm: ConfirmFn = useCallback((options) => {
    setOptions(options)
    setVisible(true)
    return new Promise((resolve) => {
      resolver.current = resolve
    })
  }, [])

  const handleClose = (result: boolean) => {
    setVisible(false)
    resolver.current?.(result)
  }

  const dialog = visible && options ? (
    <AlertDialog open={visible} onOpenChange={setVisible}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{options.title}</AlertDialogTitle>
          {options.description && (
            <AlertDialogDescription>{options.description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleClose(false)}>
            {options.cancelText || '取消'}
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleClose(true)}>
            {options.okText || '确认'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ) : null

  return [dialog, confirm]
}
