"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="
        toaster group
        [--toast-border-width:2px]
        [--toast-box-shadow:0_2px_32px_#10101014]
        [--toast-gap:14px]
        [--toast-padding:18px]
        [--toast-font-family:var(--font-mono,sans-serif)]
        text-base font-mono rounded-xl
      "
      icons={{
        success: <CircleCheckIcon className="size-4 text-green-500" />,
        info: <InfoIcon className="size-4 text-blue-400" />,
        warning: <TriangleAlertIcon className="size-4 text-yellow-500" />,
        error: <OctagonXIcon className="size-4 text-red-500" />,
        loading: <Loader2Icon className="size-4 animate-spin text-gray-400" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          "--toast-box-shadow": "0 4px 40px #10101016",
        } as React.CSSProperties
      }
      toastOptions={{
        className:
          "shadow-lg border-2 border-border bg-gradient-to-br from-muted/75 to-background/60 text-foreground",
      }}
      {...props}
    />
  )
}

export { Toaster }
