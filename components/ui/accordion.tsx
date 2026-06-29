"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

type AccordionContextValue = {
  openItems: Set<string>
  toggle: (value: string) => void
  type: "single" | "multiple"
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

function useAccordion() {
  const ctx = React.useContext(AccordionContext)
  if (!ctx) throw new Error("Accordion components must be used within Accordion")
  return ctx
}

function Accordion({
  type = "single",
  defaultValue,
  className,
  children,
}: {
  type?: "single" | "multiple"
  defaultValue?: string | string[]
  className?: string
  children: React.ReactNode
}) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(() => {
    if (!defaultValue) return new Set()
    return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue])
  })

  const toggle = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev)
        if (next.has(value)) {
          next.delete(value)
        } else if (type === "single") {
          return new Set([value])
        } else {
          next.add(value)
        }
        return type === "single" ? new Set([value]) : next
      })
    },
    [type]
  )

  return (
    <AccordionContext.Provider value={{ openItems, toggle, type }}>
      <div data-slot="accordion" className={cn("space-y-2", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

function AccordionItem({
  value,
  className,
  children,
}: {
  value: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      data-slot="accordion-item"
      data-value={value}
      className={cn("rounded-xl border bg-card", className)}
    >
      {children}
    </div>
  )
}

function AccordionTrigger({
  value,
  className,
  children,
}: {
  value: string
  className?: string
  children: React.ReactNode
}) {
  const { openItems, toggle } = useAccordion()
  const open = openItems.has(value)

  return (
    <button
      type="button"
      data-slot="accordion-trigger"
      aria-expanded={open}
      onClick={() => toggle(value)}
      className={cn(
        "flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium transition-colors hover:bg-muted/50",
        className
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          "size-4 shrink-0 text-muted-foreground transition-transform",
          open && "rotate-180"
        )}
      />
    </button>
  )
}

function AccordionContent({
  value,
  className,
  children,
}: {
  value: string
  className?: string
  children: React.ReactNode
}) {
  const { openItems } = useAccordion()
  if (!openItems.has(value)) return null

  return (
    <div
      data-slot="accordion-content"
      className={cn("border-t px-4 py-3 text-sm text-muted-foreground", className)}
    >
      {children}
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
