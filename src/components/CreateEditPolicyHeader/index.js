import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  CodeSnippet,
  ComposedModal,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  OrderedList,
  ListItem,
} from "carbon-components-react";
import FullPageHeader from "components/FullPageHeader";
import { formatDateTimeString } from "utils";
import { PRODUCT_SERVICE_ENV_URL } from "config/servicesConfig";
import copy from "copy-to-clipboard";
import { Add16, Delete16, Save16 } from "@carbon/icons-react";
import { POLICY_INTERACTION_TYPES } from "../../constants";

import styles from "./createEditPolicyHeader.module.scss";

const ACTION_TYPE_CONFIG = {
  [POLICY_INTERACTION_TYPES.CREATE]: {
    title: "Create",
    affirmativeActionVerb: "Create",
    isPerformingActionVerb: "Creating...",
    icon: Add16,
  },
  [POLICY_INTERACTION_TYPES.EDIT]: {
    title: "Edit",
    affirmativeActionVerb: "Save",
    isPerformingActionVerb: "Saving...",
    deleteActionVerb: "Delete",
    isDeletingActionVerb: "Deleting...",
    icon: Save16,
  },
};

CreateEditPolicyHeader.propTypes = {
  form: PropTypes.object.isRequired,
  policy: PropTypes.object,
  navigateBack: PropTypes.func.isRequired,
  type: PropTypes.oneOf(Object.values(POLICY_INTERACTION_TYPES)),
};

function CreateEditPolicyHeader({ form, policy = {}, navigateBack, type, validateInfo }) {
  const config = ACTION_TYPE_CONFIG[type];
  const { name, errors, isPerformingAffirmativeAction, isDeleting } = form;
  const hasErrors = Object.values(errors).filter(Boolean).length;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  return (
    <FullPageHeader>
      <div className={styles.content}>
        <div className={styles.info}>
          <h1 className={styles.title}>{`${config.title} Policy`}</h1>
          {policy.createdDate && (
            <div className={styles.metadataContainer}>
              <p className={styles.metadata}>
                <span className={styles.metaDataLabel}>Created: </span>{" "}
                <time>{formatDateTimeString(policy.createdDate)}</time>
              </p>
              {type === POLICY_INTERACTION_TYPES.EDIT && (
                <button className={styles.validationInfoButton} onClick={() => setIsDetailsModalOpen(true)}>
                  How do I use this?
                </button>
              )}
            </div>
          )}
        </div>
        <section className={styles.buttons}>
          <Button className={styles.button} kind="secondary" onClick={navigateBack} size="field">
            Cancel
          </Button>
          {type === POLICY_INTERACTION_TYPES.EDIT && policy.id && (
            <Button
              disabled={isPerformingAffirmativeAction || isDeleting}
              className={styles.button}
              onClick={() => setIsDeleteModalOpen(true)}
              kind="danger"
              renderIcon={Delete16}
              iconDescription="Delete"
              size="field"
            >
              {isDeleting ? config.isDeletingActionVerb : config.deleteActionVerb}
            </Button>
          )}
          <Button
            data-testid="policy-header-affirmative-action"
            disabled={isPerformingAffirmativeAction || isDeleting || !name || !!hasErrors}
            className={styles.button}
            iconDescription={config.title}
            onClick={form.affirmativeAction}
            renderIcon={config.icon}
            type="submit"
            size="field"
          >
            {isPerformingAffirmativeAction ? config.isPerformingActionVerb : config.affirmativeActionVerb}
          </Button>
        </section>
      </div>
      {isDeleteModalOpen && (
        <Modal
          danger
          open
          shouldSubmitOnEnter
          className={styles.deleteConfirmModal}
          modalHeading={`Delete ${policy.name}?`}
          primaryButtonText="Yes"
          secondaryButtonText="No"
          onRequestClose={() => setIsDeleteModalOpen(false)}
          onSecondarySubmit={() => setIsDeleteModalOpen(false)}
          onRequestSubmit={() => {
            form.deletePolicy();
            setIsDeleteModalOpen(false);
          }}
        />
      )}
      {type === POLICY_INTERACTION_TYPES.EDIT && (
        <ComposedModal open={isDetailsModalOpen} onClose={() => setIsDetailsModalOpen(false)}>
          <ModalHeader
            title={"Validation Guide"}
            label="How to use this policy"
            buttonOnClick={() => setIsDetailsModalOpen(false)}
          />
          <ModalBody>
            <h2 className={styles.modalSectionTitle}>Validation Endpoint</h2>
            <p>{`${PRODUCT_SERVICE_ENV_URL}/policy/validate`}</p>
            <h2 className={styles.modalSectionTitle}>Sample Payload</h2>
            <CodeSnippet
              copyButtonDescription="Copy annotations to clipboard"
              onClick={() => copy(JSON.stringify(validateInfo))}
              type="multi"
            >
              {JSON.stringify(validateInfo, null, 1)}
            </CodeSnippet>
            <h2 className={styles.modalSectionTitle}>Next Steps (things to adjust)</h2>
            <OrderedList>
              <ListItem>
                Update <code>ReferenceId</code> to a unique identifier to ensure you can track specific xyz
              </ListItem>
              <ListItem>
                Update <code>ReferenceLink</code> a link back to xyz
              </ListItem>
              <ListItem>
                Supply{" "}
                <a href="https://github.com/boomerang-io/boomerang.docs/blob/stable/content/bosun.md#labels-required">
                  labels
                </a>{" "}
                that can be used by the integrations to integrate and retrieve backend information
              </ListItem>
              <ListItem>Call the validation endpoint with the updated data</ListItem>
            </OrderedList>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsDetailsModalOpen(false)}>Close</Button>
          </ModalFooter>
        </ComposedModal>
      )}
    </FullPageHeader>
  );
}

export default CreateEditPolicyHeader;
