"use client"

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useAdminTitle } from '../components/admin-title-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog'

interface ContactForm {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  createdAt: string
}

export default function ContactFormsPage() {
  const t = useTranslations('admin.contactForms')
  const { setTitle } = useAdminTitle()
  const [forms, setForms] = useState<ContactForm[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  const fetchForms = async () => {
    try {
      const url = statusFilter === 'all' 
        ? '/admin/api/contact-forms'
        : `/admin/api/contact-forms?status=${statusFilter}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setForms(data)
    } catch {
      toast.error(t('errors.fetchFailed'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setTitle(t('title'))
  }, [setTitle, t])

  useEffect(() => {
    void fetchForms()
  }, [statusFilter])

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch(`/admin/api/contact-forms/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (!res.ok) throw new Error('Failed to update')
      
      toast.success(t('success.updated'))
      void fetchForms()
    } catch {
      toast.error(t('errors.updateFailed'))
    }
  }

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return

    try {
      const res = await fetch(`/admin/api/contact-forms/${itemToDelete}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete')
      
      toast.success(t('success.deleted'))
      setItemToDelete(null)
      void fetchForms()
    } catch {
      toast.error(t('errors.deleteFailed'))
    }
  }

  const _getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      PENDING: 'outline',
      IN_PROGRESS: 'default',
      COMPLETED: 'default',
      CANCELLED: 'destructive',
    }
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">{t('loading')}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder={t('filterByStatus')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('all')}</SelectItem>
            <SelectItem value="PENDING">{t('status.pending')}</SelectItem>
            <SelectItem value="IN_PROGRESS">{t('status.inProgress')}</SelectItem>
            <SelectItem value="COMPLETED">{t('status.completed')}</SelectItem>
            <SelectItem value="CANCELLED">{t('status.cancelled')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('list')}</CardTitle>
          <CardDescription>{t('listDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('table.name')}</TableHead>
                  <TableHead className="hidden md:table-cell">{t('table.email')}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t('table.phone')}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t('table.message')}</TableHead>
                  <TableHead>{t('table.status')}</TableHead>
                  <TableHead className="hidden md:table-cell">{t('table.date')}</TableHead>
                  <TableHead>{t('table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forms.map((form) => (
                  <TableRow key={form.id}>
                    <TableCell>{form.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{form.email}</TableCell>
                    <TableCell className="hidden lg:table-cell">{form.phone || '-'}</TableCell>
                    <TableCell className="hidden lg:table-cell max-w-xs truncate">{form.message}</TableCell>
                    <TableCell>
                      <Select
                        value={form.status}
                        onValueChange={(value) => handleStatusChange(form.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">{t('status.pending')}</SelectItem>
                          <SelectItem value="IN_PROGRESS">{t('status.inProgress')}</SelectItem>
                          <SelectItem value="COMPLETED">{t('status.completed')}</SelectItem>
                          <SelectItem value="CANCELLED">{t('status.cancelled')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{new Date(form.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(form.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-200">
            {forms.map((form) => (
              <div key={form.id} className="py-4 space-y-4">
                {/* Name and Email */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg">{form.name}</h3>
                    <p className="text-sm text-gray-600">{form.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {_getStatusBadge(form.status)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(form.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Phone and Date */}
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">{t('table.phone')}:</span>
                    <span className="ml-2">{form.phone || '-'}</span>
                  </div>
                  <div>
                    <span className="font-medium">{t('table.date')}:</span>
                    <span className="ml-2">{new Date(form.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <span className="font-medium text-gray-700">{t('table.message')}:</span>
                  <p className="mt-1 text-sm text-gray-600">{form.message}</p>
                </div>

                {/* Status Selector */}
                <div>
                  <span className="font-medium text-gray-700">{t('table.status')}:</span>
                  <Select
                    value={form.status}
                    onValueChange={(value) => handleStatusChange(form.id, value)}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">{t('status.pending')}</SelectItem>
                      <SelectItem value="IN_PROGRESS">{t('status.inProgress')}</SelectItem>
                      <SelectItem value="COMPLETED">{t('status.completed')}</SelectItem>
                      <SelectItem value="CANCELLED">{t('status.cancelled')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        descriptionKey="contactForms.confirmDelete"
      />
    </div>
  )
}

