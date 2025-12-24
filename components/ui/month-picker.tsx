"use client"

import * as React from "react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

interface MonthPickerProps {
  value?: string // Format: "YYYY-MM"
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  id?: string
  name?: string
}

export function MonthPicker({
  value,
  onChange,
  placeholder = "Chọn tháng",
  disabled = false,
  className,
  id,
  name,
}: MonthPickerProps) {
  const [open, setOpen] = React.useState(false)

  // Parse "YYYY-MM" to Date
  const parseMonth = (monthStr: string | undefined): Date | undefined => {
    if (!monthStr) return undefined
    const [year, month] = monthStr.split("-").map(Number)
    return new Date(year, month - 1, 1)
  }

  // Format Date to "YYYY-MM"
  const formatMonth = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    return `${year}-${month}`
  }

  const selectedDate = parseMonth(value)

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      const formatted = formatMonth(date)
      onChange?.(formatted)
      setOpen(false)
    }
  }

  // Get month/year display in Vietnamese
  const displayValue = selectedDate
    ? format(selectedDate, "MMMM yyyy", { locale: vi })
    : placeholder

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          name={name}
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {displayValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          captionLayout="dropdown"
          fromYear={2000}
          toYear={2030}
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  )
}
