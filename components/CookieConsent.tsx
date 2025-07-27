'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { X, Settings, Cookie } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  personalization: boolean
}

export default function CookieConsent() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    personalization: false
  })

  useEffect(() => {
    // Асинхронная проверка согласия для предотвращения CLS
    const checkConsent = async () => {
      try {
        const consent = localStorage.getItem('cookie-consent')
        if (!consent) {
          console.log('📋 No cookie consent found - showing cookie banner');
          // Показываем с задержкой для предотвращения CLS
          setTimeout(() => setIsVisible(true), 1000)
        } else {
          // Применяем сохраненные настройки
          const saved = JSON.parse(consent)
          console.log('✅ Cookie consent found - applying settings:', saved);
          setPreferences(saved)
          updateGtagConsent(saved)
        }
      } catch (error) {
        console.warn('Cookie consent check failed:', error)
      }
    }
    
    checkConsent()
  }, [])

  const updateGtagConsent = (prefs: CookiePreferences) => {
    if (typeof window !== 'undefined') {
      console.log('🔄 Updating GTM consent:', prefs);
      
      // Обновляем GTM consent без блокировки
      requestAnimationFrame(() => {
        if (window.gtag) {
          window.gtag('consent', 'update', {
            'ad_storage': prefs.marketing ? 'granted' : 'denied',
            'analytics_storage': prefs.analytics ? 'granted' : 'denied',
            'personalization_storage': prefs.personalization ? 'granted' : 'denied',
            'functionality_storage': 'granted',
            'security_storage': 'granted'
          })
          console.log('✅ GTM consent updated via gtag');
        }
        
        // Уведомляем GTM о согласии
        if (window.dataLayer) {
          window.dataLayer.push({
            'event': 'consent_update',
            'consent_analytics': prefs.analytics,
            'consent_marketing': prefs.marketing,
            'consent_personalization': prefs.personalization
          })
          console.log('✅ GTM consent event pushed to dataLayer');
        }
        
        // Проверяем состояние GTM
        if (window.google_tag_manager) {
          console.log('✅ GTM Container GTM-5QTWHWF6 is active');
        } else {
          console.warn('⚠️ GTM Container GTM-5QTWHWF6 not found');
        }
      })
    }
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true
    }
    setPreferences(allAccepted)
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted))
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    updateGtagConsent(allAccepted)
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false
    }
    setPreferences(onlyNecessary)
    localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary))
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    updateGtagConsent(onlyNecessary)
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
    updateGtagConsent(preferences)
    setIsVisible(false)
  }

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return // Необходимые cookie нельзя отключить
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md animate-fade-in-up">
      <Card className="border-2 border-green-600 shadow-xl bg-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-green-600" />
              <CardTitle className="text-lg text-gray-900">
                {t('cookies.title')}
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <CardDescription className="text-sm text-gray-700">
            {t('cookies.description')}
          </CardDescription>

          {!showSettings ? (
            <div className="space-y-2">
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={handleAcceptAll}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2"
                >
                  {t('cookies.acceptAll')}
                </Button>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleRejectAll}
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-900 hover:bg-gray-50 text-sm py-2"
                  >
                    {t('cookies.rejectAll')}
                  </Button>
                  <Button 
                    onClick={() => setShowSettings(true)}
                    variant="outline"
                    className="flex-1 border-green-600 text-green-600 hover:bg-green-50 text-sm py-2"
                  >
                    <Settings className="h-3 w-3 mr-1" />
                    {t('cookies.settings')}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex-1">
                    <Label className="text-xs font-medium text-gray-900">
                      {t('cookies.necessary')}
                    </Label>
                  </div>
                  <Switch 
                    checked={preferences.necessary}
                    disabled
                    className="ml-2 scale-75"
                  />
                </div>

                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex-1">
                    <Label className="text-xs font-medium text-gray-900">
                      {t('cookies.analytics')}
                    </Label>
                  </div>
                  <Switch 
                    checked={preferences.analytics}
                    onCheckedChange={() => handlePreferenceChange('analytics')}
                    className="ml-2 scale-75"
                  />
                </div>

                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex-1">
                    <Label className="text-xs font-medium text-gray-900">
                      {t('cookies.marketing')}
                    </Label>
                  </div>
                  <Switch 
                    checked={preferences.marketing}
                    onCheckedChange={() => handlePreferenceChange('marketing')}
                    className="ml-2 scale-75"
                  />
                </div>

                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex-1">
                    <Label className="text-xs font-medium text-gray-900">
                      {t('cookies.personalization')}
                    </Label>
                  </div>
                  <Switch 
                    checked={preferences.personalization}
                    onCheckedChange={() => handlePreferenceChange('personalization')}
                    className="ml-2 scale-75"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button 
                  onClick={handleSavePreferences}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2"
                >
                  {t('cookies.save')}
                </Button>
                <Button 
                  onClick={() => setShowSettings(false)}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-900 hover:bg-gray-50 text-sm py-2"
                >
                  {t('cookies.back')}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}