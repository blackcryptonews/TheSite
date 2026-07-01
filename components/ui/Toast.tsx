'use client'

import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'linear-gradient(135deg, rgba(189, 0, 255, 0.1) 0%, rgba(5, 5, 5, 0.95) 50%)',
          color: '#C8C8C8',
          border: '1px solid rgba(189, 0, 255, 0.3)',
          borderRadius: '16px',
          backdropFilter: 'blur(12px)',
          padding: '16px 24px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(189, 0, 255, 0.2)'
        },
        success: {
          iconTheme: {
            primary: '#00F0FF',
            secondary: '#050505'
          },
          style: {
            border: '1px solid rgba(0, 240, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 240, 255, 0.2)'
          }
        },
        error: {
          iconTheme: {
            primary: '#FF0055',
            secondary: '#050505'
          },
          style: {
            border: '1px solid rgba(255, 0, 85, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 0, 85, 0.2)'
          }
        },
        loading: {
          iconTheme: {
            primary: '#FFD700',
            secondary: '#050505'
          }
        }
      }}
    />
  )
}
