"use client";

import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  encrypt?: boolean;
}

export default function EncryptedText({
  text,
  className,
  encrypt = true,
}: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  const displaySequence = 8; // Number of times to show random characters
  const speed = 50; // Speed of character change in ms

  useEffect(() => {
    let currentIndex = 0;
    let sequenceCount = 0;

    setIsAnimating(true);

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        if (sequenceCount < displaySequence) {
          // Show random characters
          const randomText = text
            .split("")
            .map((char, index) => {
              if (index <= currentIndex) {
                if (index === currentIndex) {
                  // Current position showing random character
                  return alphabets[Math.floor(Math.random() * alphabets.length)];
                }
                // Already revealed characters
                return char;
              }
              // Not yet reached positions
              return "";
            })
            .join("");

          setDisplayText(randomText);
          sequenceCount++;
        } else {
          // Reveal the actual character
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
          sequenceCount = 0;
        }
      } else {
        // Animation complete
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {encrypt ? displayText : text}
    </span>
  );
}