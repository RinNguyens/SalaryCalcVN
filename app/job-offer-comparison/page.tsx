'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, GitCompare, BarChart3, Settings } from 'lucide-react';
import { OfferCard } from '@/components/offer-comparison/offer-card';
import { ComparisonResults } from '@/components/offer-comparison/comparison-results';
import { OfferForm } from '@/components/offer-comparison/offer-form';
import { ComparisonInsights } from '@/components/offer-comparison/comparison-insights';
import { calculateOfferComparison } from '@/lib/calculations/offer-comparison';
import { saveOfferComparison } from '@/lib/storage/offer-storage';
import type { JobOffer, ComparisonResult, UserPriorities } from '@/types/job-offer';

export default function JobOfferComparisonPage() {
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [selectedOffers, setSelectedOffers] = useState<string[]>([]);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [priorities, setPriorities] = useState<UserPriorities>({
    salary: 8,
    bonuses: 7,
    benefits: 6,
    workLifeBalance: 9,
    career: 7,
    commute: 5,
  });
  const [activeTab, setActiveTab] = useState('offers');
  const [showForm, setShowForm] = useState(false);
  const [editingOffer, setEditingOffer] = useState<JobOffer | null>(null);

  const handleAddOffer = (offerData: Partial<JobOffer>) => {
    const newOffer: JobOffer = {
      id: Date.now().toString(),
      createdAt: new Date(),
      currency: 'VND',
      ...offerData,
    } as JobOffer;

    setOffers([...offers, newOffer]);
    setShowForm(false);
    setEditingOffer(null);
  };

  const handleEditOffer = (offer: JobOffer) => {
    setEditingOffer(offer);
    setShowForm(true);
  };

  const handleUpdateOffer = (updatedOffer: Partial<JobOffer>) => {
    if (!editingOffer) return;

    const mergedOffer = { ...editingOffer, ...updatedOffer };
    setOffers(offers.map(o => o.id === mergedOffer.id ? mergedOffer : o));
    setShowForm(false);
    setEditingOffer(null);
  };

  const handleDeleteOffer = (offerId: string) => {
    setOffers(offers.filter(o => o.id !== offerId));
    setSelectedOffers(selectedOffers.filter(id => id !== offerId));
  };

  const handleToggleSelect = (offerId: string) => {
    setSelectedOffers(prev =>
      prev.includes(offerId)
        ? prev.filter(id => id !== offerId)
        : [...prev, offerId]
    );
  };

  const handleCompare = () => {
    const offersToCompare = offers.filter(o => selectedOffers.includes(o.id));
    if (offersToCompare.length < 2) return;

    const result = calculateOfferComparison(offersToCompare, priorities);
    setComparisonResult(result);
    setActiveTab('results');

    // Save comparison to storage
    saveOfferComparison({
      id: Date.now().toString(),
      offers: offersToCompare,
      userPriorities: priorities,
      createdAt: new Date(),
      updatedAt: new Date(),
      isShared: false,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1 as const,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen  p-4 md:p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"
          animate={{
            y: [0, 100, 0],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          animate={{
            y: [0, -80, 0],
            x: [0, -60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
            So sánh Thư<span className="text-yellow-300"> mời</span>
          </h1>
          <p className="text-black/80 text-lg md:text-xl">
            Phân tích và so sánh các lời mời làm việc một cách toàn diện
          </p>
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="offers" className="gap-2">
              <GitCompare className="h-4 w-4" />
              Thư mời ({offers.length})
            </TabsTrigger>
            <TabsTrigger value="results" className="gap-2" disabled={!comparisonResult}>
              <BarChart3 className="h-4 w-4" />
              Kết quả
            </TabsTrigger>
            <TabsTrigger value="insights" className="gap-2" disabled={!comparisonResult}>
              <Settings className="h-4 w-4" />
              Phân tích sâu
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Ưu tiên
            </TabsTrigger>
          </TabsList>

          {/* Offers Tab */}
          <TabsContent value="offers">
            <div className="space-y-6">
              {/* Action Bar */}
              <motion.div
                className="flex flex-wrap gap-4 items-center justify-between"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button
                  onClick={() => setShowForm(true)}
                  className="gap-2 bg-white/20 border-white/30 text-black hover:bg-white/30"
                >
                  <Plus className="h-4 w-4" />
                  Thêm thư mời
                </Button>

                {selectedOffers.length >= 2 && (
                  <Button
                    onClick={handleCompare}
                    className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <GitCompare className="h-4 w-4" />
                    So sánh {selectedOffers.length} thư mời
                  </Button>
                )}
              </motion.div>

              {/* Offers Grid */}
              {offers.length === 0 ? (
                <motion.div
                  className="glass-subtle rounded-2xl p-12 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <GitCompare className="h-16 w-16 text-black/50 mx-auto mb-4" />
                  <h3 className="text-black text-xl font-semibold mb-2">
                    Chưa có thư mời nào
                  </h3>
                  <p className="text-black/70 mb-6">
                    Thêm thư mời đầu tiên để bắt đầu so sánh
                  </p>
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-white/20 border-white/30 text-black hover:bg-white/30"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm thư mời
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {offers.map((offer) => (
                    <motion.div key={offer.id} variants={itemVariants}>
                      <OfferCard
                        offer={offer}
                        isSelected={selectedOffers.includes(offer.id)}
                        onSelect={() => handleToggleSelect(offer.id)}
                        onEdit={() => handleEditOffer(offer)}
                        onDelete={() => handleDeleteOffer(offer.id)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results">
            {comparisonResult ? (
              <ComparisonResults result={comparisonResult} />
            ) : (
              <motion.div
                className="glass-subtle rounded-2xl p-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <BarChart3 className="h-16 w-16 text-black/50 mx-auto mb-4" />
                <p className="text-black/70">
                  Vui lòng chọn ít nhất 2 thư mời để so sánh
                </p>
              </motion.div>
            )}
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights">
            {comparisonResult ? (
              <ComparisonInsights
                result={comparisonResult}
                priorities={priorities}
                onPrioritiesChange={setPriorities}
              />
            ) : (
              <motion.div
                className="glass-subtle rounded-2xl p-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Settings className="h-16 w-16 text-black/50 mx-auto mb-4" />
                <p className="text-black/70">
                  Hoàn thành so sánh để xem phân tích sâu
                </p>
              </motion.div>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <motion.div
              className="glass-subtle rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-black text-xl font-semibold mb-6">
                Tùy chỉnh ưu tiên của bạn
              </h3>
              <p className="text-black/70 mb-6">
                Điều chỉnh trọng số cho từng yếu tố để nhận kết quả so sánh phù hợp nhất
              </p>
              {/* Priority settings component will go here */}
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Offer Form Modal */}
        <AnimatePresence>
          {showForm && (
            <OfferForm
              offer={editingOffer}
              onSubmit={editingOffer ? handleUpdateOffer : handleAddOffer}
              onCancel={() => {
                setShowForm(false);
                setEditingOffer(null);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}