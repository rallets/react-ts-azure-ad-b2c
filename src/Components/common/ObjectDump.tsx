import React, { CSSProperties, FC, ReactElement } from 'react';

type ObjectDumpProps = {
	value: any,
	style?: CSSProperties
}

const ObjectDump: FC<ObjectDumpProps> = ({ value, style }): ReactElement => {
	return (
		<pre style={style}>
			{JSON.stringify(value, null, 2)}
		</pre>
	);
}

export default ObjectDump;
