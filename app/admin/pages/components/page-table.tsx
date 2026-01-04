"use client"

import { useState, useEffect } from 'react'

import { useTranslations } from 'next-intl'
import { Edit, Trash, Eye } from 'lucide-react'
import { toast } from 'sonner'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

interface Page {
  id: string
  title: string
  slug: string
  content: string
  metaTitle?: string
  metaDescription?: string
  createdAt: Date
  updatedAt: Date
}

export function PageTable() {
  const t = useTranslations('admin')
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPages = async () => {
    try {
      setLoading(true)
      const response = await fetch('/admin/api/pages')
      const data = await response.json()
      setPages(data)
    } catch (error) {
      console.error('Error fetching pages:', error)
      toast.error(t('errors.fetchFailed') || 'Failed to fetch pages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchPages()
  }, [])

  const deletePage = async (id: string) => {
    try {
      await fetch(`/admin/api/pages/${id}`, {
        method: 'DELETE',
      })
      toast.success(t('success.deleted') || 'Page deleted successfully')
      void fetchPages()
    } catch (error) {
      console.error('Error deleting page:', error)
      toast.error(t('errors.deleteFailed') || 'Failed to delete page')
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">{t('forms.title') || 'Title'}</TableHead>
              <TableHead className="hidden md:table-cell">{t('forms.slug') || 'Slug'}</TableHead>
              <TableHead className="hidden lg:table-cell">{t('forms.metaTitle') || 'Meta Title'}</TableHead>
              <TableHead className="hidden md:table-cell">{t('forms.createdAt') || 'Created'}</TableHead>
              <TableHead>{t('actions.actions') || 'Actions'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell className="hidden md:table-cell">{page.slug}</TableCell>
                <TableCell className="hidden lg:table-cell">{page.metaTitle || '-'}</TableCell>
                <TableCell className="hidden md:table-cell">{new Date(page.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      {t('actions.view') || 'View'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      {t('actions.edit') || 'Edit'}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deletePage(page.id)}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      {t('actions.delete') || 'Delete'}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden divide-y divide-gray-200">
        {pages.map((page) => (
          <div key={page.id} className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{page.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{page.slug}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="h-8 px-2">
                  <Eye className="h-3 w-3 mr-1" />
                  {t('actions.view') || 'View'}
                </Button>
                <Button variant="outline" size="sm" className="h-8 px-2">
                  <Edit className="h-3 w-3 mr-1" />
                  {t('actions.edit') || 'Edit'}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-8 px-2"
                  onClick={() => deletePage(page.id)}
                >
                  <Trash className="h-3 w-3 mr-1" />
                  {t('actions.delete') || 'Delete'}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">{t('forms.metaTitle') || 'Meta Title'}:</span>
                <span className="ml-2">{page.metaTitle || '-'}</span>
              </div>
              <div>
                <span className="text-gray-500">{t('forms.createdAt') || 'Created'}:</span>
                <span className="ml-2">{new Date(page.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}