import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteLog, setCurrentLog } from '../../actions/logActions';

const LogItem = ({ log, deleteLog, setCurrentLog }) => {
  const onDelete = (logId) => () => {
    deleteLog(logId);
    M.toast({ html: 'Log Deleted' });
  }
  return (
    <li className="collection-item">
      <div>
        <a
          onClick={() => setCurrentLog(log)}
          href="#edit-log-modal"
          className={`modal-trigger ${log.attention ? 'red-text' : 'blu-text'}`}
        >
          {log.message}
        </a>
        <br/>
        <span className="grey-text">
          <span className="black-text">ID #{log.id}</span>
          {' '}last updated by{' '} 
          <span className="black-text">{log.tech}</span> on <Moment format="MMMM Do YYYY,h:mm:ss a">{log.date}</Moment>
        </span>
        <a
          href="#!" className="secondary-content"
          onClick={onDelete(log.id)}
        >
          <span className="material-icons grey-text">delete</span>
        </a>
      </div>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog: PropTypes.func.isRequired,
  setCurrentLog: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  deleteLog,
  setCurrentLog,
}

export default connect(null, mapDispatchToProps)(LogItem);
