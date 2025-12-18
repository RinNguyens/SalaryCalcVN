'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, X, Heart, CreditCard, Smartphone, Building2, QrCode } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { PAYMENT_CONFIG, generateMomoLink, generateZaloPayLink, usdToVnd, formatCurrency } from '@/utils/payment';

interface DonateModalProps {
  onClose: () => void;
}

export function DonateModal({ onClose }: DonateModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(3);
  const [selectedMethod, setSelectedMethod] = useState<string>('momo');
  const [showQR, setShowQR] = useState(false);

  const amounts = [
    { value: 3, label: '$3', cups: '☕' },
    { value: 5, label: '$5', cups: '☕☕' },
    { value: 10, label: '$10', cups: '☕☕☕' },
    { value: null, label: 'Custom', cups: '💝' },
  ];

  const paymentMethods = [
    {
      id: 'momo',
      name: 'Momo',
      icon: Smartphone,
      url: 'momo://payment',
      color: 'from-pink-500 to-rose-500',
      flag: '🇻🇳',
      qr: PAYMENT_CONFIG.momo.qrCodeUrl,
    },
    {
      id: 'zalopay',
      name: 'ZaloPay',
      icon: Smartphone,
      url: 'zalopay://payment',
      color: 'from-blue-500 to-cyan-500',
      flag: '🇻🇳',
      qr: PAYMENT_CONFIG.zalopay.qrCodeUrl,
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Building2,
      color: 'from-green-500 to-emerald-500',
      flag: '🇻🇳',
      info: {
        bank: PAYMENT_CONFIG.bank.bank,
        account: PAYMENT_CONFIG.bank.accountNumber,
        name: PAYMENT_CONFIG.bank.accountName,
        qr: PAYMENT_CONFIG.bank.qrCodeUrl,
      },
    },
  ];

  const handleDonate = () => {
    const method = paymentMethods.find(m => m.id === selectedMethod);

    if (method?.qr || method?.info) {
      setShowQR(true);
    } else if (method?.url) {
      window.open(method.url, '_blank');
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <GlassCard variant="strong" className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <Coffee className="h-8 w-8 text-amber-400" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Support SalaryLens
                </h2>
                <p className="text-white/70 text-sm">
                  Help keep this tool free & awesome!
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {!showQR ? (
            <>
              {/* Amount Selection */}
              <div className="mb-6">
                <label className="text-white font-medium mb-3 block">
                  Choose amount:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {amounts.map((amount) => (
                    <button
                      key={amount.value || 'custom'}
                      onClick={() => setSelectedAmount(amount.value)}
                      className={`
                        p-3 rounded-lg border-2 transition-all
                        ${selectedAmount === amount.value
                          ? 'border-amber-400 bg-amber-400/20 scale-105'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                        }
                      `}
                    >
                      <div className="text-2xl mb-1">{amount.cups}</div>
                      <div className="text-white font-medium text-sm">
                        {amount.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <label className="text-white font-medium mb-3 block">
                  Payment method:
                </label>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`
                        w-full p-3 rounded-lg border-2 transition-all
                        flex items-center gap-3
                        ${selectedMethod === method.id
                          ? 'border-white/40 bg-white/10 scale-[1.02]'
                          : 'border-white/20 bg-white/5 hover:border-white/30'
                        }
                      `}
                    >
                      <div className={`
                        p-2 rounded-lg bg-gradient-to-br ${method.color}
                      `}>
                        <method.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-white font-medium flex items-center gap-2">
                          {method.name}
                          <span className="text-lg">{method.flag}</span>
                        </div>
                      </div>
                      {selectedMethod === method.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-5 w-5 rounded-full bg-green-400 flex items-center justify-center"
                        >
                          ✓
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white"
                >
                  Maybe later
                </Button>
                <Button
                  onClick={handleDonate}
                  className="
                    flex-1 bg-gradient-to-r from-amber-500 to-orange-500
                    hover:from-amber-600 hover:to-orange-600
                    text-white font-semibold
                    shadow-lg
                  "
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Donate now
                </Button>
              </div>

              {/* Thank You Message */}
              <p className="text-white/60 text-xs text-center mt-4">
                Thank you for supporting independent developers! 💜
              </p>
            </>
          ) : (
            /* QR Code Display */
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">
                Scan QR Code
              </h3>

              {/* QR Code Image */}
              <div className="bg-white p-6 rounded-xl mb-4 inline-block">
                {selectedMethod === 'bank' ? (
                  <div className="space-y-4">
                    <div className="relative w-72 h-72 mx-auto">
                      <Image
                        src={PAYMENT_CONFIG.bank.qrCodeUrl}
                        alt="Bank Transfer QR Code"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="text-left text-sm text-slate-700 space-y-1 mt-4">
                      <p><strong>Bank:</strong> {PAYMENT_CONFIG.bank.bank}</p>
                      <p><strong>Account:</strong> {PAYMENT_CONFIG.bank.accountNumber}</p>
                      <p><strong>Name:</strong> {PAYMENT_CONFIG.bank.accountName}</p>
                      <p><strong>Amount:</strong> {formatCurrency(usdToVnd(selectedAmount || 5), 'VND')}</p>
                    </div>
                  </div>
                ) : selectedMethod === 'momo' ? (
                  <div className="relative w-72 h-72 mx-auto">
                    <Image
                      src={PAYMENT_CONFIG.momo.qrCodeUrl}
                      alt="Momo QR Code"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : selectedMethod === 'zalopay' ? (
                  <div className="relative w-72 h-72 mx-auto">
                    <Image
                      src={PAYMENT_CONFIG.zalopay.qrCodeUrl}
                      alt="ZaloPay QR Code"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <QrCode className="h-72 w-72 text-slate-400" />
                )}
              </div>

              <p className="text-white/80 mb-4">
                Open your {paymentMethods.find(m => m.id === selectedMethod)?.name} app
                and scan this QR code
              </p>

              <Button
                onClick={() => setShowQR(false)}
                variant="ghost"
                className="text-white"
              >
                ← Back to payment methods
              </Button>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}