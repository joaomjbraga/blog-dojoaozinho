"use client"

import { useEffect, useState } from "react"
import {
  ArrowUp,
  Copy,
  X,
  Plus,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Falha ao copiar link:', error)
    }
  }

  const actions = [
    ...(showScrollButton ? [{
      icon: <ArrowUp size={18} />,
      label: "Topo",
      onClick: scrollToTop,
    }] : []),
    {
      icon: <Copy size={18} />,
      label: "Compartilhar",
      onClick: copyLink,
    },
  ]

  return (
    <>
      <AnimatePresence>
        {copied && (
          <motion.div
            key="copy-notification"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            role="alert"
            aria-live="assertive"
            className="fixed top-5 right-5 z-50 rounded-md bg-green-600 px-5 py-3 text-white shadow-lg ring-1 ring-green-400/50
              dark:bg-green-500 dark:ring-green-300/70 select-none font-semibold text-sm"
          >
            Link copiado!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end space-y-3">
        <AnimatePresence>
          {isOpen &&
            actions.map((action, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 12 }}
                transition={{ duration: 0.18, delay: i * 0.06 }}
                onClick={() => {
                  action.onClick()
                  setIsOpen(false)
                }}
                className="
                  flex items-center gap-2
                  min-w-[40px] w-auto px-3 py-2
                  rounded-full
                  bg-gray-100 text-gray-900
                  shadow-md
                  hover:bg-gray-200
                  active:scale-95 active:bg-gray-300
                  dark:bg-gray-800 dark:text-gray-100
                  dark:hover:bg-gray-700
                  transition
                  select-none
                  whitespace-nowrap
                  text-xs md:text-sm
                  font-medium
                "
                title={action.label}
              >
                {action.icon}
                <span>{action.label}</span>
              </motion.button>
            ))}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          className="
            p-3 md:p-4
            rounded-full
            bg-primary
            text-primary-foreground
            shadow-xl
            hover:scale-110
            active:scale-95
            transition
            focus:outline-none focus:ring-2 focus:ring-primary/80 focus:ring-offset-2
            select-none
            flex items-center justify-center
          "
        >
          {isOpen ? <X size={20} className="md:w-6 md:h-6" /> : <Plus size={20} className="md:w-6 md:h-6" />}
        </button>
      </div>
    </>
  )
}
