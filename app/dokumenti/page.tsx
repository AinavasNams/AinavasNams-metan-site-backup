'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Eye,
  Search,
  User,
  Mail,
  MessageSquare,
  Lock,
  X,
  FileSpreadsheet,
  Building,
  FileCog,
  Award,
  FileCheck,
  CheckCircle,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import PriorityContacts from '@/components/PriorityContacts';
import { trackFormSubmission } from '@/lib/ga4-events';

const documents = [
  {
    id: 'hs10-manual',
    title: 'HS10 — Dekantora iekārta',
    description: 'Rokasgrāmata dekantora HS10 ekspluatācijai',
    language: 'EN',
    access: 'open',
    size: '2.1 MB',
    icon: FileCog,
    url: 'https://drive.google.com/file/d/15usYRnrJG3tlW9Hk3F7s7OQAcsNwMD2u/view'
  },
  {
    id: 'ek-atlauja',
    title: 'EK atļauja (AN_EK)',
    description: 'VVD izsniegta atļauja EK režīmā',
    language: 'LV',
    access: 'open',
    size: '1.8 MB',
    icon: Award,
    url: 'https://drive.google.com/file/d/1JA-64lJtSLbZJEK0NmMoyaHLmBQk9Piy/view'
  },
  {
    id: 'sprk-licence',
    title: 'SPRK licence (AN_SPRK)',
    description: 'Sabiedrisko pakalpojumu komisijas licence',
    language: 'LV',
    access: 'open',
    size: '0.9 MB',
    icon: Award,
    url: 'https://drive.google.com/file/d/1eJzQCn_5SZPOcaFe2gqk7io12UhrQ_OE/view'
  },
  {
    id: 'apliecinajums',
    title: 'Apliecinājuma kopija',
    description: 'Uzņēmuma reģistrēts apliecinājums',
    language: 'LV',
    access: 'open',
    size: '1.2 MB',
    icon: FileCheck,
    url: 'https://drive.google.com/file/d/1C92WIuPoKYCJQ4FLHWHGGpIVvJCFFwgP/view'
  },
  {
    id: 'ek-grozijumi',
    title: 'EK grozījumi (AP25AA0011)',
    description: 'Atļaujas grozījumi (19.03.2025)',
    language: 'LV',
    access: 'open',
    size: '2.4 MB',
    icon: FileText,
    url: 'https://docs.google.com/document/d/10KE2AHpj5FFjsbsHEryiG28AOM1YOogT/edit'
  },
  {
    id: 'business-plan-lv',
    title: 'CH₄ Future — Biznesa plāns (LV)',
    description: 'Pilna biznesa plāna versija latviešu valodā',
    language: 'LV',
    access: 'request',
    size: '8.3 MB',
    icon: Building,
    documentType: 'business_plan_lv'
  },
  {
    id: 'business-plan-ru',
    title: 'CH₄ Future — Бизнес-план (RU)',
    description: 'Полная версия бизнес плана на русском языке',
    language: 'RU',
    access: 'request',
    size: '8.2 MB',
    icon: Building,
    documentType: 'business_plan_ru'
  },
  {
    id: 'business-plan-en',
    title: 'CH₄ Future — Business Plan (EN)',
    description: 'Complete business plan version in English',
    language: 'EN',
    access: 'request',
    size: '8.1 MB',
    icon: Building,
    documentType: 'business_plan_en'
  },
  {
    id: 'financial-model',
    title: 'Finanšu modelis',
    description: 'Detalizēti finansiālie aprēķini 550m³/h ražošanai',
    language: 'EN',
    access: 'request',
    size: '12.5 MB',
    icon: FileSpreadsheet,
    documentType: 'financial_model'
  }
];

