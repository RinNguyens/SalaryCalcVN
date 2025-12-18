'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Linkedin,
  FileText,
  Shield,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { GlassCard } from '@/components/shared/glass-card';
import type { ShareVerification } from '@/types/salary-sharing';
import { createVerification, updateVerificationStatus } from '@/lib/storage/salary-sharing-storage';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareId: string;
  method: 'email' | 'linkedin' | 'paystub';
  onVerified?: () => void;
}

export function VerificationModal({ isOpen, onClose, shareId, method, onVerified }: VerificationModalProps) {
  const [email, setEmail] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verification, setVerification] = useState<ShareVerification | null>(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleSendVerification = async () => {
    setIsLoading(true);
    try {
      const newVerification = createVerification(shareId, method, {
        email: method === 'email' ? email : undefined,
        linkedinProfile: method === 'linkedin' ? linkedinUrl : undefined,
      });

      setVerification(newVerification);

      // Simulate sending verification
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (method === 'email') {
        setIsCodeSent(true);
        setMessage(`Verification code sent to ${email}`);
      } else {
        setMessage('Verification request sent successfully');
      }
    } catch (error) {
      setMessage('Failed to send verification. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verification) return;

    setIsLoading(true);
    try {
      // Simulate code verification
      await new Promise(resolve => setTimeout(resolve, 1000));

      const success = updateVerificationStatus(verification.token, 'verified');

      if (success) {
        setMessage('Verification successful!');
        setTimeout(() => {
          onVerified?.();
          onClose();
        }, 1500);
      } else {
        setMessage('Invalid verification code');
      }
    } catch (error) {
      setMessage('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };

  const renderVerificationContent = () => {
    if (verification && verification.status === 'verified') {
      return (
        <div className="text-center py-8">
          <CheckCircle2 className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-black mb-2">Verified!</h3>
          <p className="text-black/80">
            Your salary data has been successfully verified and is now public.
          </p>
        </div>
      );
    }

    switch (method) {
      case 'email':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Mail className="h-12 w-12 text-blue-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">
                Email Verification
              </h3>
              <p className="text-black/60">
                Enter your work email to receive a verification code
              </p>
            </div>

            {!isCodeSent ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Work Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="company@domain.com"
                    className="bg-white/10 border-white/20 text-black placeholder-white/50"
                  />
                </div>

                <Button
                  onClick={handleSendVerification}
                  disabled={!email || isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Verification Code'
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                  <p className="text-green-600 text-sm">
                    ✅ Verification code sent to {email}
                  </p>
                </div>

                <div>
                  <Label htmlFor="code">Verification Code</Label>
                  <Input
                    id="code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    className="bg-white/10 border-white/20 text-black placeholder-white/50 text-center text-lg"
                    maxLength={6}
                  />
                </div>

                <Button
                  onClick={handleVerifyCode}
                  disabled={!verificationCode || isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify'
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setIsCodeSent(false)}
                  className="w-full bg-white/10 border-white/20 text-black hover:bg-white/20"
                >
                  Use Different Email
                </Button>
              </div>
            )}
          </div>
        );

      case 'linkedin':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Linkedin className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">
                LinkedIn Verification
              </h3>
              <p className="text-black/60">
                Provide your LinkedIn profile URL for verification
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                <Input
                  id="linkedin"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="bg-white/10 border-white/20 text-black placeholder-white/50"
                />
              </div>

              <div className="p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                <p className="text-yellow-300 text-sm">
                  <AlertCircle className="h-4 w-4 inline mr-2" />
                  We will verify your current position matches the salary data provided
                </p>
              </div>

              <Button
                onClick={handleSendVerification}
                disabled={!linkedinUrl || isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify LinkedIn Profile'
                )}
              </Button>
            </div>
          </div>
        );

      case 'paystub':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <FileText className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">
                Paystub Verification
              </h3>
              <p className="text-black/60">
                Upload a recent paystub for private verification
              </p>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 text-black/40 mx-auto mb-4" />
                <p className="text-black/60 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-black/40 text-sm">
                  PDF, PNG, or JPG (max 5MB)
                </p>
                <Button variant="outline" className="mt-4 bg-white/10 border-white/20 text-black hover:bg-white/20">
                  Choose File
                </Button>
              </div>

              <div className="p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <p className="text-blue-300 text-sm">
                  <Shield className="h-4 w-4 inline mr-2" />
                  Your paystub will be processed privately and never shared
                </p>
              </div>

              <Button
                onClick={handleSendVerification}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Submit for Verification'
                )}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-black/20 backdrop-blur-xl border-white/20">
        <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
          <DialogHeader>
            <DialogTitle className="text-black text-xl">
              Verify Your Salary Data
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            {renderVerificationContent()}

            {message && (
              <div className={`mt-4 p-3 rounded-lg text-sm ${
                message.includes('success') || message.includes('sent')
                  ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                  : message.includes('Invalid') || message.includes('failed')
                  ? 'bg-red-500/20 border border-red-500/30 text-red-300'
                  : 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
              }`}>
                {message}
              </div>
            )}

            {method !== 'email' && (
              <Button
                variant="ghost"
                onClick={onClose}
                className="w-full mt-4 text-black/60 hover:text-black"
              >
                Cancel
              </Button>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}