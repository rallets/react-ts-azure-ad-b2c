import React, { CSSProperties, FC, ReactElement } from 'react';

type ObjectDumpProps = {
	value: any;
	style?: CSSProperties;
};

const ObjectDump: FC<ObjectDumpProps> = ({ value, style }): ReactElement => {
	let cache: any = [];
	const output = JSON.stringify(
		value,
		(k, v) => {
			if (typeof v === 'object' && v !== null) {
				// Duplicate reference found, discard key
				if (cache.includes(v)) return;

				// Store value in our collection
				cache.push(v);
			}
			return v;
		},
		2
	);
	cache = null;

	return <pre style={style}>{output}</pre>;
};

export default ObjectDump;
