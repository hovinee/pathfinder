'use client'

import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import CSInput from '@/components/ui/input/CSInput'
import CSLabel from '@/components/ui/label/CSLabel'
import CSText from '@/components/ui/text/CSText'
import clsx from 'clsx'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { exampleJobs, tutorial, tutorialTraining } from '@/data/unity/data'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { ReactUnityEventParameter } from 'react-unity-webgl/distribution/types/react-unity-event-parameters'
import { TTutorial } from '@/utils/types'
import Thermometer from 'react-thermometer-component'

interface TProps {
  sendToGPT: (message?: string, who?: string) => void
  aiMsg: string
  userMsg: string
  setUserMsg: Dispatch<SetStateAction<string>>
  setAiMsg: Dispatch<SetStateAction<string>>
  tutorialStep: number
  setTutorialStep: Dispatch<SetStateAction<number>>
  tutorialTrainingStep: number
  setTutorialTrainingStep: Dispatch<SetStateAction<number>>
  analysis: boolean
  setAnalysis: Dispatch<SetStateAction<boolean>>
  setChat: Dispatch<SetStateAction<TTutorial[]>>
  chat: TTutorial[]
  sendtoUnity: (
    gameObjectName: string,
    methodName: string,
    parameter?: ReactUnityEventParameter,
  ) => void
  path: string
  switchingActor: string
  setSwitchingActor: Dispatch<SetStateAction<string>>
  setGetAdvise: Dispatch<SetStateAction<boolean>>
  stackMsg: string[]
  setStackMsg: Dispatch<SetStateAction<string[]>>
  stress: number
}

