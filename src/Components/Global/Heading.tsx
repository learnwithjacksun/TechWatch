
interface HeadingProps {
    title: string;
    subtitle?: string;
}

const Heading: React.FC<HeadingProps> = ({title="Title", subtitle}) => {
  return (
      <>
          <div className="text-center">
              <h1 className="gradient-text font-bold font-sora text-xl">{title}</h1>
              <p className="text-sub text-sm">{subtitle}</p>
      </div>
      </>
  )
}

export default Heading