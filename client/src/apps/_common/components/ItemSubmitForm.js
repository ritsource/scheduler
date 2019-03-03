import React, { useState } from 'react';

const ItemSubmitForm = (props) => {
	const { placeholder, onSubmit } = props;
	const [ value, setValue ] = useState('');

	return (
		<form
			onSubmit={async (e) => {
				console.log(e);
				e.preventDefault();
				// e.preventDefault();

				setValue('');
				if (value.length > 0) {
					await onSubmit(value);
				}
				// setValue('');
			}}
			className="ItemSubmitForm-c-00"
		>
			<input
				className="ItemSubmitForm-Input-01"
				type="text"
				autoComplete="Off"
				placeholder={placeholder}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</form>
	);
};

export default ItemSubmitForm;
