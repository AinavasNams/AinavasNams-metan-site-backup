'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Cookie, Settings } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  personalization: boolean
}

export default function OptimizedCookieConsent() {
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
    // Асинхронная проверка согласия для избежания блокировки
    const checkConsent = async () => {
      try {
        const consent = localStorage.getItem('cookie-consent')
        if (!consent) {
          // Показываем с задержкой для предотвращения CLS
          setTimeout(() => setIsVisible(true), 1000)
        } else {
          const saved = JSON.parse(consent)
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
      // Обновляем GTM consent без блокировки
      requestAnimationFrame(() => {
        if (window.gtag) {
          window.gtag('consent', 'update', {
            'ad_storage': prefs.marketing ? 'granted' : 'denied',
            'ad_user_data': prefs.marketing ? 'granted' : 'denied',
            'ad_personalization': prefs.marketing ? 'granted' : 'denied',
            'analytics_storage': prefs.analytics ? 'granted' : 'denied',
            'personalization_storage': prefs.personalization ? 'granted' : 'denied',
            'functionality_storage': 'granted',
            'security_storage': 'granted'
          })
        }
        
        // Уведомляем GTM о согласии
        if (window.dataLayer) {
          window.dataLayer.push({
            'event': 'consent_update',
            'consent_analytics': prefs.analytics,
            'consent_marketing': prefs.marketing,
            'consent_personalization': prefs.personalization,
            'consent_ad_storage': prefs.marketing,
            'consent_ad_user_data': prefs.marketing,
            'consent_ad_personalization': prefs.marketing
          })
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
              <div className="text-xs text-gray-600">
                Настройки cookie будут применены немедленно
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