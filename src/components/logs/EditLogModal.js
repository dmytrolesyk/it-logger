import React, { useState,  useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import moment from 'moment';
import { updateLog } from '../../actions/logActions';
import TechSelectOptions from '../techs/TechSelectOptions';

const EditLogModal = ({
  updateLog,
  currentLog,
}) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  useEffect(() => {
    if (currentLog) {
      setMessage(currentLog.message);
      setAttention(currentLog.attention);
      setTech(currentLog.tech);
    }
  }, [currentLog]);
  const modalStyle = {
    width: '75%',
    height: '75%',
  }
  const onSubmit = () => {
    if (!message || !tech) {
      M.toast({
        html: 'Please enter a message and a tech'
      });
    } else {
      updateLog({
        id: currentLog.id,
        message,
        tech,
        attention,
        date: moment().format()
      });
      M.toast({
        html: `Log updated by ${tech}`,
      });
      setMessage('');
      setTech('');
      setAttention(false);
    }
  }
  return (
    <div
      id="edit-log-modal"
      className="modal"
      style={modalStyle}
    >
      <div className="modal-content">
        <h4>Edit Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              className="browser-default"
              name="tech"
              value={tech}
              onChange={e => setTech(e.target.value)}
            >
              <TechSelectOptions />
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={attention}
                  value={attention}
                  onChange={e => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect blue btn">
            Enter
          </a>
      </div>
    </div>
  );
};

EditLogModal.propTypes = {
  updateLog: PropTypes.func.isRequired,
  currentLog: PropTypes.object,
};

const mapStateToProps = state => ({
  currentLog: state.log.current,
});

const mapDispatchToProps = {
  updateLog,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditLogModal);
