import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import debouncePromise from 'awesome-debounce-promise';
import React, { FC } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { guid } from '../../models/guid';
import { minLength } from '../helpers/validators';
import { isTextValid } from './itemHelpers';
import { Item } from './models';

export type ItemFormProps = {
	item: Item | null;
	handleSave: (item: ItemEditData) => void;
	handleClose: () => void;
};

type ItemTagEditData = {
	id?: guid;
	name: string;
};

export type ItemEditData = Pick<Item, 'name' | 'description'> & { tags: ItemTagEditData[] };

export const ItemEditForm: FC<ItemFormProps> = ({ item, handleSave, handleClose }) => {
	const { register, handleSubmit, errors, control } = useForm<ItemEditData>({ defaultValues: item || {} });
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'tags',
		keyName: 'id',
	});

	const onSubmit = (data: ItemEditData): void => {
		handleSave(data);
	};

	const handleRemoveTag = (index: number): void => {
		remove(index);
	};

	const handleAddEmptyTag = (): void => {
		append({ id: uuidv4(), name: '' });
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

					{errors.name?.type === 'required' && <div className="invalid-feedback">Required</div>}
					{errors.name?.type === 'validate' && <div className="invalid-feedback">Invalid</div>}
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

					{errors.description?.type === 'required' && <div className="invalid-feedback">Required</div>}
				</div>
			</div>

			{/* Tags */}
			<div className="form-group row">
				<label htmlFor="description" className="col-sm-2 col-form-label">
					Tags
				</label>
				<div className="col-sm-10">
					{!fields.length && <span>---</span>}
					{fields.map((item, index) => (
						<div className="form-row mb-1" key={item.id}>
							<div className="col-7">
								<Controller
									as={<input type="hidden" />}
									name={`tags[${index}].id`}
									control={control}
									defaultValue={item.id} // make sure to set up defaultValue
								/>

								<input
									name={`tags[${index}].name`}
									className={`form-control ${errors.tags && errors.tags[index] ? 'is-invalid' : ''}`}
									ref={register({
										required: true,
										validate: (value) => minLength(value, 3),
									})}
									defaultValue={item.name} // make sure to set up defaultValue
								/>

								{errors.tags && errors.tags[index]?.name?.type === 'required' && (
									<div className="invalid-feedback">Required</div>
								)}
								{errors.tags && errors.tags[index]?.name?.type === 'validate' && (
									<div className="invalid-feedback">Invalid</div>
								)}
							</div>
							<div className="col-5">
								<button
									type="button"
									className="btn btn-outline-danger"
									aria-label="Close"
									onClick={() => handleRemoveTag(index)}>
									<FontAwesomeIcon icon={faTimesCircle} size="lg" />
								</button>
							</div>
						</div>
					))}

					<div className="form-row mb-1">
						<div className="col-7"></div>
						<div className="col-5">
							<button type="button" className="btn btn-outline-primary" onClick={handleAddEmptyTag}>
								<FontAwesomeIcon icon={faPlusCircle} size="lg" />
							</button>
						</div>
					</div>
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
