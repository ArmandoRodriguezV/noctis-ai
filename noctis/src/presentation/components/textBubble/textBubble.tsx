import type { Chat } from '../../../domain/entities/Chat';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import './textBubble.css';

interface ITextBubble {
    data: Chat;
}

export default function TextBubble(props: ITextBubble) {
    const isUser = props.data.role === 'user';
    const content = props.data.content.replace(/\\n/g, '\n');
    const html = DOMPurify.sanitize(marked.parse(content, { breaks: true }) as string);

    return (
        <div className="TextBubble" style={{ justifyContent: isUser ? 'end' : 'start' }}>
            <div className={`text ${isUser ? 'user-text' : 'assistant-text'}`}>
                <div className="markdown-content" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    );
}