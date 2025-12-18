'use client';

import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/utils/format-currency';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  MapPin,
  Clock,
  Calendar,
  Car,
  Edit,
  Trash2,
  Check,
  X
} from 'lucide-react';
import { GlassCard } from '@/components/shared/glass-card';
import type { JobOffer } from '@/types/job-offer';

interface OfferCardProps {
  offer: JobOffer;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function OfferCard({ offer, isSelected, onSelect, onEdit, onDelete }: OfferCardProps) {
  const calculateTotalCompensation = (offer: JobOffer) => {
    const baseAnnual = offer.baseSalary * 12;
    const bonusAnnual = offer.bonuses.performance + (offer.bonuses.signing || 0) + (offer.bonuses['13thMonth'] || 0);
    const equityAnnual = offer.bonuses.stock?.value || 0;
    const benefitsAnnual = calculateAnnualBenefits(offer);

    return baseAnnual + bonusAnnual + equityAnnual + benefitsAnnual;
  };

  const calculateAnnualBenefits = (offer: JobOffer) => {
    const health = offer.benefits.healthInsurance.value * 12;
    const meal = offer.benefits.mealAllowance.value *
      (offer.benefits.mealAllowance.frequency === 'daily' ? 22 : 1) * 12;
    const transport = offer.benefits.transport.value * 12;
    const phone = offer.benefits.phone * 12;
    const internet = offer.benefits.internet * 12;
    const gym = offer.benefits.gym * 12;

    return health + meal + transport + phone + internet + gym;
  };

  const totalComp = calculateTotalCompensation(offer);
  const totalCompMonthly = totalComp / 12;

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div variants={cardVariants} whileHover="hover">
      <GlassCard className={`relative h-full cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-4 ring-yellow-400/50' : ''
      }`} onClick={onSelect}>
        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute -top-3 -right-3 bg-yellow-400 text-slate-900 rounded-full p-1">
            <Check className="h-4 w-4" />
          </div>
        )}

        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-black">{offer.companyName}</h3>
                <p className="text-black/80">{offer.position}</p>
              </div>
              <Badge variant="secondary" className="bg-white/10 text-black">
                {offer.currency}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-black/70 text-sm">
              <MapPin className="h-4 w-4" />
              {offer.location}
            </div>
          </div>

          {/* Salary Highlights */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-yellow-300">
                {formatCurrency(totalCompMonthly, offer.currency)}
              </span>
              <span className="text-black/70 text-sm">/tháng</span>
            </div>
            <div className="text-black/60 text-sm">
              Tổng thu nhập: {formatCurrency(totalComp, offer.currency)}/năm
            </div>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-black/70">
                <Clock className="h-4 w-4" />
                {offer.workLife.workingDays} ngày/tuần
              </div>
              <div className="flex items-center gap-2 text-black/70">
                <Calendar className="h-4 w-4" />
                {offer.workLife.leaveDays.annual} ngày nghỉ
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-black/70">
                <Car className="h-4 w-4" />
                {offer.commute.distance}km
              </div>
              <div className="text-black/70">
                {offer.workLife.remote.daysPerWeek} ngày remote
              </div>
            </div>
          </div>

          {/* Benefits Badges */}
          <div className="flex flex-wrap gap-2">
            {offer.benefits.healthInsurance.value > 0 && (
              <Badge variant="outline" className="bg-white/10 text-black border-white/20 text-xs">
                BHYT
              </Badge>
            )}
            {offer.benefits.mealAllowance.value > 0 && (
              <Badge variant="outline" className="bg-white/10 text-black border-white/20 text-xs">
                Ăn trưa
              </Badge>
            )}
            {offer.bonuses.stock && (
              <Badge variant="outline" className="bg-white/10 text-black border-white/20 text-xs">
                Cổ phiếu
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-white/10">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 bg-white/10 border-white/20 text-black hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 bg-red-500/20 border-red-500/30 text-red-600 hover:bg-red-500/30"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}