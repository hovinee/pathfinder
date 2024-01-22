'use client'

import { Unity, useUnityContext } from 'react-unity-webgl'
import React, { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import clsx from 'clsx'
import AutoSizeImage from '@/components/ui/auto-size-image/AutoSizeImage'
import { cfWorkerUrl } from '@/utils/url'
import Progressbar from '@/components/progress/ProgressBar'
import {
  getFeeds,
  updateFeedLike,
  writeComment,
  writeFeed,
} from '@/app/api/post'

const HealingPage = () => {
  const router = useRouter()
  const path = usePathname().split('/').pop()

  //unity build
  const {
    unityProvider,
    addEventListener,
    removeEventListener,
    loadingProgression,
    isLoaded,
    sendMessage,
  } = useUnityContext({
    loaderUrl: `${cfWorkerUrl}/Build/${path}/Build.loader.js`,
    dataUrl: `${cfWorkerUrl}/Build/${path}/Build.data`,
    frameworkUrl: `${cfWorkerUrl}/Build/${path}/Build.framework.js`,
    codeUrl: `${cfWorkerUrl}/Build/${path}/Build.wasm`,
  })

  //스플래쉬 종료
  const [splashEnd, setSplashEnd] = useState<boolean>(false)

  //scene 종료
  const [sceneClosingEnd, setSceneClosingEnd] = useState('')

  //
  const [getApi, setGetApi] = useState<string>('')
  const [getParam, setParam] = useState<string>('')

  const OnSceneClosingEnd = useCallback((data: any) => {
    setSceneClosingEnd(data)
  }, [])
  const OnPointerClick = useCallback((data: any) => {
    if (data === 'main_vr') {
      router.push('/experience')
    } else if (data === 'main_lms') {
      router.push('/digital-literacy')
    }
  }, [])

  const OnSplashEnd = useCallback((data: any) => {
    setSplashEnd(true)
  }, [])

  const OnRequest = useCallback((api: any, json: any) => {
    console.log(api, 'api')
    console.log(json, 'json')
    setGetApi(api)
    setParam(json)
  }, [])

  useEffect(() => {
    const test = async () => {
      let result
      if (getApi == 'get/feeds') {
        result = await getFeeds(JSON.parse(getParam).world)
      }
      if (getApi == 'post/new-feed') {
        console.log('post/new-feed')
        result = await writeFeed(getParam)
      }
      if (getApi == 'post/update-feed-like') {
        console.log('post/update-feed-like')
        result = await updateFeedLike(getParam)
      }
      if (getApi == 'post/new-comment') {
        console.log('post/new-comment')
        result = await writeComment(getParam)
      }
      sendMessage(
          'MessageReceiver',
          'OnResponse',
          `${getApi}|${result?.status}|${JSON.stringify(await result?.json())}`,
      )
    }
    test()
  }, [getApi, getParam])

  useEffect(() => {
    addEventListener('OnSceneClosingEnd', OnSceneClosingEnd)
    addEventListener('OnPointerClick', OnPointerClick)
    addEventListener('OnSplashEnd', OnSplashEnd)
    addEventListener('OnRequest', OnRequest)

    return () => {
      removeEventListener('OnSceneClosingEnd', OnSceneClosingEnd)
      removeEventListener('OnPointerClick', OnPointerClick)
      removeEventListener('OnSplashEnd', OnSplashEnd)
      removeEventListener('OnRequest', OnRequest)
    }
  }, [addEventListener, removeEventListener])

  useEffect(() => {
    if (splashEnd) {
      sendMessage('MessageReceiver', 'OnClickedToLoadScene', path)
    }
  }, [splashEnd])

  useEffect(() => {
    if (sceneClosingEnd === 'main') {
      window.open('/counsel/intro_lobby')
      router.push('/')
    }
  }, [sceneClosingEnd])

  return (
    <>
      <div className="absolute inset-0 z-10 bg-black">
        <div
          className={clsx(
            'fixed z-20 h-full w-full',
            splashEnd ? 'hidden' : 'block',
          )}
        >
          <AutoSizeImage
            src={'/images/unity/loading_bg.jpg'}
            full
            priority
            objectCover
          />
          <Progressbar number={Math.round(loadingProgression * 100)} />
        </div>
        {path !== 'intro_lobby' && path !== 'homepage' && (
          <div
            className={clsx(
              'absolute left-[3rem] top-[3rem] w-[4.6rem] cursor-pointer',
              splashEnd ? 'block' : 'hidden',
            )}
            onClick={() => window.close()}
          >
            <AutoSizeImage src="/images/unity/exit.png" full />
          </div>
        )}

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
      </div>
    </>
  )
}

export default HealingPage
