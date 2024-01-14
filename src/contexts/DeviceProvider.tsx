'use client'

import MobileModal from '@/components/modal/MobileModal'
import { createContext, useContext } from 'react'

const DeviceContext = createContext<{ deviceInfo: string }>({
  deviceInfo: 'null',
})

const DeviceProvider = ({ children, deviceInfo }: any) => {
  if (deviceInfo === 'Mobile') return <MobileModal />
  return (
    <DeviceContext.Provider value={{ deviceInfo }}>
      {children}
    </DeviceContext.Provider>
  )
}

export default DeviceProvider

export const useDeviceContext = () => useContext(DeviceContext)
