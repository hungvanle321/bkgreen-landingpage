"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'

export default function SettingsPage() {
  const t = useTranslations('admin.settings')
  const { theme, setTheme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [generalSettings, setGeneralSettings] = useState({
    siteName: '',
    siteDescription: '',
    sessionTimeout: '',
    emailNotifications: false
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Fetch current settings
        const settingsResponse = await fetch('/admin/api/settings')
        const settings = await settingsResponse.json()
        
        // Set general settings
        setGeneralSettings({
          siteName: settings.siteName || '',
          siteDescription: settings.siteDescription || '',
          sessionTimeout: settings.sessionTimeout || '',
          emailNotifications: settings.emailNotifications || false
        })
      } catch (error) {
        console.error('Error fetching settings:', error)
      }
    }

    void fetchSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Save general settings
      await Promise.all([
        fetch('/admin/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: 'siteName', value: generalSettings.siteName })
        }),
        fetch('/admin/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: 'siteDescription', value: generalSettings.siteDescription })
        }),
        fetch('/admin/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: 'sessionTimeout', value: generalSettings.sessionTimeout })
        }),
        fetch('/admin/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: 'emailNotifications', value: generalSettings.emailNotifications.toString() })
        })
      ])

      toast.success(t('success.saved'))
    } catch {
      toast.error(t('errors.saveFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('general')}</CardTitle>
              <CardDescription>{t('generalDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{t('siteName')}</Label>
                <Input
                  placeholder={t('siteNamePlaceholder')}
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteName: e.target.value }))}
                />
              </div>
              <div>
                <Label>{t('siteDescription')}</Label>
                <Input
                  placeholder={t('siteDescriptionPlaceholder')}
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('appearance')}</CardTitle>
              <CardDescription>{t('appearanceDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">{t('darkMode')}</Label>
                <Switch
                  id="dark-mode"
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('security')}</CardTitle>
              <CardDescription>{t('securityDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{t('sessionTimeout')}</Label>
                <Input
                  type="number"
                  placeholder={t('sessionTimeoutPlaceholder')}
                  value={generalSettings.sessionTimeout}
                  onChange={(e) => setGeneralSettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('notifications')}</CardTitle>
              <CardDescription>{t('notificationsDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Switch
                  id="email-notifications"
                  checked={generalSettings.emailNotifications}
                  onCheckedChange={(checked) => setGeneralSettings(prev => ({ ...prev, emailNotifications: checked }))}
                />
                <Label htmlFor="email-notifications" className="text-sm font-medium text-gray-700 cursor-pointer">
                  {t('emailNotifications')}
                </Label>
              </div>
            </CardContent>
          </Card>

        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button type="button" variant="outline">
            {t('cancel')}
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? t('loading') : t('save')}
          </Button>
        </div>
      </form>
    </div>
  )
}

