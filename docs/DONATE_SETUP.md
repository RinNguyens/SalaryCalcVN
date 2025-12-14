# 🎯 Donation System Setup Guide

## 📋 What's Been Implemented

✅ Floating donate button with glass morphism effect
✅ Donation modal with payment method selection
✅ Support for multiple payment methods (International & Vietnam)
✅ Glass UI design matching the app theme
✅ Animated coffee icon with pulse effect

## 🔧 Configuration Required

### 1. Update Payment Details

Edit `/utils/payment.ts` with your actual payment information:

```typescript
export const PAYMENT_CONFIG = {
  momo: {
    phoneNumber: 'YOUR_MOMO_PHONE', // Update
    qrCodeUrl: '/qr/momo-qr.png',
  },
  bank: {
    bank: 'YOUR_BANK_NAME', // e.g., Vietcombank
    accountNumber: 'YOUR_ACCOUNT_NUMBER',
    accountName: 'YOUR_ACCOUNT_NAME',
    qrCodeUrl: '/qr/bank-qr.png',
  },
  buymeacoffee: 'https://www.buymeacoffee.com/YOUR_USERNAME', // Update
  kofi: 'https://ko-fi.com/YOUR_USERNAME', // Update
};
```

### 2. Add QR Code Images

Place your QR code images in `/public/qr/`:

- `momo-qr.png` - Your Momo QR code
- `zalopay-qr.png` - Your ZaloPay QR code
- `bank-qr.png` - Your bank VietQR code

**How to generate QR codes:**

**Momo:**
1. Open Momo app
2. Go to "Receive Money" > "QR Code"
3. Screenshot or save the QR code

**ZaloPay:**
1. Open ZaloPay app
2. Find "Receive Money" feature
3. Save the QR code

**Bank Transfer:**
1. Use your banking app's QR code feature
2. Or use VietQR generator online
3. Generate QR with your account details

## 🎨 Customization Options

### Change Donation Amounts

Edit in `/components/donate/donate-modal.tsx`:

```typescript
const amounts = [
  { value: 3, label: '$3', cups: '☕' },
  { value: 5, label: '$5', cups: '☕☕' },
  { value: 10, label: '$10', cups: '☕☕☕' },
  { value: 25, label: '$25', cups: '💝' }, // Add custom amounts
];
```

### Change Currency

Update the conversion rate in `/utils/payment.ts`:

```typescript
export function usdToVnd(usd: number): number {
  return usd * 23000; // Update with current rate
}
```

## 🚀 Optional Enhancements

### 1. Add Analytics Tracking

```typescript
// Add to handleDonate function in donate-modal.tsx
export function trackDonateClick(method: string, amount: number) {
  // Google Analytics example
  gtag('event', 'donate_click', {
    payment_method: method,
    value: amount,
    currency: 'USD',
  });
}
```

### 2. Add "Don't show again" Logic

```typescript
// Save to localStorage or cookies
localStorage.setItem('donate-modal-dismissed', Date.now().toString());
```

### 3. Add Supporter Wall

Create a page to display supporter names (with permission).

### 4. Add Email Notifications

Set up a webhook or API endpoint to receive donation notifications.

## 📱 Testing the System

1. Check the floating button appears in bottom-right corner
2. Click to open the modal
3. Select different amounts and payment methods
4. Verify QR codes display correctly (add actual QR images)
5. Test payment links redirect correctly

## 🎯 Pro Tips

1. **Start with Buy Me a Coffee** - Easiest international setup
2. **Add local payments** - Momo/ZaloPay for Vietnamese users
3. **Update QR codes regularly** - Some banking apps refresh QR codes
4. **Test on mobile** - Ensure mobile apps open correctly
5. **Add social proof** - Show "X supporters" in the UI

## 💡 Troubleshooting

- **QR codes not showing?** Check file paths in `/public/qr/`
- **Payment links not working?** Verify the deep link formats
- **Button not appearing?** Check if FloatingDonateButton is imported in layout
- **Glass effect not working?** Ensure backdrop-blur is supported by the browser

## 📊 Recommended Next Steps

1. Set up actual payment accounts
2. Generate and add real QR codes
3. Test donation flows end-to-end
4. Add analytics to track conversions
5. Consider adding a "Thank You" page after successful donation

---

## 🎉 You're all set!

Your donation system is now integrated with the glass UI theme. Update the payment configuration and add your QR codes to start accepting donations! ☕💜