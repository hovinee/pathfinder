import Overlay from '@/components/overlay/Overlay'
import CSText from '@/components/ui/text/CSText'

const MobileModal = () => {
  return (
    <Overlay>
      <div className="z-10 mx-auto grid h-72 w-4/5 place-items-center rounded-lg bg-white ">
        <div>
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <CSText
            size="18"
            color="black"
            weight="bold"
            className="mt-[1.5rem] whitespace-pre-line text-center"
          >
            {'모바일 버전은 준비중에 있습니다.\nPC 및 테블릿을 이용해주세요.'}
          </CSText>
        </div>
      </div>
    </Overlay>
  )
}

export default MobileModal
