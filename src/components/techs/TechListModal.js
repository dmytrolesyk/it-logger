import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import { getTechs, deleteTech } from '../../actions/techActions';
import TechItem from './TechItem';

const TechListModal = ({
  getTechs,
  deleteTech,
  tech: { techs, loading },
}) => {
  useEffect(() => {
    getTechs();
  }, []);

  const onTechDelete = tech => () => {
    deleteTech(tech.id);
    M.toast({
      html: `${tech.firstName} ${tech.lastName} was removed from techs`,
    })
  }

  return (
    <div id="tech-list-modal" className="modal">
      <div className="modal-content">
        <h4>Technician List</h4>
        <ul className="collection">
          {!loading && techs && techs.map(tech => (
            <TechItem
              key={tech.id}
              tech={tech}
              deleteTech={onTechDelete(tech)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

TechListModal.propTypes = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired,
  deleteTech: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  tech: state.tech,
})

export default connect(mapStateToProps, { getTechs, deleteTech })(TechListModal);
