export enum Event {
	INIT = 'z3us.init',
}

export enum MessageAction {
	RDT_DISCONNECT = 'v1-inpage-rdt-disconnect',
}

export interface Z3USEvent<T = any>
	extends CustomEvent<{
		data?: T
		error?: string
	}> {}