export default function DocumentsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccess, setSelectedAccess] = useState('all');
  const [requestForm, setRequestForm] = useState({
    name: '',
    email: '',
    company: '',
    purpose: '',
    documentType: ''
  });
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');

  console.log('Documents page rendered');

  // Manage body scroll when modal is open
  useEffect(() => {
    if (showRequestForm) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showRequestForm]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showRequestForm) {
        setShowRequestForm(false);
      }
    };

    if (showRequestForm) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showRequestForm]);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAccess = selectedAccess === 'all' || doc.access === selectedAccess;
    return matchesSearch && matchesAccess;
  });

  const handleDocumentRequest = (docId: string) => {
    const doc = documents.find(d => d.id === docId);
    if (doc && doc.documentType) {
      setRequestForm({ ...requestForm, documentType: doc.documentType });
      setShowRequestForm(true);
    }
  };

  const submitRequest = async () => {
    console.log('Document request submitted:', requestForm);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-agent-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'document_request',
          to: 'tsv@metan.lv',
          subject: `METAN.LV - Dokuments "${requestForm.documentType}" pieprasīts`,
          template: 'document_request',
          data: {
            name: requestForm.name,
            email: requestForm.email,
            company: requestForm.company,
            purpose: requestForm.purpose,
            documentType: requestForm.documentType,
            timestamp: new Date().toISOString(),
            sourceUrl: window.location.href,
            userAgent: navigator.userAgent
          }
        }),
      });

      if (response.ok) {
        console.log('📧 Sending verification code to:', requestForm.email);
        
        const verifyResponse = await fetch('/api/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'send_code',
            email: requestForm.email,
            investorData: {
              name: requestForm.name,
              email: requestForm.email,
              company: requestForm.company,
              purpose: requestForm.purpose,
              documentRequested: documents.find(d => d.documentType === requestForm.documentType)?.title || 'Unknown document',
              documentType: requestForm.documentType,
              timestamp: new Date().toISOString(),
              sourceUrl: window.location.href,
              userAgent: navigator.userAgent
            }
          })
        });

        if (verifyResponse.ok) {
          console.log('✅ Verification code sent successfully');
          setShowRequestForm(false);
          setShowVerification(true);
          
          // Track conversion
          trackFormSubmission('document_request', 'documents_page', 90);
          console.log('📊 Document request conversion tracked');
        } else {
          throw new Error('Failed to send verification code');
        }
      } else {
        throw new Error('Failed to send request');
      }
    } catch (error) {
      console.error('Error sending document request:', error);
      alert('Kļūda nosūtot pieprasījumu. Lūdzu mēģiniet vēlreiz vai zvaniet: +371 27727724');
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyCode = async () => {
    console.log('Verifying code:', verificationCode);
    setIsVerifying(true);

    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'verify_code',
          email: requestForm.email,
          code: verificationCode
        })
      });

      if (response.ok) {
        console.log('✅ Email verified successfully');
        
        // Download the document
        const downloadResponse = await fetch('/api/download-document', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: requestForm.email,
            documentType: requestForm.documentType
          })
        });

        if (downloadResponse.ok) {
          const result = await downloadResponse.json();
          console.log('📄 Document ready for download:', result);
          setDownloadUrl(result.downloadUrl);
          setShowVerification(false);
          setShowSuccess(true);
        } else {
          throw new Error('Failed to get download link');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Invalid verification code');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      alert(error instanceof Error ? error.message : 'Kļūda verifikācijas kodā. Lūdzu mēģiniet vēlreiz.');
    } finally {
      setIsVerifying(false);
    }
  };

  const resetForm = () => {
    setRequestForm({
      name: '',
      email: '',
      company: '',
      purpose: '',
      documentType: ''
    });
    setVerificationCode('');
    setDownloadUrl('');
    setShowRequestForm(false);
    setShowVerification(false);
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-metan-light to-white">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-metan-gray mb-6">
              Dokumenti un licences
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Pārskatāma piekļuve oficiālajiem dokumentiem: sertifikātiem, atļaujām, biznesa plāniem 
              un tehniskajiem aprakstiem. Daļa dokumentu pieejami tūlītējai apskatei, 
              pārējie — pēc pieprasījuma.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50">
        <div className="metan-container">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-metan-primary bg-metan-light/50 rounded p-0.5" />
              <Input
                placeholder="Meklēt dokumentus..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300 focus:border-metan-primary"
                style={{ backgroundColor: 'white' }}
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={selectedAccess === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedAccess('all')}
                size="sm"
                className={selectedAccess === 'all' ? '' : 'text-gray-900 border-gray-300 hover:bg-gray-50'}
              >
                Visi
              </Button>
              <Button
                variant={selectedAccess === 'open' ? 'default' : 'outline'}
                onClick={() => setSelectedAccess('open')}
                size="sm"
                className={selectedAccess === 'open' ? '' : 'text-gray-900 border-gray-300 hover:bg-gray-50'}
              >
                Atvērti
              </Button>
              <Button
                variant={selectedAccess === 'request' ? 'default' : 'outline'}
                onClick={() => setSelectedAccess('request')}
                size="sm"
                className={selectedAccess === 'request' ? '' : 'text-gray-900 border-gray-300 hover:bg-gray-50'}
              >
                Pēc pieprasījuma
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="py-20">
        <div className="metan-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="metan-card h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-2 rounded-lg bg-metan-light">
                        <doc.icon className="h-6 w-6 text-metan-primary" />
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{doc.language}</Badge>
                        <Badge className={
                          doc.access === 'open' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-metan-light text-metan-primary'
                        }>
                          {doc.access === 'open' ? 'Atvērts' : 'Pēc pieprasījuma'}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg text-metan-gray mb-2">
                      {doc.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-gray-600 mb-4 flex-1">{doc.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">{doc.size}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      {doc.access === 'open' ? (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 text-gray-900 border-gray-300 hover:bg-gray-50"
                            onClick={() => window.open(doc.url, '_blank')}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Skatīt
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex-1 metan-button-primary"
                            onClick={() => window.open(doc.url, '_blank')}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Lejupielādēt
                          </Button>
                        </>
                      ) : (
                        <Button 
                          size="sm" 
                          className="w-full metan-button-primary"
                          onClick={() => handleDocumentRequest(doc.id)}
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          Pieprasīt piekļuvi
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Dokumenti nav atrasti</h3>
              <p className="text-gray-500">Mēģiniet mainīt meklēšanas kritērijus</p>
            </div>
          )}
        </div>
      </section>

      {/* Request Form Modal */}
      {showRequestForm && (
        <div 
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowRequestForm(false);
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-metan-gray">Pieprasit dokumenta piekļuvi</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRequestForm(false)}
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vārds un uzvārds *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-metan-primary bg-metan-light/50 rounded p-0.5" />
                  <Input
                    placeholder="Jūsu vārds"
                    value={requestForm.name}
                    onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })}
                    className="pl-10 bg-white border-gray-300 focus:border-metan-primary"
                    style={{ backgroundColor: 'white' }}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-pasta adrese *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-metan-primary bg-metan-light/50 rounded p-0.5" />
                  <Input
                    type="email"
                    placeholder="jusu@epasts.lv"
                    value={requestForm.email}
                    onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })}
                    className="pl-10 bg-white border-gray-300 focus:border-metan-primary"
                    style={{ backgroundColor: 'white' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Uzņēmums
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-metan-primary bg-metan-light/50 rounded p-0.5" />
                  <Input
                    placeholder="Jūsu uzņēmuma nosaukums"
                    value={requestForm.company}
                    onChange={(e) => setRequestForm({ ...requestForm, company: e.target.value })}
                    className="pl-10 bg-white border-gray-300 focus:border-metan-primary"
                    style={{ backgroundColor: 'white' }}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pieprasījuma mērķis *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-metan-primary bg-metan-light/50 rounded p-0.5" />
                  <Textarea
                    placeholder="Lūdzu, aprakstiet, kādam mērķim nepieciešams dokuments..."
                    value={requestForm.purpose}
                    onChange={(e) => setRequestForm({ ...requestForm, purpose: e.target.value })}
                    className="pl-10 min-h-[100px] bg-white border-gray-300 focus:border-metan-primary"
                    style={{ backgroundColor: 'white' }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowRequestForm(false)}
                className="flex-1 text-gray-900 border-gray-300 hover:bg-gray-50"
              >
                Atcelt
              </Button>
              <Button
                onClick={submitRequest}
                className="flex-1 metan-button-primary"
                disabled={!requestForm.name || !requestForm.email || !requestForm.purpose || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Nosūta...
                  </>
                ) : (
                  'Nosūtīt pieprasījumu'
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Email Verification Modal */}
      {showVerification && (
        <div className="modal-overlay">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="modal-content max-w-md"
          >
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-metan-gray mb-2">
                Apstipriniet e-pastu
              </h3>
              <p className="text-gray-600">
                Ievadiet apstiprinājuma kodu, kas nosūtīts uz jūsu e-pastu
              </p>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2 text-center">
                Mēs nosūtījām 6-zīmju kodu uz <strong>{requestForm.email}</strong>
              </p>
              <Input
                placeholder="Apstiprinājuma kods"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="text-center text-lg font-mono tracking-widest"
                maxLength={6}
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                Kods derīgs 30 minūtes
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowVerification(false)}
                className="flex-1"
              >
                ← Atpakaļ
              </Button>
              <Button
                onClick={verifyCode}
                className="flex-1 metan-button-primary"
                disabled={verificationCode.length !== 6 || isVerifying}
              >
                {isVerifying ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Pārbauda...
                  </>
                ) : (
                  'Apstiprināt kodu'
                )}
              </Button>
            </div>

            <div className="text-center mt-4">
              <button
                className="text-sm text-metan-primary hover:underline"
                onClick={() => {
                  alert('Lūdzu pārbaudiet spam/junk mapi vai zvaniet: +371 27727724');
                }}
              >
                Nesaņēmāt kodu? Nosūtīt vēlreiz
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="modal-overlay">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="modal-content max-w-md"
          >
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-metan-gray mb-2">
                Dokuments ir pieejams!
              </h3>
              <p className="text-gray-600">
                Paldies par jūsu interesi par mūsu projektu! Dokuments ir pieejams lejupielādei.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-metan-primary" />
                <div className="flex-1">
                  <div className="font-medium">
                    {documents.find(d => d.documentType === requestForm.documentType)?.title}
                  </div>
                  <div className="text-sm text-gray-600">PDF formāts</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={resetForm}
                className="flex-1"
              >
                Aizvērt
              </Button>
              <Button
                onClick={() => window.open(downloadUrl, '_blank')}
                className="flex-1 metan-button-primary"
              >
                <Download className="w-4 h-4 mr-2" />
                Lejupielādēt
              </Button>
            </div>

            <div className="text-center mt-4 text-sm text-gray-600">
              💡 Saite ved uz Google Drive, kur var lejupielādēt PDF formātu
            </div>
          </motion.div>
        </div>
      )}

      {/* Priority Contacts Section */}
      <section className="py-16 bg-white">
        <div className="metan-container">
          <PriorityContacts variant="short" />
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="metan-container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-metan-gray mb-6">
                Vajadzīga papildus informācija?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Ja neatrodat nepieciešamo dokumentu vai jums ir jautājumi par konkrētu licenci 
                vai atļauju, sazinieties ar mums. Mēs nodrošināsim jums visu nepieciešamo informāciju.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <Mail className="h-8 w-8 text-metan-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">E-pasts</h3>
                  <p className="text-gray-600">ainavasnams@gmail.com</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <FileText className="h-8 w-8 text-metan-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Atbildes laiks</h3>
                  <p className="text-gray-600">24 stundas darba dienās</p>
                </div>
              </div>
              
              <Button className="metan-button-primary">
                <Mail className="mr-2 h-5 w-5" />
                Sazināties par dokumentiem
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hidden SEO content */}
      <div style={{ display: 'none' }}>
        <p>dokumenti licences atļaujas sertifikāti METAN.LV Ainavas Nams</p>
        <p>VVD PVD SPRK EK atļauja HS10 dekantors biznesa plāns</p>
        <p>CH4 Future finanšu modelis CNG iekārtas piedāvājums</p>
        <p>biometāna ražošana tehniskie dokumenti investoriem</p>
        <p>Biokona Suomen Biovoima atpakaļpirkuma opcija</p>
      </div>
    </div>
  );
}