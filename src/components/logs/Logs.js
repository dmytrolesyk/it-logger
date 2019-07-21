import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getLogs } from '../../actions/logActions';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';

const Logs = ({ log: { logs, loading }, getLogs }) => {
  useEffect(() => {
    getLogs();
  }, []);
  
  if (loading || !logs) {
    return <Preloader />;
  }

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>
      {!loading && !logs.length
        ? (<p className="center">No logs to show...</p>)
        : logs.map(
            log => <LogItem key={log.id} log={log}/>
        )
      }
    </ul>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  log: state.log,
  getLogs: PropTypes.func.isRequired,
});

const mapDispatchToProps = {
  getLogs,
}

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
