import React from 'react'
import { Row, Container } from 'react-bootstrap'

const footer = () => {
    return (
        <footer className='mt-1'>
            <div className="footer-bottom">
                <Container >
                    <Row>
                        <p className="pull-left">Copyright © 2024 Vett. All rights reserved.</p>
                        <p className="pull-right">Designed by <span>Darlington</span></p>
                    </Row>
                </Container>
            </div>

        </footer>
    )
}

export default footer