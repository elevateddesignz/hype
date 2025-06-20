// src/components/ChainBuilder.tsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from './ui/Button';
import { useCart } from './CartContext';

type PendantStyle = 'Graduation' | 'MVP' | 'Birthday Champion';
type ChainType    = 'Lock' | 'Cuban Link';
type ColorName =
  | 'Black'   | 'Blue'    | 'Brown'
  | 'Cyan'    | 'Green'   | 'Magenta'
  | 'Orange'  | 'Purple'  | 'Red'
  | 'Yellow'  | 'White';

const COLOR_MAP: Record<ColorName, string> = {
  Black:   '#000000',
  Blue:    '#0000FF',
  Brown:   '#8B4513',
  Cyan:    '#00FFFF',
  Green:   '#00FF00',
  Magenta: '#FF00FF',
  Orange:  '#FFA500',
  Purple:  '#800080',
  Red:     '#FF0000',
  Yellow:  '#FFFF00',
  White:   '#FFFFFF',
};

const API_BASE =
  import.meta.env.MODE === 'development'
    ? '/api'
    : 'https://api.hypeemup.com/api';

interface ChainConfig {
  pendantStyle: PendantStyle;
  chainType: ChainType;
  name: string;
  year: string;
  primaryColorName: ColorName;
  secondaryColorName: ColorName;
  comment: string;
  imageKey: string;
}

interface PendantMockProps {
  style: PendantStyle;
  name: string;
  year: string;
  fillColor: string;
  strokeColor: string;
}

function PendantMock({
  style,
  name,
  year,
  fillColor,
  strokeColor
}: PendantMockProps) {
  const lines = style === 'Graduation'
    ? [`Class of ${year}`, year]
    : style === 'MVP'
      ? ['MVP', name || 'NAME', year]
      : ['Birthday', 'Champion', name || 'NAME'];

  return (
    <svg width={120} height={140} viewBox="0 0 120 140">
      <rect
        x={10}
        y={10}
        width={100}
        height={100}
        rx={20}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={6}
      />
      <circle cx={60} cy={5} r={8} fill={strokeColor} />
      <text
        x={60}
        y={50}
        fontSize={12}
        fontFamily="sans-serif"
        fill="#fff"
        textAnchor="middle"
      >
        {lines.map((l, i) => (
          <tspan key={i} x="60" dy={i ? 16 : 0}>
            {l}
          </tspan>
        ))}
      </text>
    </svg>
  );
}

