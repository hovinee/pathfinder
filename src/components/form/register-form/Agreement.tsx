import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSText from '@/components/ui/text/CSText'
import { Agreements } from '@/utils/types'
import React, { Dispatch, SetStateAction } from 'react'

interface Props {
  agreements: Agreements
  setAgreements: Dispatch<SetStateAction<Agreements>>
}
const Agreement = ({ agreements, setAgreements }: Props) => {
  const handleAllAgreements = () => {
    setAgreements({
      allAgreements: !agreements.allAgreements,
      over14: !agreements.allAgreements,
      serviceTerms: !agreements.allAgreements,
      privacyPolicy: !agreements.allAgreements,
    })
  }

  const handleSingleAgreement = (agreementName: any) => {
    setAgreements((prevAgreements) => ({
      ...prevAgreements,
      [agreementName]: !prevAgreements[agreementName],
    }))
  }

  const data = [
    { title: '서비스 이용 약관 동의', key: 'serviceTerms' },
    { title: '개인정보 수집 및 이용 동의', key: 'privacyPolicy' },
    { title: '14세 이상 서비스 이용 약관 동의', key: 'over14' },
  ]
  return (
    <div className="mt-8">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={agreements.allAgreements}
          onChange={handleAllAgreements}
          hidden
        />
        <AutoSizeImage
          src={`/images/${
            agreements.allAgreements ? 'check-circled' : 'check-circled-none'
          }.png`}
          className="h-[1.5rem] w-[1.5rem]"
        />
        <CSText size="18" weight="bold" color="white">
          전체동의
        </CSText>
      </label>
      <ul>
        {data.map((value, index) => (
          <li key={index}>
            <label className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                checked={agreements[value.key]}
                onChange={() => handleSingleAgreement(value.key)}
                hidden
              />
              <AutoSizeImage
                src={`/images/${
                  agreements[value.key] ? 'check-circled' : 'check-circled-none'
                }.png`}
                className="h-[1.5rem] w-[1.5rem]"
              />
              <CSText size="14" weight="normal" color="white">
                {value.title} (필수)
              </CSText>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Agreement
