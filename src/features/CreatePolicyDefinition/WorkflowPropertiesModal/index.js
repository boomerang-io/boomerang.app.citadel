import React, { Component } from "react";
import PropTypes from "prop-types";
import { ModalFlow } from "@boomerang-io/carbon-addons-boomerang-react";
import WorkflowPropertiesModalContent from "./WorkflowPropertiesModalContent";
import EditButton from "components/EditButton";
import { Add32 } from "@carbon/icons-react";
import styles from "./WorkflowPropertiesModal.module.scss";

class WorkflowProperties extends Component {
  static propTypes = {
    input: PropTypes.object,
    inputsKeys: PropTypes.array,
    isEdit: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    updateWorkflowProperties: PropTypes.func.isRequired
  };

  editTrigger = ({ openModal }) => {
    let output = null;
    this.props.isEdit
      ? (output = <EditButton className={styles.editContainer} onClick={openModal} aria-label="Edit" />)
      : (output = (
          <button
            className={styles.createPropertyCard}
            onClick={openModal}
            data-testid="create-new-workflow-input-button"
          >
            <div className={styles.createContainer}>
              <Add32 className={styles.createIcon} aria-label="Add" />
              <p className={styles.createText}>Create a new property</p>
            </div>
          </button>
        ));
    return output;
  };

  render() {
    const { isEdit, input, loading } = this.props;

    return (
      <ModalFlow
        composedModalProps={{ containerClassName: "c-inputs-modal" }}
        confirmModalProps={{
          title: "Are you sure?",
          children: "Your property will not be saved"
        }}
        modalHeaderProps={{
          title: isEdit && input ? input.label : "Create Property",
          subtitle: isEdit ? "Let's update it" : "Let's create a new one"
        }}
        modalTrigger={this.editTrigger}
      >
        <WorkflowPropertiesModalContent
          loading={loading}
          updateWorkflowProperties={this.props.updateWorkflowProperties}
          {...this.props}
        />
      </ModalFlow>
    );
  }
}

export default WorkflowProperties;
