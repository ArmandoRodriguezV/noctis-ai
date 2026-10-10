import Input from '../../components/input/Input';
import TextBubble from '../../components/textBubble/textBubble';
import './Home.css';
import homeVM from './HomeVM';

export default function Home() {
    const { onMessage, isProcess, send, messages, message } = homeVM();

    return (
        <main className='Home'>
            <div className='chat'>
                {messages.map((i) => (
                    <TextBubble data={i} />
                ))}
            </div>
            <Input message={message} isProcess={isProcess} onMessage={onMessage} send={send} />
        </main>
    );
}