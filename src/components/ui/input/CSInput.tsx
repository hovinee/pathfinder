import clsx from 'clsx'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'

interface TProps {
  type: 'text' | 'password'
  placeholder?: string
  setValue: Dispatch<SetStateAction<string>> | ((newValue: string) => void)
  textColor?: string
  bgColor?: string
  rounded?: string
  height?: string
  value?: string
  watchEnabled?: boolean
  disabled?: boolean
  className?: string
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

interface StringProps {
  [key: string]: string
}

const inputTextColor: StringProps = {
  C1C1C1: 'text-C1C1C1',
  white: 'text-white',
}

const inputbgColor: StringProps = {
  F2F2F2: 'bg-F2F2F2 ',
  'black/25': 'bg-black/25 ',
  141517: 'bg-141517',
  181818: 'bg-181818',
}

const inputRounded: StringProps = {
  '5': 'rounded-[0.5rem]',
  '10': 'rounded-[1rem]',
}

const inputHeight: StringProps = {
  '40': 'h-[4rem]',
  '45': 'h-[4.5rem]',
}

const CSInput = ({
  type,
  value,
  setValue,
  placeholder,
  textColor,
  bgColor,
  rounded,
  height,
  watchEnabled,
  disabled = false,
  className,
  onKeyDown,
}: TProps) => {
  return (
    <input
      className={clsx(
        'w-full border-none text-12 focus:outline-none',
        height ? inputHeight[height] : 'h-[4.4rem]',
        rounded && inputRounded[rounded],
        bgColor
          ? inputbgColor[bgColor]
          : disabled
            ? 'bg-gray-300'
            : 'bg-ECECEC',
        textColor ? inputTextColor[textColor] : 'text-565656',
        className,
      )}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      type={watchEnabled ? 'text' : type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onKeyDown={onKeyDown}
    />
  )
}

export default CSInput
