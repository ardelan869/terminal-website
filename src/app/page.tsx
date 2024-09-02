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
	CommandLine,
	CommandContent,
} from '@/components/home/command';

import { escapeHTML, setTextRange } from '@/lib/utils';
import commands, { getMatchingCommand } from '@/config/commands';

export default function Home() {
	const inputRef = useRef<HTMLSpanElement>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const [caretVisible, setCaretVisible] = useState(true);
	const [caretAnimPaused, pauseCaretAnim] = useState(false);

	const [content, setContent] = useState('');
	const [matchingCommand, setMatchingCommand] = useState<
		string | undefined
	>();
	const [messages, setMessages] = useState<string[]>([]);
	const [history, setHistory] = useState<string[]>([]);
	const [messageIndex, setMessageIndex] = useState(-1);

	const handleInput = useCallback((e: FormEvent<HTMLSpanElement>) => {
		e.preventDefault();

		setContent(e.currentTarget.textContent || '');
	}, []);

	const sendMessage = useCallback(
		async (content?: string | null) => {
			if (typeof content !== 'string') return;

			content = escapeHTML(content);

			const contentSplit = content.split(' ');
			const commandName = contentSplit[0];
			const command = getMatchingCommand(commandName);

			if (content.length) {
				history.push(content);
				messages.push(content);
				setMessages([...messages]);
				setHistory([...history]);
			}

			setContent('');

			if (command) {
				await command.callback({
					args: contentSplit.slice(1),
					setMessages,
					addMessage: (message: string) => {
						setMessages((messages) => [...messages, message]);
					},
				});
			}
		},
		[messages, history],
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

					if (history.length === 0) return;

					if (history.length > messageIndex + 1) {
						setContent(
							history[history.length - 1 - (messageIndex + 1)],
						);
						setMessageIndex((idx) => idx + 1);
					}

					break;
				case 'ArrowDown':
					e.preventDefault();

					if (messages.length === 0) return;

					if (messageIndex - 1 >= 0) {
						setContent(
							history[history.length - 1 - (messageIndex - 1)],
						);
						setMessageIndex((idx) => idx - 1);
					} else if (messageIndex - 1 < 0) {
						setMessageIndex(-1);
						setContent('');
					}

					break;
				case 'Tab':
					e.preventDefault();

					if (matchingCommand) {
						setContent(matchingCommand);
						setMessageIndex(-1);
					}
					break;
			}
		},
		[messages, history, messageIndex, matchingCommand, sendMessage],
	);

	useEffect(() => {
		if (!inputRef.current) return;

		inputRef.current.textContent = content;

		if (inputRef.current.childNodes[0])
			setTextRange(inputRef.current.childNodes[0], content.length);
	}, [content, inputRef]);

	useEffect(() => {
		const word = content.split(' ')[0].trim();

		if (!word || !word.length) return setMatchingCommand(undefined);

		let commandName;

		for (const command of commands) {
			if (command.name.startsWith(word)) {
				commandName = command.name;
				break;
			}

			if (!command.alias) continue;

			for (const alias of command.alias) {
				if (alias.startsWith(word)) {
					commandName = alias;
					break;
				}
			}
		}

		if (!commandName) return setMatchingCommand(undefined);

		setMatchingCommand(commandName);
	}, [content]);

	useEffect(() => {
		inputRef.current?.focus();

		const eventListener = () => {
			if (!inputRef.current) return;

			if (!document.hidden) inputRef.current.focus();
		};

		document.addEventListener('visibilitychange', eventListener);

		return () =>
			document.removeEventListener('visibilitychange', eventListener);
	}, []);

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

					<div
						className="w-2 h-7 bg-accent animate-blink"
						style={{
							animationPlayState:
								caretAnimPaused || !caretVisible
									? 'paused'
									: 'running',
							opacity: caretVisible ? 1 : 0,
						}}
					/>
					<span className="text-foreground/50 -translate-x-2">
						{matchingCommand
							? matchingCommand.slice(content.length)
							: !messages.length &&
							  'Type `help` to list all commands'}
					</span>
				</Command>
			</div>
		</main>
	);
}
