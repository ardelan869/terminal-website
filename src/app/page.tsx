'use client';

import {
	type FormEvent,
	type KeyboardEvent,
	useRef,
	useState,
	useEffect,
	useCallback,
} from 'react';

import Command, {
	CommandContent,
	CommandLine,
} from '@/components/home/command';

import { setTextRange } from '@/lib/utils';
import { getMatchingCommand } from '@/config/commands';

export default function Home() {
	const inputRef = useRef<HTMLSpanElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const [caretVisible, setCaretVisible] = useState(true);
	const [caretAnimPaused, pauseCaretAnim] = useState(false);

	const [content, setContent] = useState('');
	const [messages, setMessages] = useState<string[]>([]);
	const [messageIndex, setMessageIndex] = useState(-1);

	const handleInput = useCallback(
		(e: FormEvent<HTMLSpanElement>) => {
			e.preventDefault();

			setContent(e.currentTarget.textContent || '');
		},
		[setContent],
	);

	const sendMessage = useCallback(
		(content?: string | null) => {
			if (typeof content !== 'string') return;

			const contentSplit = content.split(' ');
			const commandName = contentSplit[0];
			const command = getMatchingCommand(commandName);

			if (content.length) {
				messages.push(content);
				setMessages([...messages]);
			}

			setContent('');

			if (command)
				command.callback({
					args: contentSplit.slice(1),
					setMessages,
				});
		},
		[messages, setMessages, setContent],
	);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent<HTMLSpanElement>) => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);

			timeoutRef.current = setTimeout(() => {
				pauseCaretAnim(false);
			}, 500);

			pauseCaretAnim(true);

			switch (e.key) {
				case 'Enter':
					e.preventDefault();

					sendMessage(e.currentTarget.textContent);
					setMessageIndex(-1);
					break;
				case 'Escape':
					e.preventDefault();

					setContent('');
					setMessageIndex(-1);
					break;
				case 'ArrowUp':
					e.preventDefault();

					if (messages.length === 0) return;

					if (messages.length > messageIndex + 1) {
						setContent(
							messages[messages.length - 1 - (messageIndex + 1)],
						);
						setMessageIndex((idx) => idx + 1);
					}

					break;
				case 'ArrowDown':
					e.preventDefault();

					if (messages.length === 0) return;

					if (messageIndex - 1 >= 0) {
						setContent(
							messages[messages.length - 1 - (messageIndex - 1)],
						);
						setMessageIndex((idx) => idx - 1);
					} else if (messageIndex - 1 < 0) {
						setMessageIndex(-1);
						setContent('');
					}

					break;
			}
		},
		[messages, messageIndex, setContent, setMessageIndex, sendMessage],
	);

	useEffect(() => {
		if (!inputRef.current) return;

		inputRef.current.textContent = content;

		if (inputRef.current.childNodes[0])
			setTextRange(inputRef.current.childNodes[0], content.length);
	}, [content, inputRef]);

	return (
		<main className="h-full">
			<div className="max-h-full overflow-y-scroll flex flex-col text-lg">
				{messages.map((message, i) => (
					<Command key={i}>
						<CommandLine>{i + 1}</CommandLine>
						<CommandContent
							dangerouslySetInnerHTML={{ __html: message }}
						/>
					</Command>
				))}

				<Command onClick={() => inputRef.current?.focus()}>
					<CommandLine>{messages.length + 1}</CommandLine>
					<CommandContent
						ref={inputRef}
						contentEditable
						suppressContentEditableWarning
						className="text-primary outline-none border-none caret-transparent"
						onInput={handleInput}
						onFocus={() => setCaretVisible(true)}
						onBlur={() => setCaretVisible(false)}
						onKeyDown={handleKeyDown}
					/>
					{caretVisible && (
						<div
							className="w-2 h-7 bg-accent animate-blink"
							style={{
								animationPlayState: caretAnimPaused
									? 'paused'
									: 'running',
							}}
						/>
					)}
				</Command>
			</div>
		</main>
	);
}
