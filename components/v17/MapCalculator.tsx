'use client';

import dynamic from 'next/dynamic';

export type CalcResult = {
  distance: number;
  zone: string;
  price: number | null;
  basePrice: number | null;
  isIndividual: boolean;
};

export type MapCalcPayload = {
  lat: number;
  lng: number;
  address: string;
  result: CalcResult;
};

export type ExternalPin = {
  lat: number;
  lng: number;
  address?: string;
};

type Props = {
  onResult?: (payload: MapCalcPayload) => void;
  externalPin?: ExternalPin | null;
};

const MapCalculator = dynamic<Props>(() => import('./MapCalculatorClient'), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] md:h-[620px] w-full animate-pulse rounded-2xl bg-gray-200" />
  ),
});

export default MapCalculator;
