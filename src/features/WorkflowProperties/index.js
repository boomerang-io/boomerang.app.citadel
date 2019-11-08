import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as workflowActions } from "./node_modules/State/workflow";
import { ConfirmModal } from "./node_modules/@boomerang-io/carbon-addons-boomerang-react";
import WorkflowPropertiesModal from "./WorkflowPropertiesModal";
import WorkflowCloseButton from "./node_modules/Components/WorkflowCloseButton";
import INPUT_TYPES from "./node_modules/Constants/workflowInputTypes";
import styles from "./WorkflowProperties.module.scss";

WorkflowProperties.propTypes = {
  inputs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  updateWorkflowProperties: PropTypes.func.isRequired,
  workflowActions: PropTypes.object.isRequired
};

function WorkflowPropertyRow({ title, value }) {
  return (
    <dl className={styles.fieldContainer}>
      <dt className={styles.fieldKey}>{title}</dt>
      <dd className={styles.fieldValue}>{value}</dd>
    </dl>
  );
}

function WorkflowPropertyHeader({ label, description }) {
  return (
    <div className={styles.headerContainer}>
      <h1 className={styles.label}>{label}</h1>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

function WorkflowProperties(props) {
  function formatDefaultValue(value) {
    if (!value) {
      return "---";
    }
    switch (value) {
      case INPUT_TYPES.BOOLEAN:
        return value.toString();
      default:
        return value;
    }
  }

  async function deleteInput(key) {
    await props.workflowActions
      .deleteWorkflowInput({ key })
      .then(() =>
        props.updateWorkflowProperties({ title: "Delete Input", message: "Successfully deleted input", type: "delete" })
      );
  }

  const { inputs } = props;
  const inputsKeys = inputs.map(input => input.key);
  return (
    <main className={styles.container}>
      {inputs.length > 0 &&
        inputs.map((input, index) => (
          <section key={`${input.id}-${index}`} className={styles.property}>
            <WorkflowPropertyHeader label={input.label} description={input.description} />
            <WorkflowPropertyRow title="Key" value={input.key} />
            <WorkflowPropertyRow title="Type" value={input.type} />
            <WorkflowPropertyRow title="Default value" value={formatDefaultValue(input.defaultValue)} />
            <WorkflowPropertyRow title="Options" value={formatDefaultValue(input.validValues?.join(", "))} />
            {input.required ? (
              <p className={styles.required}>Required</p>
            ) : (
              <p className={styles.notRequired}>Not required</p>
            )}
            {!input.readOnly ? (
              <>
                <WorkflowPropertiesModal
                  isEdit
                  inputsKeys={inputsKeys.filter(inputName => inputName !== input.key)}
                  input={input}
                  updateWorkflowProperties={props.updateWorkflowProperties}
                  loading={props.loading}
                />
                <ConfirmModal
                  affirmativeAction={() => {
                    deleteInput(input.key);
                  }}
                  children="It will be gone. Forever."
                  title="Delete This Property?"
                  modalTrigger={({ openModal }) => (
                    <WorkflowCloseButton className={styles.deleteProperty} onClick={openModal} />
                  )}
                />
              </>
            ) : (
              <p className={styles.readOnlyText}>Read-only</p>
            )}
          </section>
        ))}
      <WorkflowPropertiesModal
        isEdit={false}
        inputsKeys={inputsKeys}
        updateWorkflowProperties={props.updateWorkflowProperties}
        loading={props.loading}
      />
    </main>
  );
}

const mapStateToProps = state => ({
  inputs: state.workflow.data.properties
});

const mapDispatchToProps = dispatch => ({
  workflowActions: bindActionCreators(workflowActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkflowProperties);
