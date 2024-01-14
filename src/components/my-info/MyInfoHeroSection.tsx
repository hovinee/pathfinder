import AutoSizeImage from '../ui/auto-size-image/AutoSizeImage'
import CSText from '../ui/text/CSText'

const MyInfoHeroSection = () => {
  return (
    <section className="flex h-[17.4rem] w-full items-end justify-between bg-00A886/20 px-[3.5rem] pb-[2.3rem] lg:hidden">
      <div className="flex items-end gap-[1.8rem]">
        <div className="grid h-[6.1rem] w-[6.1rem] place-items-center rounded-full bg-white">
          <AutoSizeImage
            src={'/images/my_info/my_info_logo.png'}
            className="h-[3.48rem] w-[2.9rem]"
          />
        </div>
        <div className="flex flex-col">
          <CSText
            size="24"
            color="black"
            className="whitespace-pre-line"
            weight="bold"
          >
            안녕하세요,
          </CSText>
          <div className="flex items-baseline gap-[1.5rem]">
            <CSText
              size="24"
              color="black"
              className="whitespace-pre-line"
              weight="bold"
            >
              데비잇님!
            </CSText>
            <AutoSizeImage
              src={'/images/my_info/arrow.png'}
              className="h-[1.1rem] w-[0.7rem]"
            />
          </div>
        </div>
      </div>
      <AutoSizeImage
        src={'/images/my_info/my_info_logoBig.png'}
        className="h-[12.88rem] w-[10.733rem]"
      />
    </section>
  )
}

export default MyInfoHeroSection
