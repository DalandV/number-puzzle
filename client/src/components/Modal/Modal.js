import React from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

const ModalBS = props => (
  <Modal isOpen={props.didUserWin} toggle={props.toggle} centered={true}>
    <ModalHeader toggle={props.toggle}>You Won!!</ModalHeader>
    <ModalBody>
      Congratulations on completing the puzzle! Add your name below so that you
      can be added to our leaderboard.
      <Form className="mt-2">
        <Input
          // value={}
          type="text"
          placeholder="Enter your name here"
          // onChange={props.handleInputChange}
        />
        <ModalFooter>
          <Button color="primary" onClick={props.toggle}>
            Save changes
          </Button>{" "}
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </ModalBody>
  </Modal>
);

export default ModalBS;
