import { useRef } from "react";
import { BsFillSendFill } from "react-icons/bs";
import "./Input.css";

interface IInput {
    onMessage: (e: any) => void;
    isProcess: boolean;
    send: () => void;
    message: string;
}

export default function Input(props: IInput) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        textarea.style.height = "50px";
        textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`;
        props.onMessage(event);
    };

    return (
        <div className="Input">
            <textarea ref={textareaRef} value={props.message} onChange={handleChange} />
            <button type="button" onClick={props.send}>
                {
                    !props.isProcess ? <BsFillSendFill /> : <div className="loader"></div>
                }
            </button>
        </div>
    );
}