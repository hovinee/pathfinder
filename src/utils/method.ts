export const detectDevice = (userAgent: string) => {
  const isMobile = /Mobile/i.test(userAgent) && !/iPad/i.test(userAgent)
  const isIPad = /iPad/i.test(userAgent) && /Mobile/i.test(userAgent)
  const isGalaxyTab = /SM-T|GT-P|SM-P/i.test(userAgent)
  const isWindows = /Windows/i.test(userAgent) || /Mac/i.test(userAgent)

  if (isMobile) {
    return 'Mobile'
  } else if (isIPad || isGalaxyTab) {
    return 'Tablet'
  } else if (isWindows) {
    return 'Windows'
  } else {
    return 'Not Mobile, Tablet, Windows'
  }
}
