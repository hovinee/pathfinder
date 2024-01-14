interface TProps {
  children: React.ReactNode
}

const UnitySection = ({ children }: TProps) => {
  return <div className="absolute inset-0 z-10">{children}</div>
}

export default UnitySection
