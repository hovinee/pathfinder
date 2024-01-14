'use client'

import { Unity, useUnityContext } from 'react-unity-webgl'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import Menu from '@/components/unity-ui/menu/Menu'
import Chat from '@/components/unity-ui/chat/Chat'
import UnityHeader from '@/components/unity-ui/unity-header/UnityHeader'
import UnitySection from '@/components/unity-ui/section/UnitySection'
import { cfWorkerUrl } from '@/utils/url'
import { connectToGPT } from '@/lib/gpt'
import CounselingModal from '@/components/unity-ui/modal/CounselingModal'
import HealingModal from '@/components/unity-ui/modal/HealingModal'
import CSText from '@/components/ui/text/CSText'
import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import Heart from '@/components/unity-ui/heart/Heart'
import Progressbar from '@/components/progress/ProgressBar'
import { TTutorial } from '@/utils/types'
import UserHistory from '@/components/unity-ui/user-history/UserHistory'
import { ReactUnityEventParameter } from 'react-unity-webgl/distribution/types/react-unity-event-parameters'
import AnalysisModal from '@/components/unity-ui/modal/AnalysisModal'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import DignosisModal from '@/components/unity-ui/modal/DignosisModal'
import CounselingHistory from '@/components/unity-ui/counseling-history/CounselingHistory'
import { tutorial, tutorialTraining } from '@/data/unity/data'

