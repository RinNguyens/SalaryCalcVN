"use client";

import { useEffect, useState } from "react";

interface TypewriterEffectProps {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  isOn?: boolean;
  duration?: number;
}

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  isOn = true,
  duration = 3000
}: TypewriterEffectProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const isLastChar = currentCharIndex === currentWord.text.length;
    const isFirstChar = currentCharIndex === 0;

    const timeout = setTimeout(
      () => {
        if (!isDeleting && isLastChar) {
          // Wait before starting to delete
          setTimeout(() => setIsDeleting(true), 2000);
          return;
        }

        if (isDeleting && isFirstChar) {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          return;
        }

        setCurrentCharIndex((prev) => prev + (isDeleting ? -1 : 1));
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentWordIndex, isDeleting, words]);

  // If isOn is false, show all words at once
  if (!isOn) {
    return (
      <div className={`flex w-full`}>
        <span
          className={`inline-bloc`}
        >
        {words[0].text}
      </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex ${className}`}>
      <span className="text-black/60">
        {words[currentWordIndex].text.slice(0, currentCharIndex)}
        <span
          className={`inline-block w-1 h-5 bg-blue-500 ml-1 animate-pulse ${cursorClassName}`}
        />
      </span>
    </div>
  );
};

export default TypewriterEffect;