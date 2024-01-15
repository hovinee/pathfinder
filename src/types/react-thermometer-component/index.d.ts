declare module 'react-thermometer-component' {
  import * as React from 'react'

  interface ThermometerProps {
    theme: string
    value: number
    max: string
    format: string
    size: string
    height: string
  }

  const Thermometer: React.FC<ThermometerProps>

  export default Thermometer
}
