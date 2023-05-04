import { Dispatch, KeyboardEvent, MouseEvent, SetStateAction, useRef, useState } from 'react'
import { Editor, EditorState, KeyBindingUtil, RichUtils, convertToRaw, getDefaultKeyBinding } from 'draft-js'
import 'draft-js/dist/Draft.css'
import { Game } from '../interfaces/game'
import { ApiResponse } from '../hooks/useApi'
import { useNavigate } from 'react-router-dom'

interface EditorProps {
    setIsReviewing: Dispatch<SetStateAction<boolean | undefined>>
    game: Game
}

export const EditorComponent = (props: EditorProps) => {
    const { hasCommandModifier } = KeyBindingUtil;
    const editorRef = useRef<Editor>(null);
    const navigate = useNavigate();
    const [isWritingBold, setIsWritingBold] = useState<boolean>(false);
    const [isWritingItalic, setIsWritingItalic] = useState<boolean>(false);
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty()
    );

    const onChange = (editorState: EditorState) => {
        setEditorState(editorState)
    }

    const onBoldClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsWritingBold(!isWritingBold);
        onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
    }

    const onItalicClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsWritingItalic(!isWritingItalic);
        onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
    }

    const myKeyBindingFn = (e: KeyboardEvent): string | null => {
        if (e.key === "b" && hasCommandModifier(e)) return "text-bold";
        if (e.key === "i" && hasCommandModifier(e)) return "text-italic";
        return getDefaultKeyBinding(e)
    }

    const handleKeyCommand = (command: string) => {
        switch (command) {
            case 'text-bold':
                setIsWritingBold(!isWritingBold);
                onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
                return 'handled';
            case 'text-italic':
                setIsWritingItalic(!isWritingItalic);
                onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
                return 'handled';
            default:
                return 'not-handled';
        }
    }

    const handleSave = (e: MouseEvent) => {
        e.preventDefault();
        const request: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({game: props.game, description: JSON.stringify(convertToRaw(editorState.getCurrentContent()))})
        }

        fetch(`${import.meta.env.VITE_API_URL}/review/create`, request)
            .then((response) => {
                return response.json()
            })
            .then((json: ApiResponse) => {
                if (json.data) return navigate(0)
            })
            .catch((e) => {
                console.error(e)
            })
    }

    return (
        <div className="fixed w-full h-full z-20 flex items-end md:items-center justify-center">
            <span className="w-full h-full bg-black opacity-60" />
            <div id="editor" className="fixed bottom-0 md:bottom-auto w-full md:w-116 h-3/4 md:h-5/6 flex flex-col p-3 md:p-6 rounded-md">
                <span id="button" className="flex self-end m-1 md:m-0 font-sans cursor-pointer" onClick={() => props.setIsReviewing(false)}>Close</span>
                <span className="text-sm">You're reviewing...</span>
                <h2 className="text-2xl text-white font-bold my-2">{props.game.name}</h2>
                <div className="">
                    <button className={`mr-1 rounded-md ${isWritingBold ? "brightness-75" : ""}`} onMouseDown={onBoldClick} title="Bold"><b>B</b></button>
                    <button className={`ml-1 rounded-md ${isWritingItalic ? "brightness-75" : ""}`} onMouseDown={onItalicClick} title="Italic"><i>I</i></button>
                </div>
                <div className="h-full my-4 md:p-1 overflow-y-scroll md:text-slate-700 font-sans md:bg-white md:rounded-sm md:shadow-inner border-y-2 md:border-0 border-gray-900">
                    <Editor
                        editorState={editorState}
                        onChange={setEditorState}
                        handleKeyCommand={handleKeyCommand}
                        keyBindingFn={myKeyBindingFn}
                        ref={editorRef}
                        placeholder="Add a review"
                    />
                </div>
                <span id="button" onClick={handleSave} className="my-3 mx-6 md:m-0 text-center cursor-pointer">Save</span>
            </div>
        </div>
    )
}