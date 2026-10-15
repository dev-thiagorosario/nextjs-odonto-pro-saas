type SubTitleProps = {
  subTitle: string
}

export function SubTitle({subTitle}: SubTitleProps) {
  return(
    <h2 className="text-3xl text-center mb-12 font-bold">
      {subTitle}
    </h2>
  )
}
