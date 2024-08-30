import React from 'react'
import { Alert, Col } from 'reactstrap'

export default function ErrorPoke(params) {
    
  return (
    <>  <Col md='4 offset-md-4 text-center'>
            <Alert color="danger">
                <h4 className="alert-heading">
                    <i className="fas fa-exclamation-triangle"></i> Error
                </h4>
                <span>{params.msj}</span>
            </Alert>
        </Col>
    </>
  )
}
