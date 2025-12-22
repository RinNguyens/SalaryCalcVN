'use client';

import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';

interface FormattedCurrencyInputProps {
  value: number | string | undefined;
  onChange: (value: string | number | undefined) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
}

export function FormattedCurrencyInput({
  value,
  onChange,
  placeholder = '20,000,000',
  className,
  id,
  disabled = false,
}: FormattedCurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Format number to VND currency string
  const formatToVND = useCallback((num: number): string => {
    return new Intl.NumberFormat('vi-VN').format(num);
  }, []);

  // Parse VND string back to number
  const parseFromVND = useCallback((str: string): number => {
    // Remove all non-digit characters
    const cleanStr = str.replace(/[^\d]/g, '');
    // Return 0 for empty strings, but ensure React Hook Form detects the change
    return cleanStr ? parseInt(cleanStr, 10) : 0;
  }, []);

  // Initialize display value when component mounts or value changes from outside
  useEffect(() => {
    if (!isFocused) {
      let numValue = 0;
      if (value !== undefined && value !== null && value !== '') {
        numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
      }
      if (numValue > 0) {
        setDisplayValue(formatToVND(numValue));
      } else {
        setDisplayValue('');
      }
    }
  }, [value, isFocused, formatToVND]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Allow empty input or numbers only (while typing)
    if (inputValue === '' || /^\d+$/.test(inputValue)) {
      setDisplayValue(inputValue);

      // Convert to number and call onChange
      if (inputValue === '') {
        onChange(''); // Pass empty string to trigger validation
      } else {
        onChange(inputValue); // Pass the raw string value
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Show raw number without formatting when focused
    let numValue = 0;
    if (value !== undefined && value !== null && value !== '') {
      numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
    }
    if (numValue > 0) {
      setDisplayValue(numValue.toString());
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Format the value when losing focus
    let numValue = 0;
    if (value !== undefined && value !== null && value !== '') {
      numValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
    }
    if (numValue > 0) {
      setDisplayValue(formatToVND(numValue));
    } else {
      setDisplayValue('');
    }
  };

  return (
    <div className="relative">
      <Input
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={className}
        id={id}
        disabled={disabled}
      />
    </div>
  );
}