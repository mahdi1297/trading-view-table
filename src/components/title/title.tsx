
type Props = {
    text: string
}

const TitleComponent = ({ text }: Props) => {
    return (
        <div style={{ textAlign: 'left' }}>
            <h3>{text}</h3>
        </div>
    )
}

export default TitleComponent