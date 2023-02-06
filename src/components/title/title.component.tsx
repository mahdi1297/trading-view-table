
type Props = {
    text: string
}

const TitleComponent = ({ text }: Props) => {
    return (
        <div>
            <h3>{text}</h3>
        </div>
    )
}

export default TitleComponent