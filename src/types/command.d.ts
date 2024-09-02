type CommandCallback = (props: {
	args: string[];
	setMessages: React.Dispatch<React.SetStateAction<string[]>>;
	addMessage: (message: string) => void;
}) => void | Promise<void>;

interface Command {
	name: string;
	alias?: string[];
	description: string;
	callback: CommandCallback;
}
