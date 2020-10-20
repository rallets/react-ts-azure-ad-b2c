import debouncePromise from 'awesome-debounce-promise';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { isTextValid } from './itemHelpers';
import { Item } from './models';

export type ItemFormProps = {
	item: Item | null;
	handleSave: (item: ItemEditData) => void;
	handleClose: () => void;
};

export type ItemEditData = Pick<Item, 'name' | 'description'>;

export const ItemEditForm: FC<ItemFormProps> = ({ item, handleSave, handleClose }) => {
	const { register, handleSubmit, errors } = useForm<ItemEditData>({ defaultValues: item || {} });
	const minLength = (value: string, length: number): boolean => value.length >= length;

	const onSubmit = (data: ItemEditData): void => {
		console.log('data', data);
		handleSave(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{/* Id */}
			{item?.id && (
				<div className="form-group row">
					<label htmlFor="id" className="col-sm-2 col-form-label">
						Id
					</label>
					<div className="col-sm-10">
						<input type="text" readOnly className="form-control-plaintext" id="id" name="id" value={item.id}></input>
					</div>
				</div>
			)}

			{/* <ObjectDump value={errors.name} /> */}

			{/* Name */}
			<div className="form-group row">
				<label htmlFor="staticEmail" className="col-sm-2 col-form-label">
					Name
				</label>
				<div className="col-sm-10">
					<input
						type="text"
						ref={register({
							required: true,
							validate: debouncePromise(async (value: string) => {
								return minLength(value, 3) && isTextValid(value);
							}, 300),
						})}
						className={`form-control ${errors.name ? 'is-invalid' : ''}`}
						id="name"
						name="name"
					/>

					{errors.name && errors.name.type === 'required' && <div className="invalid-feedback">Required</div>}
					{errors.name && errors.name.type === 'validate' && <div className="invalid-feedback">Invalid</div>}
				</div>
			</div>

			{/* Description */}
			<div className="form-group row">
				<label htmlFor="description" className="col-sm-2 col-form-label">
					Description
				</label>
				<div className="col-sm-10">
					<input
						type="text"
						ref={register({ required: true })}
						className={`form-control ${errors.description ? 'is-invalid' : ''}`}
						id="description"
						name="description"
					/>

					{errors.description && errors.description.type === 'required' && <div className="invalid-feedback">Required</div>}
				</div>
			</div>

			<div className="row">
				<div className="col-auto ml-auto">
					<button type="submit" className="btn btn-outline-primary mr-2">
						Save
					</button>
					<button type="button" onClick={handleClose} className="btn btn-outline-danger">
						Cancel
					</button>
				</div>
			</div>
		</form>
	);
};
