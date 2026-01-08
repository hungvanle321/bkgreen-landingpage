"use client"

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileUpload } from '@/components/ui/file-upload'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

interface TeamMember {
  id: string
  name: string
  name_en?: string
  name_fr?: string
  position: string
  position_en?: string
  position_fr?: string
  bio: string
  bio_en?: string
  bio_fr?: string
  email?: string
  phone?: string
  image?: string
}

export default function TeamPage() {
  const t = useTranslations('admin.team')
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [activeTab, setActiveTab] = useState('vi')

  const [formData, setFormData] = useState({
    name: '',
    name_en: '',
    name_fr: '',
    position: '',
    position_en: '',
    position_fr: '',
    bio: '',
    bio_en: '',
    bio_fr: '',
    email: '',
    phone: '',
    image: '',
  })
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  const fetchMembers = async () => {
    try {
      const res = await fetch('/admin/api/team')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setMembers(data)
    } catch {
      toast.error(t('errors.fetchFailed'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchMembers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.warn('Submitting form data:', formData)
    try {
      const url = editingMember
        ? `/admin/api/team/${editingMember.id}`
        : '/admin/api/team'
      const method = editingMember ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to save')

      toast.success(editingMember ? t('success.updated') : t('success.created'))
      setDialogOpen(false)
      resetForm()
      void fetchMembers()
    } catch {
      toast.error(t('errors.saveFailed'))
    }
  }

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return

    try {
      const res = await fetch(`/admin/api/team/${itemToDelete}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete')
      
      toast.success(t('success.deleted'))
      setItemToDelete(null)
      void fetchMembers()
    } catch {
      toast.error(t('errors.deleteFailed'))
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      name_en: '',
      name_fr: '',
      position: '',
      position_en: '',
      position_fr: '',
      bio: '',
      bio_en: '',
      bio_fr: '',
      email: '',
      phone: '',
      image: '',
    })
    setEditingMember(null)
    setActiveTab('vi')
  }

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name || '',
      name_en: member.name_en || '',
      name_fr: member.name_fr || '',
      position: member.position || '',
      position_en: member.position_en || '',
      position_fr: member.position_fr || '',
      bio: member.bio || '',
      bio_en: member.bio_en || '',
      bio_fr: member.bio_fr || '',
      email: member.email || '',
      phone: member.phone || '',
      image: member.image || '',
    })
    setDialogOpen(true)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">{t('loading')}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              {t('addNew')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingMember ? t('edit') : t('create')}</DialogTitle>
              <DialogDescription>{t('formDescription')}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t('form.email')}</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label>{t('form.phone')}</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <FileUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                placeholder={t('fileUpload.teamPlaceholder')}
                showUrl={false}
              />

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="fr">Français</TabsTrigger>
                </TabsList>
                {['vi', 'en', 'fr'].map((loc) => {
                  const localeKey = loc as 'vi' | 'en' | 'fr'
                  const nameKey = localeKey === 'vi' ? 'name' : `name_${localeKey}` as 'name_en' | 'name_fr'
                  const positionKey = localeKey === 'vi' ? 'position' : `position_${localeKey}` as 'position_en' | 'position_fr'
                  const bioKey = localeKey === 'vi' ? 'bio' : `bio_${localeKey}` as 'bio_en' | 'bio_fr'
                  
                  return (
                    <TabsContent key={loc} value={loc} className="space-y-4">
                      <div>
                        <Label>{t('form.name')}</Label>
                        <Input
                          value={formData[nameKey] || ''}
                          onChange={(e) => {
                            setFormData({ ...formData, [nameKey]: e.target.value })
                          }}
                          required={localeKey === 'vi'}
                        />
                      </div>
                      <div>
                        <Label>{t('form.position')}</Label>
                        <Input
                          value={formData[positionKey] || ''}
                          onChange={(e) => {
                            setFormData({ ...formData, [positionKey]: e.target.value })
                          }}
                          required={localeKey === 'vi'}
                        />
                      </div>
                      <div>
                        <Label>{t('form.bio')}</Label>
                        <Textarea
                          value={formData[bioKey] || ''}
                          onChange={(e) => {
                            setFormData({ ...formData, [bioKey]: e.target.value })
                          }}
                          required={localeKey === 'vi'}
                          rows={4}
                        />
                      </div>
                    </TabsContent>
                  )
                })}
              </Tabs>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  {t('cancel')}
                </Button>
                <Button type="submit">{t('save')}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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
                  <TableHead className="w-24">{t('table.image')}</TableHead>
                  <TableHead>{t('table.name')}</TableHead>
                  <TableHead className="hidden md:table-cell">{t('table.position')}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t('table.email')}</TableHead>
                  <TableHead className="hidden lg:table-cell">{t('table.phone')}</TableHead>
                  <TableHead>{t('table.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      {member.image ? (
                        <Image src={member.image} alt={member.name} width={40} height={40} unoptimized />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{member.position}</TableCell>
                    <TableCell className="hidden lg:table-cell">{member.email || '-'}</TableCell>
                    <TableCell className="hidden lg:table-cell">{member.phone || '-'}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <div className="flex gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(member)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{t('edit') || 'Edit'}</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="destructive" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteClick(member.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{t('delete') || 'Delete'}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-gray-200">
            {members.map((member) => (
              <div key={member.id} className="py-4 space-y-4">
                {/* Image and Name */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {member.image ? (
                      <Image src={member.image} alt={member.name} width={48} height={48} unoptimized className="rounded" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-lg">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.position}</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">{t('table.email')}:</span>
                    <span className="ml-2">{member.email || '-'}</span>
                  </div>
                  <div>
                    <span className="font-medium">{t('table.phone')}:</span>
                    <span className="ml-2">{member.phone || '-'}</span>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <span className="font-medium text-gray-700">{t('table.bio')}:</span>
                  <p className="mt-1 text-sm text-gray-600">{member.bio}</p>
                </div>

                {/* Actions */}
                <TooltipProvider>
                  <div className="flex gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(member)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('edit') || 'Edit'}</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="destructive" size="sm" className="h-8 w-8 p-0" onClick={() => handleDeleteClick(member.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t('delete') || 'Delete'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        descriptionKey="team.confirmDelete"
      />
    </div>
  )
}

