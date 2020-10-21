import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import debouncePromise from 'awesome-debounce-promise';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { isTextValid } from './itemHelpers';
import { EItemSearchType } from './models';

export type ItemsSearchFormProps = {
	handleSearch: (payload: ItemsSearchData) => void;
	handleReset: () => void;
};

export type ItemsSearchData = {
	type: EItemSearchType;
	text: string;
};

const defaultSearchData: ItemsSearchData = { type: EItemSearchType.metadata, text: '' };

export const ItemsSearchForm: FC<ItemsSearchFormProps> = ({ handleSearch, handleReset }) => {
	const { register, handleSubmit, errors } = useForm<ItemsSearchData>({ defaultValues: defaultSearchData });

	const onSubmit = (data: ItemsSearchData): void => {
		if (data.text.length > 0) {
			handleSearch(data);
		} else {
			handleReset();
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="form-row">
				<div className="form-group col-6">
					{/* Text */}
					<input
						type="search"
						ref={register({
							required: false,
							validate: debouncePromise(async (value: string) => {
								return value.length === 0 || isTextValid(value);
							}, 300),
						})}
						className={`form-control ${errors.text ? 'is-invalid' : ''}`}
						id="text"
						name="text"
						placeholder="Search"
					/>

					{errors.text?.type === 'validate' && <div className="invalid-feedback">Invalid</div>}
				</div>
				<div className="form-group col-4">
					{/* Type */}
					<select
						className="form-control p-1"
						ref={register({
							required: true,
						})}
						id="type"
						name="type">
						<option value={EItemSearchType.metadata}>Metadata</option>
						<option value={EItemSearchType.tags}>Tags</option>
					</select>
				</div>
				<div className="form-group col-2">
					{/* Do search */}
					<button type="submit" className="btn btn-outline-success">
						<FontAwesomeIcon icon={faSearch} size="lg" />
					</button>
				</div>
			</div>
		</form>
	);
};
