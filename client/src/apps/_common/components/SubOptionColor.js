import React, { useState } from 'react';
import { IoIosBrush } from 'react-icons/io';
import { FaCircle, FaCheckCircle } from 'react-icons/fa';
import { ApolloConsumer } from 'react-apollo';

import { builtin_color_list } from '../../../utils/constants';
import AuthContext from '../../_common/contexts/AuthContext';

import { EDIT_GROUP_BY_ID } from '../../../graphql/mutations';

const SubOptionColor = (props) => {
	const { group, pathName, client } = props;

	const [ newColorHex, setNewColorHex ] = useState('#d4e1f4');
	const [ inputVis, setInputVis ] = useState(true);
	const [ submit_error, setSubmitError ] = useState(false);

	const handleColorChange = async (hex_color) => {
		props.closeThatShit();

		await client.mutate({
			mutation: EDIT_GROUP_BY_ID,
			variables: { groupId: group._id, hex_color },
			refetchQueries: pathName === 'todo' ? [ 'readAllGroups' ] : [ 'readGroupsOnCalendar' ],
			awaitRefetchQueries: true
		});
	};

	const addCustomColor = () => {};

	return (
		<AuthContext.Consumer>
			{(context) => {
				return (
					<div onClick={(e) => e.stopPropagation()} style={{ background: 'var(--background-color)' }}>
						<div className="Theme-Dropdown-Content-Item-99 Theme-Slide-Background-onHover-99">
							<IoIosBrush style={{ marginRight: '8px', marginBottom: '-2px' }} />
							Color
						</div>

						<p className="SubOptionColor-P-01">
							{[ ...builtin_color_list, ...context.auth.custom_colors ].map((hexVal, i) => {
								if (hexVal === group.hex_color) {
									return (
										<FaCheckCircle
											key={i}
											style={{ color: hexVal, margin: '0px 4px 10px 4px', cursor: 'pointer' }}
											onClick={() => handleColorChange(hexVal)}
										/>
									);
								} else {
									return (
										<FaCircle
											key={i}
											style={{ color: hexVal, margin: '0px 4px 10px 4px', cursor: 'pointer' }}
											onClick={() => handleColorChange(hexVal)}
										/>
									);
								}
							})}
						</p>

						{inputVis ? (
							<form
								className="SubOptionColor-Form-01"
								style={{ maxWidth: '145px', marginTop: '-2px' }}
								onSubmit={async (e) => {
									e.preventDefault();
									const value = newColorHex;
									if (value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
										try {
											const ret = await addCustomColor(value);
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
									{newColorHex && (
										<FaCircle style={{ color: newColorHex, margin: '0px 10px -5px 0px' }} />
									)}
								</div>
								<input
									className="Theme-Input-Underline-OnFoucs-99"
									style={{ padding: '4px' }}
									type="text"
									placeholder="Hex value"
									onClick={(e) => e.stopPropagation()}
									value={newColorHex}
									onChange={(e) => setNewColorHex(e.target.value)}
								/>
							</form>
						) : (
							<p onClick={() => setInputVis(true)}>+</p>
						)}

						{submit_error && <p className="SubOptionColor-Error-Msg-01">{submit_error}</p>}
					</div>
				);
			}}
		</AuthContext.Consumer>
	);
};

export default (props) => <ApolloConsumer>{(client) => <SubOptionColor {...props} client={client} />}</ApolloConsumer>;