const Chat = ({
  sendToGPT,
  aiMsg,
  userMsg,
  setUserMsg,
  setAiMsg,
  tutorialStep,
  setTutorialStep,
  sendtoUnity,
  chat,
  setChat,
  analysis,
  setAnalysis,
  path,
  tutorialTrainingStep,
  setTutorialTrainingStep,
  switchingActor,
  setSwitchingActor,
  stackMsg,
  setStackMsg,
  setGetAdvise,
  stress,
}: TProps) => {
  const [openJob, setOpenJob] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const [chatNum, setChatNum] = useState<number>(0)
  const [trainerNum, setTrainerNum] = useState<number>(0)

  const sendMessage = (example?: any) => {
    if (userMsg && path === 'client') {
      sendToGPT()
      setChat((prevMessages) => [
        ...prevMessages,
        { text: userMsg, who: 'user' },
      ])
      setAnalysis(true)
      setAiMsg('')
      setUserMsg('')
    }
    if (path === 'trainer' && example) {
      const trainerPoor = [
        '돈 때문에 막막하고, 미술 학원도 다니기 힘들어서 기술이 부족하다는 느낌이 들어요. 그래서 미술가가 될 수 있을지 걱정이에요.',
        '그럴 수 있을까요?',
        '상담 감사합니다. 선생님 덕분에 용기가 생겼어요!',
      ]
      sendtoUnity(
        'MessageReceiver',
        'OnProcess',
        `gptmsg-trainer-poor:${trainerPoor[chatNum]}`,
      )

      setChatNum((num) => num + 1)
    }
  }
  console.log(stackMsg)
  const selectTutorial = (msg: string) => {
    if (path === 'trainer' && tutorialTrainingStep !== 100) {
      setTutorialTrainingStep((num) => num + 1)
      setChat((prevMessages) => [...prevMessages, { text: msg, who: 'user' }])
    }
    if (path === 'client') {
      setTutorialStep((num) => num + 1)
      setChat((prevMessages) => [...prevMessages, { text: msg, who: 'user' }])
    }

    if (msg === '시작하기') {
      setSwitchingActor('trainer-poor')
      const text =
        '안녕하세요. 오늘 진로상담 받으러온 학생이에요. 집안이 어려운데 미술을 계속 해도 될지 고민이에요.'
      sendtoUnity('MessageReceiver', 'OnProcess', `gptmsg-trainer-poor:${text}`)
    }

    if (msg === 'AI조언 구하기') {
      setSwitchingActor('trainer')
      sendToGPT(stackMsg.join(''), 'trainer')
      setAnalysis(true)
      setAiMsg('')
      setStackMsg([])
      setGetAdvise(true)
    }

    if (msg === '예시 답변') {
      const trainer = [
        '정말 힘든 상황이시군요. 미술가로서의 꿈을 펼치려면 여러 어려움이 있을 텐데, 어떤 부분이 가장 힘들게 느껴지나요?',
        '돈 때문에 힘들어하는 것 이해해요. 그런데 미술을 좋아하고 꾸준히 연습한다면 다양한 경로를 통해 성장할 수 있을 거예요. 돈 문제는 조금씩 극복해나가는 거니까, 지금은 작은 단계부터 시작해보는 것도 좋을 것 같아요.',
        '그런 부분에 대한 대처 방안을 함께 고민해보세요. 무료 자료, 온라인 강의, 그리고 자기주도적인 학습에 대한 가능성을 알아보면 좋을 것 같아요. 그리고 그것을 내담자님에게 알려주어 자신감을 북돋우는 것도 중요합니다.',
      ]
      if (trainerNum < 3) {
        setChat((prevMessages) => [
          ...prevMessages,
          { text: trainer[trainerNum], who: 'user' },
        ])
      }
      sendMessage(true)
      setTrainerNum((num) => num + 1)
      setStackMsg([])
    }
  }

  useEffect(() => {
    if (aiMsg) {
      path === 'client' &&
        setChat((prevMessages) => [...prevMessages, { text: aiMsg, who: 'ai' }])
      path === 'trainer' &&
        setChat((prevMessages) => [
          ...prevMessages,
          { text: aiMsg, who: switchingActor },
        ])
    }
  }, [aiMsg])

  useEffect(() => {
    // 스크롤을 맨 아래로 이동시키는 함수
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    scrollToBottom()
  }, [chat, openJob])

  const stopMessage = () => {
    setAiMsg('')
    setAnalysis(false)
    sendtoUnity('MessageReceiver', 'OnClickedButton', 'gpt_discard')
  }

  const exampleJob = (message: string) => {
    sendToGPT(message)
    setChat((prevMessages) => [
      ...prevMessages,
      {
        text: message,
        who: 'user',
      },
    ])
    setAiMsg('')
    setUserMsg('')
    setOpenJob(false)
    setAnalysis(true)
  }

  const controls = useAnimation()

  useEffect(() => {
    const intervalId = setInterval(() => {
      controls.start({
        scale: [1, 1.2, 1], // 시작, 중간, 끝 스케일 값 설정
        transition: {
          duration: 1, // 애니메이션 지속 시간 (1초)
        },
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [controls])

  useEffect(() => {
    if ((tutorialStep || tutorialTrainingStep) < 100) {
      if (path === 'client') {
        sendtoUnity(
          'MessageReceiver',
          'OnProcess',
          `gptmsg:${tutorial[tutorialStep].text}`,
        )
      } else {
        sendtoUnity(
          'MessageReceiver',
          'OnProcess',
          `gptmsg-${switchingActor}:${tutorialTraining[tutorialTrainingStep].text}`,
        )
      }
    }
  }, [tutorialStep, tutorialTrainingStep])

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05, // i는 각 글자의 인덱스로, 각 글자가 순차적으로 나타나도록 지연 시간을 설정합니다.
      },
    }),
  }

  return (
    <div className="absolute bottom-[4rem] right-[3.1rem] flex gap-[2rem]">
      <div className="flex h-[calc(100vh-13rem)] gap-[1.5rem]">
        {path === 'trainer' && (
          <div
            className={clsx(
              'flex h-full items-end',
              tutorialTrainingStep === 3 || tutorialTrainingStep === 4
                ? 'z-10'
                : 'z-0',
            )}
          >
            <Thermometer
              theme="light"
              value={stress}
              max="100"
              format="°C"
              size="normal"
              height="200"
            />
          </div>
        )}

        <div className={clsx('flex w-[50rem] flex-col justify-end')}>
          <div
            className={clsx(
              'custom-scrollbar z-10 flex h-[calc(100%-4.5rem)] flex-col gap-[3rem] overflow-auto rounded-t-[1rem] border-b border-b-181818/20 bg-181818 px-[2rem] pb-[1rem] pt-[2rem]',
            )}
          >
            {chat.map(({ text, select, who, select_image }, chatIndex) => {
              const letters = Array.from(text!)
              return (
                <div key={chatIndex}>
                  {(who === 'ai' ||
                    who === 'trainer' ||
                    who === 'trainer-poor') && (
                    <div className="flex gap-[1.1rem]">
                      <AutoSizeImage
                        src={
                          path === 'trainer' && who === 'trainer'
                            ? '/images/unity/advisor_profile.png'
                            : path === 'trainer' && who === 'trainer-poor'
                              ? '/images/unity/trainer_poor.png'
                              : '/images/unity/nara_profile.png'
                        }
                        className="h-[6.8rem] min-w-[6.8rem]"
                      />

                      <div>
                        <CSText size="21" color="DD81FD">
                          {path === 'trainer' && who === 'trainer'
                            ? '상담 도우미 AI'
                            : path === 'trainer' && who === 'trainer-poor'
                              ? 'AI 학생'
                              : 'AI 상담사 나리'}
                        </CSText>
                        <div
                          className={clsx(
                            'mt-[0.5rem] max-w-[33.5rem] rounded-r-2xl rounded-bl-2xl p-[1rem]',
                            path === 'trainer' && who === 'trainer'
                              ? 'bg-[#BEF3FF]'
                              : ' bg-white',
                          )}
                        >
                          <AnimatePresence>
                            {letters.map((letter, index) => (
                              <motion.span
                                key={index}
                                custom={index}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={textVariants}
                                className="text-18 font-bold text-black"
                              >
                                {letter}
                              </motion.span>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  )}

                  {select && (
                    <div className="my-[2rem] pl-[7.9rem]">
                      {select?.map((value, index) => (
                        <div
                          className="relative mb-[1rem] mr-[1rem] inline-block cursor-pointer rounded-[2rem] border border-white bg-transparent px-[1.5rem] py-[0.5rem] text-center hover:opacity-70"
                          key={index}
                          onClick={() => selectTutorial(value)}
                        >
                          <div className="flex gap-[0.7rem]">
                            {/* {chatIndex === 2 && (
                              <div className="w-[2.2rem]">
                                <AutoSizeImage
                                  src={select_image![index]}
                                  full
                                />
                              </div>
                            )} */}
                            <CSText size="18" color="white">
                              {value}
                            </CSText>
                          </div>
                          {((path === 'client' && tutorialStep === 0) ||
                            (path === 'trainer' &&
                              tutorialTrainingStep === 0)) && (
                            <>
                              <motion.div
                                className={clsx(
                                  'absolute bottom-[-4.5rem] right-[2rem] z-10 w-[7rem] cursor-pointer hover:opacity-100',
                                )}
                                animate={controls}
                              >
                                <img
                                  src="/images/unity/finger_up.png"
                                  alt="Finger"
                                  className="h-full w-full"
                                />
                              </motion.div>
                              <div className="absolute bottom-[-14rem] right-[-23rem] z-10 w-[28rem] rounded-xl border border-[#E1792D] bg-white px-[1rem] py-[2rem]">
                                <CSText
                                  size="18"
                                  weight="bold"
                                  color="black"
                                  className="mt-[1rem]"
                                >
                                  버튼을 선택하여 대화를 진행해주세요.
                                </CSText>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {who === 'user' && (
                    <div className="flex justify-end">
                      <CSText
                        size="18"
                        color="black"
                        weight="bold"
                        className="max-w-[33.5rem] rounded-t-2xl rounded-bl-2xl bg-[#FFE177] p-[1rem]"
                      >
                        {text}
                      </CSText>
                    </div>
                  )}
                </div>
              )
            })}
            {openJob && (
              <div>
                <CSText size="21" color="white" weight="bold">
                  Guide.
                </CSText>
                <CSText size="18" color="white" className="mt-[1rem]">
                  직업을 선택하시면 질문 예시 확인이 가능합니다. 예시 질문을
                  통해 내가 원하는 진로 질문을 파악해 보세요!
                </CSText>
                <div className="mt-[1rem] grid grid-cols-3 gap-[1rem] rounded-2xl bg-141517">
                  {exampleJobs.map(({ job, description }, index) => (
                    <div
                      key={index}
                      className="grid h-[3rem] cursor-pointer place-items-center rounded-2xl bg-slate-800 text-16 text-white"
                      onClick={() => exampleJob(description)}
                    >
                      {job}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
          <CSLabel>
            <CSInput
              type="text"
              bgColor="181818"
              placeholder={
                tutorialStep === 100 || tutorialTrainingStep === 100
                  ? '대화는 채팅으로 하시면 됩니다.'
                  : '튜토리얼을 진행해주세요!'
              }
              value={userMsg}
              setValue={setUserMsg}
              height="45"
              textColor="white"
              className={clsx('rounded-b-[1rem] px-[1.8rem] placeholder-white')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage()
                }
              }}
              // disabled={tutorialStep !== 100 || tutorialTrainingStep !== 100}
            />
            <div
              className={clsx(
                'absolute right-[1.3rem] top-1/2 flex -translate-y-1/2 gap-[1rem]',
                tutorialStep === 9 && 'z-10',
              )}
            >
              <div className="grid h-[2.8rem] w-[2.8rem] place-items-center rounded-full bg-383838">
                <Image
                  src={`/images/unity/${
                    aiMsg || analysis ? 'stop' : 'send'
                  }.png`}
                  className="h-[1.4rem] w-[1.4rem] cursor-pointer"
                  width={0}
                  height={0}
                  onClick={aiMsg || analysis ? stopMessage : sendMessage}
                  alt="send"
                />
              </div>
              {path === 'client' && (
                <div className="grid h-[2.8rem] w-[2.8rem] place-items-center rounded-full bg-red-400">
                  <Image
                    src={`/images/unity/question.png`}
                    className="h-[1.6rem] w-[1.6rem] cursor-pointer"
                    width={0}
                    height={0}
                    onClick={() => setOpenJob(!openJob)}
                    alt="question"
                  />
                  {tutorialStep === 9 && (
                    <>
                      <motion.div
                        className={clsx(
                          'absolute right-[-3.5rem] top-[-1rem] w-[7rem] cursor-pointer',
                        )}
                        animate={controls}
                        onClick={() =>
                          tutorialStep === 9 &&
                          setTutorialStep((num) => num + 1)
                        }
                      >
                        <img
                          src="/images/unity/finger_up.png"
                          alt="Finger"
                          className="h-full w-full"
                        />
                      </motion.div>
                      <div className="absolute left-[-5rem] top-[-13rem] w-[15rem] rounded-xl border border-[#E1792D] bg-white px-[1rem] py-[1rem]">
                        <CSText
                          size="16"
                          weight="bold"
                          color="black"
                          className="mt-[1rem] text-center"
                        >
                          진로상담 직업 예시 질문을 파악할 수 있습니다.
                        </CSText>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </CSLabel>
        </div>
      </div>

      {/* 튜토리얼 진행 */}
      {5 <= tutorialStep && tutorialStep < 100 && (
        <div className="fixed inset-0 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
      )}

      {path === 'trainer' && tutorialTrainingStep < 100 && (
        <div className="fixed inset-0 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" />
        </div>
      )}
    </div>
  )
}

export default Chat
