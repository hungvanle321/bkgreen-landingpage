"use client"

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useAdminTitle } from '../components/admin-title-context'
import { MediaTable } from './components/media-table'

export default function MediaPage() {
  const t = useTranslations('admin')
  const { setTitle } = useAdminTitle()

  useEffect(() => {
    setTitle(t('navigation.media'))
  }, [setTitle, t])

  return (
    <div className="space-y-6">
      <MediaTable />
    </div>
  )
}