import { guid } from '../../models/guid';

export type Tag = {
	id: guid;
	name: string;
};

export type Item = {
	id: guid;
	name: string;
	description: string;
	tags: Tag[];
};

export type ItemHeader = Pick<Item, 'id' | 'name'> & { numTags: number };

export type ValidTextRequest = {
	text: string;
};

export enum EItemSearchType {
	metadata = 1,
	tags = 2,
}

export type ItemsSearchRequest = {
	text: string;
	type: EItemSearchType;
};
