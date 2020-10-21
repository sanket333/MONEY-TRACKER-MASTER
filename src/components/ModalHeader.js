import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalHeader = ({showPopup, incomeType, handleForm, handleInput, handleSubmit, setPopopFalse}) => {
    return(
        <div>
            <Modal show={showPopup} >
        <Modal.Header >
          <Modal.Title>{incomeType ? "Add Spended Money" : "Add Received Money"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleForm}>
            <label>
              {incomeType? "Spended Money" : "Add Money"}    : <input name="addedMoney" type="number" onChange={handleInput} />
            </label>
            <label>
              Add Description: <input name="description" type="text" onChange={handleInput} />
            </label>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={setPopopFalse} >
            Close
        </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
        </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}
export default ModalHeader;