export function ChainBuilder() {
  const { addItem } = useCart();

  const [pendantStyle, setPendantStyle] = useState<PendantStyle>('Graduation');
  const [chainType, setChainType]       = useState<ChainType>('Lock');
  const [name, setName]                 = useState('');
  const [year, setYear]                 = useState('2025');
  const [primaryColorName, setPrimaryColorName]     = useState<ColorName>('Blue');
  const [secondaryColorName, setSecondaryColorName] = useState<ColorName>('Orange');
  const [comment, setComment]           = useState('');
  const [previewUrl, setPreviewUrl]     = useState('');
  const [uploading, setUploading]       = useState(false);
  const [error, setError]               = useState<string | null>(null);

  // Price in cents (mirror backend logic)
  const calculatePrice = (): number => {
    let price = 5000; // $50 base
    price += chainType === 'Cuban Link' ? 1000 : 500; // +$10 or +$5
    return price;
  };

  const isFormValid = () => {
    const hasYear   = year.trim().length > 0;
    const needsName = pendantStyle !== 'Graduation';
    const hasName   = needsName ? name.trim().length > 0 : true;
    return hasYear && hasName;
  };

  // ◀️ Original S3 upload handler
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    setUploading(true);
    setError(null);

    try {
      const file = e.target.files[0];
      const form = new FormData();
      form.append('file', file);

      const resp = await fetch(`${API_BASE}/s3/upload`, {
        method: 'POST',
        body: form,
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(text || resp.statusText);
      }

      const { url } = await resp.json();
      setPreviewUrl(url);
    } catch (err: any) {
      console.error('[Upload]', err);
      setError(err.message || 'Upload error');
      alert(err.message || 'Upload error');
    } finally {
      setUploading(false);
    }
  }

  function handleAddToCart() {
    if (!isFormValid()) {
      alert('Please complete all required fields.');
      return;
    }
    const item = {
      id: uuidv4(),
      name: `${pendantStyle} ${chainType} Chain`,
      priceCents: calculatePrice(),
      qty: 1,
      // carry everything for cart display
      pendantStyle,
      chainType,
      name,
      year,
      primaryColorName,
      secondaryColorName,
      comment,
      imageKey: previewUrl || '/placeholders/no-image.png',
    };
    addItem(item);
    alert('Added to cart!');
  }

  // ◀️ Simplified Square checkout stub
  async function handleBuyWithSquare() {
    if (!isFormValid()) {
      alert('Please complete all required fields.');
      return;
    }
    setError(null);

    const config: ChainConfig = {
      pendantStyle,
      chainType,
      name,
      year,
      primaryColorName,
      secondaryColorName,
      comment,
      imageKey: previewUrl || '/placeholders/no-image.png',
    };

    try {
      const resp = await fetch(`${API_BASE}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      const text = await resp.text();
      if (!resp.ok) throw new Error(text || resp.statusText);

      const data = JSON.parse(text) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'No checkout URL returned');
      }
    } catch (err: any) {
      console.error('[Checkout]', err);
      setError(err.message || 'Checkout error');
      alert(err.message || 'Checkout error');
    }
  }

  return (
    <section className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h1 className="text-2xl font-bold mb-6">Build Your Custom Chain</h1>

      {/* Pendant Style */}
      <label className="block text-sm font-medium mb-1">Pendant Style</label>
      <select
        value={pendantStyle}
        onChange={e => setPendantStyle(e.target.value as PendantStyle)}
        className="w-full rounded-md border-gray-300 mb-4 p-2"
      >
        <option>Graduation</option>
        <option>MVP</option>
        <option>Birthday Champion</option>
      </select>

      {/* Chain Type */}
      <label className="block text-sm font-medium mb-1">Chain Type</label>
      <div className="flex space-x-4 mb-4">
        {(['Lock','Cuban Link'] as ChainType[]).map(ct => (
          <button
            key={ct}
            type="button"
            onClick={() => setChainType(ct)}
            className={`p-2 border rounded-lg ${
              chainType === ct ? 'border-primary bg-primary/10' : 'border-gray-300'
            }`}
          >
            <img
              src={ct === 'Lock' ? '/lock.png' : '/cuban.png'}
              alt={ct}
              className="w-16 h-16 mb-1"
            />
            <div className="text-sm">{ct}</div>
          </button>
        ))}
      </div>

      {/* Name & Year */}
      {(pendantStyle === 'MVP' || pendantStyle === 'Birthday Champion') && (
        <>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="NAME"
            className="w-full rounded-md border-gray-300 p-2 mb-4"
          />
        </>
      )}
      {(pendantStyle === 'Graduation' || pendantStyle === 'MVP') && (
        <>
          <label className="block text-sm font-medium mb-1">Year</label>
          <input
            type="number"
            min="2000" max="2099"
            value={year}
            onChange={e => setYear(e.target.value)}
            className="w-32 rounded-md border-gray-300 p-2 mb-4"
          />
        </>
      )}

      {/* Color Pickers */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {(['primary','secondary'] as const).map(type => (
          <div key={type}>
            <label className="block text-sm font-medium mb-1">
              {type === 'primary' ? 'Primary' : 'Secondary'} Color
            </label>
            <select
              value={type === 'primary' ? primaryColorName : secondaryColorName}
              onChange={e => {
                const v = e.target.value as ColorName;
                type === 'primary'
                  ? setPrimaryColorName(v)
                  : setSecondaryColorName(v);
              }}
              className="w-full rounded-md border-gray-300 p-2"
            >
              {(Object.keys(COLOR_MAP) as ColorName[]).map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Image Upload */}
      <label className="block text-sm font-medium mb-1">Reference Image (optional)</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full mb-2"
      />
      {uploading && <p className="text-xs text-gray-500 mb-2">Uploading…</p>}
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-32 h-32 object-cover rounded-md border mb-6"
        />
      )}

      {/* Special Instructions */}
      <label className="block text-sm font-medium mb-1">Special Instructions</label>
      <textarea
        rows={3}
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Enter any special instructions here..."
        className="w-full rounded-md border-gray-300 bg-white text-gray-800 p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {/* Live Preview */}
      <h2 className="text-lg font-semibold mb-2">Live Preview</h2>
      <div className="border border-gray-200 bg-gray-50 rounded-md p-4 mb-6 flex flex-col items-center">
        <p className="mb-2 text-sm text-gray-600"><strong>Chain:</strong> {chainType}</p>
        <PendantMock
          style={pendantStyle}
          name={name}
          year={year}
          fillColor={COLOR_MAP[primaryColorName]}
          strokeColor={COLOR_MAP[secondaryColorName]}
        />
      </div>

      {/* Error Message */}
      {error && <p className="mt-2 text-red-600">{error}</p>}

      {/* Add to Cart & Buy Now */}
      <div className="mt-6 text-right space-x-2">
        <Button onClick={handleAddToCart} disabled={!isFormValid()}>
          Add to Cart
        </Button>
        <Button onClick={handleBuyWithSquare} disabled={!isFormValid()}>
          Buy Now
        </Button>
      </div>
    </section>
  );
}
