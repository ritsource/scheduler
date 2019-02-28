import React, { useState } from 'react';
import { connect } from 'react-redux';
import { IoIosBrush } from 'react-icons/io';
import { FaCircle, FaCheckCircle } from 'react-icons/fa';

import { asyncAddCustomColor } from '../../../actions/auth_actions';

export const SubOptColorComp = (props) => {
	const [ new_color_hex, setNewColorHex ] = useState('#d4e1f4');
	const [ input_visible, setInputVis ] = useState(true);
	const [ submit_error, setSubmitError ] = useState(false);

	return (
		<div style={{ background: 'var(--background-color)' }}>
			<div
				className="any-dropdown-content-item-999"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<IoIosBrush style={{ marginRight: '8px', marginBottom: '-2px' }} />
				Color
			</div>

			<p className="calendar-sidebar-color-options-p-001">
				{props.color_options.map((hexVal, i) => {
					if (hexVal === props.hex_color) {
						return (
							<FaCheckCircle
								key={i}
								style={{ color: hexVal, margin: '0px 4px 10px 4px', cursor: 'pointer' }}
								onClick={() => props.animatedClosing(() => props.changeColorFunc(hexVal))}
							/>
						);
					} else {
						return (
							<FaCircle
								key={i}
								style={{ color: hexVal, margin: '0px 4px 10px 4px', cursor: 'pointer' }}
								onClick={() => props.animatedClosing(() => props.changeColorFunc(hexVal))}
							/>
						);
					}
				})}
			</p>

			{input_visible ? (
				<form
					style={{ maxWidth: '145px', marginTop: '-2px' }}
					className="calendar-sidebar-color-form-002"
					onSubmit={async (e) => {
						e.preventDefault();
						const value = new_color_hex;
						if (value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
							try {
								const ret = await props.asyncAddCustomColor(value);
								setSubmitError(false);
							} catch (error) {
								setSubmitError('Something went wrong');
							}
						} else {
							setSubmitError('Only hex-codes');
						}
					}}
				>
					<div style={{ fontSize: '18px' }}>
						{new_color_hex && <FaCircle style={{ color: new_color_hex, margin: '0px 10px 0px 0px' }} />}
					</div>
					<input
						style={{ padding: '4px' }}
						type="text"
						placeholder="Hex value"
						onClick={(e) => e.stopPropagation()}
						value={new_color_hex}
						onChange={(e) => setNewColorHex(e.target.value)}
					/>
				</form>
			) : (
				<p onClick={() => setInputVis(true)}>+</p>
			)}

			{submit_error && <p className="calendar-sidebar-color-error_message">{submit_error}</p>}
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	asyncAddCustomColor: (xyz) => dispatch(asyncAddCustomColor(xyz))
});

export default connect(null, mapDispatchToProps)(SubOptColorComp);