const CounselPage = () => {
  const path = usePathname().split('/').pop()
  //unity build
  const {
    unityProvider,
    addEventListener,
    removeEventListener,
    loadingProgression,
    sendMessage,
  } = useUnityContext({
    loaderUrl: `${cfWorkerUrl}/Build/${path}/Build.loader.js`,
    dataUrl: `${cfWorkerUrl}/Build/${path}/Build.data`,
    frameworkUrl: `${cfWorkerUrl}/Build/${path}/Build.framework.js`,
    codeUrl: `${cfWorkerUrl}/Build/${path}/Build.wasm`,
  })

  //splashEnd
  const [splashEnd, setSplashEnd] = useState<boolean>(false)

  //상담소 또는 치유소 선택
  const [selectPlace, setSelectPlace] = useState<ReactUnityEventParameter>('')

  //1:1 상담
  const [wantCounseling, setWantCounseling] = useState<number>(0)
  const [aiMsg, setAiMsg] = useState<string>('')
  const [userMsg, setUserMsg] = useState<string>('')
  const [chat, setChat] = useState<TTutorial[]>([])
  const [analysis, setAnalysis] = useState<boolean>(false)

  //scene 종료
  const [sceneOpeningEnd, setSceneOpeningEnd] = useState('')

  //튜토리얼
  const [tutorialStep, setTutorialStep] = useState<number>(0)
  const [tutorialTrainingStep, setTutorialTrainingStep] = useState<number>(0)

  //원하는 상담 //훈련일경우 trainer-poor, trainer(로봇 조언)
  const counseling = ['career', 'family', 'friend', 'love', 'psychology']

  //스위칭 조언 상담
  const [switchingActor, setSwitchingActor] = useState<string>('trainer')

  //보낸 메시지 쌓기
  const [stackMsg, setStackMsg] = useState<string[]>([])
  const systemMsg =
    sceneOpeningEnd === 'trainer' ? switchingActor : counseling[wantCounseling]

  const sendToGPT = async (selectMessage?: string) => {
    const message = await connectToGPT(
      systemMsg,
      selectMessage ? selectMessage : userMsg,
    )
    if (path === 'client') {
      sendMessage('MessageReceiver', 'OnProcess', `gptmsg:${message}`)
    } else if (path === 'trainer') {
      sendMessage(
        'MessageReceiver',
        'OnProcess',
        `gptmsg-${switchingActor}:${message}`,
      )
    }
    sendMessage('MessageReceiver', 'OnClickedButton', 'gpt_discard')
  }

  const OnSplashEnd = useCallback((data: any) => {
    setSplashEnd(true)
  }, [])

  const OnPointerClick = useCallback((data: ReactUnityEventParameter) => {
    setSelectPlace(data)
  }, [])

  const OnSceneOpeningEnd = useCallback((data: any) => {
    setSceneOpeningEnd(data)
  }, [])

  const OnMsgStart = useCallback(() => {
    setAnalysis(false)
  }, [])

  const OnMsg = useCallback((data: any) => {
    setAiMsg(data)
    if(tutorialTrainingStep === 100){
      setStackMsg((msg) => [...msg, data])
    }

  }, [])

  const OnMsgEnd = useCallback(() => {
    console.log(switchingActor, tutorialTrainingStep)
    if (path === 'client' && tutorialStep < 100) {
      setChat((prevArray) => {
        const lastItem = prevArray[prevArray.length - 1]
        lastItem.select = tutorial[tutorialStep]?.select
        return [...prevArray]
      })
    } else if (path === 'trainer' && tutorialTrainingStep <= 100) {
      setChat((prevArray) => {
        const lastItem = prevArray[prevArray.length - 1]
        lastItem.select = tutorialTraining[tutorialTrainingStep]?.select
        return [...prevArray]
      })
    } else if (
      path === 'trainer' &&
      tutorialTrainingStep === 100 &&
      switchingActor === 'trainer-poor'
    ) {
      setChat((prevArray) => {
        const lastItem = prevArray[prevArray.length - 1]
        lastItem.select = ['조언 구하기']
        return [...prevArray]
      })
    }
    setAiMsg('')
  }, [tutorialStep, tutorialTrainingStep, switchingActor])

  useEffect(() => {
    if (splashEnd) {
      sendMessage('MessageReceiver', 'OnClickedToLoadScene', path)
    }
  }, [splashEnd])

  const goToLobby = () => {
    sendMessage('MessageReceiver', 'OnClickedToLoadScene', 'Lobby')
    setSelectPlace('')
    setSceneOpeningEnd('')
    setAiMsg('')
    setTutorialStep(0)
    setChat([])
  }

  //방분위기선택
  const roomMood = (num: number) => {
    sendMessage(
      'MessageReceiver',
      'OnClickedButton',
      `spaceRoom_change_theme_${num}`,
    )
  }

  //춤추기
  const letsDance = () => {
    sendMessage('MessageReceiver', 'OnClickedButton', 'spaceRoom_dancing')
  }

  //하트
  const sendToHeart = () => {
    sendMessage('MessageReceiver', 'OnClickedButton', 'spaceRoom_heart')
  }

  useEffect(() => {
    addEventListener('OnSceneOpeningEnd', OnSceneOpeningEnd)
    addEventListener('OnSplashEnd', OnSplashEnd)
    addEventListener('OnPointerClick', OnPointerClick)
    addEventListener('OnMsg', OnMsg)
    addEventListener('OnMsgStart', OnMsgStart)

    return () => {
      removeEventListener('OnSceneOpeningEnd', OnSceneOpeningEnd)
      removeEventListener('OnSplashEnd', OnSplashEnd)
      removeEventListener('OnPointerClick', OnPointerClick)
      removeEventListener('OnMsg', OnMsg)
      removeEventListener('OnMsgStart', OnMsgStart)
    }
  }, [addEventListener, removeEventListener])

  useEffect(() => {
    addEventListener('OnMsgEnd', OnMsgEnd)

    return () => {
      removeEventListener('OnMsgEnd', OnMsgEnd)
    }
  }, [
    addEventListener,
    removeEventListener,
    tutorialStep,
    tutorialTrainingStep,
    switchingActor,
  ])

  return (
    <div className="absolute inset-0 z-10 bg-black">
      <div
        className={clsx(
          'fixed z-20 h-full w-full',
          splashEnd ? 'hidden' : 'block',
        )}
      >
        <AutoSizeImage
          src={'/images/unity/loading_bg_2.jpg'}
          full
          priority
          objectCover
        />
        <Progressbar number={Math.round(loadingProgression * 100)} />
      </div>

      <div className="relative h-full w-full">
        <Unity
          style={{
            width: '100%',
            height: '100%',
            justifySelf: 'center',
            alignSelf: 'center',
            opacity: splashEnd ? 100 : 0,
            transition: 'opacity 1s ease',
          }}
          unityProvider={unityProvider}
        />

        {/* 상담소 */}
        {selectPlace === 'Lobby_ToClinic' && (
          <UnitySection>
            <CounselingModal setSelectPlace={setSelectPlace} />
          </UnitySection>
        )}

        {/* 치유소 */}
        {selectPlace === 'Lobby_ToHealing' && (
          <UnitySection>
            <HealingModal setSelectPlace={setSelectPlace} />
          </UnitySection>
        )}

        {/* 치유소 */}
        {selectPlace === 'Lobby_ToAdventure' && (
          <UnitySection>
            <DignosisModal setSelectPlace={setSelectPlace} />
          </UnitySection>
        )}

        {/* 상담소 선택 */}
        {(sceneOpeningEnd === 'client' || sceneOpeningEnd === 'trainer') && (
          <>
            {sceneOpeningEnd === 'client' && (
              <>
                <Heart
                  setTutorialStep={setTutorialStep}
                  tutorialStep={tutorialStep}
                  sendToHeart={sendToHeart}
                />
                <Menu
                  sendToGPT={sendToGPT}
                  setWantCounseling={setWantCounseling}
                  wantCounseling={wantCounseling}
                  setAiMsg={setAiMsg}
                  setTutorialStep={setTutorialStep}
                  tutorialStep={tutorialStep}
                  roomMood={roomMood}
                  letsDance={letsDance}
                  setChat={setChat}
                  sendtoUnity={sendMessage}
                />
              </>
            )}
            {path === 'trainer' && (
              <CounselingHistory
                tutorialTrainingStep={tutorialTrainingStep}
                setTutorialTrainingStep={setTutorialTrainingStep}
              />
            )}
            <UnityHeader
              goToLobby={goToLobby}
              tutorialStep={tutorialStep}
              setTutorialStep={setTutorialStep}
              tutorialTrainingStep={tutorialTrainingStep}
              setTutorialTrainingStep={setTutorialTrainingStep}
              path={path!}
            />

            <UserHistory
              tutorialStep={tutorialStep}
              setTutorialStep={setTutorialStep}
              tutorialTrainingStep={tutorialTrainingStep}
              setTutorialTrainingStep={setTutorialTrainingStep}
              chat={chat}
              path={path!}
            />

            <Chat
              sendToGPT={sendToGPT}
              aiMsg={aiMsg}
              setAiMsg={setAiMsg}
              setUserMsg={setUserMsg}
              userMsg={userMsg}
              setTutorialStep={setTutorialStep}
              tutorialStep={tutorialStep}
              sendtoUnity={sendMessage}
              setChat={setChat}
              chat={chat}
              analysis={analysis}
              setAnalysis={setAnalysis}
              path={path!}
              setTutorialTrainingStep={setTutorialTrainingStep}
              tutorialTrainingStep={tutorialTrainingStep}
              switchingActor={switchingActor}
              setSwitchingActor={setSwitchingActor}
              stackMsg={stackMsg}
            />
            {analysis && <AnalysisModal />}
          </>
        )}
      </div>
    </div>
  )
}

export default CounselPage
