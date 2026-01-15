"use client"

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useAdminTitle } from '../components/admin-title-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Upload } from 'lucide-react'
import { toast } from 'sonner'
import { AvatarCropDialog } from '@/components/ui/avatar-crop-dialog'

interface User {
  id: string
  email: string
  name: string
  role: 'USER' | 'ADMIN'
  avatar?: string
}

export default function ProfilePage() {
  const t = useTranslations('admin.profile')
  const { setTitle } = useAdminTitle()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
  })
  const [cropDialogOpen, setCropDialogOpen] = useState(false)
  const [imageToCrop, setImageToCrop] = useState<string>('')

  const fetchUser = async () => {
    try {
      setLoading(true)
      const res = await fetch('/admin/api/auth/me')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setUser(data)
      setFormData({
        name: data.name,
        email: data.email,
        avatar: data.avatar || '',
      })
    } catch {
      toast.error(t('errors.fetchFailed'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setTitle(t('title'))
    void fetchUser()
  }, [setTitle, t])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.name) {
      toast.error(t('errors.requiredFields'))
      return
    }

    try {
      setSaving(true)
      const res = await fetch(`/admin/api/users/${user?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          avatar: formData.avatar,
        }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error)
      }

      toast.success(t('success.profileUpdated'))
      void fetchUser()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('errors.updateFailed'))
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset input value to allow selecting the same file again
    e.target.value = ''

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error(t('errors.uploadFailed'))
      return
    }

    // Read file and show crop dialog
    const reader = new FileReader()
    reader.onload = () => {
      setImageToCrop(reader.result as string)
      setCropDialogOpen(true)
    }
    reader.readAsDataURL(file)
  }

  const handleCropComplete = async (croppedImage: Blob) => {
    try {
      setSaving(true)
      const formDataUpload = new FormData()
      formDataUpload.append('file', croppedImage, 'avatar.jpg')

      const uploadRes = await fetch('/admin/api/upload', {
        method: 'POST',
        body: formDataUpload,
      })

      if (!uploadRes.ok) throw new Error('Upload failed')
      const { url } = await uploadRes.json()

      // Update user with new avatar
      const res = await fetch(`/admin/api/users/${user?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar: url }),
      })

      if (!res.ok) throw new Error('Failed to update avatar')

      toast.success(t('success.avatarUpdated'))
      void fetchUser()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('errors.uploadFailed'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p>{t('loading')}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <p className="text-gray-600 text-sm">{t('description')}</p>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>{t('profileInfo')}</CardTitle>
          <CardDescription>{t('profileInfoDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4 py-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={formData.avatar} alt={formData.name} />
                <AvatarFallback className="text-3xl">{formData.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                  disabled={saving}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('avatar')?.click()}
                  disabled={saving}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {t('uploadAvatar')}
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">{t('form.name')}</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  disabled={saving}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="email">{t('form.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={saving}
                  className="mt-1.5"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? t('saving') : t('saveChanges')}
            </Button>
          </form>
        </CardContent>
      </Card>

      <AvatarCropDialog
        open={cropDialogOpen}
        onOpenChange={setCropDialogOpen}
        imageSrc={imageToCrop}
        onCropComplete={handleCropComplete}
      />
    </div>
  )
}
