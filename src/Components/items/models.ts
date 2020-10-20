import { guid } from '../../models/guid';

export type Item = {
	id: guid;
	name: string;
	description: string;
};

export type ItemHeader = Pick<Item, 'id' | 'name'>;

export type ValidTextRequest = {
	text: string;
};
