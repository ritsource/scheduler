import React from 'react';
import Dropdown from 'react-dropdown-modal';

const EnsureDeletion = (props) => {
	const { visible, onClose, onCancel, onDelete, message } = props;

	return (
		<Dropdown
			visible={visible}
			onButtonClick={() => {}}
			// preventDefaultClose={true}
			onClose={onClose}
			centerPositioning={true}
			modalBackground="var(--background-color)"
			backgroundMaskColor="var(--modal-mask-color)"
			customZIndex={30}
			animation={true}
			animeType="slideDown"
			animeDuration={300}
			modalBorderRadius="2px"
			modalContent={() => (
				<div className="EnsureDeletion-c-00">
					<p>{message}</p>
					<div className="EnsureDeletion-Btn-Container-01">
						<button className="Theme-Btn-Type2-Grey-99" onClick={onCancel}>
							Cancel
						</button>
						<button
							className="Theme-Btn-Type2-Red-99"
							onClick={async () => {
								onCancel();
								await onDelete();
							}}
						>
							Delete
						</button>
					</div>
				</div>
			)}
		>
			{props.children}
		</Dropdown>
	);
};

export default EnsureDeletion;
