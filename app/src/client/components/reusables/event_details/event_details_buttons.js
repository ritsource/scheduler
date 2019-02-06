import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaTrash, FaCircle } from 'react-icons/fa';
import { GoCheck } from 'react-icons/go';
import Datepicker from 'awesome-react-datepicker';
import { Selector, Option } from 'react-dropdown-selector';

import EnsureDeletionComp from '../ensure_deletion';

const EventDetailsButtonsComp = (props) => {
  const [ description, setDescription ] = useState('');
  const [ dFromAsync, setDFromAsync ] = useState(false);
  const [ dToAsync, setDToAsync ] = useState(false);
  const [ groupAsync, setGroupAsync ] = useState(false);
  const [ askforDelete, setAskforDelete ] = useState(false);
  const [ askforDelete_close, setAskforDelete_close ] = useState(false);

  const { event } = props;
  const groupNow = props.groups.find(({ _id }) => _id === event._group);

  useEffect(() => {
    if (event && event.description !== description) setDescription(event.description);
  }, []);

  return (
    <div style={{ padding: '10px 0px' }}>
      <Selector
        onSelect={(id) => {
          setGroupAsync(true);
          props.asyncEditEvent(event._id, { _group: id }).then(() => {
            setGroupAsync(false);
          });
        }}
        inputHeight={36}
        optionHeight={36}
        numOptions={props.groups.length}
        numOptionsVisible={4}
        selectorBoxShadow='0px 3px 13px 0px rgba(0,0,0,0.20)'
        renderBtn={() => (
          <div className='any-dropdown-content-item-999'>
            <FaCircle style={groupAsync ? {
              marginRight: '8px',
              marginBottom: '-2px',
              transition : 'border 0.3s ease-out',
              animation: 'asyncButtonText 0.6s infinite',
            } : { color: groupNow.hex_color, marginRight: '8px', marginBottom: '-2px' }}/>
            {groupNow.title}
          </div>
        )}
      >
        {props.groups.map((group, i) => (
          <Option key={i} id={group._id}>
            <div className='any-dropdown-content-item-999' style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', flexDirection: 'row', lignItems: 'center' }}>
                <FaCircle style={{ color: group.hex_color, marginRight: '8px', marginBottom: '-2px' }}/>
                {group.title}
              </div>
              {group._id === groupNow._id && <GoCheck />}
            </div>
          </Option>
        ))}
      </Selector>

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'stretch',
        padding: '10px 0px',
        width: '100%',
      }}>
        <Datepicker
          initDate={new Date(event.date_from)}
          onDateSelect={(timeStamp) => {
            setDFromAsync(true);
            props.asyncEditEventDate(event._id, { date_from: timeStamp }).then(() => {
              setDFromAsync(false);
            });
          }}
        >
          <button name='Change Date-from' className='awesome-app-unique-btn-999' style={dFromAsync ? {
            transition : 'border 0.3s ease-out',
            animation: 'asyncButtonText 0.6s infinite',
            flexGrow: 1,
          } : { flexGrow: 1, }}>
            {new Date(event.date_from).getFormattedDate()}
          </button>
        </Datepicker>

        <p style={{ margin: '5px' }}>to</p>

        <Datepicker
          initDate={new Date(event.date_to)}
          onDateSelect={(timeStamp) => {
            setDToAsync(true);
            props.asyncEditEventDate(event._id, { date_to: timeStamp }).then(() => {
              setDToAsync(false);
            });
          }}
        >
          <button name='Change Date-to' className='awesome-app-unique-btn-999' style={dToAsync ? {
            transition : 'border 0.3s ease-out',
            animation: 'asyncButtonText 0.6s infinite',
            flexGrow: 1,
          } : { flexGrow: 1, }}>
            {new Date(event.date_to).getFormattedDate()}
          </button>
        </Datepicker>
      </div>

      {/* </div> */}
      <div style={{
        display: 'flex', flexDirection: 'row', padding: '0px', justifyContent: 'space-between'
      }}>
        <button name='Close Event Details'
          className='awesome-app-unique-btn-999'
          onClick={() => {
            props.closeEventDetails();
          }}
        >
          <FaArrowLeft style={{ marginBottom: '-2px' }}/>
        </button>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <EnsureDeletionComp
            visible={askforDelete}
            message='Are you sure you want to delete the event?'
            onClose={() => {
              setAskforDelete_close(true);
              setAskforDelete(false);
              setTimeout(() => {
                setAskforDelete_close(false);
              }, 300);
            }}
            onDelete={async () => {
              await props.handleEventDelete(event._id);
              props.closeEventDetails();
            }}
            onCancel={() => {
              setAskforDelete_close(true);
              setTimeout(() => {
                setAskforDelete_close(false);
              }, 300);
            }}
          >
            <button name='Delete Event'
              style={{ marginLeft: '10px' }}
              className='awesome-app-unique-btn-999'
              onClick={() => {
                // props.setParentState({ askforDelete: true });
                setAskforDelete(true);
              }}
            >
              <FaTrash style={{ marginBottom: '-2px' }}/>
            </button>
          </EnsureDeletionComp>
        </div>
      </div>

      <p style={{
        marginTop: '10px',
        fontWeight: 'bold',
        color: props.hex_color
      }}>
        Description
      </p>
      <textarea
        style={{ marginTop: '10px' }}
        id='todo-details-textarea-for-description'
        placeholder='Add description..'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button name='Add Description'
        style={{ marginTop: '5px', background: props.hex_color, color: 'white', width: '100%' }}
        className='todo-details-description-button-002'
        onClick={async () => {
          await props.asyncEditEvent(event._id, { description: description });
          document.querySelector('#todo-details-textarea-for-description').blur();
        }
      }>Save</button>
    </div>
  );
}

export default EventDetailsButtonsComp;