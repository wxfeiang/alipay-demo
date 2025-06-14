import { getFileParse } from '@/service/api/system'
export default (path: string) => {
  const { data: fData, onSuccess: filePaseSuccess } = getFileParse(
    {
      path,
    },
    {
      immediate: true,
      loading: false,
    },
  )

  const fileData = ref('')
  filePaseSuccess(async (event: any) => {
    const arrayBuffer = new Uint8Array(event.data.data)
    const url = 'data:image/png;base64,' + uni.arrayBufferToBase64(arrayBuffer)
    return (fileData.value = url) // event.data.data.data.code
  })

  // sysConfig()

  return {
    fileData,
    fData,
  }
}
