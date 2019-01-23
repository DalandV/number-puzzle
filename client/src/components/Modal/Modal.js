import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalBS = props => (
  <Modal isOpen={props.didUserWin} toggle={props.toggle}>
    <ModalHeader toggle={props.toggle}>Modal title</ModalHeader>
    <ModalBody>Modal body text goes here.</ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={props.toggle}>
        Save changes
      </Button>{" "}
      <Button color="secondary" onClick={props.toggle}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>
);

export default ModalBS;
