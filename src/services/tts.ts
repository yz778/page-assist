import { Storage } from "@plasmohq/storage"

const storage = new Storage()

const DEFAULT_TTS_PROVIDER = "browser"

const AVAILABLE_TTS_PROVIDERS = ["browser"] as const

export const getTTSProvider = async (): Promise<
  (typeof AVAILABLE_TTS_PROVIDERS)[number]
> => {
  const ttsProvider = await storage.get("ttsProvider")
  if (!ttsProvider || ttsProvider.length === 0) {
    return DEFAULT_TTS_PROVIDER
  }
  return ttsProvider as (typeof AVAILABLE_TTS_PROVIDERS)[number]
}

export const setTTSProvider = async (ttsProvider: string) => {
  await storage.set("ttsProvider", ttsProvider)
}

export const getBrowserTTSVoices = async () => {
  const tts = await chrome.tts.getVoices()
  return tts
}

export const getVoice = async () => {
  const voice = await storage.get("voice")
  return voice
}

export const setVoice = async (voice: string) => {
  await storage.set("voice", voice)
}

export const isTTSEnabled = async () => {
  const data = await storage.get("isTTSEnabled")
  if(!data  || data.length === 0) {
    return true
  }
  return data === "true"
}

export const setTTSEnabled = async (isTTSEnabled: boolean) => {
  await storage.set("isTTSEnabled", isTTSEnabled.toString())
}

export const isSSMLEnabled = async () => {
  const data = await storage.get("isSSMLEnabled")
  if(!data  || data.length === 0) {
    return true
  }
  return data === "true"
}

export const setSSMLEnabled = async (isSSMLEnabled: boolean) => {
  await storage.set("isSSMLEnabled", isSSMLEnabled.toString())
}

export const getTTSSettings = async () => {
  const [ttsEnabled, ttsProvider, browserTTSVoices, voice, ssmlEnabled] =
    await Promise.all([
      isTTSEnabled(),
      getTTSProvider(),
      getBrowserTTSVoices(),
      getVoice(),
      isSSMLEnabled()
    ])

  return {
    ttsEnabled,
    ttsProvider,
    browserTTSVoices,
    voice,
    ssmlEnabled
  }
}

export const setTTSSettings = async ({
  ttsEnabled,
  ttsProvider,
  voice,
  ssmlEnabled
}: {
  ttsEnabled: boolean
  ttsProvider: string
  voice: string
  ssmlEnabled: boolean
}) => {
  await Promise.all([
    setTTSEnabled(ttsEnabled),
    setTTSProvider(ttsProvider),
    setVoice(voice),
    setSSMLEnabled(ssmlEnabled)
  ])
}
