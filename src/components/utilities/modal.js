import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

class Centered extends Componenent {
    state = {
        open: false
    }

    onOpenModal = () => {
        this.setState({open: true})
    }

    onCloseModal = () =>{
        this.setState({open: false})
    }

}

export default Centered;