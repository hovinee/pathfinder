import React, { useEffect, useRef } from 'react'
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
  ANONYMOUS,
} from '@tosspayments/payment-widget-sdk'
import { useRouter } from 'next/navigation'
import CSButton from '../ui/button/CSButton'

const Payments = ({}) => {
  const router = useRouter()

  const orderId = Math.random().toString(36).slice(2)

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null)
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null)

  useEffect(() => {
    ;(async () => {
      const paymentWidget = await loadPaymentWidget(
        'test_ck_XZYkKL4MrjeMbM2NzOzRV0zJwlEW',
        ANONYMOUS,
      )

      // ------  결제위젯 렌더링 ------
      // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        '#payment-widget',
        { value: 50000 },
      )

      // ------  이용약관 렌더링 ------
      // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
      paymentWidget.renderAgreement('#agreement')

      paymentWidgetRef.current = paymentWidget
      paymentMethodsWidgetRef.current = paymentMethodsWidget
    })()
  }, [50000])

  const handleClick = async () => {
    const paymentWidget = paymentWidgetRef.current

    const paymentAgreement = paymentWidget
      ?.renderAgreement('#agreement')
      .getAgreementStatus().agreedRequiredTerms

    if (paymentAgreement) {
      await paymentWidget
        ?.requestPayment({
          orderId: orderId,
          orderName: '50000원',
          customerName: '이름',
          successUrl: `${window.location.origin}/api/payments`,
          failUrl: `${window.location.origin}/api/payments-fail`,
        })
        .catch((error: any) => {
          console.log(error)
          // 에러 처리: 에러 목록을 확인하세요
          // https://docs.tosspayments.com/reference/error-codes#failurl로-전달되는-에러
          if (error.code === 'USER_CANCEL') {
            alert('메인화면으로 이동합니다.')
            router.push('/')
          } else if (error.code === 'INVALID_CARD_COMPANY') {
            // 유효하지 않은 카드 코드에 대한 에러 처리
            alert('카드 번호가 유효하지 않습니다. 재입력 해주세요.')
          }
        })
    } else {
      alert('필수약관에 동의해주세요.')
    }
  }
  return (
    <div className="mt-[3rem]">
      <div id="payment-widget" style={{ width: '100%' }} />
      <div id="agreement" style={{ width: '100%' }} />
      <CSButton
        className="float-right mt-[1.6rem]"
        width="140"
        height="40"
        bgColor="00A886"
        size="16"
        color="white"
        rounded="5"
        onClick={handleClick}
      >
        결제하기
      </CSButton>
    </div>
  )
}

export default Payments
