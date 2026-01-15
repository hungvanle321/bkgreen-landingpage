"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface AdminTitleContextType {
  title: string
  setTitle: (title: string) => void
}

const AdminTitleContext = createContext<AdminTitleContextType | undefined>(undefined)

export function AdminTitleProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState('Bảng điều khiển')

  return (
    <AdminTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </AdminTitleContext.Provider>
  )
}

export function useAdminTitle() {
  const context = useContext(AdminTitleContext)
  if (context === undefined) {
    throw new Error('useAdminTitle must be used within AdminTitleProvider')
  }
  return context
}
