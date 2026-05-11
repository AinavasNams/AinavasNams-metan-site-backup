'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calculator, 
  TrendingUp, 
  Euro,
  Zap,
  Calendar,
  BarChart3,
  PieChart,
  Download,
  RefreshCw,
  Info,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  trackPageView, 
  trackUserJourney, 
  trackROICalculation,
  trackCTA 
} from '@/components/Analytics';
import { trackCalculatorUsage } from '@/lib/analytics';
import { EnhancedCTA } from '@/components/EnhancedCTA';

interface CalculationInputs {
  investmentAmount: number;
  biogasProduction: number;
  biogasPrice: number;
  operatingCosts: number;
  projectLifetime: number;
}

interface CalculationResults {
  annualRevenue: number;
  annualProfit: number;
  roi: number;
  paybackPeriod: number;
  npv: number;
  irr: number;
  totalReturn: number;
}

const defaultInputs: CalculationInputs = {
  investmentAmount: 1738000,
  biogasProduction: 26951,
  biogasPrice: 95,
  operatingCosts: 1604585,
  projectLifetime: 20
};

export default function ROICalculatorPage() {
  const { t } = useTranslation();
  const [inputs, setInputs] = useState<CalculationInputs>(defaultInputs);
  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationCount, setCalculationCount] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);

  console.log('ROI Calculator page rendered');

  // Track calculator page view and usage
  useEffect(() => {
    const sessionStart = Date.now();
    setStartTime(sessionStart);
    
    // Track calculator page view
    trackPageView('roi_calculator', {
      page_section: 'calculator',
      page_priority: 'high',
      tool_type: 'financial_calculator',
      conversion_potential: 'high',
    });
    
    // Track user journey
    trackUserJourney('calculator_used', {
      page_type: 'calculator',
      intent: 'investment_analysis',
      funnel_stage: 'evaluation',
      calculator_type: 'roi_calculator',
    });
    
    // Track calculator usage start
    trackCalculatorUsage('roi_calculator', {
      default_values: defaultInputs,
      session_start: sessionStart,
      calculator_version: 'v1.0',
    });
    
    console.log("📊 ROI Calculator tracking initialized");
  }, []);

  const calculateROI = () => {
    setIsCalculating(true);
    
    // Track calculation start
    const calculationStart = Date.now();
    const newCount = calculationCount + 1;
    setCalculationCount(newCount);
    
    // Track calculator interaction
    trackCalculatorUsage('roi_calculation_started', {
      input_values: inputs,
      calculation_number: newCount,
      time_spent: calculationStart - startTime,
      user_engagement: 'high',
    });
    
    // Simulate calculation delay
    setTimeout(() => {
      const annualRevenue = 
        inputs.biogasProduction * inputs.biogasPrice; // Tikai biometāna ieņēmumi

      const annualProfit = annualRevenue - inputs.operatingCosts;
      const roi = (annualProfit / inputs.investmentAmount) * 100;
      const paybackPeriod = inputs.investmentAmount / annualProfit;
      
      // Simplified NPV calculation (using 7% discount rate)
      const discountRate = 0.07;
      let npv = -inputs.investmentAmount;
      for (let year = 1; year <= inputs.projectLifetime; year++) {
        npv += annualProfit / Math.pow(1 + discountRate, year);
      }
      
      // Simplified IRR calculation
      const irr = ((Math.pow(annualRevenue * inputs.projectLifetime / inputs.investmentAmount, 1/inputs.projectLifetime) - 1) * 100);
      
      const totalReturn = annualProfit * inputs.projectLifetime;

      const calculationResults = {
        annualRevenue,
        annualProfit,
        roi,
        paybackPeriod,
        npv,
        irr,
        totalReturn
      };

      setResults(calculationResults);
      
      // Track successful calculation
      trackROICalculation({
        inputs: inputs,
        results: calculationResults,
        calculation_number: newCount,
        calculation_time: Date.now() - calculationStart,
        roi_category: roi > 25 ? 'excellent' : roi > 15 ? 'good' : 'moderate',
        user_satisfaction: 'calculated',
      });
      
      console.log(`💰 ROI calculation completed: ${roi.toFixed(1)}%`);
      
      setIsCalculating(false);
    }, 1000);
  };

  const resetToDefaults = () => {
    // Track reset action
    trackCalculatorUsage('calculator_reset', {
      previous_inputs: inputs,
      calculation_count: calculationCount,
      session_time: Date.now() - startTime,
    });
    
    setInputs(defaultInputs);
    setResults(null);
    console.log("🔄 Calculator reset to defaults");
  };

  // Track download action
  const handleDownloadReport = () => {
    if (results) {
      trackCTA('download_roi_report', 'calculator_results', 'roi_report.pdf');
      
      // Track advanced user behavior
      trackCalculatorUsage('report_download', {
        results: results,
        inputs: inputs,
        calculation_count: calculationCount,
        user_type: 'advanced_user',
      });
      
      console.log("📄 ROI report download tracked");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('lv-LV', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (number: number, decimals: number = 1) => {
    return new Intl.NumberFormat('lv-LV', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(number);
  };

  useEffect(() => {
    calculateROI();
  }, [inputs]);

  // Track input changes for engagement metrics
  const trackInputChange = (inputType: string, value: number) => {
    if (calculationCount > 0) { // Only track after first calculation
      trackCalculatorUsage('input_modified', {
        input_type: inputType,
        new_value: value,
        calculation_count: calculationCount,
        user_engagement: 'parameter_optimization',
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-metan-primary to-metan-accent text-white">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              ROI kalkulators
            </h1>
            <p className="text-xl leading-relaxed mb-8 text-white/90">
              Aprēķiniet sava ieguldījuma atdevi CH₄ Future projektā. Interaktīvs kalkulators 
              biometāna ražošanas ieņēmumiem ar detalizētiem finanšu rādītājiem.
            </p>
            <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <Info className="h-6 w-6" />
              <p className="text-sm">
                Aprēķini balstīti uz reāliem tirgus datiem un projekta CH₄ Future finansu modeli
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20">
        <div className="metan-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="metan-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Calculator className="h-6 w-6 text-metan-primary" />
                    Projekta parametri
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Investment Amount */}
                  <div>
                    <Label className="text-base font-medium">
                      Ieguldījuma summa (€)
                    </Label>
                    <Input
                      type="number"
                      value={inputs.investmentAmount}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setInputs({...inputs, investmentAmount: value});
                        trackInputChange('investment_amount', value);
                      }}
                      className="mt-2"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Kopējā nepieciešamā investīciju summa
                    </p>
                  </div>

                  {/* Biogas Production */}
                  <div>
                    <Label className="text-base font-medium">
                      Biometāna ražošana (MWh/gadā)
                    </Label>
                    <div className="mt-2 mb-4">
                      <Slider
                        value={[inputs.biogasProduction]}
                        onValueChange={(value) => {
                          setInputs({...inputs, biogasProduction: value[0]});
                          trackInputChange('biogas_production', value[0]);
                        }}
                        max={35000}
                        min={15000}
                        step={1000}
                        className="w-full"
                      />
                    </div>
                    <Input
                      type="number"
                      value={inputs.biogasProduction}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setInputs({...inputs, biogasProduction: value});
                        trackInputChange('biogas_production', value);
                      }}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Gada biometāna ražošanas apjoms
                    </p>
                  </div>

                  {/* Biogas Price */}
                  <div>
                    <Label className="text-base font-medium">
                      Biometāna cena (€/MWh)
                    </Label>
                    <div className="mt-2 mb-4">
                      <Slider
                        value={[inputs.biogasPrice]}
                        onValueChange={(value) => {
                          setInputs({...inputs, biogasPrice: value[0]});
                          trackInputChange('biogas_price', value[0]);
                        }}
                        max={150}
                        min={70}
                        step={5}
                        className="w-full"
                      />
                    </div>
                    <Input
                      type="number"
                      value={inputs.biogasPrice}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setInputs({...inputs, biogasPrice: value});
                        trackInputChange('biogas_price', value);
                      }}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Pārdošanas cena par MWh (ieskaitot ISCC sertifikāciju)
                    </p>
                  </div>

                  {/* Operating Costs */}
                  <div>
                    <Label className="text-base font-medium">
                      Ekspluatācijas izmaksas (€/gadā)
                    </Label>
                    <Input
                      type="number"
                      value={inputs.operatingCosts}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setInputs({...inputs, operatingCosts: value});
                        trackInputChange('operating_costs', value);
                      }}
                      className="mt-2"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Ikgadējās darbības izmaksas (personāls, uzturēšana, utt.)
                    </p>
                  </div>

                  {/* Project Lifetime */}
                  <div>
                    <Label className="text-base font-medium">
                      Projekta ilgums (gadi)
                    </Label>
                    <div className="mt-2 mb-4">
                      <Slider
                        value={[inputs.projectLifetime]}
                        onValueChange={(value) => {
                          setInputs({...inputs, projectLifetime: value[0]});
                          trackInputChange('project_lifetime', value[0]);
                        }}
                        max={30}
                        min={10}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <Input
                      type="number"
                      value={inputs.projectLifetime}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setInputs({...inputs, projectLifetime: value});
                        trackInputChange('project_lifetime', value);
                      }}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Kopējais projekta darbības laiks
                    </p>
                  </div>

                  <Separator />

                  <div className="flex gap-3">
                    <Button 
                      onClick={calculateROI}
                      className="flex-1 metan-button-primary"
                      disabled={isCalculating}
                    >
                      {isCalculating ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Calculator className="mr-2 h-4 w-4" />
                      )}
                      Aprēķināt ROI
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={resetToDefaults}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Atiestatīt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Main Results */}
              <Card className="metan-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                    Aprēķina rezultāti
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {results ? (
                    <div className="space-y-6">
                      {/* ROI Highlight */}
                      <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          {formatNumber(results.roi, 1)}%
                        </div>
                        <p className="text-gray-600 font-medium">Gada atdeve (ROI)</p>
                      </div>

                      {/* Key Metrics Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-metan-primary mb-1">
                            {formatNumber(results.paybackPeriod, 1)}
                          </div>
                          <p className="text-sm text-gray-600">Atmaksāšanās (gadi)</p>
                        </div>
                        
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {formatNumber(results.irr, 1)}%
                          </div>
                          <p className="text-sm text-gray-600">IRR</p>
                        </div>
                      </div>

                      {/* Financial Details */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-gray-600">Gada ieņēmumi:</span>
                          <span className="font-semibold text-green-600">
                            {formatCurrency(results.annualRevenue)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-gray-600">Gada peļņa:</span>
                          <span className="font-semibold text-blue-600">
                            {formatCurrency(results.annualProfit)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-2 border-b">
                          <span className="text-gray-600">NPV (20 gadi):</span>
                          <span className="font-semibold text-purple-600">
                            {formatCurrency(results.npv)}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600">Kopējā atdeve:</span>
                          <span className="font-semibold text-metan-primary">
                            {formatCurrency(results.totalReturn)}
                          </span>
                        </div>
                      </div>

                      {/* Performance Badge */}
                      <div className="text-center">
                        <Badge className={`text-sm px-4 py-2 ${
                          results.roi > 25 ? 'bg-green-100 text-green-800' :
                          results.roi > 15 ? 'bg-teal-100 text-teal-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {results.roi > 25 ? 'Ļoti augsta atdeve' :
                           results.roi > 15 ? 'Laba atdeve' :
                           'Vidēja atdeve'}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Mainiet parametrus, lai aprēķinātu ROI</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Assumptions */}
              <Card className="metan-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Info className="h-6 w-6 text-blue-600" />
                    Aprēķina pieņēmumi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Tikai biometāna pārdošanas ieņēmumi</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Diskonta likme NPV: 7% gadā</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Inflācija un nodokļi nav iekļauti</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Konstanta ražošana visā perioda laikā</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Download Report */}
              <Button 
                className="w-full metan-button-primary" 
                disabled={!results}
                onClick={handleDownloadReport}
              >
                <Download className="mr-2 h-5 w-5" />
                Lejupielādēt detalizēto atskaiti
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scenario Analysis */}
      <section className="py-20 bg-gray-50">
        <div className="metan-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-metan-gray mb-4">Scenāriju analīze</h2>
            <p className="text-xl text-gray-600">Dažādi tirgus apstākļi un to ietekme uz atdevi</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Conservative Scenario */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="metan-card h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <BarChart3 className="h-6 w-6 text-orange-600" />
                    Konservatīvs scenārijs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Konservatīvs scenārijs</h3>
                    <div className="text-2xl font-bold text-orange-600 mb-2">24.0%</div>
                    <div className="text-sm text-gray-600 mb-4">Gada ROI</div>
                    <div className="space-y-2 text-sm">
                      <div>Biometāns: <span className="font-semibold">75 €/MWh</span></div>
                      <div>Ražošana: <span className="font-semibold">26,951 MWh</span></div>
                      <div>Atmaksāšanās: <span className="font-semibold">4.2 gadi</span></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Realistic Scenario */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="metan-card h-full border-2 border-metan-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-metan-primary" />
                    Reālais scenārijs
                    <Badge className="bg-metan-primary">Ieteicamais</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-metan-light rounded-lg">
                      <div className="text-3xl font-bold text-metan-primary mb-2">
                        {results ? formatNumber(results.roi, 1) : '55.0'}%
                      </div>
                      <p className="text-sm text-metan-primary font-medium">Gada ROI</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Biometāns:</span>
                        <span>95 €/MWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ražošana:</span>
                        <span>26,951 MWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Atmaksāšanās:</span>
                        <span>1.8 gadi</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Optimistic Scenario */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="metan-card h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-green-600" />
                    Optimistisks scenārijs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600 mb-2">97.5%</div>
                      <p className="text-sm text-green-700">Gada ROI</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Biometāns:</span>
                        <span>110 €/MWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ražošana:</span>
                        <span>30,000 MWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Atmaksāšanās:</span>
                        <span>1.0 gads</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section - улучшенные призывы к действию */}
      <EnhancedCTA variant="calculator" />

      {/* Hidden SEO content */}
      <div style={{ display: 'none' }}>
        <p>ROI kalkulators biometāns investīcijas atdeve CH4 Future</p>
        <p>biometāna ražošana ieņēmumi peļņa atmaksāšanās periods</p>
        <p>NPV IRR finanšu analīze investīciju aprēķins METAN.LV</p>
        <p>CO2 cena elektroenerģija ekspluatācijas izmaksas scenāriji</p>
        <p>Ainavas Nams biogāze zaļā enerģija projekta ekonomika</p>
      </div>
    </div>
  );
}
