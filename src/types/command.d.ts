type CommandCallback = (props: {
	args: string[];
	setMessages: React.Dispatch<React.SetStateAction<string[]>>;
}) => void;

interface Command {
	name: string;
	alias?: string[];
	description: string;
	callback: CommandCallback;
}
