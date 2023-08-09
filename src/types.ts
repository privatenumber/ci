export type LockVersion = [number, number];

export type NodeVersion = [number, number, number];

export type PnpmVersion = {
	node: NodeVersion;
	lock: LockVersion;
};
