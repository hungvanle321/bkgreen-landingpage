"use client"

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useAdminTitle } from '../components/admin-title-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DeleteConfirmDialog } from '@/components/ui/delete-confirm-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Edit, Trash2, Key } from 'lucide-react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'USER' | 'ADMIN'
  createdAt: string
}

const PROTECTED_EMAIL = 'admin@bkgreen.vn'

export default function UsersPage() {
  const t = useTranslations('admin.users')
  const { setTitle } = useAdminTitle()
  const [users, setUsers] = useState<User[]>([])
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    role: 'USER',
  })
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false)
  const [userToResetPassword, setUserToResetPassword] = useState<User | null>(null)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await fetch('/admin/api/users')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setUsers(data)
    } catch {
      toast.error(t('errors.fetchFailed'))
    } finally {
      setLoading(false)
    }
  }

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch('/admin/api/auth/me')
      if (res.ok) {
        const data = await res.json()
        setCurrentUserEmail(data.email)
      }
    } catch {
      console.log('Could not fetch current user')
    }
  }

  useEffect(() => {
    setTitle(t('title'))
    void fetchUsers()
    void fetchCurrentUser()
  }, [t, setTitle])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.name) {
      toast.error(t('validationMessages.emailRequired'))
      return
    }

    if (!editingUser && !formData.password) {
      toast.error(t('validationMessages.passwordRequired'))
      return
    }

    try {
      const url = editingUser
        ? `/admin/api/users/${editingUser.id}`
        : '/admin/api/users'
      const method = editingUser ? 'PATCH' : 'POST'

      const payload = {
        email: formData.email,
        name: formData.name,
        role: formData.role,
        ...(formData.password && { password: formData.password }),
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error)
      }

      toast.success(editingUser ? t('success.updated') : t('success.created'))
      setDialogOpen(false)
      resetForm()
      void fetchUsers()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('errors.saveFailed'))
    }
  }

  const handleResetPassword = async () => {
    if (!userToResetPassword) return

    try {
      const res = await fetch(`/admin/api/users/${userToResetPassword.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'resetPassword' }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error)
      }

      toast.success('Password reset to default successfully')
      setResetPasswordDialogOpen(false)
      setUserToResetPassword(null)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('errors.saveFailed'))
    }
  }

  const openResetPasswordDialog = (user: User) => {
    setUserToResetPassword(user)
    setResetPasswordDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return

    try {
      const userToDelete = users.find((u: User) => u.id === itemToDelete)
      if (userToDelete?.email === PROTECTED_EMAIL) {
        toast.error(t('errors.adminAccountProtected'))
        return
      }

      const res = await fetch(`/admin/api/users/${itemToDelete}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error)
      }

      toast.success(t('success.deleted'))
      setDeleteDialogOpen(false)
      setItemToDelete(null)
      void fetchUsers()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('errors.deleteFailed'))
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      email: user.email,
      name: user.name,
      password: '',
      role: user.role,
    })
    setDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setItemToDelete(id)
    setDeleteDialogOpen(true)
  }

  const resetForm = () => {
    setEditingUser(null)
    setFormData({
      email: '',
      name: '',
      password: '',
      role: 'USER',
    })
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  }

  const getRoleLabel = (role: string) => {
    return role === 'ADMIN' ? t('roles.admin') : t('roles.user')
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-gray-600 text-sm mt-1">{t('listDescription')}</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="mr-2 h-4 w-4" />
              {t('addNew')}
            </Button>
          </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingUser ? t('edit') : t('create')}</DialogTitle>
                <DialogDescription>
                  {editingUser
                    ? (currentUserEmail === editingUser.email
                      ? t('formDescription')
                      : 'Only admins can edit other users')
                    : t('formDescription')}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">{t('form.email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="user@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!!editingUser}
                    />
                  </div>
                  <div>
                    <Label htmlFor="name">{t('form.name')}</Label>
                    <Input
                      id="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  {!editingUser && (
                    <>
                      <div>
                        <Label htmlFor="role">{t('form.role')}</Label>
                        <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USER">{t('roles.user')}</SelectItem>
                            <SelectItem value="ADMIN">{t('roles.admin')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="password">{t('form.password')}</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Min 6 characters"
                          value={formData.password}
                          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {t('validationMessages.passwordMin')}
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <DialogFooter className="mt-6 flex-col sm:flex-row gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setDialogOpen(false)
                      resetForm()
                    }}
                    className="w-full sm:w-auto"
                  >
                    {t('cancel')}
                  </Button>
                  <Button type="submit" className="w-full sm:w-auto">{t('save')}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Users Table Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t('list')}</CardTitle>
            <CardDescription>{t('listDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">{t('loading')}</div>
            ) : users.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No users found</div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="md:hidden space-y-2">
                  {users.map((user) => (
                    <Card key={user.id} className="p-2.5">
                      <div className="flex items-center gap-2.5">
                        {/* Avatar */}
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="text-sm">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <h3 className="font-medium text-sm truncate flex-1">{user.name}</h3>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap flex-shrink-0 ${user.role === 'ADMIN'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              }`}>
                              {getRoleLabel(user.role)}
                            </span>
                          </div>
                          <p className="font-mono text-[11px] text-gray-600 truncate">{user.email}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">{formatDate(user.createdAt)}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-1 flex-shrink-0">
                          <TooltipProvider>
                            {(currentUserEmail === user.email) && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEdit(user)}
                                    className="h-7 w-7 p-0"
                                  >
                                    <Edit className="w-3 h-3" />
                                    <span className="sr-only">{t('edit')}</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  <p>{t('tooltip.edit')}</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openResetPasswordDialog(user)}
                                  className="h-7 w-7 p-0"
                                >
                                  <Key className="w-3 h-3" />
                                  <span className="sr-only">{t('resetPassword')}</span>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <p>{t('tooltip.resetPassword')}</p>
                              </TooltipContent>
                            </Tooltip>
                            {user.email !== PROTECTED_EMAIL && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(user.id)}
                                    className="h-7 w-7 p-0"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    <span className="sr-only">{t('delete')}</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  <p>{t('tooltip.delete')}</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </TooltipProvider>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[60px]"></TableHead>
                        <TableHead>{t('table.name')}</TableHead>
                        <TableHead>{t('table.email')}</TableHead>
                        <TableHead>{t('table.role')}</TableHead>
                        <TableHead>{t('table.createdAt')}</TableHead>
                        <TableHead className="text-right">{t('table.actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell className="font-mono text-sm">{user.email}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${user.role === 'ADMIN'
                                ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              }`}>
                              {getRoleLabel(user.role)}
                            </span>
                          </TableCell>
                          <TableCell>{formatDate(user.createdAt)}</TableCell>
                          <TableCell>
                            <TooltipProvider>
                              <div className="flex gap-2 justify-end">
                                {(currentUserEmail === user.email) && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(user)}
                                        className="h-8 w-8 p-0"
                                      >
                                        <Edit className="w-4 h-4" />
                                        <span className="sr-only">Edit</span>
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{t('tooltip.edit')}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => openResetPasswordDialog(user)}
                                      className="h-8 w-8 p-0"
                                    >
                                      <Key className="w-4 h-4" />
                                      <span className="sr-only">Reset password</span>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{t('tooltip.resetPassword')}</p>
                                  </TooltipContent>
                                </Tooltip>
                                {user.email !== PROTECTED_EMAIL && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(user.id)}
                                        className="h-8 w-8 p-0"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                        <span className="sr-only">Delete</span>
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{t('tooltip.delete')}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </div>
                            </TooltipProvider>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <DeleteConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteConfirm}
          descriptionKey="users.confirmDelete"
        />

        {/* Reset Password Confirmation Dialog */}
        <Dialog open={resetPasswordDialogOpen} onOpenChange={setResetPasswordDialogOpen}>
          <DialogContent className="max-w-[95vw] sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{t('resetPassword')}</DialogTitle>
              <DialogDescription>
                {t('resetPasswordDescription')} {userToResetPassword?.email}?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setResetPasswordDialogOpen(false)
                  setUserToResetPassword(null)
                }}
                className="w-full sm:w-auto"
              >
                {t('cancel')}
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleResetPassword}
                className="w-full sm:w-auto"
              >
                {t('resetPasswordConfirm')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  )
}
