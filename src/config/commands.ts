type CommandCallback = (props: { clear: () => void }) => void;

interface Command {
	name: string | string[];
	callback: CommandCallback;
}

const commands: Command[] = [] as const;

export { commands, type Command, type CommandCallback };
export default commands;
