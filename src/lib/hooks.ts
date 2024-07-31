import { useEffect, useRef } from 'react';

export type EventKeys = keyof WindowEventMap;

export type EventCallback<T extends EventKeys = EventKeys> = (
	this: Window,
	ev: WindowEventMap[T],
) => any;

export const useEvent = <T extends EventKeys>(
	event: T,
	callback: EventCallback<T>,
) => {
	const savedHandler = useRef<EventCallback<T>>(() => {});

	useEffect(() => {
		savedHandler.current = callback;
	}, [callback]);

	useEffect(() => {
		window.addEventListener(event, callback);

		return () => window.removeEventListener(event, callback);
	}, [event, callback]);
};
